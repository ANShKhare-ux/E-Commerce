#!/usr/bin/env python3
"""Build production-grade SVG files for LUMIÈRE concepts A, B, and C."""
import math
import os
import subprocess

# ----------------------------------------------------------------------
# 1. Wordmark Vector Path Generator
# ----------------------------------------------------------------------
def get_lumiere_paths(x_start=290, baseline=142, cap_h=54):
    """
    Constructs high-fashion Didone / Architectural Roman capital letters
    for 'L U M I E R E' with custom French grave accent on first E.
    Letters are pure geometric vector paths:
    Thick vertical stems = 8px, horizontal bars = 3.5px, serifs = 2.5px.
    """
    top = baseline - cap_h
    bot = baseline
    h = cap_h
    
    # We will define each letter relative to an (x, y) offset and return
    # the SVG path string and the next x position with generous luxury tracking.
    paths = []
    x = x_start
    tracking = 26  # wide letter-spacing typical of luxury couture houses

    # --- LETTER 'L' ---
    # Width = 34
    d_L = (
        f"M {x} {top} "
        f"L {x+8} {top} "
        f"L {x+8} {bot-5} "
        f"L {x+34} {bot-5} "
        f"L {x+34} {bot} "
        f"L {x} {bot} Z"
    )
    paths.append(d_L)
    x += 34 + tracking

    # --- LETTER 'U' ---
    # Width = 38
    # Left stem (thick 8), right stem (thin 4), bottom curve
    r_outer = 19
    r_inner = 13
    d_U = (
        f"M {x} {top} "
        f"L {x+8} {top} "
        f"L {x+8} {bot-18} "
        f"A 11 11 0 0 0 {x+30} {bot-18} "
        f"L {x+30} {top} "
        f"L {x+36} {top} "
        f"L {x+36} {bot-18} "
        f"A 18 18 0 0 1 {x} {bot-18} Z"
    )
    paths.append(d_U)
    x += 38 + tracking

    # --- LETTER 'M' ---
    # Width = 46
    # Left stem, diagonals meeting at baseline, right stem
    d_M = (
        f"M {x} {top} "
        f"L {x+7} {top} "
        f"L {x+23} {bot-12} "
        f"L {x+39} {top} "
        f"L {x+46} {top} "
        f"L {x+46} {bot} "
        f"L {x+39} {bot} "
        f"L {x+39} {top+18} "
        f"L {x+25} {bot} "
        f"L {x+21} {bot} "
        f"L {x+7} {top+18} "
        f"L {x+7} {bot} "
        f"L {x} {bot} Z"
    )
    paths.append(d_M)
    x += 46 + tracking

    # --- LETTER 'I' ---
    # Width = 8
    d_I = (
        f"M {x} {top} "
        f"L {x+8} {top} "
        f"L {x+8} {bot} "
        f"L {x} {bot} Z"
    )
    paths.append(d_I)
    x += 8 + tracking

    # --- LETTER 'È' ---
    # Width = 34
    # Accent sits poised at 45° angle: from x+14, top-14 to x+22, top-4
    d_E1 = (
        f"M {x} {top} "
        f"L {x+34} {top} "
        f"L {x+34} {top+5} "
        f"L {x+8} {top+5} "
        f"L {x+8} {top+23} "
        f"L {x+28} {top+23} "
        f"L {x+28} {top+28} "
        f"L {x+8} {top+28} "
        f"L {x+8} {bot-5} "
        f"L {x+34} {bot-5} "
        f"L {x+34} {bot} "
        f"L {x} {bot} Z "
        # Grave Accent (45° angle)
        f"M {x+12} {top-13} "
        f"L {x+16} {top-16} "
        f"L {x+25} {top-5} "
        f"L {x+21} {top-2} Z"
    )
    paths.append(d_E1)
    x += 34 + tracking

    # --- LETTER 'R' ---
    # Width = 38
    # Stem, round upper bowl (bezier/arc), angled leg
    d_R = (
        f"M {x} {top} "
        f"L {x+24} {top} "
        f"A 14 14 0 0 1 {x+24} {top+28} "
        f"L {x+22} {top+28} "
        f"L {x+37} {bot} "
        f"L {x+29} {bot} "
        f"L {x+16} {top+30} "
        f"L {x+8} {top+30} "
        f"L {x+8} {bot} "
        f"L {x} {bot} Z "
        # Bowl cutout
        f"M {x+8} {top+5} "
        f"L {x+23} {top+5} "
        f"A 9 9 0 0 1 {x+23} {top+23} "
        f"L {x+8} {top+23} Z"
    )
    paths.append(d_R)
    x += 38 + tracking

    # --- LETTER 'E' ---
    # Width = 34
    d_E2 = (
        f"M {x} {top} "
        f"L {x+34} {top} "
        f"L {x+34} {top+5} "
        f"L {x+8} {top+5} "
        f"L {x+8} {top+23} "
        f"L {x+28} {top+23} "
        f"L {x+28} {top+28} "
        f"L {x+8} {top+28} "
        f"L {x+8} {bot-5} "
        f"L {x+34} {bot-5} "
        f"L {x+34} {bot} "
        f"L {x} {bot} Z"
    )
    paths.append(d_E2)
    x += 34

    return " ".join(paths), x - x_start


def get_subtitle_paths(x_center=580, y_baseline=176, h=11):
    """
    Generates clean geometric outlined sans paths for 'ATELIER • INDIA'.
    Letters are built as simple outlined shapes.
    """
    top = y_baseline - h
    bot = y_baseline
    mid = top + h * 0.5
    
    # We will construct a clean, ultra-refined subline:
    # A T E L I E R   •   I N D I A
    # Total width is approx 380px centered at x_center.
    # Let's write the letters cleanly:
    text_items = [
        # (type, width, letter_func)
    ]
    # For subline, let's generate outlined glyphs:
    glyphs = []
    
    # helper to place glyphs
    x = x_center - 190
    stk = 1.8  # stroke width equivalent
    gap = 14
    
    # --- A ---
    glyphs.append(f"M {x} {bot} L {x+4} {top} L {x+7} {top} L {x+11} {bot} L {x+9} {bot} L {x+8} {bot-3} L {x+3} {bot-3} L {x+2} {bot} Z M {x+3.5} {bot-5} L {x+7.5} {bot-5} L {x+5.5} {top+3} Z")
    x += 11 + gap

    # --- T ---
    glyphs.append(f"M {x} {top} L {x+10} {top} L {x+10} {top+2} L {x+6} {top+2} L {x+6} {bot} L {x+4} {bot} L {x+4} {top+2} L {x} {top+2} Z")
    x += 10 + gap

    # --- E ---
    glyphs.append(f"M {x} {top} L {x+9} {top} L {x+9} {top+2} L {x+2} {top+2} L {x+2} {mid-1} L {x+7} {mid-1} L {x+7} {mid+1} L {x+2} {mid+1} L {x+2} {bot-2} L {x+9} {bot-2} L {x+9} {bot} L {x} {bot} Z")
    x += 9 + gap

    # --- L ---
    glyphs.append(f"M {x} {top} L {x+2} {top} L {x+2} {bot-2} L {x+9} {bot-2} L {x+9} {bot} L {x} {bot} Z")
    x += 9 + gap

    # --- I ---
    glyphs.append(f"M {x} {top} L {x+2} {top} L {x+2} {bot} L {x} {bot} Z")
    x += 2 + gap

    # --- E ---
    glyphs.append(f"M {x} {top} L {x+9} {top} L {x+9} {top+2} L {x+2} {top+2} L {x+2} {mid-1} L {x+7} {mid-1} L {x+7} {mid+1} L {x+2} {mid+1} L {x+2} {bot-2} L {x+9} {bot-2} L {x+9} {bot} L {x} {bot} Z")
    x += 9 + gap

    # --- R ---
    glyphs.append(f"M {x} {top} L {x+7} {top} A 3.5 3.5 0 0 1 {x+7} {top+7} L {x+5} {top+7} L {x+10} {bot} L {x+8} {bot} L {x+4} {top+7} L {x+2} {top+7} L {x+2} {bot} L {x} {bot} Z M {x+2} {top+2} L {x+6.5} {top+2} A 1.5 1.5 0 0 1 {x+6.5} {top+5} L {x+2} {top+5} Z")
    x += 10 + gap + 10

    # --- • (Jewel Dot) ---
    glyphs.append(f"M {x+2} {mid-2} L {x+4} {mid} L {x+2} {mid+2} L {x} {mid} Z")
    x += 4 + gap + 10

    # --- I ---
    glyphs.append(f"M {x} {top} L {x+2} {top} L {x+2} {bot} L {x} {bot} Z")
    x += 2 + gap

    # --- N ---
    glyphs.append(f"M {x} {top} L {x+2} {top} L {x+8} {bot-3} L {x+8} {top} L {x+10} {top} L {x+10} {bot} L {x+8} {bot} L {x+2} {top+3} L {x+2} {bot} L {x} {bot} Z")
    x += 10 + gap

    # --- D ---
    glyphs.append(f"M {x} {top} L {x+6} {top} A 5.5 5.5 0 0 1 {x+6} {bot} L {x} {bot} Z M {x+2} {top+2} L {x+5.5} {top+2} A 3.5 3.5 0 0 1 {x+5.5} {bot-2} L {x+2} {bot-2} Z")
    x += 11 + gap

    # --- I ---
    glyphs.append(f"M {x} {top} L {x+2} {top} L {x+2} {bot} L {x} {bot} Z")
    x += 2 + gap

    # --- A ---
    glyphs.append(f"M {x} {bot} L {x+4} {top} L {x+7} {top} L {x+11} {bot} L {x+9} {bot} L {x+8} {bot-3} L {x+3} {bot-3} L {x+2} {bot} Z M {x+3.5} {bot-5} L {x+7.5} {bot-5} L {x+5.5} {top+3} Z")
    x += 11

    return " ".join(glyphs)

print("Wordmark generator ready")
