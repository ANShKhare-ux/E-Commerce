#!/usr/bin/env python3
"""Build the 5 distinct concepts, audit them, and generate a 5-concept overview board."""
import os
import subprocess

DIR = os.path.dirname(os.path.abspath(__file__))

# ----------------------------------------------------------------------
# 1. SVG Master Generators
# ----------------------------------------------------------------------

def svg_c1():
    """Concept 1: Abstract Geometric — The Prismatic Weave"""
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c1-title">
  <title id="c1-title">LUMIÈRE Concept 1 — The Prismatic Weave</title>
  <g id="c1-prism" fill="#0D0D0D">
    <!-- Top Chevron (Loom Warp) -->
    <path d="M 128 32 L 204 108 L 176 136 L 128 88 L 80 136 L 52 108 Z"/>
    <!-- Bottom Chevron (Loom Weft) -->
    <path d="M 128 224 L 52 148 L 80 120 L 128 168 L 176 120 L 204 148 Z"/>
    <!-- Floating Center Diamond (Lumière) -->
    <polygon points="128,106 150,128 128,150 106,128"/>
  </g>
</svg>'''

def svg_c2():
    """Concept 2: Minimalist Symbolic — The Solar Loom"""
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c2-title">
  <title id="c2-title">LUMIÈRE Concept 2 — The Solar Loom</title>
  <g id="c2-solar" fill="#0D0D0D">
    <!-- Left Disc Half with Chamfered Eye -->
    <path d="M 120 36 A 92 92 0 0 0 120 220 L 120 156 L 96 128 L 120 100 Z"/>
    <!-- Right Disc Half with Chamfered Eye -->
    <path d="M 136 36 L 136 100 L 160 128 L 136 156 L 136 220 A 92 92 0 0 0 136 36 Z"/>
    <!-- Center Radiant Core -->
    <polygon points="128,116 140,128 128,140 116,128"/>
  </g>
</svg>'''

def svg_c3():
    """Concept 3: Custom Typography / Wordmark — LUMIÈRE Haute-Couture"""
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 220" width="820" height="220" role="img" aria-labelledby="c3-title">
  <title id="c3-title">LUMIÈRE Concept 3 — Haute-Couture Wordmark</title>
  <g id="c3-wordmark" fill="#0D0D0D">
    <!-- L -->
    <path d="M 70 60 L 80 60 L 80 134 L 114 134 L 114 140 L 70 140 Z"/>
    <!-- U -->
    <path d="M 144 60 L 154 60 L 154 116 C 154 134, 164 141, 172 141 C 180 141, 190 134, 190 116 L 190 60 L 198 60 L 198 116 C 198 140, 184 147, 172 147 C 160 147, 144 140, 144 116 Z"/>
    <!-- M -->
    <path d="M 230 60 L 241 60 L 266 122 L 291 60 L 302 60 L 302 140 L 292 140 L 292 88 L 270 136 L 262 136 L 240 88 L 240 140 L 230 140 Z"/>
    <!-- I -->
    <path d="M 332 60 L 342 60 L 342 140 L 332 140 Z"/>
    <!-- È with 45° Diamond Shard Accent -->
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
    <!-- Subtitle: ATELIER • INDIA (outlined paths) -->
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

def svg_c4():
    """Concept 4: Clever Negative Space — The L of Light"""
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c4-title">
  <title id="c4-title">LUMIÈRE Concept 4 — The L of Light</title>
  <g id="c4-negative-l" fill="#0D0D0D">
    <!-- Left Monolith (Shadow) -->
    <path d="M 40 40 L 92 40 L 92 184 L 216 184 L 216 216 L 40 216 Z"/>
    <!-- Top-Right Monolith (Shadow) -->
    <path d="M 124 40 L 216 40 L 216 152 L 124 152 Z"/>
    <!-- Center Radiance Diamond at the inner corner of the white L -->
    <polygon points="124,136 140,152 124,168 108,152"/>
  </g>
</svg>'''

def svg_c5():
    """Concept 5: Unique Monogram — The Sovereign L-Insignia"""
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="c5-title">
  <title id="c5-title">LUMIÈRE Concept 5 — The Sovereign L-Insignia</title>
  <g id="c5-insignia" fill="#0D0D0D">
    <!-- Architectural Roman L with Didone serifs and couture terminal -->
    <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"/>
    <!-- The Lumière Spark (Suspended in the optical counter with breathing room) -->
    <polygon points="148,80 178,110 148,140 118,110"/>
  </g>
</svg>'''

# ----------------------------------------------------------------------
# 2. Combined 5-Concept Overview Sheet SVG
# ----------------------------------------------------------------------
def make_overview_board():
    """
    Renders an editorial luxury presentation board showing all 5 concepts
    with clear cards, category tags, visual descriptions, and true small sizes.
    Canvas: 1600 x 900.
    """
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" role="img">
  <rect width="1600" height="900" fill="#FDFBF7"/>

  <!-- Header -->
  <text x="80" y="70" font-family="'Georgia', serif" font-size="28" font-weight="bold" letter-spacing="4" fill="#0D0D0D">LUMIÈRE — IDENTITY EXPLORATION</text>
  <text x="80" y="98" font-family="'Inter', -apple-system, sans-serif" font-size="13" letter-spacing="3" text-transform="uppercase" fill="#71717A">5 Fundamentally Distinct Creative Directions · Atelier India</text>
  <line x1="80" y1="120" x2="1520" y2="120" stroke="#E7DFD3" stroke-width="1.5"/>

  <!-- Card 1: Abstract Geometric -->
  <g transform="translate(80, 150)">
    <rect width="268" height="680" rx="4" fill="#FFFFFF" stroke="#E7DFD3" stroke-width="1"/>
    <!-- Mark Container -->
    <rect x="24" y="24" width="220" height="220" rx="2" fill="#F6F2EA"/>
    <g transform="translate(42, 42) scale(0.718)">
      <path d="M 128 32 L 204 108 L 176 136 L 128 88 L 80 136 L 52 108 Z" fill="#0D0D0D"/>
      <path d="M 128 224 L 52 148 L 80 120 L 128 168 L 176 120 L 204 148 Z" fill="#0D0D0D"/>
      <polygon points="128,106 150,128 128,150 106,128" fill="#0D0D0D"/>
    </g>
    <!-- Card Info -->
    <text x="24" y="280" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" letter-spacing="2" fill="#A67C33">DIRECTION 1</text>
    <text x="24" y="306" font-family="'Georgia', serif" font-size="18" font-weight="bold" fill="#0D0D0D">The Prismatic Weave</text>
    <text x="24" y="328" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#71717A">Abstract Geometric Identity</text>
    <text x="24" y="360" font-family="'Inter', sans-serif" font-size="11.5" fill="#3F3F46">
      <tspan x="24" dy="0">Two interlocking chevrons</tspan>
      <tspan x="24" dy="18">representing Warp (Tana) &amp;</tspan>
      <tspan x="24" dy="18">Weft (Bana), framing a</tspan>
      <tspan x="24" dy="18">floating diamond prism of light.</tspan>
    </text>
    <!-- Scale Test -->
    <line x1="24" y1="520" x2="244" y2="520" stroke="#E7DFD3" stroke-width="1"/>
    <text x="24" y="546" font-family="'Inter', sans-serif" font-size="10" letter-spacing="1" fill="#71717A">SCALE TEST (32px / 16px)</text>
    <g transform="translate(24, 560)">
      <g transform="scale(0.125)">
        <path d="M 128 32 L 204 108 L 176 136 L 128 88 L 80 136 L 52 108 Z" fill="#0D0D0D"/>
        <path d="M 128 224 L 52 148 L 80 120 L 128 168 L 176 120 L 204 148 Z" fill="#0D0D0D"/>
        <polygon points="128,106 150,128 128,150 106,128" fill="#0D0D0D"/>
      </g>
      <g transform="translate(60, 8) scale(0.0625)">
        <path d="M 128 32 L 204 108 L 176 136 L 128 88 L 80 136 L 52 108 Z" fill="#0D0D0D"/>
        <path d="M 128 224 L 52 148 L 80 120 L 128 168 L 176 120 L 204 148 Z" fill="#0D0D0D"/>
        <polygon points="128,106 150,128 128,150 106,128" fill="#0D0D0D"/>
      </g>
    </g>
  </g>

  <!-- Card 2: Minimalist Symbolic -->
  <g transform="translate(372, 150)">
    <rect width="268" height="680" rx="4" fill="#FFFFFF" stroke="#E7DFD3" stroke-width="1"/>
    <rect x="24" y="24" width="220" height="220" rx="2" fill="#F6F2EA"/>
    <g transform="translate(42, 42) scale(0.718)">
      <path d="M 120 36 A 92 92 0 0 0 120 220 L 120 156 L 96 128 L 120 100 Z" fill="#0D0D0D"/>
      <path d="M 136 36 L 136 100 L 160 128 L 136 156 L 136 220 A 92 92 0 0 0 136 36 Z" fill="#0D0D0D"/>
      <polygon points="128,116 140,128 128,140 116,128" fill="#0D0D0D"/>
    </g>
    <text x="24" y="280" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" letter-spacing="2" fill="#A67C33">DIRECTION 2</text>
    <text x="24" y="306" font-family="'Georgia', serif" font-size="18" font-weight="bold" fill="#0D0D0D">The Solar Loom</text>
    <text x="24" y="328" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#71717A">Minimalist Symbolic Identity</text>
    <text x="24" y="360" font-family="'Inter', sans-serif" font-size="11.5" fill="#3F3F46">
      <tspan x="24" dy="0">A celestial disc (sun / spool)</tspan>
      <tspan x="24" dy="18">bisected by a vertical ray of</tspan>
      <tspan x="24" dy="18">light that opens into an eye</tspan>
      <tspan x="24" dy="18">aperture. Pure quiet luxury.</tspan>
    </text>
    <line x1="24" y1="520" x2="244" y2="520" stroke="#E7DFD3" stroke-width="1"/>
    <text x="24" y="546" font-family="'Inter', sans-serif" font-size="10" letter-spacing="1" fill="#71717A">SCALE TEST (32px / 16px)</text>
    <g transform="translate(24, 560)">
      <g transform="scale(0.125)">
        <path d="M 120 36 A 92 92 0 0 0 120 220 L 120 156 L 96 128 L 120 100 Z" fill="#0D0D0D"/>
        <path d="M 136 36 L 136 100 L 160 128 L 136 156 L 136 220 A 92 92 0 0 0 136 36 Z" fill="#0D0D0D"/>
        <polygon points="128,116 140,128 128,140 116,128" fill="#0D0D0D"/>
      </g>
      <g transform="translate(60, 8) scale(0.0625)">
        <path d="M 120 36 A 92 92 0 0 0 120 220 L 120 156 L 96 128 L 120 100 Z" fill="#0D0D0D"/>
        <path d="M 136 36 L 136 100 L 160 128 L 136 156 L 136 220 A 92 92 0 0 0 136 36 Z" fill="#0D0D0D"/>
        <polygon points="128,116 140,128 128,140 116,128" fill="#0D0D0D"/>
      </g>
    </g>
  </g>

  <!-- Card 3: Custom Typography -->
  <g transform="translate(664, 150)">
    <rect width="268" height="680" rx="4" fill="#FFFFFF" stroke="#E7DFD3" stroke-width="1"/>
    <rect x="24" y="24" width="220" height="220" rx="2" fill="#F6F2EA"/>
    <g transform="translate(26, 85) scale(0.264)">
      <!-- L -->
      <path d="M 70 60 L 80 60 L 80 134 L 114 134 L 114 140 L 70 140 Z" fill="#0D0D0D"/>
      <!-- U -->
      <path d="M 144 60 L 154 60 L 154 116 C 154 134, 164 141, 172 141 C 180 141, 190 134, 190 116 L 190 60 L 198 60 L 198 116 C 198 140, 184 147, 172 147 C 160 147, 144 140, 144 116 Z" fill="#0D0D0D"/>
      <!-- M -->
      <path d="M 230 60 L 241 60 L 266 122 L 291 60 L 302 60 L 302 140 L 292 140 L 292 88 L 270 136 L 262 136 L 240 88 L 240 140 L 230 140 Z" fill="#0D0D0D"/>
      <!-- I -->
      <path d="M 332 60 L 342 60 L 342 140 L 332 140 Z" fill="#0D0D0D"/>
      <!-- E Accent -->
      <path d="M 372 60 L 420 60 L 420 66 L 382 66 L 382 97 L 414 97 L 414 103 L 382 103 L 382 134 L 422 134 L 422 140 L 372 140 Z M 386 44 L 396 34 L 410 48 L 400 58 Z" fill="#0D0D0D"/>
      <!-- R -->
      <path fill-rule="evenodd" d="M 452 60 L 490 60 C 504 60, 508 70, 508 83 C 508 94, 500 102, 486 104 L 508 140 L 496 140 L 476 106 L 462 106 L 462 140 L 452 140 Z M 462 66 L 488 66 C 496 66, 498 72, 498 83 C 498 94, 496 100, 488 100 L 462 100 Z" fill="#0D0D0D"/>
      <!-- E -->
      <path d="M 538 60 L 586 60 L 586 66 L 548 66 L 548 97 L 580 97 L 580 103 L 548 103 L 548 134 L 588 134 L 588 140 L 538 140 Z" fill="#0D0D0D"/>
      <!-- Subtitle -->
      <text x="329" y="172" font-family="'Inter', sans-serif" font-size="11" letter-spacing="4" fill="#71717A">ATELIER • INDIA</text>
    </g>
    <text x="24" y="280" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" letter-spacing="2" fill="#A67C33">DIRECTION 3</text>
    <text x="24" y="306" font-family="'Georgia', serif" font-size="18" font-weight="bold" fill="#0D0D0D">LUMIÈRE Didone</text>
    <text x="24" y="328" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#71717A">Custom Typography / Wordmark</text>
    <text x="24" y="360" font-family="'Inter', sans-serif" font-size="11.5" fill="#3F3F46">
      <tspan x="24" dy="0">The name IS the identity.</tspan>
      <tspan x="24" dy="18">Bespoke haute-couture Didone</tspan>
      <tspan x="24" dy="18">capitals with signature 45°</tspan>
      <tspan x="24" dy="18">diamond-shard accent on È.</tspan>
    </text>
    <line x1="24" y1="520" x2="244" y2="520" stroke="#E7DFD3" stroke-width="1"/>
    <text x="24" y="546" font-family="'Inter', sans-serif" font-size="10" letter-spacing="1" fill="#71717A">ICON COMPANION (Accented È)</text>
    <g transform="translate(24, 560)">
      <g transform="scale(0.18)">
        <path d="M 20 20 L 70 20 L 70 26 L 30 26 L 30 45 L 60 45 L 60 51 L 30 51 L 30 70 L 70 70 L 70 76 L 20 76 Z M 32 8 L 40 0 L 52 12 L 44 20 Z" fill="#0D0D0D"/>
      </g>
    </g>
  </g>

  <!-- Card 4: Negative Space -->
  <g transform="translate(956, 150)">
    <rect width="268" height="680" rx="4" fill="#FFFFFF" stroke="#E7DFD3" stroke-width="1"/>
    <rect x="24" y="24" width="220" height="220" rx="2" fill="#F6F2EA"/>
    <g transform="translate(42, 42) scale(0.718)">
      <path d="M 40 40 L 92 40 L 92 184 L 216 184 L 216 216 L 40 216 Z" fill="#0D0D0D"/>
      <path d="M 124 40 L 216 40 L 216 152 L 124 152 Z" fill="#0D0D0D"/>
      <polygon points="124,136 140,152 124,168 108,152" fill="#0D0D0D"/>
    </g>
    <text x="24" y="280" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" letter-spacing="2" fill="#A67C33">DIRECTION 4</text>
    <text x="24" y="306" font-family="'Georgia', serif" font-size="18" font-weight="bold" fill="#0D0D0D">The L of Light</text>
    <text x="24" y="328" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#71717A">Clever Negative Space</text>
    <text x="24" y="360" font-family="'Inter', sans-serif" font-size="11.5" fill="#3F3F46">
      <tspan x="24" dy="0">The letter L is not drawn in ink;</tspan>
      <tspan x="24" dy="18">it emerges as pure white light</tspan>
      <tspan x="24" dy="18">carved between two monolithic</tspan>
      <tspan x="24" dy="18">architectural shadow blocks.</tspan>
    </text>
    <line x1="24" y1="520" x2="244" y2="520" stroke="#E7DFD3" stroke-width="1"/>
    <text x="24" y="546" font-family="'Inter', sans-serif" font-size="10" letter-spacing="1" fill="#71717A">SCALE TEST (32px / 16px)</text>
    <g transform="translate(24, 560)">
      <g transform="scale(0.125)">
        <path d="M 40 40 L 92 40 L 92 184 L 216 184 L 216 216 L 40 216 Z" fill="#0D0D0D"/>
        <path d="M 124 40 L 216 40 L 216 152 L 124 152 Z" fill="#0D0D0D"/>
        <polygon points="124,136 140,152 124,168 108,152" fill="#0D0D0D"/>
      </g>
      <g transform="translate(60, 8) scale(0.0625)">
        <path d="M 40 40 L 92 40 L 92 184 L 216 184 L 216 216 L 40 216 Z" fill="#0D0D0D"/>
        <path d="M 124 40 L 216 40 L 216 152 L 124 152 Z" fill="#0D0D0D"/>
        <polygon points="124,136 140,152 124,168 108,152" fill="#0D0D0D"/>
      </g>
    </g>
  </g>

  <!-- Card 5: Unique Monogram -->
  <g transform="translate(1248, 150)">
    <rect width="268" height="680" rx="4" fill="#FFFFFF" stroke="#E7DFD3" stroke-width="1"/>
    <rect x="24" y="24" width="220" height="220" rx="2" fill="#F6F2EA"/>
    <g transform="translate(42, 42) scale(0.718)">
      <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z" fill="#0D0D0D"/>
      <polygon points="148,80 178,110 148,140 118,110" fill="#0D0D0D"/>
    </g>
    <text x="24" y="280" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" letter-spacing="2" fill="#A67C33">DIRECTION 5</text>
    <text x="24" y="306" font-family="'Georgia', serif" font-size="18" font-weight="bold" fill="#0D0D0D">The Sovereign L</text>
    <text x="24" y="328" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#71717A">Haute-Couture Monogram</text>
    <text x="24" y="360" font-family="'Inter', sans-serif" font-size="11.5" fill="#3F3F46">
      <tspan x="24" dy="0">Monumental Roman serif 'L'</tspan>
      <tspan x="24" dy="18">holding an architectural light</tspan>
      <tspan x="24" dy="18">diamond in its counter. Engineered</tspan>
      <tspan x="24" dy="18">for cast metal bag hardware.</tspan>
    </text>
    <line x1="24" y1="520" x2="244" y2="520" stroke="#E7DFD3" stroke-width="1"/>
    <text x="24" y="546" font-family="'Inter', sans-serif" font-size="10" letter-spacing="1" fill="#71717A">SCALE TEST (32px / 16px)</text>
    <g transform="translate(24, 560)">
      <g transform="scale(0.125)">
        <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z" fill="#0D0D0D"/>
        <polygon points="148,80 178,110 148,140 118,110" fill="#0D0D0D"/>
      </g>
      <g transform="translate(60, 8) scale(0.0625)">
        <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z" fill="#0D0D0D"/>
        <polygon points="148,80 178,110 148,140 118,110" fill="#0D0D0D"/>
      </g>
    </g>
  </g>
</svg>'''

# Write individual files
files = [
    ("concept-1-prismatic-weave.svg", svg_c1()),
    ("concept-2-solar-loom.svg", svg_c2()),
    ("concept-3-couture-wordmark.svg", svg_c3()),
    ("concept-4-l-of-light.svg", svg_c4()),
    ("concept-5-sovereign-insignia.svg", svg_c5()),
    ("overview_5_concepts.svg", make_overview_board()),
]

for name, content in files:
    path = os.path.join(DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {name}")

print("Overview board and 5 concepts written.")
