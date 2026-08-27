#!/usr/bin/env python3
"""
Analyze v16-hline-active.png — find the V16 card region and check
if there's any horizontal blue strip visible (hline).
Compare with vline-active screenshot.
"""
from PIL import Image
from pathlib import Path

SRC = Path("/home/z/my-project/download/v16-cross-scan")

# Find V16 card in both screenshots
# Card is ~140px wide, 230px tall (from previous measurements)
# V16 is the last card in 8-col grid → second row, 8th column (rightmost)
# On 1600px viewport with grid-cols-8 and 16 cards in 2 rows
# Each card ~180px wide including gap

import subprocess
# Get current V16 rect via browser
result = subprocess.run(
    ["agent-browser", "eval", """(() => {
  const cards = Array.from(document.querySelectorAll('div.group'));
  const v16 = cards.find(d => d.textContent && d.textContent.includes('Cross Scan'));
  if (!v16) return JSON.stringify({error: 'not found'});
  v16.scrollIntoView({block: 'center', inline: 'center'});
  return new Promise(r => setTimeout(() => {
    const rect = v16.getBoundingClientRect();
    r(JSON.stringify({
      left: Math.round(rect.left),
      top: Math.round(rect.top),
      right: Math.round(rect.right),
      bottom: Math.round(rect.bottom),
    }));
  }, 400));
})()"""],
    capture_output=True, text=True
)
import json
raw = result.stdout.strip().strip('"').replace('\\n', '').replace('\\"', '"')
rect = json.loads(raw)
print(f"V16 rect: {rect}")

# Crop both screenshots to this rect (with padding)
pad = 12
crop_box = (
    max(0, rect['left'] - pad),
    max(0, rect['top'] - pad),
    rect['right'] + pad,
    rect['bottom'] + pad,
)

# Find the logo box (40x40 square) inside the card
# It's centered horizontally, near the top
# Crop just the logo area
logo_pad = 60
logo_crop = (
    crop_box[0] + 30,
    crop_box[1] + 30,
    crop_box[0] + 30 + 100,
    crop_box[1] + 30 + 100,
)

# Analyze hline-active screenshot
for name in ["v16-hline-active.png", "v16-hline-mid.png"]:
    f = SRC / name
    if not f.exists():
        print(f"\n{name}: NOT FOUND")
        continue
    img = Image.open(f).convert("RGB")
    logo = img.crop(logo_crop)
    print(f"\n=== {name} ===")
    print(f"Logo crop size: {logo.size}")
    # Find rows with horizontal blue strip (hline)
    # Hline is 14px tall, blue color rgba(59,130,246)
    # Sample center column of logo
    cx = logo.width // 2
    blue_rows = []
    for y in range(logo.height):
        r, g, b = logo.getpixel((cx, y))
        # Blue if b > 150 and b > r + 40
        if b > 150 and b > r + 40:
            blue_rows.append((y, r, g, b))
    if blue_rows:
        print(f"Blue pixels in center column at y={blue_rows[:5]}... (total {len(blue_rows)})")
    else:
        print(f"NO blue pixels found in center column (hline NOT visible)")
    # Save cropped logo for inspection
    logo_out = SRC / f"logo-{name}"
    logo.save(logo_out)
    print(f"  Logo crop saved: {logo_out}")

# Also do the same for vline-active (v15 screenshot for comparison)
v15 = Path("/home/z/my-project/download/v15-vertical-scan/v15-card-zoom.png")
if v15.exists():
    print(f"\n=== v15-card-zoom.png (for reference — vline visible) ===")
    img = Image.open(v15).convert("RGB")
    print(f"Size: {img.size}")
