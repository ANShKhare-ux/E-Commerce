#!/usr/bin/env python3
"""Refined geometric constructions for LUMIÈRE concepts."""
import math
import os

DIR = os.path.dirname(os.path.abspath(__file__))

def make_refined_concept_a():
    """
    Concept A Refined: The Sovereign Atelier Weave
    4 interlocking ribbon bands forming a continuous woven diamond knot.
    In the center, an illuminated diamond aperture with a jewel punctum.
    """
    # 4 interlocking woven chevrons
    # Each chevron has a width of 24 units, with 6-unit negative space weave cuts
    # All angles exact 45° / 90°.
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-a">
  <title id="title-a">LUMIÈRE Concept A — The Atelier Weave</title>
  <g id="symbol-a" fill="#0D0D0D">
    <!-- Quadrant 1 (North-East Weave Band) -->
    <path d="M 128 26 L 152 26 L 226 100 L 226 124 L 202 124 L 140 62 L 140 102 L 116 102 L 116 38 Z"/>
    <!-- Quadrant 2 (South-East Weave Band) -->
    <path d="M 230 128 L 230 152 L 156 226 L 132 226 L 132 202 L 194 140 L 154 140 L 154 116 L 218 116 Z"/>
    <!-- Quadrant 3 (South-West Weave Band) -->
    <path d="M 128 230 L 104 230 L 30 156 L 30 132 L 54 132 L 116 194 L 116 154 L 140 154 L 140 218 Z"/>
    <!-- Quadrant 4 (North-West Weave Band) -->
    <path d="M 26 128 L 26 104 L 100 30 L 124 30 L 124 54 L 62 116 L 102 116 L 102 140 L 38 140 Z"/>
    <!-- Center Jewel Punctum -->
    <polygon points="128,116 140,128 128,140 116,128"/>
  </g>
</svg>'''

with open("brand/concepts/concept-a-refined-test.svg", "w", encoding="utf-8") as f:
    f.write(make_refined_concept_a())

print("Refined concept A written")
