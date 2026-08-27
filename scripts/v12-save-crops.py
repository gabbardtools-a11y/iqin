"""Save cropped beam regions from V12 screenshots for visual inspection."""
from PIL import Image
import os

SCREENS = "/home/z/my-project/download/v12-screens"
OUT_DIR = "/home/z/my-project/download/v12-screens/crops"
os.makedirs(OUT_DIR, exist_ok=True)

# Crop a region around the V12 beam: viewport x=[0, 600], y=[290, 410]
CROP = (0, 290, 600, 410)

for fname in ["v12-debug-LEFT.png", "v12-debug-FRONT.png", "v12-debug-RIGHT.png"]:
    path = os.path.join(SCREENS, fname)
    if not os.path.exists(path):
        continue
    img = Image.open(path).convert("RGB")
    cropped = img.crop(CROP)
    out_path = os.path.join(OUT_DIR, fname.replace(".png", "-crop.png"))
    cropped.save(out_path)
    print(f"Saved: {out_path} ({cropped.size[0]}x{cropped.size[1]})")
