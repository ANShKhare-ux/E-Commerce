# LUMIÈRE — Brand Identity Guidelines

> **LUMIÈRE Atelier · India**  
> Indian Heritage Handlooms & Architectural Haute Couture  
> Master Brand Identity System (Version 2.0)

---

## 1. Brand Identity Overview

**LUMIÈRE** pairs indigenous Indian handloom mastery (Banarasi Kadhwa silk, Chanderi sheer drapes, Mulmul cotton) with sharp contemporary architectural tailoring and curated global luxury.

* **The Brand Wordmark**: Custom-sculpted Roman Didone capitals with 35% luxury tracking. The defining signature is the **45° diamond-shard grave accent on the first `È`**, capturing the radiant soul of *Lumière* (Light).
* **The Sovereign L Monogram**: An architectural Roman serif capital `L` holding a poised 45° diamond facet in its optical counter. Engineered for 3D metallic hardware, luxury leather embossing, and micro-scale digital avatars.

---

## 2. Master Asset Hierarchy

| Asset Type | Primary Use Case | Master File |
| :--- | :--- | :--- |
| **Horizontal Master Lockup** | Website header, store signage, invoice headers, digital desktop | `lumiere-lockup-horizontal.svg` |
| **Stacked / Crest Lockup** | Shopping bags, garment tags, garment box lids, stationery | `lumiere-lockup-stacked.svg` |
| **Haute-Couture Wordmark** | Editorial campaigns, tissue wraps, neck ribbons, clean signage | `lumiere-wordmark-master.svg` |
| **The Sovereign L Monogram** | Mobile app icon, browser favicon, 3D metal hardware, social avatars | `lumiere-symbol-master.svg` |
| **Micro-Scale Monogram** | Small sizes $\le 32\text{ px}$ (optically boosted stem & enlarged jewel) | `lumiere-symbol-small.svg` |

---

## 3. Clear Space & Proportions

* **Clear Space Rule**: Maintain a minimum exclusion zone of **$1\times X$** on all four sides of any logo mark, where **$X$** is defined as the height of the diamond facet ($36\text{ px}$ on the 256 master canvas). No other typography, graphics, or margins may infringe upon this boundary.
* **Vertical Separation**: In stacked lockups, the distance between the bottom serif of the Monogram and the cap height of the wordmark is strictly **$1.2\times X$**.
* **Optical Centering**: The floating diamond sits positioned at the optical center of the 'L' counter, preserving equal visual tension between the vertical stem and the horizontal base.

---

## 4. Minimum Sizes & Scaling Ladder

| Mark | Minimum Digital Screen | Minimum Physical Print | Recommended Asset |
| :--- | :--- | :--- | :--- |
| **Horizontal Lockup** | $140\text{ px}$ wide | $35\text{ mm}$ wide | `lumiere-lockup-horizontal.svg` |
| **Stacked Lockup** | $120\text{ px}$ wide | $30\text{ mm}$ wide | `lumiere-lockup-stacked.svg` |
| **Wordmark Only** | $110\text{ px}$ wide | $28\text{ mm}$ wide | `lumiere-wordmark-master.svg` |
| **Sovereign L (Master)** | $48\text{ px} \times 48\text{ px}$ | $12\text{ mm} \times 12\text{ mm}$ | `lumiere-symbol-master.svg` |
| **Sovereign L (Micro Cut)** | $16\text{ px} \times 16\text{ px}$ | $5\text{ mm} \times 5\text{ mm}$ | `lumiere-symbol-small.svg` |

> [!IMPORTANT]
> For browser favicons and mobile push notifications ($16\text{ px}$ to $32\text{ px}$), always use `lumiere-symbol-small.svg` (or `favicon.ico`). Do not use the master file below $48\text{ px}$, as fine Didone hairlines require the optical weight compensation built into the micro-cut.

---

## 5. Authoritative Atelier Palette

| Role | Color Name | HEX | RGB | CMYK | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Noir** | Atelier Noir | `#0D0D0D` | `13, 13, 13` | `75, 68, 67, 90` | Primary logomark, typography, dark packaging |
| **Primary Light** | Linen Canvas | `#FDFBF7` | `253, 251, 247`| `1, 1, 3, 0` | Master background, tissue paper, storefront walls |
| **Metallic Accent** | Zari Antique Gold | `#C59B48` | `197, 155, 72` | `20, 35, 80, 5` | Diamond accent, gold hot-stamping, hardware |
| **Heritage Accent**| Royal Emerald | `#1A4437` | `26, 68, 55` | `85, 40, 75, 45` | Velvet jewelry pouches, seasonal couture accents |
| **Subtle Neutral** | Silk Warp Gray | `#71717A` | `113, 113, 122`| `55, 45, 40, 10` | Secondary descriptors, borders, care instructions |

### Approved Color Pairings
* **Noir on Canvas**: Atelier Noir (`#0D0D0D`) on Linen Canvas (`#FDFBF7`) — Standard luxury stationery & digital storefront.
* **Canvas on Noir**: Inverted Linen Canvas on solid Atelier Noir — Eveningwear packaging, luxury unboxing boxes.
* **Zari Gold on Noir**: Antique Gold foil stamping (`#C59B48`) on rich matte noir stock — Garment tags & brass hardware.
* **Noir on Emerald**: Black embossed lettering on Royal Emerald velvet pouches.

---

## 6. Typography & Font Hierarchy

* **Primary Display Serif**: *Playfair Display* / *Bespoke Didot Roman*  
  Used for hero editorial headlines, collection titles, and campaign drop names.
* **Secondary Atelier Sans**: *Inter* / *Helvetica Neue*  
  Used for category navigation, sublines, product specifications, and legal fine print. Wide tracking (`letter-spacing: 0.15em` to `0.30em`) is mandatory on all uppercase sans elements.
* **Indian Commerce Formats**: Always format Indian currency with the official rupee glyph: `₹12,500` (inclusive of 12% GST).

---

## 7. Logo Misuse & Prohibited Practices

* ❌ **Do NOT stretch, skew, or distort** the aspect ratio of the wordmark or monogram.
* ❌ **Do NOT apply arbitrary drop shadows, glowing flares, or multi-color gradients** to the marks.
* ❌ **Do NOT separate or reposition the floating diamond** outside its calibrated optical counter.
* ❌ **Do NOT substitute the bespoke vector letters** with live system fonts; the accent, serifs, and stroke weights are custom-crafted vector paths.
* ❌ **Do NOT place the dark logo over busy photographic areas** without a clean, minimum-contrast container or darkened vignette.
* ❌ **Do NOT enclose the monogram in an unapproved oval, shield, or crest container**.

---

## 8. File Structure & Delivery Manifest

```
brand/
├── BRAND_GUIDELINES.md          <- This specification document
├── production/
│   ├── masters/
│   │   ├── lumiere-symbol-master.svg
│   │   ├── lumiere-symbol-small.svg
│   │   ├── lumiere-wordmark-master.svg
│   │   ├── lumiere-lockup-horizontal.svg
│   │   └── lumiere-lockup-stacked.svg
│   ├── exports/                 <- Transparent PNGs (32px to 2048px), Black & White SVGs
│   ├── web-icons/               <- Favicon.ico, Apple-Touch-Icon, Webmanifest
│   └── presentation/            <- Real-world client mockups & presentation board
```
