#!/usr/bin/env python3
"""Build the final production-ready vector logo kit for LUMIÈRE with perfect alignment and geometry."""
import os
import subprocess

DIR = os.path.dirname(os.path.abspath(__file__))
MASTERS_DIR = os.path.join(DIR, "masters")
EXPORTS_DIR = os.path.join(DIR, "exports")
WEB_DIR = os.path.join(DIR, "web-icons")

# ----------------------------------------------------------------------
# 1. THE SOVEREIGN L MONOGRAM (Master & Small-Size Cut)
# ----------------------------------------------------------------------
def make_symbol_master():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="sym-title">
  <title id="sym-title">LUMIÈRE — The Sovereign L Monogram</title>
  <g id="sovereign-monogram" fill="#0D0D0D">
    <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"/>
    <polygon points="144,80 174,110 144,140 114,110"/>
  </g>
</svg>'''

def make_symbol_small():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="sym-sm-title">
  <title id="sym-sm-title">LUMIÈRE — The Sovereign L Monogram (Small-Size Cut)</title>
  <g id="sovereign-monogram-small" fill="#0D0D0D">
    <path d="M 56 44 L 120 44 L 120 58 L 102 58 L 102 168 L 188 168 L 188 154 L 202 154 L 202 196 L 56 196 L 56 182 L 78 182 L 78 58 L 56 58 Z"/>
    <polygon points="152,74 186,108 152,142 118,108"/>
  </g>
</svg>'''

# ----------------------------------------------------------------------
# 2. HAUTE-COUTURE WORDMARK MASTER
# ----------------------------------------------------------------------
def make_wordmark_master():
    # Width of letters: 70 to 588 (518px).
    # Setting viewBox to 660 x 200 centers the 518px wordmark with 70px left and 72px right margins!
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 200" width="660" height="200" role="img" aria-labelledby="wm-title">
  <title id="wm-title">LUMIÈRE — Haute-Couture Wordmark</title>
  <g id="wordmark" fill="#0D0D0D">
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
    <!-- R (with exact 60° leg: dx=15, dy=26 -> atan(26/15)=60.018°) -->
    <path fill-rule="evenodd" d="
      M 452 60 L 490 60 C 504 60, 508 70, 508 83 C 508 94, 500 102, 486 104 L 471 114 L 486 140 L 474 140 L 462 114 L 462 140 L 452 140 Z
      M 462 66 L 488 66 C 496 66, 498 72, 498 83 C 498 94, 496 100, 488 100 L 462 100 Z
    "/>
    <!-- E (x=538..588) -->
    <path d="M 538 60 L 586 60 L 586 66 L 548 66 L 548 97 L 580 97 L 580 103 L 548 103 L 548 134 L 588 134 L 588 140 L 538 140 Z"/>
  </g>
  <!-- Subtitle: ATELIER • INDIA (Centered at x=329) -->
  <g id="descriptor" fill="#71717A">
    <path d="M 210 172 L 214 160 L 217 160 L 221 172 L 219 172 L 218 169 L 213 169 L 212 172 Z M 214 167 L 217 167 L 215.5 162.5 Z"/>
    <path d="M 231 160 L 241 160 L 241 162 L 237 162 L 237 172 L 235 172 L 235 162 L 231 162 Z"/>
    <path d="M 251 160 L 260 160 L 260 162 L 253 162 L 253 165 L 258 165 L 258 167 L 253 167 L 253 170 L 260 170 L 260 172 L 251 172 Z"/>
    <path d="M 270 160 L 272 160 L 272 170 L 279 170 L 279 172 L 270 172 Z"/>
    <path d="M 289 160 L 291 160 L 291 172 L 289 172 Z"/>
    <path d="M 301 160 L 310 160 L 310 162 L 303 162 L 303 165 L 308 165 L 308 167 L 303 167 L 303 170 L 310 170 L 310 172 L 301 172 Z"/>
    <path fill-rule="evenodd" d="M 320 160 L 327 160 C 330 160, 331 161.5, 331 163.5 C 331 165, 330 166, 328 166.5 L 332 172 L 330 172 L 326.5 167 L 322 167 L 322 172 L 320 172 Z M 322 162 L 326.5 162 C 328 162, 329 162.5, 329 163.5 C 329 164.5, 328 165, 326.5 165 L 322 165 Z"/>
    <!-- Gold Punctum -->
    <polygon points="346,165 348.5,162.5 351,165 348.5,167.5" fill="#C59B48"/>
    <path d="M 365 160 L 367 160 L 367 172 L 365 172 Z"/>
    <path d="M 377 160 L 379 160 L 385 168.5 L 385 160 L 387 160 L 387 172 L 385 172 L 379 163.5 L 379 172 L 377 172 Z"/>
    <path fill-rule="evenodd" d="M 397 160 L 403 160 C 407 160, 409 162.5, 409 166 C 409 169.5, 407 172, 403 172 L 397 172 Z M 399 162 L 403 162 C 405.5 162, 407 163.5, 407 166 C 407 168.5, 405.5 170, 403 170 L 399 170 Z"/>
    <path d="M 419 160 L 421 160 L 421 172 L 419 172 Z"/>
    <path d="M 431 172 L 435 160 L 438 160 L 442 172 L 440 172 L 439 169 L 434 169 L 433 172 Z M 435 167 L 438 167 L 436.5 162.5 Z"/>
  </g>
</svg>'''

# ----------------------------------------------------------------------
# 3. HORIZONTAL MASTER LOCKUP
# ----------------------------------------------------------------------
def make_lockup_horizontal():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 256" width="780" height="256" role="img" aria-labelledby="hz-title">
  <title id="hz-title">LUMIÈRE — Master Horizontal Lockup</title>
  <!-- Symbol (Scaled to 150x150, centered at x=105, y=128) -->
  <g id="symbol" transform="translate(35, 53) scale(0.586)" fill="#0D0D0D">
    <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"/>
    <polygon points="144,80 174,110 144,140 114,110"/>
  </g>
  <!-- Divider -->
  <rect x="200" y="68" width="1.5" height="120" fill="#D4D4D8"/>
  <!-- Wordmark -->
  <g id="wordmark" transform="translate(175, 28) scale(0.92)" fill="#0D0D0D">
    <path d="M 70 60 L 80 60 L 80 134 L 114 134 L 114 140 L 70 140 Z"/>
    <path d="M 144 60 L 154 60 L 154 116 C 154 134, 164 141, 172 141 C 180 141, 190 134, 190 116 L 190 60 L 198 60 L 198 116 C 198 140, 184 147, 172 147 C 160 147, 144 140, 144 116 Z"/>
    <path d="M 230 60 L 241 60 L 266 122 L 291 60 L 302 60 L 302 140 L 292 140 L 292 88 L 270 136 L 262 136 L 240 88 L 240 140 L 230 140 Z"/>
    <path d="M 332 60 L 342 60 L 342 140 L 332 140 Z"/>
    <path d="
      M 372 60 L 420 60 L 420 66 L 382 66 L 382 97 L 414 97 L 414 103 L 382 103 L 382 134 L 422 134 L 422 140 L 372 140 Z
      M 386 44 L 396 34 L 410 48 L 400 58 Z
    "/>
    <path fill-rule="evenodd" d="
      M 452 60 L 490 60 C 504 60, 508 70, 508 83 C 508 94, 500 102, 486 104 L 471 114 L 486 140 L 474 140 L 462 114 L 462 140 L 452 140 Z
      M 462 66 L 488 66 C 496 66, 498 72, 498 83 C 498 94, 496 100, 488 100 L 462 100 Z
    "/>
    <path d="M 538 60 L 586 60 L 586 66 L 548 66 L 548 97 L 580 97 L 580 103 L 548 103 L 548 134 L 588 134 L 588 140 L 538 140 Z"/>
  </g>
  <!-- Subtitle -->
  <g id="descriptor" transform="translate(175, 28) scale(0.92)" fill="#71717A">
    <path d="M 210 172 L 214 160 L 217 160 L 221 172 L 219 172 L 218 169 L 213 169 L 212 172 Z M 214 167 L 217 167 L 215.5 162.5 Z"/>
    <path d="M 231 160 L 241 160 L 241 162 L 237 162 L 237 172 L 235 172 L 235 162 L 231 162 Z"/>
    <path d="M 251 160 L 260 160 L 260 162 L 253 162 L 253 165 L 258 165 L 258 167 L 253 167 L 253 170 L 260 170 L 260 172 L 251 172 Z"/>
    <path d="M 270 160 L 272 160 L 272 170 L 279 170 L 279 172 L 270 172 Z"/>
    <path d="M 289 160 L 291 160 L 291 172 L 289 172 Z"/>
    <path d="M 301 160 L 310 160 L 310 162 L 303 162 L 303 165 L 308 165 L 308 167 L 303 167 L 303 170 L 310 170 L 310 172 L 301 172 Z"/>
    <path fill-rule="evenodd" d="M 320 160 L 327 160 C 330 160, 331 161.5, 331 163.5 C 331 165, 330 166, 328 166.5 L 332 172 L 330 172 L 326.5 167 L 322 167 L 322 172 L 320 172 Z M 322 162 L 326.5 162 C 328 162, 329 162.5, 329 163.5 C 329 164.5, 328 165, 326.5 165 L 322 165 Z"/>
    <polygon points="346,165 348.5,162.5 351,165 348.5,167.5" fill="#C59B48"/>
    <path d="M 365 160 L 367 160 L 367 172 L 365 172 Z"/>
    <path d="M 377 160 L 379 160 L 385 168.5 L 385 160 L 387 160 L 387 172 L 385 172 L 379 163.5 L 379 172 L 377 172 Z"/>
    <path fill-rule="evenodd" d="M 397 160 L 403 160 C 407 160, 409 162.5, 409 166 C 409 169.5, 407 172, 403 172 L 397 172 Z M 399 162 L 403 162 C 405.5 162, 407 163.5, 407 166 C 407 168.5, 405.5 170, 403 170 L 399 170 Z"/>
    <path d="M 419 160 L 421 160 L 421 172 L 419 172 Z"/>
    <path d="M 431 172 L 435 160 L 438 160 L 442 172 L 440 172 L 439 169 L 434 169 L 433 172 Z M 435 167 L 438 167 L 436.5 162.5 Z"/>
  </g>
</svg>'''

# ----------------------------------------------------------------------
# 4. STACKED / CREST MASTER LOCKUP
# ----------------------------------------------------------------------
def make_lockup_stacked():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" width="600" height="440" role="img" aria-labelledby="st-title">
  <title id="st-title">LUMIÈRE — Master Stacked Lockup</title>
  <!-- Centered Symbol (x=215, y=36, size 170x170) -->
  <g id="symbol" transform="translate(215, 36) scale(0.664)" fill="#0D0D0D">
    <path d="M 64 48 L 116 48 L 116 58 L 96 58 L 96 172 L 180 172 L 180 162 L 194 162 L 194 192 L 64 192 L 64 182 L 80 182 L 80 58 L 64 58 Z"/>
    <polygon points="144,80 174,110 144,140 114,110"/>
  </g>
  <!-- Centered Wordmark (x=11, y=190, scale 0.88) -->
  <g id="wordmark" transform="translate(11, 190) scale(0.88)" fill="#0D0D0D">
    <path d="M 70 60 L 80 60 L 80 134 L 114 134 L 114 140 L 70 140 Z"/>
    <path d="M 144 60 L 154 60 L 154 116 C 154 134, 164 141, 172 141 C 180 141, 190 134, 190 116 L 190 60 L 198 60 L 198 116 C 198 140, 184 147, 172 147 C 160 147, 144 140, 144 116 Z"/>
    <path d="M 230 60 L 241 60 L 266 122 L 291 60 L 302 60 L 302 140 L 292 140 L 292 88 L 270 136 L 262 136 L 240 88 L 240 140 L 230 140 Z"/>
    <path d="M 332 60 L 342 60 L 342 140 L 332 140 Z"/>
    <path d="
      M 372 60 L 420 60 L 420 66 L 382 66 L 382 97 L 414 97 L 414 103 L 382 103 L 382 134 L 422 134 L 422 140 L 372 140 Z
      M 386 44 L 396 34 L 410 48 L 400 58 Z
    "/>
    <path fill-rule="evenodd" d="
      M 452 60 L 490 60 C 504 60, 508 70, 508 83 C 508 94, 500 102, 486 104 L 471 114 L 486 140 L 474 140 L 462 114 L 462 140 L 452 140 Z
      M 462 66 L 488 66 C 496 66, 498 72, 498 83 C 498 94, 496 100, 488 100 L 462 100 Z
    "/>
    <path d="M 538 60 L 586 60 L 586 66 L 548 66 L 548 97 L 580 97 L 580 103 L 548 103 L 548 134 L 588 134 L 588 140 L 538 140 Z"/>
  </g>
  <!-- Subtitle (Centered at y=350) -->
  <g id="descriptor" transform="translate(11, 206) scale(0.88)" fill="#71717A">
    <path d="M 210 172 L 214 160 L 217 160 L 221 172 L 219 172 L 218 169 L 213 169 L 212 172 Z M 214 167 L 217 167 L 215.5 162.5 Z"/>
    <path d="M 231 160 L 241 160 L 241 162 L 237 162 L 237 172 L 235 172 L 235 162 L 231 162 Z"/>
    <path d="M 251 160 L 260 160 L 260 162 L 253 162 L 253 165 L 258 165 L 258 167 L 253 167 L 253 170 L 260 170 L 260 172 L 251 172 Z"/>
    <path d="M 270 160 L 272 160 L 272 170 L 279 170 L 279 172 L 270 172 Z"/>
    <path d="M 289 160 L 291 160 L 291 172 L 289 172 Z"/>
    <path d="M 301 160 L 310 160 L 310 162 L 303 162 L 303 165 L 308 165 L 308 167 L 303 167 L 303 170 L 310 170 L 310 172 L 301 172 Z"/>
    <path fill-rule="evenodd" d="M 320 160 L 327 160 C 330 160, 331 161.5, 331 163.5 C 331 165, 330 166, 328 166.5 L 332 172 L 330 172 L 326.5 167 L 322 167 L 322 172 L 320 172 Z M 322 162 L 326.5 162 C 328 162, 329 162.5, 329 163.5 C 329 164.5, 328 165, 326.5 165 L 322 165 Z"/>
    <polygon points="346,165 348.5,162.5 351,165 348.5,167.5" fill="#C59B48"/>
    <path d="M 365 160 L 367 160 L 367 172 L 365 172 Z"/>
    <path d="M 377 160 L 379 160 L 385 168.5 L 385 160 L 387 160 L 387 172 L 385 172 L 379 163.5 L 379 172 L 377 172 Z"/>
    <path fill-rule="evenodd" d="M 397 160 L 403 160 C 407 160, 409 162.5, 409 166 C 409 169.5, 407 172, 403 172 L 397 172 Z M 399 162 L 403 162 C 405.5 162, 407 163.5, 407 166 C 407 168.5, 405.5 170, 403 170 L 399 170 Z"/>
    <path d="M 419 160 L 421 160 L 421 172 L 419 172 Z"/>
    <path d="M 431 172 L 435 160 L 438 160 L 442 172 L 440 172 L 439 169 L 434 169 L 433 172 Z M 435 167 L 438 167 L 436.5 162.5 Z"/>
  </g>
</svg>'''

# Write Masters
masters = [
    ("lumiere-symbol-master.svg", make_symbol_master()),
    ("lumiere-symbol-small.svg", make_symbol_small()),
    ("lumiere-wordmark-master.svg", make_wordmark_master()),
    ("lumiere-lockup-horizontal.svg", make_lockup_horizontal()),
    ("lumiere-lockup-stacked.svg", make_lockup_stacked()),
]

for name, content in masters:
    path = os.path.join(MASTERS_DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote master: {name}")

print("Masters regenerated.")
