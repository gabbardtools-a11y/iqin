#!/usr/bin/env python3
"""
Sync trademarks from iznaki to iqin — INDEPENDENT (no links to iznaki.ru).

What it does:
1. Reads /var/www/iznaki/src/components/iznaki/data.ts
2. Extracts (id, imageUrl) pairs
3. Copies images from iznaki → iqin with renaming: <regNum>.svg → <id>.svg
4. Updates data.ts on iqin: imageUrl → /images/trademarks/<id>.<ext>
5. Removes buttons/links to iznaki.ru from catalog.tsx
6. Updates next.config.ts (removes remotePatterns)
7. Rebuilds iqin + restart PM2

Run on VPS as root.
"""
import re
import os
import shutil
import json
from pathlib import Path

IZNAKI = Path('/var/www/iznaki')
IQIN = Path('/var/www/iqin')

IZNAKI_DATA = IZNAKI / 'src/components/iznaki/data.ts'
IQIN_DATA = IQIN / 'src/components/magazine/data.ts'
IZNAKI_IMG_DIR = IZNAKI / 'public/images/trademarks'
IQIN_IMG_DIR = IQIN / 'public/images/trademarks'

print('=' * 60)
print('Sync iznaki → iqin (INDEPENDENT mode)')
print('=' * 60)

# Step 1: Read iznaki data.ts and extract (id, imageUrl) pairs
print('\n[1] Reading iznaki data.ts...')
with open(IZNAKI_DATA, 'r', encoding='utf-8') as f:
    iznaki_content = f.read()

# Find all trademark blocks: { id: <num>, ... imageUrl: "<path>" ... }
# Use regex to find id + imageUrl pairs
pattern = re.compile(
    r'id:\s*(\d+),.*?imageUrl:\s*"([^"]+)"',
    re.DOTALL
)
pairs = pattern.findall(iznaki_content)
print(f'  Found {len(pairs)} (id, imageUrl) pairs')

# Step 2: Build rename map: old_path → new_path
print('\n[2] Building rename map...')
rename_map = {}  # old_filename → new_filename
for tm_id_str, image_url in pairs:
    tm_id = int(tm_id_str)
    # image_url like "/images/trademarks/464361.svg"
    old_filename = image_url.split('/')[-1]  # "464361.svg"
    ext = os.path.splitext(old_filename)[1]  # ".svg"
    new_filename = f'{tm_id}{ext}'  # "1259.svg"
    rename_map[old_filename] = new_filename

print(f'  {len(rename_map)} files to copy+rename')

# Step 3: Create iqin images dir + copy with rename
print('\n[3] Copy + rename images...')
IQIN_IMG_DIR.mkdir(parents=True, exist_ok=True)

copied = 0
skipped = 0
errors = 0
for old_name, new_name in rename_map.items():
    src = IZNAKI_IMG_DIR / old_name
    dst = IQIN_IMG_DIR / new_name
    if not src.exists():
        errors += 1
        if errors <= 3:
            print(f'  ⚠ Source not found: {old_name}')
        continue
    if dst.exists() and dst.stat().st_size == src.stat().st_size:
        skipped += 1
        continue
    shutil.copy2(src, dst)
    copied += 1
    if copied % 200 == 0:
        print(f'  Copied {copied}...')

print(f'  ✓ Copied: {copied}, Skipped (already exists): {skipped}, Errors: {errors}')

# Step 4: Update iqin data.ts — replace imageUrl paths
print('\n[4] Updating iqin data.ts (imageUrl paths)...')

# Read iqin data.ts (currently a copy of iznaki)
with open(IQIN_DATA, 'r', encoding='utf-8') as f:
    iqin_content = f.read()

# Replace each imageUrl: "/images/trademarks/<old>" → "/images/trademarks/<new>"
for old_name, new_name in rename_map.items():
    old_path = f'/images/trademarks/{old_name}'
    new_path = f'/images/trademarks/{new_name}'
    iqin_content = iqin_content.replace(old_path, new_path)

# Write back
with open(IQIN_DATA, 'w', encoding='utf-8') as f:
    f.write(iqin_content)
print(f'  ✓ Updated {len(rename_map)} imageUrl paths')

# Step 5: Remove buttons/links to iznaki.ru from catalog.tsx
print('\n[5] Removing iznaki.ru links from catalog.tsx...')
CATALOG = IQIN / 'src/components/magazine/catalog.tsx'

with open(CATALOG, 'r', encoding='utf-8') as f:
    catalog_content = f.read()

# Remove IZNAKI_BASE constant
catalog_content = re.sub(
    r"const IZNAKI_BASE = '[^']+';\n*",
    '',
    catalog_content
)

# Replace image URL logic: use tm.imageUrl directly (no prefix)
catalog_content = catalog_content.replace(
    "const imageUrl = tm.imageUrl.startsWith('http')\n    ? tm.imageUrl\n    : `${IZNAKI_BASE}${tm.imageUrl}`;",
    "const imageUrl = tm.imageUrl;"
)

# Replace "Подробнее" button — remove external link, make it a non-link or internal
# Option: replace with a button that opens a dialog (later) or just removes it
# For now: remove the "Подробнее" button entirely
catalog_content = re.sub(
    r'<Button\s+asChild\s+size="sm"\s+className="flex-1 h-8 text-xs"\s*>.*?</Button>',
    '',
    catalog_content,
    flags=re.DOTALL
)

# Replace CTA at the bottom — remove link to iznaki.ru
catalog_content = re.sub(
    r'<Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">.*?</Card>',
    '',
    catalog_content,
    flags=re.DOTALL
)

# Remove unused imports: Link, ExternalLink
catalog_content = catalog_content.replace(
    "import Link from 'next/link';\n",
    ''
)
catalog_content = catalog_content.replace(', ExternalLink', '').replace('ExternalLink, ', '').replace('ExternalLink', '')

# Remove ArrowRight if only used in removed CTA
# Check if ArrowRight is used elsewhere
if 'ArrowRight' not in catalog_content.replace('ArrowRight className="w-4 h-4 ml-2"', ''):
    catalog_content = catalog_content.replace(', ArrowRight', '').replace('ArrowRight, ', '').replace('ArrowRight', '')

with open(CATALOG, 'w', encoding='utf-8') as f:
    f.write(catalog_content)
print('  ✓ Removed iznaki.ru links from catalog.tsx')

# Step 6: Update next.config.ts — remove remotePatterns (no longer needed)
print('\n[6] Update next.config.ts (remove remotePatterns)...')
NEXT_CONFIG = IQIN / 'next.config.ts'

new_config = '''import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-d9ee631e-75e4-4aa2-bfcd-a1e4b163df70.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
'''

with open(NEXT_CONFIG, 'w', encoding='utf-8') as f:
    f.write(new_config)
print('  ✓ next.config.ts cleaned (no remotePatterns)')

# Step 7: Update page.tsx — remove link to iznaki.ru in CTA
print('\n[7] Update page.tsx (remove CTA link to iznaki.ru)...')
PAGE = IQIN / 'src/app/magazine/page.tsx'

with open(PAGE, 'r', encoding='utf-8') as f:
    page_content = f.read()

# Remove imports if Link/ExternalLink are used only for iznaki.ru
page_content = page_content.replace("import Link from 'next/link';\n", '')
# Check if ExternalLink is used
if 'ExternalLink' in page_content:
    # Remove the icon import and usage
    page_content = re.sub(r',?\s*ExternalLink', '', page_content)
    page_content = re.sub(r'<ExternalLink[^/]*/>', '', page_content)

with open(PAGE, 'w', encoding='utf-8') as f:
    f.write(page_content)
print('  ✓ page.tsx cleaned')

# Summary
print('\n' + '=' * 60)
print('✅ SYNC COMPLETE')
print('=' * 60)
print(f'  Images copied: {copied}')
print(f'  Images skipped (already existed): {skipped}')
print(f'  Image errors: {errors}')
print(f'  imageUrl paths updated: {len(rename_map)}')
print(f'  iznaki.ru links removed: yes')
print(f'  next.config.ts: cleaned')
print()
print('Next steps:')
print('  1. Rebuild iqin: cd /var/www/iqin && NODE_ENV=production npm run build')
print('  2. Restart PM2: pm2 restart iqin --update-env')
print('  3. Verify: curl https://iqin.ru/magazine')
