# Project 7 — Interactive Map Conversion Plan
## From "Johor Currency History" → "Kenali Wang Anda" (Malaysia banknote map)

### 1. What changes

The current `index.html` is a Johor map with 5 pins, each a *historical fact* about Johor currency. The new version keeps the exact same engine, animations, info card, idle timer, language toggle and visual style — only the **map background**, the **pins**, and the **content data** change.

- Background: `Assets/Johore map.png` → a **Malaysia map including Sabah & Sarawak**.
- Pins: 5 → **6**, one per banknote denomination, placed on the state the note represents.
- Each pin tells the story of one banknote (the featured image + why) and shows its security features.

Per the vendor instruction in the document:
> "Please change the map into Malaysia map, to include Sabah and Sarawak."
> "Mobile legend ini akan feature kesemua denominasi wang kertas keluaran BNM, dan imej yang terdapat pada wang kertas ini berkaitan dengan negeri di Malaysia."

### 2. The 6 pins (state → denomination → content)

| # | Pin (state) | Note | Featured image | Approx. pin position (x%, y%)* |
|---|---|---|---|---|
| 1 | Kelantan | RM1 | Wau Bulan | 31, 28 |
| 2 | Terengganu | RM20 | Penyu Karah & Penyu Belimbing | 34, 37 |
| 3 | Perak | RM10 | Rafflesia Azlanii | 23, 35 |
| 4 | Selangor | RM50 | Kelapa Sawit ("Misi Negara") | 24, 47 |
| 5 | Sarawak | RM5 | Enggang Badak (Rhinoceros Hornbill) | 66, 64 |
| 6 | Sabah | RM100 | Gunung Kinabalu & Lembah Gunung Api (Mulu) | 86, 44 |

\* Starting estimates as % of the map image (0,0 = top-left). Fine-tune once the final Malaysia map art is chosen.

### 3. Two pages per pin (new vs. old)

The document specifies **two pages per note**, so the info card needs a small upgrade from the current single-body card:

- **Page 1 — Kapsyen:** the featured image (`notes/…`) + the descriptive caption (full BM text already extracted from the document, verbatim).
- **Page 2 — Ciri Keselamatan:** the security-feature composite image (`security/…`). All callout labels are baked into that image (bilingual graphics), so Page 2 can simply display the composite full-width — no extra text needed.

Implementation: add a **Page 1 / Page 2 toggle** (two tabs or a "Seterusnya →" button) inside `#info-card`. Everything else (open/close, idle reset, SFX) stays.

### 4. Content source

All Page-1 captions are extracted verbatim (Bahasa Melayu) from the table in `Content For Mobile Legend Game_18 Jun 2026.docx`. The intro paragraph ("Kenali Wang Anda" / BNM as sole issuer…) is available for a splash/intro screen or header subtitle. Security-feature content lives entirely inside the composite images (Page 2).

### 5. Assets

**Provided** (in `Assets-malaysia/`, see `MANIFEST.md`):
- `security/RM*_state_security.png` ×6 — Page 2 composites (1097×684).
- `notes/RM*_state_note.png` ×6 — Page 1 note thumbnails (~330×180).

**Still needed:**
1. **Malaysia base map** with Sabah & Sarawak — to replace `Johore map.png`. Should match the dark cyan/navy "HUD" aesthetic. Source a styled map or recolour a public-domain Malaysia outline.
2. **6th pin icon** — `Map icon/` currently has Icon_01–05; add Icon_06, or reuse note thumbnails as pin icons.
3. *(Optional)* **clean official banknote images** for Page 1 — the extracted crops include the source's numbered callout circles; BNM publishes clean note images if a tidier Page 1 is wanted.

### 6. Code changes in `index.html`

1. **Header / i18n** — title → "Kenali Wang Anda"; subtitle → e.g. "6 Wang Kertas BNM — Sentuh negeri untuk menerokai"; update `LANG` strings and `hint`.
2. **`#map-bg`** — point `url(...)` to the new Malaysia map.
3. **`FACTS` array** — replace the 5 Johor objects with 6 note objects. Suggested shape per item: `{ id, denomination, state, x, y, icon, page1:{label, subject, image, caption}, page2:{image} }`.
4. **Card markup + `openPanel()`** — render two pages and add the page toggle; Page 2 shows the security composite.
5. **Language** — document content is **BM-only**. Either (a) keep the EN/BM toggle but populate EN with provided BM (or new EN translations), or (b) remove the toggle for v2. **Decision needed.**
6. Pin count is data-driven, so animations/idle/particles need no change.

### 7. Suggested build order
1. Obtain/clay the Malaysia base map → drop into `Assets/`.
2. Wire the new `FACTS` data (captions + asset paths) — pins appear, Page 1 works.
3. Add the Page 1/Page 2 toggle and security composites.
4. Tune pin x/y coordinates against the real map.
5. Decide EN vs BM-only; finalise header/intro copy.
6. Rebuild the Capacitor `www/` + Android bundle.

### 8. Open questions
- **Languages:** bilingual (need EN translations) or BM-only for v2?
- **Malaysia map art:** do you have a preferred map image, or should one be created to match the current HUD style?
- **Page 1 images:** keep the extracted note crops (with callouts) or source clean BNM note images?
