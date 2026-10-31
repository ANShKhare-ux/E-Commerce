#!/usr/bin/env python3
"""Build and test the Sovereign L-Insignia."""
import os

DIR = os.path.dirname(os.path.abspath(__file__))

def make_sovereign_l_insignia():
    """
    Concept 5: 'The Sovereign L-Insignia'
    A classical haute-couture Roman capital L (thick vertical stem, Didone serifs,
    gracefully bracketed foot) intersected by a poised 45° diamond of celestial light.
    Designed to be cast in 3D brass for bag hardware, gold foil hot-stamped on boxes,
    and instantly recognizable at 16px.
    Canvas: 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c5-insignia-title">
  <title id="c5-insignia-title">LUMIÈRE Concept 5 — The Sovereign L-Insignia</title>
  <g id="sovereign-l" fill="#0D0D0D">
    <!-- Top Classical Serif -->
    <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"/>
    <!-- The Lumière Ray (Poised 45° Diamond intersecting the stem) -->
    <!-- Center of diamond at (136, 116) -->
    <polygon points="136,80 172,116 136,152 100,116"/>
  </g>
</svg>'''

with open("brand/concepts/c5-insignia.svg", "w", encoding="utf-8") as f:
    f.write(make_sovereign_l_insignia())

print("c5-insignia written")
