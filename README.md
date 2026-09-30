# REFLY × Wendrone website

One-page site for REFLY × Wendrone drone videography (aerial cinematic and high-action FPV, all of Indonesia, booking by WhatsApp).

## Hosting (Cloudflare Pages, connected to this repo)

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `public` |

`public/index.html` is the whole site: design, script, pictures and the 3D drone models are inside that one file. Every push to `main` redeploys it.

## Editing

The working files are in `source/`. Ask Claude in the "Drone" project to change prices or text; it edits `source/`, rebuilds, and replaces `public/index.html`. To rebuild by hand:

```
cd source
npm install
python3 build.py        # writes source/single/index.html
cp single/index.html ../public/index.html
```

`source/` is not served by Cloudflare because only `public/` is published.

`source/tools/` holds the scripts that slimmed the owner's 3D drone models (Mini 4 Pro, Nazgul, Neo 2). The original model files are not in this repo.
