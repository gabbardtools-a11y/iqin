#!/bin/bash
# Capture header logo (with V7 combo) + Logo Lab page
set -e
cd /home/z/my-project

agent-browser close 2>&1 | tail -1 || true
sleep 1
agent-browser set viewport 1440 900 2>&1 | tail -1

# === Header screenshot (top of home page) ===
agent-browser open "http://localhost:3000/" 2>&1 | tail -2
sleep 4
agent-browser wait --load networkidle --timeout 10000 2>&1 | tail -1 || true
agent-browser eval 'window.scrollTo({top:0, behavior:"instant"}); "ok"' 2>&1 | tail -1
sleep 1
agent-browser screenshot /home/z/my-project/download/preview-header-v7-combo.png 2>&1 | tail -2

# === Logo Lab page (top) ===
agent-browser open "http://localhost:3000/logo-lab" 2>&1 | tail -2
sleep 4
agent-browser wait --load networkidle --timeout 10000 2>&1 | tail -1 || true
agent-browser eval 'window.scrollTo({top:0, behavior:"instant"}); "ok"' 2>&1 | tail -1
sleep 1
agent-browser screenshot /home/z/my-project/download/preview-logo-lab-top.png 2>&1 | tail -2

# === Logo Lab page (full) ===
agent-browser screenshot /home/z/my-project/download/preview-logo-lab-full.png --full 2>&1 | tail -2

# === Logo Lab page — scroll to V7 ===
agent-browser eval '
  const headers = Array.from(document.querySelectorAll("h3"));
  const target = headers.find(h => h.innerText.includes("Combo"));
  if (target) { target.scrollIntoView({ behavior: "instant", block: "center" }); "scrolled to V7"; } else { "not found"; }
' 2>&1 | tail -2
sleep 1
agent-browser screenshot /home/z/my-project/download/preview-logo-lab-v7.png 2>&1 | tail -2

echo ""
echo "=== Results ==="
ls -la /home/z/my-project/download/preview-header-v7-combo.png \
       /home/z/my-project/download/preview-logo-lab-top.png \
       /home/z/my-project/download/preview-logo-lab-v7.png \
       /home/z/my-project/download/preview-logo-lab-full.png
