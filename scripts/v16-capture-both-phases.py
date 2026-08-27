#!/usr/bin/env python3
"""Capture V16 in both phases by polling opacity and snapping at the right moment."""
import subprocess, time, os, json

OUT = "/home/z/my-project/download/v16-cross-scan"

def browser_cmd(args):
    r = subprocess.run(["agent-browser"] + args, capture_output=True, text=True, timeout=30)
    return r.stdout + r.stderr

# Helper to get current opacity state
def get_opacity():
    out = browser_cmd(["eval", """
    (() => {
      const v16 = document.querySelector('.logo-v-crossscan');
      if (!v16) return JSON.stringify({err: 'no v16'});
      const vline = v16.querySelector('.logo-vscan-line');
      const hline = v16.querySelector('.logo-hscan-line');
      return JSON.stringify({
        vOp: parseFloat(getComputedStyle(vline).opacity),
        hOp: parseFloat(getComputedStyle(hline).opacity)
      });
    })()
    """])
    try:
        # parse the wrapped JSON
        s = out.strip().strip('"').replace('\\"', '"')
        return json.loads(s)
    except Exception:
        return None

# Make sure we're on /logo-lab and V16 is in view
print("=== Setup ===")
print(browser_cmd(["navigate", "http://localhost:3000/logo-lab"])[:150])
time.sleep(3)
print(browser_cmd(["eval", """
(() => {
  const v16 = document.querySelector('.logo-v-crossscan');
  if (v16) { v16.scrollIntoView({block:'center', behavior:'instant'}); return 'scrolled'; }
  return 'not found';
})()
"""])[:100])
time.sleep(2)

# Poll until vline is active (opacity > 0.5) and hline is hidden (<0.2)
print("\n=== Waiting for vline-active phase ===")
for i in range(40):
    s = get_opacity()
    if s and s.get('vOp', 0) > 0.5 and s.get('hOp', 1) < 0.2:
        print(f"  found at poll {i}: vOp={s['vOp']}, hOp={s['hOp']}")
        break
    time.sleep(0.25)
else:
    print(f"  never found vline phase! Last: {s}")

# Snap vline phase
subprocess.run(["agent-browser", "screenshot", f"{OUT}/v16-fixed-vline-phase.png"], capture_output=True, timeout=15)
print(f"  saved: {OUT}/v16-fixed-vline-phase.png")

# Now poll until hline is active
print("\n=== Waiting for hline-active phase ===")
for i in range(40):
    s = get_opacity()
    if s and s.get('hOp', 0) > 0.5 and s.get('vOp', 1) < 0.2:
        print(f"  found at poll {i}: vOp={s['vOp']}, hOp={s['hOp']}")
        break
    time.sleep(0.25)
else:
    print(f"  never found hline phase! Last: {s}")

# Snap hline phase
subprocess.run(["agent-browser", "screenshot", f"{OUT}/v16-fixed-hline-phase.png"], capture_output=True, timeout=15)
print(f"  saved: {OUT}/v16-fixed-hline-phase.png")

print("\nDone.")
