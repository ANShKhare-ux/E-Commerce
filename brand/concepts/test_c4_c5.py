#!/usr/bin/env python3
"""Build and test negative space L and Double-L monogram."""
import os

DIR = os.path.dirname(os.path.abspath(__file__))

def make_negative_space_l():
    """
    Concept 4: 'L of Light' (Negative Space)
    The letter 'L' is not drawn in black; it is carved from pure white light
    between two architectural black monoliths.
    Top-right monolith and bottom-left monolith frame a radiant 45° beveled 'L'.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c4-test-title">
  <title id="c4-test-title">LUMIÈRE Concept 4 — The L of Light</title>
  <g id="negative-l" fill="#0D0D0D">
    <!-- Left Monolith (Shadow) -->
    <path d="M 40 40 L 92 40 L 92 184 L 216 184 L 216 216 L 40 216 Z"/>
    <!-- Top-Right Monolith (Shadow) -->
    <path d="M 124 40 L 216 40 L 216 152 L 124 152 Z"/>
    <!-- The white negative space between them forms a clean, monumental capital 'L' (width 32)
         running from (92,40) down to (124,152), then turning along (124,152) to (216,184)! -->
    <!-- Center Radiance Diamond at the apex of the L's turn -->
    <polygon points="124,136 140,152 124,168 108,152" fill="#0D0D0D"/>
  </g>
</svg>'''

def make_double_l_monogram():
    """
    Concept 5: 'The Sovereign Double-L Crest' (Back-to-Back Monogram)
    Two mirrored Roman capital 'L's joined back-to-back in majestic symmetry
    (in the lineage of Chanel CC, Fendi FF, and Rolls-Royce RR).
    Topped with an imperial diamond facet of light (Lumière).
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c5-test-title">
  <title id="c5-test-title">LUMIÈRE Concept 5 — The Double-L Crest</title>
  <g id="double-l" fill="#0D0D0D">
    <!-- Left Roman L (facing left) -->
    <path d="
      M 124 48 L 124 180 L 60 180 L 60 192 L 124 192 L 124 204 L 132 204 L 132 192 L 196 192 L 196 180 L 132 180 L 132 48 Z
    "/>
    <!-- Top Imperial Serifs -->
    <rect x="108" y="44" width="40" height="8" rx="1" fill="#0D0D0D"/>
    <!-- Left Base Terminal Serifs -->
    <path d="M 60 172 L 60 196 L 68 196 L 68 172 Z"/>
    <!-- Right Base Terminal Serifs -->
    <path d="M 188 172 L 188 196 L 196 196 L 196 172 Z"/>
    <!-- Poised Imperial Diamond Crown (The Light) -->
    <polygon points="128,16 140,28 128,40 116,28"/>
  </g>
</svg>'''

with open("brand/concepts/c4-test.svg", "w", encoding="utf-8") as f:
    f.write(make_negative_space_l())

with open("brand/concepts/c5-test.svg", "w", encoding="utf-8") as f:
    f.write(make_double_l_monogram())

print("Test SVGs written")
