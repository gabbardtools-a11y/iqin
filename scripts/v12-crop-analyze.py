"""Crop the beam region from V12 screenshots and analyze brightness."""
from PIL import Image
import os

SCREENS = "/home/z/my-project/download/v12-screens"

# From the bounding box: V12 beam is at approximately:
# LEFT: beamLeft=-135, beamWidth=262 (but visible portion within card)
# FRONT: beamLeft=-78, beamWidth=446
# RIGHT: beamLeft=163, beamWidth=262
# Glyph is at glyphCenterX=145, beam y around 309-340 in viewport
# Let me crop a region around the beam: x=[-200, 500], y=[300, 400]
# But crop coordinates can't be negative. Let me crop the card's left half.

# V12 card is at cardLeft=32, cardTop=307, cardWidth=1216
# The beam is centered around the glyph (left side of card)
# Glyph is at viewport x=145, beam spans wide

# Let me crop x=[0, 600], y=[300, 400] — a strip across the beam
CROP = (0, 300, 600, 400)

def analyze(path):
    img = Image.open(path).convert("RGB")
    cropped = img.crop(CROP)
    w, h = cropped.size
    pixels = cropped.load()
    
    # Find the brightest column (beam center)
    col_scores = []
    for x in range(w):
        col_total = 0
        for y in range(0, h, 2):
            r, g, b = pixels[x, y]
            # Beam color: rgb(219, 234, 254) — light blue-white
            # Score: blue tint + brightness
            blueness = max(0, b - max(r, g))
            score = (r + g + b) / 3 + blueness * 5
            col_total += score
        col_scores.append(col_total)
    
    max_col = max(range(w), key=lambda x: col_scores[x])
    max_score = col_scores[max_col]
    
    # 60%-brightness range
    threshold = max_score * 0.7
    bright_cols = [x for x in range(w) if col_scores[x] >= threshold]
    if bright_cols:
        bright_min, bright_max = min(bright_cols), max(bright_cols)
        bright_center = (bright_min + bright_max) // 2
        bright_width = bright_max - bright_min
    else:
        bright_min = bright_max = bright_center = max_col
        bright_width = 0
    
    print(f"  Crop area: x=[{CROP[0]}, {CROP[2]}], y=[{CROP[1]}, {CROP[3]}]")
    print(f"  Brightest column (in crop): x={max_col}, score={int(max_score)}")
    print(f"  70%-brightness range: x=[{bright_min}, {bright_max}], width={bright_width}px")
    print(f"  Brightest column in viewport: x={max_col + CROP[0]}")
    print(f"  Brightest column center in viewport: x={bright_center + CROP[0]}")
    # The glyph center was at viewport x=145
    print(f"  Glyph center: x=145 (from earlier measurement)")
    print(f"  Brightest beam column relative to glyph: {bright_center + CROP[0] - 145:+d}px")

for fname in ["v12-debug-LEFT.png", "v12-debug-FRONT.png", "v12-debug-RIGHT.png"]:
    path = os.path.join(SCREENS, fname)
    if not os.path.exists(path):
        print(f"Missing: {fname}")
        continue
    print(f"\n=== {fname} ===")
    analyze(path)
