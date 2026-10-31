#!/usr/bin/env python3
"""Craft 5 distinct, high-fashion concepts for LUMIÈRE with verified visual craft."""
import os
import subprocess

DIR = os.path.dirname(os.path.abspath(__file__))

# ======================================================================
# CONCEPT 1: Abstract Geometric — "The Prismatic Weave"
# ======================================================================
def make_concept_1():
    """
    Two architectural chevron facets at 45° angles.
    Warp & Weft framing a floating diamond of pure light.
    Refined proportions: 200x200 footprint, centered in 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c1-title">
  <title id="c1-title">LUMIÈRE Concept 1 — The Prismatic Weave</title>
  <g id="prismatic-weave" fill="#0D0D0D">
    <!-- Top Chevron (The Loom Warp) -->
    <path d="M 128 32 L 204 108 L 176 136 L 128 88 L 80 136 L 52 108 Z"/>
    <!-- Bottom Chevron (The Loom Weft) -->
    <path d="M 128 224 L 52 148 L 80 120 L 128 168 L 176 120 L 204 148 Z"/>
    <!-- Floating Center Diamond (Lumière) -->
    <polygon points="128,106 150,128 128,150 106,128"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 2: Minimalist Symbolic — "The Solar Loom / L'Aura"
# ======================================================================
def make_concept_2():
    """
    Extreme minimalist reduction.
    A solid celestial disc (The Sun / The Spool) sliced by an architectural
    vertical slit of light that expands into an illuminated diamond eye at the center.
    Pure, monumental, quiet luxury (Issey Miyake / The Row).
    Canvas: 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c2-title">
  <title id="c2-title">LUMIÈRE Concept 2 — The Solar Loom</title>
  <g id="solar-loom" fill="#0D0D0D">
    <!-- Left Hemisphere with Chamfered Center Aperture -->
    <path d="
      M 120 36
      A 92 92 0 0 0 120 220
      L 120 156
      L 96 128
      L 120 100
      Z
    "/>
    <!-- Right Hemisphere with Chamfered Center Aperture -->
    <path d="
      M 136 36
      L 136 100
      L 160 128
      L 136 156
      L 136 220
      A 92 92 0 0 0 136 36
      Z
    "/>
    <!-- Suspended Center Light Punctum -->
    <polygon points="128,116 140,128 128,140 116,128"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 3: Custom Typography / Wordmark — "LUMIÈRE Haute-Couture"
# ======================================================================
def make_concept_3():
    """
    The bespoke haute-couture wordmark.
    Custom Didone capitals with 45° diamond-shard accent on È,
    paired with pure vector subline ATELIER • INDIA.
    Canvas: 820x220.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 220" width="820" height="220" role="img" aria-labelledby="c3-title">
  <title id="c3-title">LUMIÈRE Concept 3 — Haute-Couture Wordmark</title>
  <g id="couture-wordmark" fill="#0D0D0D">
    <!-- L -->
    <path d="M 70 60 L 80 60 L 80 134 L 114 134 L 114 140 L 70 140 Z"/>
    <!-- U -->
    <path d="M 144 60 L 154 60 L 154 116 C 154 134, 164 141, 172 141 C 180 141, 190 134, 190 116 L 190 60 L 198 60 L 198 116 C 198 140, 184 147, 172 147 C 160 147, 144 140, 144 116 Z"/>
    <!-- M -->
    <path d="M 230 60 L 241 60 L 266 122 L 291 60 L 302 60 L 302 140 L 292 140 L 292 88 L 270 136 L 262 136 L 240 88 L 240 140 L 230 140 Z"/>
    <!-- I -->
    <path d="M 332 60 L 342 60 L 342 140 L 332 140 Z"/>
    <!-- È -->
    <path d="
      M 372 60 L 420 60 L 420 66 L 382 66 L 382 97 L 414 97 L 414 103 L 382 103 L 382 134 L 422 134 L 422 140 L 372 140 Z
      M 386 44 L 396 34 L 410 48 L 400 58 Z
    "/>
    <!-- R (with cutout) -->
    <path fill-rule="evenodd" d="
      M 452 60 L 490 60 C 504 60, 508 70, 508 83 C 508 94, 500 102, 486 104 L 508 140 L 496 140 L 476 106 L 462 106 L 462 140 L 452 140 Z
      M 462 66 L 488 66 C 496 66, 498 72, 498 83 C 498 94, 496 100, 488 100 L 462 100 Z
    "/>
    <!-- E -->
    <path d="M 538 60 L 586 60 L 586 66 L 548 66 L 548 97 L 580 97 L 580 103 L 548 103 L 548 134 L 588 134 L 588 140 L 538 140 Z"/>
    <!-- Subtitle: ATELIER • INDIA -->
    <path d="M 290 172 L 294 160 L 297 160 L 301 172 L 299 172 L 298 169 L 293 169 L 292 172 Z M 294 167 L 297 167 L 295.5 162.5 Z" fill="#71717A"/>
    <path d="M 311 160 L 321 160 L 321 162 L 317 162 L 317 172 L 315 172 L 315 162 L 311 162 Z" fill="#71717A"/>
    <path d="M 331 160 L 340 160 L 340 162 L 333 162 L 333 165 L 338 165 L 338 167 L 333 167 L 333 170 L 340 170 L 340 172 L 331 172 Z" fill="#71717A"/>
    <path d="M 350 160 L 352 160 L 352 170 L 359 170 L 359 172 L 350 172 Z" fill="#71717A"/>
    <path d="M 369 160 L 371 160 L 371 172 L 369 172 Z" fill="#71717A"/>
    <path d="M 381 160 L 390 160 L 390 162 L 383 162 L 383 165 L 388 165 L 388 167 L 383 167 L 383 170 L 390 170 L 390 172 L 381 172 Z" fill="#71717A"/>
    <path fill-rule="evenodd" d="M 400 160 L 407 160 C 410 160, 411 161.5, 411 163.5 C 411 165, 410 166, 408 166.5 L 412 172 L 410 172 L 406.5 167 L 402 167 L 402 172 L 400 172 Z M 402 162 L 406.5 162 C 408 162, 409 162.5, 409 163.5 C 409 164.5, 408 165, 406.5 165 L 402 165 Z" fill="#71717A"/>
    <polygon points="426,165 428.5,162.5 431,165 428.5,167.5" fill="#C59B48"/>
    <path d="M 445 160 L 447 160 L 447 172 L 445 172 Z" fill="#71717A"/>
    <path d="M 457 160 L 459 160 L 465 168.5 L 465 160 L 467 160 L 467 172 L 465 172 L 459 163.5 L 459 172 L 457 172 Z" fill="#71717A"/>
    <path fill-rule="evenodd" d="M 477 160 L 483 160 C 487 160, 489 162.5, 489 166 C 489 169.5, 487 172, 483 172 L 477 172 Z M 479 162 L 483 162 C 485.5 162, 487 163.5, 487 166 C 487 168.5, 485.5 170, 483 170 L 479 170 Z" fill="#71717A"/>
    <path d="M 499 160 L 501 160 L 501 172 L 499 172 Z" fill="#71717A"/>
    <path d="M 511 172 L 515 160 L 518 160 L 522 172 L 520 172 L 519 169 L 514 169 L 513 172 Z M 515 167 L 518 167 L 516.5 162.5 Z" fill="#71717A"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 4: Clever Negative Space — "The Loom Aperture (Interlocking L's)"
# ======================================================================
def make_concept_4():
    """
    Two architectural 'L' monoliths diagonally opposed.
    Between them, the negative space carves:
    1. A diagonal path of light.
    2. A central floating diamond aperture.
    Canvas: 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c4-title">
  <title id="c4-title">LUMIÈRE Concept 4 — The Loom Aperture</title>
  <g id="aperture" fill="#0D0D0D">
    <!-- Top-Left Architectural L (with 45° chamfered inner corner) -->
    <path d="M 40 40 L 196 40 L 196 76 L 76 76 L 76 196 L 40 196 Z"/>
    <!-- Bottom-Right Architectural L (Mirrored) -->
    <path d="M 216 216 L 60 216 L 60 180 L 180 180 L 180 60 L 216 60 Z"/>
    <!-- Center Radiant Diamond Shard -->
    <polygon points="128,108 148,128 128,148 108,128"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 5: Unique Monogram — "The Sovereign L-Monogram"
# ======================================================================
def make_concept_5():
    """
    An authentic haute-couture monogram.
    An architectural Roman capital 'L' whose foot extends into a bespoke
    woven ribbon loop, holding an integrated diamond facet of radiance.
    Crafted for 3D metallic bag hardware, gold foil hot-stamping, and jewelry.
    Canvas: 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c5-title">
  <title id="c5-title">LUMIÈRE Concept 5 — The Sovereign L-Monogram</title>
  <g id="sovereign-monogram" fill="#0D0D0D">
    <!-- Roman Stem with classical Didone Serifs -->
    <path d="M 60 48 L 108 48 L 108 58 L 94 58 L 94 176 L 108 176 L 108 186 L 60 186 L 60 176 L 74 176 L 74 58 L 60 58 Z"/>
    <!-- Architectural Foot extending into Couture Ribbon Return -->
    <path d="
      M 94 166
      L 172 166
      C 188 166, 198 176, 198 188
      C 198 200, 188 210, 172 210
      L 74 210
      L 74 200
      L 172 200
      C 182 200, 188 194, 188 188
      C 188 182, 182 176, 172 176
      L 94 176
      Z
    "/>
    <!-- The Lumière Radiant Diamond (Poised in the counter) -->
    <polygon points="152,72 174,94 152,116 130,94"/>
  </g>
</svg>'''

files = [
    ("c1-prismatic-weave.svg", make_concept_1()),
    ("c2-solar-loom.svg", make_concept_2()),
    ("c3-couture-wordmark.svg", make_concept_3()),
    ("c4-loom-aperture.svg", make_concept_4()),
    ("c5-sovereign-monogram.svg", make_concept_5()),
]

for name, content in files:
    path = os.path.join(DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {name}")

print("All 5 refined concepts written.")
