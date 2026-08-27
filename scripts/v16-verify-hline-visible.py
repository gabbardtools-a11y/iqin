#!/usr/bin/env python3
"""
Verify hline is now VISIBLE in V16 after removing mix-blend-mode.
Wait for hline phase, take screenshot, analyze pixels.
"""
import subprocess
import time
import json
from pathlib import Path
from PIL import Image

OUT_DIR = Path("/home/z/my-project/download/v16-cross-scan")

def get_state():
    result = subprocess.run(
        ["agent-browser", "eval", """(() => {
  const cards = Array.from(document.querySelectorAll('div.group'));
  const v16 = cards.find(d => d.textContent && d.textContent.includes('Cross Scan'));
  if (!v16) return JSON.stringify({error: 'not found'});
  const vline = v16.querySelector('.logo-vscan-line');
  const hline = v16.querySelector('.logo-hscan-line');
  const rect = v16.getBoundingClientRect();
  const hr = hline.getBoundingClientRect();
  return JSON.stringify({
    vOp: parseFloat(getComputedStyle(vline).opacity),
    hOp: parseFloat(getComputedStyle(hline).opacity),
    hY: Math.round(hr.top - rect.top),
    rect: {left: Math.round(rect.left), top: Math.round(rect.top),
           right: Math.round(rect.right), bottom: Math.round(rect.bottom)},
  });
})()"""],
        capture_output=True, text=True
    )
    raw = result.stdout.strip().strip('"').replace('\\n', '').replace('\\"', '"')
    return json.loads(raw)

# Reload page to reset animation cycle
subprocess.run(["agent-browser", "open", "http://localhost:3000/"], capture_output=True, text=True)
time.sleep(3)
# Scroll to V16
subprocess.run(
    ["agent-browser", "eval", """(() => {
  const cards = Array.from(document.querySelectorAll('div.group'));
  const v16 = cards.find(d => d.textContent && d.textContent.includes('Cross Scan'));
  if (v16) v16.scrollIntoView({block: 'center', inline: 'center'});
  return 'scrolled';
})()"""],
    capture_output=True, text=True
)
time.sleep(0.5)

# Wait for HLINE phase (12s into the cycle = middle of hline)
# But cycle started at page load, so we need to detect phase
print("Waiting for HLINE phase...")
target_y = None
for i in range(25):
    s = get_state()
    print(f"  {i}: vOp={s['vOp']:.2f}, hOp={s['hOp']:.2f}, hY={s['hY']}")
    # We want hline in the middle of motion (hY around 13-25, parent height ~203)
    if s['hOp'] > 0.5 and 10 < s['hY'] < 40:
        print(f"  → HLINE in motion! Capturing screenshot NOW")
        f = OUT_DIR / "v16-hline-fixed.png"
        subprocess.run(["agent-browser", "screenshot", str(f)], capture_output=True, text=True)
        target_y = s['hY']
        rect = s['rect']
        # Crop just the logo box (top of card, ~50px area)
        img = Image.open(f).convert("RGB")
        # Card rect, then crop top 1/3 (where logo sits)
        crop = img.crop((rect['left'] - 12, rect['top'] - 12,
                         rect['right'] + 12, rect['top'] + 130))
        crop.save(OUT_DIR / "v16-hline-cropped.png")
        print(f"  → cropped saved")
        # Analyze pixels for blue horizontal strip
        # Find rows with bright blue
        cx = crop.width // 2
        blue_rows = []
        for y in range(crop.height):
            r, g, b = crop.getpixel((cx, y))
            if b > 200 and r < 100 and g > 80:
                blue_rows.append(y)
        if blue_rows:
            print(f"  Blue rows at y={blue_rows[:10]} (total {len(blue_rows)})")
            # Check if there's a contiguous block of 5+ blue rows
            for i in range(len(blue_rows) - 4):
                if blue_rows[i+4] - blue_rows[i] <= 6:
                    print(f"  ✓ HORIZONTAL BLUE STRIP FOUND at y={blue_rows[i]}..{blue_rows[i+4]}")
                    break
            else:
                print(f"  ✗ No contiguous blue strip (hline not visible)")
        else:
            print(f"  ✗ No blue pixels at all")
        break
    time.sleep(1)
else:
    print("Never caught hline in motion")
