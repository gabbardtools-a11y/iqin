#!/usr/bin/env python3
"""Verify V16 glitch layer: check that glyph has glitch animations applied."""
import subprocess, time, json, os

OUT = "/home/z/my-project/download/v16-cross-scan"

def browser_cmd(args):
    r = subprocess.run(["agent-browser"] + args, capture_output=True, text=True, timeout=30)
    return r.stdout + r.stderr

print("=== Navigate to /logo-lab ===")
print(browser_cmd(["navigate", "http://localhost:3000/logo-lab"])[:150])
time.sleep(3)

# Scroll to V16
print("\n=== Scroll to V16 ===")
print(browser_cmd(["eval", """
(() => {
  const v16 = document.querySelector('.logo-v-crossscan');
  if (v16) { v16.scrollIntoView({block:'center', behavior:'instant'}); return 'scrolled'; }
  return 'not found';
})()
"""])[:100])
time.sleep(2)

# Inspect glyph state
print("\n=== V16 glyph inspection ===")
inspect = """
(() => {
  const v16 = document.querySelector('.logo-v-crossscan');
  if (!v16) return 'V16 not found';
  const glyph = v16.querySelector('.logo-glyph');
  if (!glyph) return 'glyph not found';
  const cs = getComputedStyle(glyph);
  return JSON.stringify({
    animationName: cs.animationName,
    animationDuration: cs.animationDuration,
    color: cs.color,
    webkitTextFillColor: cs.webkitTextFillColor,
    filter: cs.filter.substring(0, 150),
    transform: cs.transform,
    fontWeight: cs.fontWeight,
    classList: glyph.className
  }, null, 2);
})()
"""
print(browser_cmd(["eval", inspect]))

# Wait ~1.8s into 9s cycle for first glitch spike (at 20% = 1.8s)
# Then capture screenshots at multiple time points to try and catch a glitch frame
print("\n=== Sampling glyph filter over 12s to catch glitch spikes ===")
filters_seen = []
for i in range(24):
    out = browser_cmd(["eval", """
    (() => {
      const v16 = document.querySelector('.logo-v-crossscan');
      const glyph = v16.querySelector('.logo-glyph');
      const cs = getComputedStyle(glyph);
      return JSON.stringify({
        t: ${t},
        filter: cs.filter.substring(0, 100),
        transform: cs.transform
      });
    })()
    """.replace("${t}", str(i*0.5))])
    try:
        s = out.strip().strip('"').replace('\\"', '"')
        d = json.loads(s)
        filters_seen.append(d)
        # Check if glitch active (filter contains F472B6 pink or 60A5FA blue shadow)
        is_glitch = 'F472B6' in d['filter'] or '247,114,182' in d['filter']
        marker = " <<< GLITCH!" if is_glitch else ""
        print(f"  t={i*0.5:.1f}s: filter={d['filter'][:60]}... transform={d['transform']}{marker}")
    except Exception as e:
        print(f"  t={i*0.5:.1f}s: parse error: {e}")
    time.sleep(0.5)

# Try to capture a glitch frame: poll until we see F472B6 in filter
print("\n=== Trying to capture a glitch frame ===")
for i in range(60):
    out = browser_cmd(["eval", """
    (() => {
      const v16 = document.querySelector('.logo-v-crossscan');
      const glyph = v16.querySelector('.logo-glyph');
      const cs = getComputedStyle(glyph);
      return JSON.stringify({filter: cs.filter, transform: cs.transform});
    })()
    """])
    try:
        s = out.strip().strip('"').replace('\\"', '"')
        d = json.loads(s)
        if 'F472B6' in d['filter'] or '247,114,182' in d['filter']:
            print(f"  Glitch detected at poll {i}! Capturing screenshot...")
            subprocess.run(["agent-browser", "screenshot", f"{OUT}/v16-glitch-frame.png"], capture_output=True, timeout=15)
            print(f"  saved: {OUT}/v16-glitch-frame.png")
            break
    except Exception:
        pass
    time.sleep(0.15)
else:
    print("  No glitch detected in 60 polls (9s window)")

# Also capture a non-glitch frame for comparison
print("\n=== Capturing non-glitch frame for comparison ===")
for i in range(30):
    out = browser_cmd(["eval", """
    (() => {
      const v16 = document.querySelector('.logo-v-crossscan');
      const glyph = v16.querySelector('.logo-glyph');
      const cs = getComputedStyle(glyph);
      return JSON.stringify({filter: cs.filter});
    })()
    """])
    try:
        s = out.strip().strip('"').replace('\\"', '"')
        d = json.loads(s)
        if 'F472B6' not in d['filter']:
            subprocess.run(["agent-browser", "screenshot", f"{OUT}/v16-clean-frame.png"], capture_output=True, timeout=15)
            print(f"  saved: {OUT}/v16-clean-frame.png")
            break
    except Exception:
        pass
    time.sleep(0.2)

print("\nDone.")
