# REFLY × Wendrone — design system

Dark, single theme. Built around the REFLY phoenix logo (ember red to orange) and the Figmatica reference.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--carbon` | #100F0E | Page ground |
| `--airframe` | #1A1817 | Raised dark surfaces |
| `--rotor` | #2D2927 | Hairlines, borders, seams |
| `--ghost` | #4E4946 | Dim headline lines only |
| `--haze` | #9A948E | Secondary text, labels |
| `--strobe` | #F2EFEB | Primary text |
| `--card` | #ECE8E3 | Product cards. All three drone cards use this one light surface. |
| `--ink` | #161312 | Text on light cards and on ember |
| `--ember` | #F4561D | The one accent (from the logo) |
| `--ember-deep` | #BB290D | Logo gradient start |
| `--ember-hot` | #EF6B1E | Logo gradient end |

Rules
- Ember is the only colour. In the hero: one headline line, the primary "Book" button, and small status pills. On the cream sheet it is rationed further (see Paper). Never for body text, borders or large fills.
- Text on ember is `--ink`, never white.
- No drop shadows, no glow. Depth comes from surface steps (carbon, airframe, card) and hairlines.

## Type

| Role | Face | Notes |
| --- | --- | --- |
| Poster | Anton 400 (hero headline, section and closing titles, tier numerals, deal figures) | Uppercase, line-height 0.88, letter-spacing 0. Chinese falls back to Geologica 400 |
| Display | Geologica 300–500 | Product names, tier names, panel titles, FAQ questions |
| Body | Hanken Grotesk, 400 and 500 | 16px base, line-height 1.6, max 40ch in the hero |
| Data | Martian Mono, 400 | Telemetry, labels, prices. 10–12px, uppercase, letter-spacing 0.06em |
| Chinese | Noto Sans SC, 300/400/500 | Fallback in every stack |

Scale: 11 / 13 / 14 / 16 / 18 / 28 (panel title) / section title (7.4vw, 2.6–5.5rem) / hero display (16.6cqw of the headline column on desktop, 18.4cqw on phone, capped at 9.75rem).

## Shape

- Controls are pills or circles (radius 999px).
- Cards: radius 22px. Glass block: radius 24px, divided by 1px seams.
- Hairlines: 1px `--rotor`.
- Page gutter: 20px phone, 32px desktop. Content max width 1320px.

## Components

- **Pill tag**: 10px mono uppercase, 1px border, or solid ember for status.
- **Product card**: light surface, tag on top, cut-out image, name (display 300, 16–18px), one meta line (12px). There are four, one per drone, all the same colour: the DJI Mini 4 Pro is the lead card (about 1.4x); the Nazgul Evoque V3, DJI Neo 2 and CineLog35 V3 are small. On desktop they sit around the headline and always clear the type by 28px, so no letter is ever covered: the lead card in the notch left of the first line, and the three small cards as a staircase under the last line, grouped by category: the cinematic Neo 2 first at the line's left edge (the Mini's side), then the two FPV drones together, Nazgul in the middle 40px lower and CineLog at the right edge 40px lower again. When the line is narrower than the three cards need, the row widens around the line's centre and stays inside the column; the carbon ring around each card keeps them apart. On tablet the two cinematic drones (Mini 4 Pro, Neo 2) are full-width rows and the two FPV cards sit side by side under them. On phone the price tiles come first and the four cards form one swipeable row (74vw each, snap to start), cinematic first.
- **Turntable**: the DJI Mini 4 Pro, Nazgul Evoque V3 and DJI Neo 2 cards show real 3D models (from the owner's GLB files, carried inside the page: the Mini slimmed to about 1.7 MB, the Nazgul from 52 MB to 150 KB, the Neo 2 from 43 MB to 350 KB with its colour texture kept). The Neo 2 turns in 12 seconds from data-yaw="230". Each can be dragged left and right with a flick that coasts back to the idle turn. The Mini turns once every 14 seconds from a three-quarter front view; the Nazgul turns a little faster (11 seconds, data-turn="11") and starts from the other side (data-yaw="160"), so the two never move in step. The Nazgul's carbon and plastics have a satin finish (roughness at least 0.6, props 0.45) so the top plate never flashes white, and its shading is rebuilt when it loads, keeping edges sharper than 35° hard. On desktop each 3D card shows a small orbit icon (ink at 62%) at the right end of its tag row, with "Drag to turn" as its tooltip, and the drone shows a grab cursor. The hint sits outside the area the drone sweeps, because a turning drone reaches every corner of its picture box: no label ever covers a drone. Each model is framed by its real turning reach (the corner of its footprint) plus its height under the 24° camera tilt, so no part is ever cut off at any point of the turn, whatever the model's proportions. The models only render while on screen, stop turning for reduced motion, and fall back to the photo if WebGL fails or their colours cannot load. The CineLog card still uses the photo turntable: it holds front-on, then makes one eased 360° turn (7.5s cycle). To add another 3D drone, drop NAME.glb into _source/assets/models and put data-model="NAME" on that card's .shot.
- **Glass tiles**: one block with 1px seams; icon, label (16px), two short value lines (13px haze, the key figure in strobe 500).
- **Segmented toggle**: pill track, active segment is `--strobe` with `--ink` text.
- **Primary button**: ember pill, ink text. One per screen.
- **Secondary action**: underlined text link. The nav "Book" button is an outlined pill so it never competes with the ember one.

- **Section head**: mono "//" eyebrow, two-line uppercase title (first line strobe, second line ember), lead paragraph bottom-right on desktop. The ember title line is that screen's one accent.
- **Service panel**: airframe surface, 1px rotor border, radius 28px. Pill tag and mono unit name on top, a flight-path map (dotted track on a dot grid, one strobe dot that travels the path: slow for cinematic, quick for FPV), 28px title, haze description, then hairline rows (mono label left, value right). Two panels side by side from 900px.
- **Note bar**: glass bar, radius 24px, icon, one sentence, outlined pill button.

- **Group**: used in Pricing, Add-ons and FAQ. From 1180px it is a 320px side column beside a column of rows; below that the side column stacks on top. In Pricing the side column holds a mono "//" line, a large light group title (display 250, 52px on desktop, about 36px on phone, mixed case), a tiny haze note (13px) and a light battery card. In the dark hero theme groups are separated by a 1px rotor hairline; on the cream sheet each pricing group (and the add-ons group) is a boxed card: 20px radius, 1px ink border, the battery card floating over its top edge. The FAQ group is never boxed.
- **Tier row**: hairline-separated row, not a card. Columns left to right: outsized dim numeral in `--ghost` (the battery count, or the hours for time hire), tier name (display 300, 18px) with a mono unit line under it, airtime label in haze with a bar (or a haze note for time hire), price (display 400, 18px, strobe, right-aligned: the brightest thing in the row) with a small haze "per minute" line, outlined "Book" pill (strobe text, ghost border) in a fixed-width action column so every language lines up. Price and action columns have fixed widths, so every airtime bar track is the same length. Column edges are shared by every row in every group. On phone the row folds to two lines: numeral, name and price on top; airtime and Book below.
- **Airtime bar**: 5px pill track in seam, fill in haze. Every bar on the page is drawn against the same 50-minute scale so lengths compare across drones. Never ember.
- **Battery card**: the same light card surface as the drone cards (max 300px wide), image left; one small outlined pill ("1 battery"), name and one meta line right. It leads its group and floats over the group's top hairline, half above it.
- **Notes**: two labelled notes under the rows (strobe mono "//" label, 14.5px haze text) for the airtime and transport rules.
- **Deal panel**: a service panel with a big light figure (display 250, 40–60px) under a mono label, used for the hybrid saving and the full-day price.
- **FAQ**: native details/summary rows separated by hairlines; 18px question, round plus/minus button, haze answer up to 62ch. First item open.
- **Closing band**: two-line uppercase title (strobe, ember) at up to 8.5rem, with the one ember button, the WhatsApp number as selectable mono text and a copy link.
- **Ember in lower sections**: the section title's second line, the "Recommended" pill on one tier per pricing group, and the single ember button in the closing band. Prices, bars, numerals and Book pills stay neutral.

## Paper: the cream body (Zipline blend, 30 Sep 2026)

The page is two sheets. The hero stays dark carbon (cinematic, drones), and its headline is set in the same Anton poster face as the cream titles, so the two sheets speak with one display voice. On desktop the cream sheet rises 170px into the hero so the three small drone cards straddle the join. Everything below it sits on a cream sheet, `.paper`, that curves up over the hero (radius 64px on desktop, 40px on phone) like Zipline's curved mask (on desktop the top edge is an elliptical arc, 150px deep, so it reads as a sweep rather than two rounded corners). Inside `.paper` the tokens are remapped, so the same components read on cream:

| Token inside .paper | Value | Use |
| --- | --- | --- |
| `--cream` | #F7F4E8 | Canvas and every card surface |
| `--ink` | #161312 | Text, borders, filled buttons |
| `--stone` | #C6C3BA | Hairlines and dividers |
| haze | #5F5A54 | Secondary text (never lighter: it must pass on cream) |
| `--ember` | #F4561D | The one accent, rationed: the hybrid feature-card fill, the "Recommended" pills, the closing title's second line and the closing button. Section titles on paper are all ink. |

Rules on paper
- One radius, 20px, for cards, panels, note bars and the battery card. Buttons, tags and toggles stay 999px pills (a pill is a 20px radius on a 40px control anyway). The map inset is 12px.
- 1px ink borders carry the separation; no shadows, no glass, no tints.
- Poster type: section titles, group titles, the closing title, tier numerals and deal figures are Anton (heavy, condensed), line-height 0.88, no letter-spacing, uppercase. Chinese falls back to Geologica 500 because condensed Latin faces have no CJK glyphs.
- Ember feature card: the hybrid deal panel is an ember-filled card with ink text (Zipline's violet block in our accent). Only one per page.
- Buttons: ink outline ghost pill by default, filling ink on hover; on the ember card the button is a filled ink pill; the one ember pill is the closing CTA.
- The nav flips with the sheet: dark glass over the hero, cream with ink borders once the paper reaches it (`.nav.on-paper`).
- The footer is on paper too.

## Price psychology (set 30 Sep 2026)

- **Charm prices**: every price sits just under a round number (Rp449.000, Rp1.099.000), always rounded down from the old price, never up.
- **Price display**: in tier rows, deal figures and add-ons, "Rp" and the trailing ".000" are set at 0.62em in haze, so the eye reads the short number (449). Running text keeps the full "Rp449.000".
- **Savings stay round and big**: the hybrid saving is Rp250.000 in full-size digits. Savings are never shrunk.
- **Badges**: one ember "Recommended" pill on the middle tier of each group (the tier we steer people to) and one outlined "Best value" pill on the tier with the lowest price per minute (or per hour). No "most popular" or scarcity claims, because there is no booking history to back them.
- **Save line**: each tier above the first shows "Save RpX" in strobe under the per-minute line, measured against booking the Basic package repeatedly (or a shorter time slot twice). A third note under the rows states that basis.
- **Recommended row**: its dim numeral steps up to haze.

## Voice

Plain and confident. Specs are always followed by what they give the client. Languages: Indonesian (default), English, Chinese. Prices are written Rp450.000.

## Headline copy (four lines: dim, dim, ember, white)

- Indonesian: VIDEO / UDARA / CINEMATIC / & ACTION
- English: AERIAL / FOOTAGE / CINEMATIC / & ACTION
- Video spec is written 4K/60 (never RAW). Coverage line: all of Indonesia.
- Chinese: 无人机 / 航拍服务 / 电影级质感 / & 高速跟拍

Keep the first line short (it leaves the notch for the first card) and no line longer than nine Latin characters.

## Section titles

- Services: MULUS / ATAU CEPAT? · SMOOTH / OR FAST? · 平稳 / 还是高速？
- Pricing: PER BATERAI / ATAU PER WAKTU · BY BATTERY / OR BY TIME · 按电池 / 或按时长
- Bundles: GABUNG / DAN HEMAT · BUNDLE / AND SAVE · 组合预约 / 更省
- FAQ: SEBELUM / BOOKING · BEFORE / YOU BOOK · 预约 / 须知
- Closing: SIAP / TERBANG? · READY / TO FLY? · 准备好 / 起飞了吗？

## Booking

Every "Book" control opens WhatsApp: https://wa.me/6285714727038 with a prefilled greeting in the active language. Based in Jakarta, serving all of Indonesia. Transport is never included in a price, inside Jakarta or outside it: it depends on the distance and is agreed with the client before booking.

## Brand name

The brand is written "REFLY × Wendrone": REFLY is the pilot's own brand, Wendrone is the talent agency that hires him (renamed from REFLY FPV on 30 Sep 2026). In the nav and footer it is a two-line lockup: REFLY in strobe, "× Wendrone" smaller in haze. "High-Action FPV" remains the name of the FPV service.
