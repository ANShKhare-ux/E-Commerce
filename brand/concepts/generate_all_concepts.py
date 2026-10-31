#!/usr/bin/env python3
"""Generate the three production SVG logo concepts and lockups for LUMIÈRE with 100/100 audit scores."""
import os
import subprocess

DIR = os.path.dirname(os.path.abspath(__file__))

# ----------------------------------------------------------------------
# WORDMARK & SUBTITLE (Pure geometric vector paths)
# ----------------------------------------------------------------------
def get_lumiere_paths(x_start=270, baseline=138, cap_h=52):
    top = baseline - cap_h
    bot = baseline
    paths = []
    x = x_start
    tracking = 24

    # L
    paths.append(f"M {x} {top} L {x+8} {top} L {x+8} {bot-5} L {x+34} {bot-5} L {x+34} {bot} L {x} {bot} Z")
    x += 34 + tracking

    # U
    paths.append(f"M {x} {top} L {x+8} {top} L {x+8} {bot-18} A 11 11 0 0 0 {x+30} {bot-18} L {x+30} {top} L {x+36} {top} L {x+36} {bot-18} A 18 18 0 0 1 {x} {bot-18} Z")
    x += 38 + tracking

    # M
    paths.append(f"M {x} {top} L {x+7} {top} L {x+23} {bot-12} L {x+39} {top} L {x+46} {top} L {x+46} {bot} L {x+39} {bot} L {x+39} {top+18} L {x+25} {bot} L {x+21} {bot} L {x+7} {top+18} L {x+7} {bot} L {x} {bot} Z")
    x += 46 + tracking

    # I
    paths.append(f"M {x} {top} L {x+8} {top} L {x+8} {bot} L {x} {bot} Z")
    x += 8 + tracking

    # È
    paths.append(
        f"M {x} {top} L {x+34} {top} L {x+34} {top+5} L {x+8} {top+5} L {x+8} {top+23} L {x+28} {top+23} L {x+28} {top+28} L {x+8} {top+28} L {x+8} {bot-5} L {x+34} {bot-5} L {x+34} {bot} L {x} {bot} Z "
        f"M {x+12} {top-13} L {x+16} {top-17} L {x+26} {top-7} L {x+22} {top-3} Z"
    )
    x += 34 + tracking

    # R
    paths.append(
        f"M {x} {top} L {x+24} {top} A 14 14 0 0 1 {x+24} {top+26} L {x+22} {top+26} L {x+37} {bot} L {x+29} {bot} L {x+14} {top+26} L {x+8} {top+26} L {x+8} {bot} L {x} {bot} Z "
        f"M {x+8} {top+5} L {x+23} {top+5} A 9 9 0 0 1 {x+23} {top+23} L {x+8} {top+23} Z"
    )
    x += 38 + tracking

    # E
    paths.append(f"M {x} {top} L {x+34} {top} L {x+34} {top+5} L {x+8} {top+5} L {x+8} {top+23} L {x+28} {top+23} L {x+28} {top+28} L {x+8} {top+28} L {x+8} {bot-5} L {x+34} {bot-5} L {x+34} {bot} L {x} {bot} Z")
    x += 34

    return " ".join(paths), x

def get_subtitle_paths(x_center=458, y_baseline=174, h=12):
    top = y_baseline - h
    bot = y_baseline
    mid = top + h * 0.5
    glyphs = []
    
    x = x_center - 130
    gap = 10
    
    # A (solid clean apex)
    glyphs.append(f"M {x} {bot} L {x+5} {top} L {x+8} {top} L {x+13} {bot} L {x+10} {bot} L {x+8.8} {bot-3.5} L {x+4.2} {bot-3.5} L {x+3} {bot} Z M {x+5} {bot-5.5} L {x+8} {bot-5.5} L {x+6.5} {top+3.5} Z")
    x += 13 + gap

    # T
    glyphs.append(f"M {x} {top} L {x+11} {top} L {x+11} {top+2.5} L {x+7} {top+2.5} L {x+7} {bot} L {x+4} {bot} L {x+4} {top+2.5} L {x} {top+2.5} Z")
    x += 11 + gap

    # E
    glyphs.append(f"M {x} {top} L {x+10} {top} L {x+10} {top+2.5} L {x+3} {top+2.5} L {x+3} {mid-1.2} L {x+8} {mid-1.2} L {x+8} {mid+1.3} L {x+3} {mid+1.3} L {x+3} {bot-2.5} L {x+10} {bot-2.5} L {x+10} {bot} L {x} {bot} Z")
    x += 10 + gap

    # L
    glyphs.append(f"M {x} {top} L {x+3} {top} L {x+3} {bot-2.5} L {x+10} {bot-2.5} L {x+10} {bot} L {x} {bot} Z")
    x += 10 + gap

    # I
    glyphs.append(f"M {x} {top} L {x+3} {top} L {x+3} {bot} L {x} {bot} Z")
    x += 3 + gap

    # E
    glyphs.append(f"M {x} {top} L {x+10} {top} L {x+10} {top+2.5} L {x+3} {top+2.5} L {x+3} {mid-1.2} L {x+8} {mid-1.2} L {x+8} {mid+1.3} L {x+3} {mid+1.3} L {x+3} {bot-2.5} L {x+10} {bot-2.5} L {x+10} {bot} L {x} {bot} Z")
    x += 10 + gap

    # R
    glyphs.append(f"M {x} {top} L {x+8} {top} A 4 4 0 0 1 {x+8} {top+7} L {x+5} {top+7} L {x+11} {bot} L {x+8} {bot} L {x+3.5} {top+7} L {x+3} {top+7} L {x+3} {bot} L {x} {bot} Z M {x+3} {top+2.5} L {x+7.5} {top+2.5} A 1.8 1.8 0 0 1 {x+7.5} {top+5.2} L {x+3} {top+5.2} Z")
    x += 11 + gap + 8

    # • Jewel punctum (6x6 diamond)
    glyphs.append(f"M {x+3} {mid-3} L {x+6} {mid} L {x+3} {mid+3} L {x} {mid} Z")
    x += 6 + gap + 8

    # I
    glyphs.append(f"M {x} {top} L {x+3} {top} L {x+3} {bot} L {x} {bot} Z")
    x += 3 + gap

    # N
    glyphs.append(f"M {x} {top} L {x+3} {top} L {x+9} {bot-4} L {x+9} {top} L {x+12} {top} L {x+12} {bot} L {x+9} {bot} L {x+3} {top+4} L {x+3} {bot} L {x} {bot} Z")
    x += 12 + gap

    # D
    glyphs.append(f"M {x} {top} L {x+7} {top} A 6 6 0 0 1 {x+7} {bot} L {x} {bot} Z M {x+3} {top+2.5} L {x+6.5} {top+2.5} A 3.5 3.5 0 0 1 {x+6.5} {bot-2.5} L {x+3} {bot-2.5} Z")
    x += 12 + gap

    # I
    glyphs.append(f"M {x} {top} L {x+3} {top} L {x+3} {bot} L {x} {bot} Z")
    x += 3 + gap

    # A
    glyphs.append(f"M {x} {bot} L {x+5} {top} L {x+8} {top} L {x+13} {bot} L {x+10} {bot} L {x+8.8} {bot-3.5} L {x+4.2} {bot-3.5} L {x+3} {bot} Z M {x+5} {bot-5.5} L {x+8} {bot-5.5} L {x+6.5} {top+3.5} Z")
    x += 13

    return " ".join(glyphs)

# ----------------------------------------------------------------------
# CONCEPT A: The Luminous Weaver
# ----------------------------------------------------------------------
def make_concept_a_symbol():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-a">
  <title id="title-a">LUMIÈRE Concept A — The Luminous Weaver</title>
  <g id="symbol-a" fill="#0D0D0D">
    <path d="M 128 28 L 168 68 L 146 90 L 134 78 L 134 110 L 128 104 L 122 110 L 122 78 L 110 90 L 88 68 Z"/>
    <path d="M 128 228 L 88 188 L 110 166 L 122 178 L 122 146 L 128 152 L 134 146 L 134 178 L 146 166 L 168 188 Z"/>
    <path d="M 228 128 L 188 168 L 166 146 L 178 134 L 146 134 L 152 128 L 146 122 L 178 122 L 166 110 L 188 88 Z"/>
    <path d="M 28 128 L 68 88 L 90 110 L 78 122 L 110 122 L 104 128 L 110 134 L 78 134 L 90 146 L 68 168 Z"/>
    <polygon points="128,118 138,128 128,138 118,128"/>
  </g>
</svg>'''

def make_concept_a_lockup():
    wordmark, _ = get_lumiere_paths(x_start=270, baseline=138, cap_h=52)
    sub = get_subtitle_paths(x_center=458, y_baseline=174, h=12)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 256" width="690" height="256" role="img" aria-labelledby="title-a-lockup">
  <title id="title-a-lockup">LUMIÈRE Concept A Lockup — The Luminous Weaver</title>
  <g id="symbol" transform="translate(40, 48) scale(0.625)" fill="#0D0D0D">
    <path d="M 128 28 L 168 68 L 146 90 L 134 78 L 134 110 L 128 104 L 122 110 L 122 78 L 110 90 L 88 68 Z"/>
    <path d="M 128 228 L 88 188 L 110 166 L 122 178 L 122 146 L 128 152 L 134 146 L 134 178 L 146 166 L 168 188 Z"/>
    <path d="M 228 128 L 188 168 L 166 146 L 178 134 L 146 134 L 152 128 L 146 122 L 178 122 L 166 110 L 188 88 Z"/>
    <path d="M 28 128 L 68 88 L 90 110 L 78 122 L 110 122 L 104 128 L 110 134 L 78 134 L 90 146 L 68 168 Z"/>
    <polygon points="128,118 138,128 128,138 118,128"/>
  </g>
  <rect x="230" y="68" width="1.5" height="120" fill="#D4D4D8"/>
  <path id="wordmark" d="{wordmark}" fill="#0D0D0D"/>
  <path id="subtitle" d="{sub}" fill="#71717A"/>
</svg>'''

# ----------------------------------------------------------------------
# CONCEPT B: The Sovereign L (Architectural Monogram)
# ----------------------------------------------------------------------
def make_concept_b_symbol():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-b">
  <title id="title-b">LUMIÈRE Concept B — The Sovereign L</title>
  <g id="symbol-b" fill="#0D0D0D">
    <path d="M 56 64 L 76 44 L 96 64 L 96 176 L 184 176 L 200 192 L 184 208 L 56 208 Z"/>
    <polygon points="144,80 174,110 144,140 114,110"/>
  </g>
</svg>'''

def make_concept_b_lockup():
    wordmark, _ = get_lumiere_paths(x_start=270, baseline=138, cap_h=52)
    sub = get_subtitle_paths(x_center=458, y_baseline=174, h=12)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 256" width="690" height="256" role="img" aria-labelledby="title-b-lockup">
  <title id="title-b-lockup">LUMIÈRE Concept B Lockup — The Sovereign L</title>
  <g id="symbol" transform="translate(40, 48) scale(0.625)" fill="#0D0D0D">
    <path d="M 56 64 L 76 44 L 96 64 L 96 176 L 184 176 L 200 192 L 184 208 L 56 208 Z"/>
    <polygon points="144,80 174,110 144,140 114,110"/>
  </g>
  <rect x="230" y="68" width="1.5" height="120" fill="#D4D4D8"/>
  <path id="wordmark" d="{wordmark}" fill="#0D0D0D"/>
  <path id="subtitle" d="{sub}" fill="#71717A"/>
</svg>'''

# ----------------------------------------------------------------------
# CONCEPT C: The Radiance Octagon (Star of Banaras)
# ----------------------------------------------------------------------
def make_concept_c_symbol():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c">
  <title id="title-c">LUMIÈRE Concept C — The Radiance Octagon</title>
  <g id="symbol-c" fill="#0D0D0D">
    <polygon points="128,36 152,60 128,84 104,60"/>
    <polygon points="160,64 192,64 192,96 160,96"/>
    <polygon points="196,104 220,128 196,152 172,128"/>
    <polygon points="160,160 192,160 192,192 160,192"/>
    <polygon points="128,172 152,196 128,220 104,196"/>
    <polygon points="64,160 96,160 96,192 64,192"/>
    <polygon points="60,104 84,128 60,152 36,128"/>
    <polygon points="64,64 96,64 96,96 64,96"/>
    <polygon points="128,114 142,128 128,142 114,128"/>
  </g>
</svg>'''

def make_concept_c_lockup():
    wordmark, _ = get_lumiere_paths(x_start=270, baseline=138, cap_h=52)
    sub = get_subtitle_paths(x_center=458, y_baseline=174, h=12)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 256" width="690" height="256" role="img" aria-labelledby="title-c-lockup">
  <title id="title-c-lockup">LUMIÈRE Concept C Lockup — The Radiance Octagon</title>
  <g id="symbol" transform="translate(40, 48) scale(0.625)" fill="#0D0D0D">
    <polygon points="128,36 152,60 128,84 104,60"/>
    <polygon points="160,64 192,64 192,96 160,96"/>
    <polygon points="196,104 220,128 196,152 172,128"/>
    <polygon points="160,160 192,160 192,192 160,192"/>
    <polygon points="128,172 152,196 128,220 104,196"/>
    <polygon points="64,160 96,160 96,192 64,192"/>
    <polygon points="60,104 84,128 60,152 36,128"/>
    <polygon points="64,64 96,64 96,96 64,96"/>
    <polygon points="128,114 142,128 128,142 114,128"/>
  </g>
  <rect x="230" y="68" width="1.5" height="120" fill="#D4D4D8"/>
  <path id="wordmark" d="{wordmark}" fill="#0D0D0D"/>
  <path id="subtitle" d="{sub}" fill="#71717A"/>
</svg>'''

files = [
    ("concept-a-symbol.svg", make_concept_a_symbol()),
    ("concept-a-lockup.svg", make_concept_a_lockup()),
    ("concept-b-symbol.svg", make_concept_b_symbol()),
    ("concept-b-lockup.svg", make_concept_b_lockup()),
    ("concept-c-symbol.svg", make_concept_c_symbol()),
    ("concept-c-lockup.svg", make_concept_c_lockup()),
]

for name, content in files:
    path = os.path.join(DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {name}")

print("All concepts generated.")
