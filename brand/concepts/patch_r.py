#!/usr/bin/env python3
"""Fine-tune lockups to fix near-miss angle and tiny details."""
import re

with open("brand/concepts/generate_all_concepts.py", "r", encoding="utf-8") as f:
    code = f.read()

# Fix R leg angle to exact 60°
old_r = 'f"M {x} {top} L {x+24} {top} A 14 14 0 0 1 {x+24} {top+28} L {x+22} {top+28} L {x+37} {bot} L {x+29} {bot} L {x+16} {top+30} L {x+8} {top+30} L {x+8} {bot} L {x} {bot} Z "'
new_r = 'f"M {x} {top} L {x+24} {top} A 14 14 0 0 1 {x+24} {top+26} L {x+22} {top+26} L {x+37} {bot} L {x+29} {bot} L {x+14} {top+26} L {x+8} {top+26} L {x+8} {bot} L {x} {bot} Z "'

code = code.replace(old_r, new_r)

with open("brand/concepts/generate_all_concepts.py", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated R leg geometry")
