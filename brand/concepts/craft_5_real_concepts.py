#!/usr/bin/env python3
"""Craft 5 high-fashion concepts for LUMIÈRE with genuine luxury craft."""
import os
import subprocess

DIR = os.path.dirname(os.path.abspath(__file__))

# ======================================================================
# CONCEPT 1: Abstract Geometric — "The Prismatic Weave"
# ======================================================================
def make_concept_1():
    """
    Two interlocking architectural chevron facets at 45° angles.
    One facet represents the Warp (Tana); the second represents the Weft (Bana).
    Where they interlock, they frame a floating diamond of pure light (Lumière).
    Pure luxury geometry (in the lineage of Cartier / Goyard).
    Canvas: 256x256, perfectly centered.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c1-title">
  <title id="c1-title">LUMIÈRE Concept 1 — The Prismatic Weave</title>
  <g id="prismatic-weave" fill="#0D0D0D">
    <!-- Upper-Left Architectural Chevron (Warp) -->
    <path d="M 128 36 L 192 100 L 164 128 L 128 92 L 92 128 L 64 100 Z"/>
    <!-- Lower-Right Architectural Chevron (Weft) -->
    <path d="M 128 220 L 64 156 L 92 128 L 128 164 L 164 128 L 192 156 Z"/>
    <!-- Suspended Center Light Prism (The Lumière Ray) -->
    <polygon points="128,110 146,128 128,146 110,128"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 2: Minimalist Symbolic — "The Golden Eye" (Needle & Ray)
# ======================================================================
def make_concept_2():
    """
    Extreme minimalist elegance (The Row / Jil Sander / Celine).
    The silhouette of a bespoke couture needle eye:
    An ultra-slender vertical oval aperture framed by two razor-sharp
    architectural blades, with a single central horizontal thread of light.
    Canvas: 256x256, centered.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c2-title">
  <title id="c2-title">LUMIÈRE Concept 2 — The Golden Eye</title>
  <g id="golden-eye" fill="#0D0D0D">
    <!-- Left Blade -->
    <path d="M 112 36 C 88 76, 80 108, 80 128 C 80 148, 88 180, 112 220 L 120 220 C 102 184, 96 154, 96 128 C 96 102, 102 72, 120 36 Z"/>
    <!-- Right Blade -->
    <path d="M 144 36 C 168 76, 176 108, 176 128 C 176 148, 168 180, 144 220 L 136 220 C 154 184, 160 154, 160 128 C 160 102, 154 72, 136 36 Z"/>
    <!-- Horizontal Zari Thread / Light Beam -->
    <rect x="48" y="126" width="160" height="4" rx="2" fill="#0D0D0D"/>
    <!-- Center Punctum (The Spark) -->
    <circle cx="128" cy="128" r="6" fill="#0D0D0D"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 3: Custom Typography / Wordmark — "LUMIÈRE Haute-Couture"
# ======================================================================
def make_concept_3():
    """
    Pure typographic luxury. In haute couture, the bespoke wordmark IS the brand.
    A modern Didone / Roman with generous tracking, custom high-contrast cuts,
    and a distinct 45° diamond-shard grave accent on the first E.
    Canvas: 820x200.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 200" width="820" height="200" role="img" aria-labelledby="c3-title">
  <title id="c3-title">LUMIÈRE Concept 3 — Haute-Couture Wordmark</title>
  <g id="couture-wordmark" fill="#0D0D0D">
    <!-- L (x=70..114) -->
    <path d="M 70 60 L 80 60 L 80 134 L 114 134 L 114 140 L 70 140 Z"/>
    <!-- U (x=144..200) -->
    <path d="M 144 60 L 154 60 L 154 116 C 154 134, 164 141, 172 141 C 180 141, 190 134, 190 116 L 190 60 L 198 60 L 198 116 C 198 140, 184 147, 172 147 C 160 147, 144 140, 144 116 Z"/>
    <!-- M (x=230..302) -->
    <path d="M 230 60 L 241 60 L 266 122 L 291 60 L 302 60 L 302 140 L 292 140 L 292 88 L 270 136 L 262 136 L 240 88 L 240 140 L 230 140 Z"/>
    <!-- I (x=332..342) -->
    <path d="M 332 60 L 342 60 L 342 140 L 332 140 Z"/>
    <!-- È with 45° Diamond Shard (x=372..422) -->
    <path d="
      M 372 60 L 420 60 L 420 66 L 382 66 L 382 97 L 414 97 L 414 103 L 382 103 L 382 134 L 422 134 L 422 140 L 372 140 Z
      M 386 44 L 396 34 L 410 48 L 400 58 Z
    "/>
    <!-- R (x=452..508) -->
    <path fill-rule="evenodd" d="
      M 452 60 L 490 60 C 504 60, 508 70, 508 83 C 508 94, 500 102, 486 104 L 508 140 L 496 140 L 476 106 L 462 106 L 462 140 L 452 140 Z
      M 462 66 L 488 66 C 496 66, 498 72, 498 83 C 498 94, 496 100, 488 100 L 462 100 Z
    "/>
    <!-- E (x=538..588) -->
    <path d="M 538 60 L 586 60 L 586 66 L 548 66 L 548 97 L 580 97 L 580 103 L 548 103 L 548 134 L 588 134 L 588 140 L 538 140 Z"/>
    <!-- Descriptor: ATELIER • INDIA (pure vector paths) -->
    <!-- Centered at x=410, y=172 -->
    <!-- A -->
    <path d="M 290 172 L 294 160 L 297 160 L 301 172 L 299 172 L 298 169 L 293 169 L 292 172 Z M 294 167 L 297 167 L 295.5 162.5 Z" fill="#71717A"/>
    <!-- T -->
    <path d="M 311 160 L 321 160 L 321 162 L 317 162 L 317 172 L 315 172 L 315 162 L 311 162 Z" fill="#71717A"/>
    <!-- E -->
    <path d="M 331 160 L 340 160 L 340 162 L 333 162 L 333 165 L 338 165 L 338 167 L 333 167 L 333 170 L 340 170 L 340 172 L 331 172 Z" fill="#71717A"/>
    <!-- L -->
    <path d="M 350 160 L 352 160 L 352 170 L 359 170 L 359 172 L 350 172 Z" fill="#71717A"/>
    <!-- I -->
    <path d="M 369 160 L 371 160 L 371 172 L 369 172 Z" fill="#71717A"/>
    <!-- E -->
    <path d="M 381 160 L 390 160 L 390 162 L 383 162 L 383 165 L 388 165 L 388 167 L 383 167 L 383 170 L 390 170 L 390 172 L 381 172 Z" fill="#71717A"/>
    <!-- R -->
    <path fill-rule="evenodd" d="M 400 160 L 407 160 C 410 160, 411 161.5, 411 163.5 C 411 165, 410 166, 408 166.5 L 412 172 L 410 172 L 406.5 167 L 402 167 L 402 172 L 400 172 Z M 402 162 L 406.5 162 C 408 162, 409 162.5, 409 163.5 C 409 164.5, 408 165, 406.5 165 L 402 165 Z" fill="#71717A"/>
    <!-- Punctum Dot -->
    <polygon points="426,165 428.5,162.5 431,165 428.5,167.5" fill="#C59B48"/>
    <!-- I -->
    <path d="M 445 160 L 447 160 L 447 172 L 445 172 Z" fill="#71717A"/>
    <!-- N -->
    <path d="M 457 160 L 459 160 L 465 168.5 L 465 160 L 467 160 L 467 172 L 465 172 L 459 163.5 L 459 172 L 457 172 Z" fill="#71717A"/>
    <!-- D -->
    <path fill-rule="evenodd" d="M 477 160 L 483 160 C 487 160, 489 162.5, 489 166 C 489 169.5, 487 172, 483 172 L 477 172 Z M 479 162 L 483 162 C 485.5 162, 487 163.5, 487 166 C 487 168.5, 485.5 170, 483 170 L 479 170 Z" fill="#71717A"/>
    <!-- I -->
    <path d="M 499 160 L 501 160 L 501 172 L 499 172 Z" fill="#71717A"/>
    <!-- A -->
    <path d="M 511 172 L 515 160 L 518 160 L 522 172 L 520 172 L 519 169 L 514 169 L 513 172 Z M 515 167 L 518 167 L 516.5 162.5 Z" fill="#71717A"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 4: Clever Negative Space — "The Dual L Aperture"
# ======================================================================
def make_concept_4():
    """
    Two architectural 'L' letterforms mirrored diagonally across a square canvas.
    One upright 'L' in the upper-left, one inverted 'L' in the lower-right.
    Between their stems and arms, the negative space creates:
    1. An interlocking warp-and-weft ribbon flow.
    2. A central, piercing 4-pointed radiant flare of pure light (Lumière).
    Canvas: 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c4-title">
  <title id="c4-title">LUMIÈRE Concept 4 — The Dual L Aperture</title>
  <g id="dual-l" fill="#0D0D0D">
    <!-- Upper-Left L-Monolith (with 45° beveled interior facet) -->
    <path d="M 44 44 L 212 44 L 212 80 L 80 80 L 80 212 L 44 212 Z"/>
    <!-- Lower-Right Inverted L-Monolith -->
    <path d="M 212 212 L 44 212 L 44 176 L 176 176 L 176 44 L 212 44 Z"/>
    <!-- Suspended Center Light Shard (revealed by the cut) -->
    <polygon points="128,106 150,128 128,150 106,128"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 5: Haute-Couture Monogram — "The Sovereign L-Crest"
# ======================================================================
def make_concept_5():
    """
    An iconic luxury monogram: The classical serif capital 'L' merged with
    an architectural diamond facet into a singular, sculptural crest.
    Designed to function as 3D metallic bag hardware, gold foil stamp,
    and micro-scale app icon.
    Canvas: 256x256, perfectly centered.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c5-title">
  <title id="c5-title">LUMIÈRE Concept 5 — The Sovereign L-Crest</title>
  <g id="sovereign-crest" fill="#0D0D0D">
    <!-- Architectural Fluted Column (Vertical Stem with Classical Serifs) -->
    <!-- Top Serifs & Stem -->
    <path d="
      M 54 44 L 102 44 L 102 54 L 88 54 L 88 184 L 102 184 L 102 194 L 54 194 L 54 184 L 68 184 L 68 54 L 54 54 Z
    "/>
    <!-- Interlocking Horizontal Base Ribbon with Couture Terminus -->
    <path d="
      M 68 174 L 174 174 C 188 174, 196 166, 196 154 C 196 142, 188 134, 174 134 L 140 134 L 140 124 L 174 124 C 194 124, 206 136, 206 154 C 206 172, 194 184, 174 184 L 68 184 Z
    "/>
    <!-- Radiant Diamond Finial (The Lumière Spark) -->
    <polygon points="148,64 168,84 148,104 128,84"/>
  </g>
</svg>'''

files = [
    ("c1-prismatic-weave.svg", make_concept_1()),
    ("c2-golden-eye.svg", make_concept_2()),
    ("c3-couture-wordmark.svg", make_concept_3()),
    ("c4-dual-l-aperture.svg", make_concept_4()),
    ("c5-sovereign-crest.svg", make_concept_5()),
]

for name, content in files:
    path = os.path.join(DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {name}")

print("All 5 crafted concepts written.")
