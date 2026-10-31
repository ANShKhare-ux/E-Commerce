#!/usr/bin/env python3
"""Generate 5 fundamentally different logo concepts for LUMIÈRE."""
import math
import os
import subprocess

DIR = os.path.dirname(os.path.abspath(__file__))

# ======================================================================
# CONCEPT 1: Abstract Geometric Identity — "The Chiaroscuro Prism"
# ======================================================================
def make_concept_1_svg():
    """
    Concept 1: A sovereign hexagonal / faceted diamond prism split by light.
    Left half: deep solid monolithic obsidian / noir.
    Right half: 4 precision angled textile louvers / light facets.
    Represents 'Dhoop-Chhaon' (Sun and Shadow) in Indian silk weaves.
    Canvas: 256x256, perfectly centered.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c1-title">
  <title id="c1-title">LUMIÈRE Concept 1 — The Chiaroscuro Prism</title>
  <g id="prism" fill="#0D0D0D">
    <!-- Solid Shadow Half (Left Facet) -->
    <path d="M 128 32 L 64 80 L 64 176 L 128 224 Z"/>
    <!-- Light & Thread Facets (Right Half - 4 precision louvers) -->
    <!-- Top louver -->
    <path d="M 136 38 L 192 80 L 176 92 L 136 62 Z"/>
    <!-- Upper-mid louver -->
    <path d="M 136 78 L 192 120 L 176 132 L 136 102 Z"/>
    <!-- Lower-mid louver -->
    <path d="M 136 118 L 192 160 L 176 172 L 136 142 Z"/>
    <!-- Bottom louver -->
    <path d="M 136 158 L 192 200 L 148 220 L 136 182 Z"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 2: Minimalist Symbolic Identity — "The Golden Portal / Needle"
# ======================================================================
def make_concept_2_svg():
    """
    Concept 2: Extreme minimalist reduction.
    An architectural vertical couture needle / portal (tall lozenge with inner eye cutout),
    bisected by a razor-sharp horizontal light beam.
    Pure quiet luxury (The Row / Jil Sander / Céline lineage).
    Canvas: 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c2-title">
  <title id="c2-title">LUMIÈRE Concept 2 — The Golden Portal</title>
  <g id="portal" fill="#0D0D0D">
    <!-- Outer Arch / Needle Silhouette with inner eye cutout using evenodd -->
    <path fill-rule="evenodd" d="
      M 128 28
      C 160 28, 172 64, 172 128
      C 172 192, 160 228, 128 228
      C 96 228, 84 192, 84 128
      C 84 64, 96 28, 128 28 Z
      M 128 64
      C 114 64, 108 88, 108 128
      C 108 168, 114 192, 128 192
      C 142 192, 148 168, 148 128
      C 148 88, 142 64, 128 64 Z
    "/>
    <!-- Horizontal Light Beam (Piercing the Needle Eye) -->
    <rect x="44" y="125" width="168" height="6" rx="3" fill="#0D0D0D"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 3: Custom Typography / Wordmark — "LUMIÈRE Typographique"
# ======================================================================
def make_concept_3_svg():
    """
    Concept 3: The Name AS Identity.
    Haute-couture houses live and die by their bespoke typography.
    An authoritative, sculptural modern Didone wordmark with high-contrast
    stems, wide letter-spacing, and an iconic architectural grave accent.
    Canvas: 760x220, perfectly balanced.
    """
    # Stems = 9, Hairlines = 2.5
    # Let's craft the vector paths for L U M I È R E
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 220" width="760" height="220" role="img" aria-labelledby="c3-title">
  <title id="c3-title">LUMIÈRE Concept 3 — Bespoke Atelier Wordmark</title>
  <g id="wordmark" fill="#0D0D0D">
    <!-- L (x=70 to 118) -->
    <path d="M 70 70 L 80 70 L 80 134 L 118 134 L 118 140 L 70 140 Z"/>
    <!-- U (x=144 to 198) -->
    <path d="M 144 70 L 154 70 L 154 116 C 154 134, 164 141, 171 141 C 178 141, 188 134, 188 116 L 188 70 L 198 70 L 198 116 C 198 140, 184 148, 171 148 C 158 148, 144 140, 144 116 Z"/>
    <!-- M (x=224 to 288) -->
    <path d="M 224 70 L 235 70 L 256 122 L 277 70 L 288 70 L 288 140 L 278 140 L 278 88 L 260 134 L 252 134 L 234 88 L 234 140 L 224 140 Z"/>
    <!-- I (x=314 to 324) -->
    <path d="M 314 70 L 324 70 L 324 140 L 314 140 Z"/>
    <!-- È with 45° Architectural Light Shard (x=350 to 398) -->
    <path d="
      M 350 70 L 396 70 L 396 76 L 360 76 L 360 102 L 390 102 L 390 108 L 360 108 L 360 134 L 398 134 L 398 140 L 350 140 Z
      M 364 54 L 372 46 L 384 58 L 376 66 Z
    "/>
    <!-- R (x=424 to 476) -->
    <path d="
      M 424 70 L 458 70 C 472 70, 476 80, 476 90 C 476 100, 468 108, 454 109 L 476 140 L 464 140 L 444 110 L 434 110 L 434 140 L 424 140 Z
      M 434 76 L 456 76 C 464 76, 466 82, 466 90 C 466 98, 464 104, 456 104 L 434 104 Z
    "/>
    <!-- E (x=502 to 550) -->
    <path d="M 502 70 L 548 70 L 548 76 L 512 76 L 512 102 L 542 102 L 542 108 L 512 108 L 512 134 L 550 134 L 550 140 L 502 140 Z"/>
  </g>
  <!-- Subtitle: ATELIER · MUMBAI -->
  <g id="sub" fill="#71717A">
    <rect x="290" y="172" width="180" height="1" fill="#D4D4D8"/>
    <text x="380" y="194" font-family="'Didot', 'Playfair Display', serif" font-size="11" letter-spacing="8" text-anchor="middle" text-transform="uppercase" fill="#71717A">ATELIER • MUMBAI</text>
  </g>
</svg>'''

# Let's also make an icon-companion for Concept 3: The Sculptural Accented 'È'
def make_concept_3_icon_svg():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c3-icon-title">
  <title id="c3-icon-title">LUMIÈRE Concept 3 Icon — The Accented Monogram</title>
  <g id="accent-e" fill="#0D0D0D">
    <!-- Capital E -->
    <path d="M 64 64 L 180 64 L 180 80 L 92 80 L 92 120 L 164 120 L 164 136 L 92 136 L 92 192 L 184 192 L 184 208 L 64 208 Z"/>
    <!-- 45° Faceted Grave Accent (The Lumière Ray) -->
    <polygon points="104,44 124,24 148,48 128,68"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 4: Clever Negative Space — "The Weaver's Aperture"
# ======================================================================
def make_concept_4_svg():
    """
    Concept 4: Two monolithic solid L-pillars enclosing negative space.
    The white negative space simultaneously forms:
    1. A flowing continuous silk ribbon / warp-weft fold.
    2. A razor-sharp 4-pointed radiant flare of pure light at the center.
    Canvas: 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c4-title">
  <title id="c4-title">LUMIÈRE Concept 4 — The Weaver\'s Aperture</title>
  <g id="aperture" fill="#0D0D0D">
    <!-- Top-Left Monolith -->
    <path d="M 36 36 L 220 36 L 220 84 L 84 84 L 84 220 L 36 220 Z"/>
    <!-- Bottom-Right Monolith with Chamfered Negative Light Channel -->
    <path d="M 220 220 L 36 220 L 36 172 L 172 172 L 172 36 L 220 36 Z"/>
    <!-- Center Radiant Diamond Core (Creating the light pinch) -->
    <polygon points="128,104 152,128 128,152 104,128"/>
  </g>
</svg>'''

# ======================================================================
# CONCEPT 5: Unique Monogram — "The Sovereign L-Ribbon"
# ======================================================================
def make_concept_5_svg():
    """
    Concept 5: An unbroken topological couture ribbon folding into an L.
    Begins as a vertical pillar, sweeps down, loops continuously in on itself
    like a gold zari thread on a handloom shuttle, and settles into an authoritative base.
    Designed specifically for 3D metallic bag hardware, jewelry, and embroidery.
    Canvas: 256x256.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c5-title">
  <title id="c5-title">LUMIÈRE Concept 5 — The Sovereign L-Ribbon</title>
  <g id="ribbon" fill="#0D0D0D">
    <!-- Continuous Sculptural L with internal architectural loop cut -->
    <path fill-rule="evenodd" d="
      M 72 40
      L 104 40
      L 104 160
      C 104 176, 116 188, 132 188
      L 184 188
      C 198 188, 208 178, 208 164
      C 208 150, 198 140, 184 140
      L 144 140
      L 144 116
      L 184 116
      C 212 116, 232 136, 232 164
      C 232 192, 212 212, 184 212
      L 132 212
      C 102 212, 72 182, 72 152
      Z
    "/>
  </g>
</svg>'''

# Write the SVG files
files = [
    ("concept-1-prism.svg", make_concept_1_svg()),
    ("concept-2-portal.svg", make_concept_2_svg()),
    ("concept-3-wordmark.svg", make_concept_3_svg()),
    ("concept-3-icon.svg", make_concept_3_icon_svg()),
    ("concept-4-aperture.svg", make_concept_4_svg()),
    ("concept-5-ribbon.svg", make_concept_5_svg()),
]

for name, content in files:
    path = os.path.join(DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {name}")

print("All 5 concepts generated.")
