#!/usr/bin/env python3
"""Build and audit the 3 logo concepts for LUMIÈRE."""
import math
import os
import subprocess

def make_concept_a_symbol():
    """
    Concept A: 'The Luminous Weaver'
    An architectural diamond emblem constructed from 4 interlocking precision lozenge petals.
    The negative space reveals an 8-axis star of light (aperture).
    Pure geometry, 45-degree angles, 100% scalable.
    Canvas: 256x256
    """
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-a">
  <title id="title-a">LUMIÈRE Concept A — The Luminous Weaver</title>
  <g id="symbol-a" fill="#0D0D0D">
    <!-- North Petal -->
    <path d="M 128 28 L 168 68 L 146 90 L 134 78 L 134 110 L 128 104 L 122 110 L 122 78 L 110 90 L 88 68 Z"/>
    <!-- South Petal -->
    <path d="M 128 228 L 88 188 L 110 166 L 122 178 L 122 146 L 128 152 L 134 146 L 134 178 L 146 166 L 168 188 Z"/>
    <!-- East Petal -->
    <path d="M 228 128 L 188 168 L 166 146 L 178 134 L 146 134 L 152 128 L 146 122 L 178 122 L 166 110 L 188 88 Z"/>
    <!-- West Petal -->
    <path d="M 28 128 L 68 88 L 90 110 L 78 122 L 110 122 L 104 128 L 110 134 L 78 134 L 90 146 L 68 168 Z"/>
    <!-- Center Jewel Punctum -->
    <polygon points="128,118 138,128 128,138 118,128"/>
  </g>
</svg>'''
    return svg

with open("brand/concepts/concept-a-test.svg", "w", encoding="utf-8") as f:
    f.write(make_concept_a_symbol())

print("Concept A test written")
