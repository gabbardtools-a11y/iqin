#!/usr/bin/env python3
"""Create comic showing V16 V4-style sweeping bars in both phases."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = "/home/z/my-project/download/v16-cross-scan"
vline_shot = f"{OUT}/v16-v4style-vline.png"
hline_shot = f"{OUT}/v16-v4style-hline.png"

if not (os.path.exists(vline_shot) and os.path.exists(hline_shot)):
    print("Missing phase screenshots")
    raise SystemExit(1)

v_img = Image.open(vline_shot).convert("RGB")
h_img = Image.open(hline_shot).convert("RGB")

# Crop V16 card from center (cards are 128x128, so crop 200x200 region)
W, H = v_img.size
crop_size = 200
v_crop = v_img.crop(((W - crop_size) // 2, (H - crop_size) // 2, (W + crop_size) // 2, (H + crop_size) // 2))
h_crop = h_img.crop(((W - crop_size) // 2, (H - crop_size) // 2, (W + crop_size) // 2, (H + crop_size) // 2))

# Comic layout: 2 panels side by side
panel_w, panel_h = 280, 260
margin = 16
title_h = 50
canvas_w = panel_w * 2 + margin * 3
canvas_h = panel_h + margin * 2

canvas = Image.new("RGB", (canvas_w, canvas_h), "#0A0F1F")
draw = ImageDraw.Draw(canvas)

try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 14)
    font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 11)
except Exception:
    font = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Panel 1: vline sweep (L→R)
px = margin
py = margin
draw.rectangle([px, py, px + panel_w, py + panel_h], outline="#3B82F6", width=2)
draw.text((px + 8, py + 6), "Phase 1: Vertical sweep", fill="#93C5FD", font=font)
draw.text((px + 8, py + 26), "Wide bar moves L → R (0-4s)", fill="#60A5FA", font=font_small)
draw.text((px + 8, py + 40), "like V4 Scan Sweep, horizontal", fill="#60A5FA", font=font_small)
inner_x = px + (panel_w - crop_size) // 2
inner_y = py + title_h + (panel_h - title_h - crop_size) // 2
canvas.paste(v_crop, (inner_x, inner_y))

# Panel 2: hline sweep (T→B)
px2 = margin * 2 + panel_w
draw.rectangle([px2, py, px2 + panel_w, py + panel_h], outline="#3B82F6", width=2)
draw.text((px2 + 8, py + 6), "Phase 2: Horizontal sweep", fill="#93C5FD", font=font)
draw.text((px2 + 8, py + 26), "Wide bar moves T → B (4-8s)", fill="#60A5FA", font=font_small)
draw.text((px2 + 8, py + 40), "exactly like V4 Scan Sweep", fill="#60A5FA", font=font_small)
inner_x2 = px2 + (panel_w - crop_size) // 2
canvas.paste(h_crop, (inner_x2, inner_y))

out_path = f"{OUT}/v16-v4style-comic.png"
canvas.save(out_path, "PNG")
print(f"Saved: {out_path}")
print(f"Size: {canvas_w}x{canvas_h}")
