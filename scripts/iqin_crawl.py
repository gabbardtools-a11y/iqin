#!/usr/bin/env python3
"""
Crawler for iqin.ru — downloads all pages from sitemap, extracts content,
saves raw HTML + cleaned Markdown + per-page meta JSON + manifest.
"""
import json
import os
import re
import time
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://iqin.ru"
SITEMAP = f"{BASE}/sitemap.xml"
OUT = "/home/z/my-project/download/iqin-content"
RAW_DIR = f"{OUT}/raw-html"
MD_DIR = f"{OUT}/markdown"
META_DIR = f"{OUT}/meta"
IMG_DIR = f"{OUT}/images"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120 Safari/537.36",
    "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
}

os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(MD_DIR, exist_ok=True)
os.makedirs(META_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)


def get_urls():
    r = requests.get(SITEMAP, headers=HEADERS, timeout=30)
    r.raise_for_status()
    urls = re.findall(r"<loc>([^<]+)</loc>", r.text)
    return sorted(set(urls))


def slugify(url):
    p = urlparse(url).path.strip("/")
    if not p:
        return "home"
    return p.replace("/", "__").replace(".", "_")


def fetch(url):
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    r.encoding = r.apparent_encoding or "utf-8"
    return r.text


def clean_text(s):
    s = re.sub(r"\s+", " ", s or "")
    return s.strip()


def extract(html, url):
    soup = BeautifulSoup(html, "html.parser")

    # title
    title = clean_text(soup.title.string) if soup.title else ""

    # meta description / keywords
    meta_desc = ""
    meta_kw = ""
    for m in soup.find_all("meta"):
        name = (m.get("name") or "").lower()
        if name == "description":
            meta_desc = clean_text(m.get("content", ""))
        elif name == "keywords":
            meta_kw = clean_text(m.get("content", ""))

    # og metadata
    og = {}
    for m in soup.find_all("meta"):
        prop = m.get("property") or ""
        if prop.startswith("og:"):
            og[prop] = clean_text(m.get("content", ""))

    # h1
    h1 = ""
    h1_tag = soup.find("h1")
    if h1_tag:
        h1 = clean_text(h1_tag.get_text(" "))

    # all headings
    headings = []
    for tag in ["h1", "h2", "h3", "h4", "h5", "h6"]:
        for el in soup.find_all(tag):
            headings.append({"level": int(tag[1]), "text": clean_text(el.get_text(" "))})

    # try to find main content container — be permissive: fall back to full body
    main = soup.find("main")
    if not main:
        main = soup.find("article")
    if not main:
        # try common class/id patterns
        for sel in [
            "div#content", "div.content", "div.page-content",
            "div.site-content", "div.main-content", "div.text-block",
            "div.sb-content", "div.s-content", "div.js-content",
        ]:
            el = soup.select_one(sel)
            if el and len(el.get_text(strip=True)) > 200:
                main = el
                break
    if not main:
        main = soup.body or soup

    # remove noise
    for sel in ["script", "style", "noscript", "iframe", "svg", "form", "button",
                "header", "footer", "nav", "aside"]:
        for el in main.find_all(sel):
            el.decompose()

    # collect images
    images = []
    for img in main.find_all("img"):
        src = img.get("src") or img.get("data-src") or ""
        if not src:
            continue
        full = urljoin(url, src)
        alt = clean_text(img.get("alt", ""))
        images.append({"src": full, "alt": alt})

    # collect links
    links = []
    for a in main.find_all("a", href=True):
        href = a["href"]
        full = urljoin(url, href)
        text = clean_text(a.get_text(" "))
        if text and full:
            links.append({"href": full, "text": text})

    # convert main HTML to markdown-ish
    paragraphs = []
    for el in main.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote", "td"]):
        txt = clean_text(el.get_text(" "))
        if not txt:
            continue
        tag = el.name
        if tag == "h1":
            paragraphs.append(f"\n# {txt}\n")
        elif tag == "h2":
            paragraphs.append(f"\n## {txt}\n")
        elif tag == "h3":
            paragraphs.append(f"\n### {txt}\n")
        elif tag == "h4":
            paragraphs.append(f"\n#### {txt}\n")
        elif tag == "h5":
            paragraphs.append(f"\n##### {txt}\n")
        elif tag == "h6":
            paragraphs.append(f"\n###### {txt}\n")
        elif tag == "li":
            paragraphs.append(f"- {txt}")
        elif tag == "blockquote":
            paragraphs.append(f"> {txt}")
        elif tag == "td":
            paragraphs.append(f"| {txt} ")
        else:
            paragraphs.append(txt)

    body_text = clean_text(main.get_text(" "))
    md = "\n".join(paragraphs)

    return {
        "url": url,
        "title": title,
        "h1": h1,
        "meta_description": meta_desc,
        "meta_keywords": meta_kw,
        "og": og,
        "headings": headings,
        "images": images,
        "links": links,
        "body_text": body_text,
        "markdown": md,
        "body_text_length": len(body_text),
    }


def save(slug, url, html, data):
    with open(f"{RAW_DIR}/{slug}.html", "w", encoding="utf-8") as f:
        f.write(html)
    with open(f"{MD_DIR}/{slug}.md", "w", encoding="utf-8") as f:
        f.write(f"# {data['title'] or data['h1'] or url}\n")
        f.write(f"\n**URL:** {url}\n")
        if data["h1"]:
            f.write(f"\n## H1\n\n{data['h1']}\n")
        if data["meta_description"]:
            f.write(f"\n## Meta description\n\n{data['meta_description']}\n")
        if data["meta_keywords"]:
            f.write(f"\n## Meta keywords\n\n{data['meta_keywords']}\n")
        if data["images"]:
            f.write("\n## Изображения\n\n")
            for im in data["images"]:
                f.write(f"- ![{im['alt']}]({im['src']})\n")
        if data["links"]:
            f.write("\n## Ссылки на странице\n\n")
            for ln in data["links"][:50]:
                f.write(f"- [{ln['text']}]({ln['href']})\n")
            if len(data["links"]) > 50:
                f.write(f"\n_…и ещё {len(data['links'])-50} ссылок_\n")
        f.write("\n## Основной контент\n\n")
        f.write(data["markdown"])
        f.write("\n")
    meta = {k: v for k, v in data.items() if k not in ("markdown", "body_text")}
    meta["body_text_preview"] = data["body_text"][:500]
    with open(f"{META_DIR}/{slug}.json", "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)


def main():
    urls = get_urls()
    print(f"Found {len(urls)} URLs in sitemap")

    manifest = []
    errors = []

    for i, url in enumerate(urls, 1):
        slug = slugify(url)
        print(f"[{i:>3}/{len(urls)}] {url}")
        try:
            html = fetch(url)
            data = extract(html, url)
            save(slug, url, html, data)
            manifest.append({
                "url": url,
                "slug": slug,
                "title": data["title"],
                "h1": data["h1"],
                "meta_description": data["meta_description"],
                "body_text_length": data["body_text_length"],
                "images_count": len(data["images"]),
                "links_count": len(data["links"]),
                "raw_html": f"raw-html/{slug}.html",
                "markdown": f"markdown/{slug}.md",
                "meta": f"meta/{slug}.json",
            })
            time.sleep(0.3)
        except Exception as e:
            print(f"  ERROR: {e}")
            errors.append({"url": url, "error": str(e)})

    with open(f"{OUT}/manifest.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    with open(f"{OUT}/errors.json", "w", encoding="utf-8") as f:
        json.dump(errors, f, ensure_ascii=False, indent=2)

    print(f"\n=== DONE ===")
    print(f"Pages OK: {len(manifest)}")
    print(f"Errors:   {len(errors)}")
    print(f"Output:   {OUT}")


if __name__ == "__main__":
    main()
