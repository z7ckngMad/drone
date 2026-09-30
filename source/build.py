#!/usr/bin/env python3
"""Build REFLY × Wendrone: compiles Tailwind, then writes
   dist/      -> the hostable site (index.html + styles.css + main.js + assets/)
   artifact/  -> single-file page for the Claude preview
   preview/   -> same as dist but with locally installed fonts (offline screenshots)"""
import subprocess, shutil, pathlib, glob, re
R = pathlib.Path(__file__).parent
subprocess.run(['npx','tailwindcss','-c','tailwind.config.js','-i','src/styles.css','-o','build/styles.css','--minify'],cwd=R,check=True,capture_output=True)
subprocess.run(['npx','esbuild','src/viewer3d.js','--bundle','--minify','--format=iife','--target=es2019','--legal-comments=none','--outfile=build/viewer3d.js'],cwd=R,check=True,capture_output=True)
css=(R/'build/styles.css').read_text(); body=(R/'src/body.html').read_text(); js=(R/'src/main.js').read_text()
import base64
# 3D: every assets/models/NAME.glb travels inside the page as base64, read by the viewer script
V3D = ''.join(f'<script type="application/octet-stream" id="glb-{g.stem}">{base64.b64encode(g.read_bytes()).decode()}</script>\n'
              for g in sorted((R/'assets/models').glob('*.glb'))) + '<script>\n' + (R/'build/viewer3d.js').read_text() + '\n</script>'
TITLE='REFLY × Wendrone'
DESC='REFLY × Wendrone: aerial cinematic dan high-action FPV. Drone videography untuk filmmaker dan event organizer, booking per baterai atau per waktu.'
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geologica:slnt,wght@-12..0,200..600&family=Hanken+Grotesk:wght@400..600&family=Martian+Mono:wght@400..500&family=Noto+Sans+SC:wght@300;400;500&family=Anton&display=swap">'
def doc(head_extra, tail):
    return f'''<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#100f0e">
<link rel="icon" href="assets/logo-mark.webp" type="image/webp">
{head_extra}
</head>
<body>
{body}
{tail}
</body>
</html>
'''
for d in ('dist','preview','artifact'):
    (R/d).mkdir(exist_ok=True)
for d in ('dist','preview'):
    shutil.copytree(R/'assets',R/d/'assets',dirs_exist_ok=True)
    (R/d/'styles.css').write_text(css); (R/d/'main.js').write_text(js)
(R/'dist/index.html').write_text(doc(FONTS+'\n<link rel="stylesheet" href="styles.css">','<script src="main.js"></script>\n'+V3D))
# preview: local fonts
nm=R/'node_modules'
ff=f'''
@font-face{{font-family:'Geologica';font-weight:100 900;font-style:oblique -12deg 0deg;src:url('{nm}/@fontsource-variable/geologica/files/geologica-latin-full-normal.woff2') format('woff2')}}
@font-face{{font-family:'Hanken Grotesk';font-weight:100 900;src:url('{nm}/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2') format('woff2')}}
@font-face{{font-family:'Anton';font-weight:400;src:url('{nm}/@fontsource/anton/files/anton-latin-400-normal.woff2') format('woff2')}}
@font-face{{font-family:'Martian Mono';font-weight:100 800;src:url('{nm}/@fontsource-variable/martian-mono/files/martian-mono-latin-wght-normal.woff2') format('woff2')}}
'''
for wgt in (300,400,500):
    c=(nm/f'@fontsource/noto-sans-sc/{wgt}.css').read_text().replace('./files/',f'{nm}/@fontsource/noto-sans-sc/files/')
    ff+=c
(R/'preview/index.html').write_text(doc(f'<style>{ff}</style>\n<link rel="stylesheet" href="styles.css">','<script src="main.js"></script>\n'+V3D))
# artifact: fragment, everything inline except images
(R/'artifact/refly-fpv.html').write_text(f'<title>{TITLE}</title>\n{FONTS}\n<style>\n{css}\n</style>\n{body}\n<script>\n{js}\n</script>\n{V3D}\n')
# single file: one ready-to-use index.html with the styles, script and images inside it
import base64, re as _re
def _data(m):
    f = R / m.group(1)
    return 'data:image/webp;base64,' + base64.b64encode(f.read_bytes()).decode() if f.exists() else m.group(1)
_body = _re.sub(r'(?<=src=")(assets/[a-z0-9.-]+\.webp)(?=")', _data, body)
_icon = 'data:image/webp;base64,' + base64.b64encode((R/'assets/logo-mark.webp').read_bytes()).decode()
_single = doc(FONTS + '\n<style>\n' + css + '\n</style>', '<script>\n' + js + '\n</script>\n' + V3D).replace(body, _body).replace('href="assets/logo-mark.webp" type="image/webp"', f'href="{_icon}" type="image/webp"')
(R/'single').mkdir(exist_ok=True)
(R/'single/index.html').write_text(_single)
print('built', len(css), 'bytes css; single file', len(_single)//1024, 'KB')
