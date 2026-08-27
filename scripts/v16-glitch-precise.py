#!/usr/bin/env python3
"""Capture V16 glitch frame precisely using in-page JS that triggers screenshot at exact moment."""
import subprocess, time, os

OUT = "/home/z/my-project/download/v16-cross-scan"

def browser_cmd(args):
    r = subprocess.run(["agent-browser"] + args, capture_output=True, text=True, timeout=30)
    return r.stdout + r.stderr

print("=== Navigate to /logo-lab ===")
print(browser_cmd(["navigate", "http://localhost:3000/logo-lab"])[:150])
time.sleep(3)

print("\n=== Scroll to V16 ===")
print(browser_cmd(["eval", """
(() => {
  const v16 = document.querySelector('.logo-v-crossscan');
  if (v16) { v16.scrollIntoView({block:'center', behavior:'instant'}); return 'scrolled'; }
  return 'not found';
})()
"""])[:100])
time.sleep(2)

# Set up a requestAnimationFrame loop that calls back the moment it sees glitch
# Use a marker element we can poll for
print("\n=== Setting up glitch detector ===")
print(browser_cmd(["eval", """
(() => {
  // Create marker element
  let marker = document.getElementById('glitch-marker');
  if (!marker) {
    marker = document.createElement('div');
    marker.id = 'glitch-marker';
    marker.style.display = 'none';
    document.body.appendChild(marker);
  }
  marker.dataset.glitchActive = 'false';
  marker.dataset.glitchCount = '0';
  
  const v16 = document.querySelector('.logo-v-crossscan');
  const glyph = v16.querySelector('.logo-glyph');
  
  // Animation frame loop
  function check() {
    const cs = getComputedStyle(glyph);
    const f = cs.filter;
    if (f.includes('242, 116') || f.includes('242,116')) {
      marker.dataset.glitchActive = 'true';
      marker.dataset.glitchCount = String(parseInt(marker.dataset.glitchCount) + 1);
    } else {
      marker.dataset.glitchActive = 'false';
    }
    requestAnimationFrame(check);
  }
  requestAnimationFrame(check);
  return 'detector started';
})()
"""])[:200])

# Now poll the marker, and when glitch is active, immediately take screenshot
print("\n=== Polling for glitch and capturing screenshots ===")
captured = 0
attempts = 0
while captured < 3 and attempts < 200:
    out = browser_cmd(["eval", """
    (() => {
      const m = document.getElementById('glitch-marker');
      return JSON.stringify({active: m.dataset.glitchActive, count: m.dataset.glitchCount});
    })()
    """])
    try:
        import json
        s = out.strip().strip('"').replace('\\"', '"')
        d = json.loads(s)
        if d['active'] == 'true':
            # Glitch active right now! Rapid capture
            fname = f"{OUT}/v16-glitch-precise-{captured}.png"
            subprocess.run(["agent-browser", "screenshot", fname], capture_output=True, timeout=10)
            print(f"  glitch #{d['count']} captured: {fname}")
            captured += 1
            time.sleep(0.5)  # skip a bit to avoid same glitch
        else:
            time.sleep(0.05)
    except Exception as e:
        pass
    attempts += 1

print(f"\nCaptured {captured} glitch frames out of {attempts} attempts")

# Also capture a clean frame for sure
print("\n=== Wait for clean state and capture ===")
for _ in range(40):
    out = browser_cmd(["eval", """
    (() => {
      const m = document.getElementById('glitch-marker');
      return m.dataset.glitchActive;
    })()
    """])
    if 'false' in out:
        # Also wait for no sweep bars (skip 2s)
        time.sleep(1.5)
        subprocess.run(["agent-browser", "screenshot", f"{OUT}/v16-baseline-clean2.png"], capture_output=True, timeout=10)
        print(f"  baseline captured: {OUT}/v16-baseline-clean2.png")
        break
    time.sleep(0.1)

print("\nDone.")
