#!/usr/bin/env python3
"""One-off generator: writes the Pricing, Bundles, FAQ and closing sections into src/body.html
and their copy (Indonesian, English, Chinese) into src/main.js. Prices live here in one place."""
import json, pathlib, re
R = pathlib.Path(__file__).parent
S = {}  # key -> (id, en, zh)


def rp(n):
    return 'Rp' + f'{n:,}'.replace(',', '.')


def rp_big(n):
    head, tail = f'{n:,}'.replace(',', '.').rsplit('.', 1)
    return f'<span class="cur">Rp</span>{head}<span class="k">.{tail}</span>'


def T(key, tag='span', cls='', html=False, extra=''):
    c = f' class="{cls}"' if cls else ''
    attr = 'data-i18n-html' if html else 'data-i18n'
    return f'<{tag}{c} {attr}="{key}"{extra}>{S[key][0]}</{tag}>'


# ---------- shared ----------
S['u.batt1'] = ('baterai', 'battery', '块电池')
S['u.battn'] = ('baterai', 'batteries', '块电池')
S['pk.book'] = ('Booking', 'Book', '预约')
S['wa.pack'] = ('Halo REFLY × Wendrone, saya ingin booking: {p}.', "Hi REFLY × Wendrone, I'd like to book: {p}.", '你好 REFLY × Wendrone，我想预约：{p}。')
for k, v in {'basic': ('Basic', 'Basic', '基础'), 'ext': ('Extended', 'Extended', '加长'), 'pro': ('Pro', 'Pro', '专业'),
             'std': ('Standard', 'Standard', '标准'), 'full': ('Full Session', 'Full Session', '全场')}.items():
    S['tn.' + k] = v

# ---------- pricing ----------
S['pr.eyebrow'] = ('// Harga', '// Pricing', '// 价格')
S['pr.h1'] = ('Per baterai', 'By battery', '按电池')
S['pr.h2'] = ('atau per waktu', 'or by time', '或按时长')
S['pr.lead'] = ('Paket baterai hanya menghitung airtime bersih. Sewa waktu membuat pilot standby di lokasi. Semua bar airtime memakai satu skala, jadi bisa langsung dibandingkan.',
                'Battery packages count clean airtime only. Time hire keeps the pilot on site. All airtime bars share one scale, so they compare directly.',
                '电池套餐只计净飞行时间；按时长预约则飞手全程在场。所有飞行时间条使用同一比例，可直接比较。')
S['pr.a.title'] = ('Aerial cinematic', 'Aerial cinematic', '电影级航拍')
S['pr.a.note'] = ('4K/60. ND filter dan strobe light gratis di setiap paket.', '4K/60. ND filter and strobe lights free with every package.', '4K/60。每个套餐免费含 ND 滤镜和频闪灯。')
S['pr.a.batt'] = ('Baterai Mini 4 Pro', 'Mini 4 Pro battery', 'Mini 4 Pro 电池')
S['pr.a.battm'] = ('~18 menit airtime per baterai', '~18 min airtime each', '每块约 18 分钟飞行时间')
S['pr.b.title'] = ('High‑action FPV', 'High‑action FPV', 'FPV 高速跟拍')
S['pr.b.note'] = ('Outdoor dan indoor. ND filter dan strobe light gratis di setiap paket. Airtime berubah mengikuti agresivitas terbang.', 'Outdoor and indoor. ND filter and strobe lights free with every package. Airtime varies with how hard the drone is flown.', '户外和室内均可。每个套餐免费含 ND 滤镜和频闪灯。飞行时间随动作激烈程度而变化。')
S['pr.b.batt'] = ('Baterai FPV', 'FPV battery', 'FPV 电池')
S['pr.b.battm'] = ('~5 menit airtime per baterai', '~5 min airtime each', '每块约 5 分钟飞行时间')
S['pr.c.eyebrow'] = ('// Pilot standby di lokasi', '// Pilot on site', '// 飞手到场待命')
S['pr.c.title'] = ('Sewa waktu', 'Time hire', '按时长预约')
S['pr.c.note'] = ('Pilot standby di lokasi selama slot dan terbang sesuai aba-aba. Anda membayar sesuai waktu yang dibooking, terbang atau tidak. Baterai tambahan Rp249.000 per buah.',
                  'The pilot stays on site for the whole slot and flies on cue. You pay for the time booked, flying or not. Extra batteries are Rp249.000 each.',
                  '飞手在预约时段内全程在场，随时起飞。按预约时长计费，无论是否起飞。额外电池每块 Rp249.000。')
S['pr.mount'] = ('Gratis mount cam', 'Free cam mount', '赠相机支架')
S['pr.a.tag'] = ('1 baterai', '1 battery', '1 块电池')
S['pr.fn1h'] = ('// Airtime', '// Airtime', '// 飞行时间')
S['pr.fn2h'] = ('// Transportasi', '// Transport', '// 交通费')
S['pr.fn3h'] = ('// Hemat', '// Savings', '// 节省')
S['pr.fn3'] = ('Angka hemat dibandingkan membooking paket Basic berulang kali, atau slot waktu yang lebih pendek dua kali.',
               'Savings are measured against booking the Basic package repeatedly, or a shorter time slot twice.',
               '节省金额按多次预约基础套餐，或两次预约较短时段计算。')
S['pr.fn1'] = ('Airtime adalah estimasi. Airtime FPV sangat bergantung pada agresivitas manuver di lokasi.',
               'Airtime figures are estimates. FPV airtime depends heavily on how aggressively the drone is flown on site.',
               '飞行时间为估算值。FPV 的飞行时间很大程度上取决于现场飞行动作的激烈程度。')
S['pr.fn2'] = ('Harga belum termasuk transportasi, di dalam maupun di luar Jakarta. Biayanya menyesuaikan jarak lokasi dan disepakati bersama sebelum booking.',
               'Prices do not include transport, inside Jakarta or outside it. The cost depends on the distance and is agreed with you before booking.',
               '价格不含交通费，雅加达市内或市外均如此。交通费视距离而定，预约前与您商定。')
S['u.hour'] = ('jam', 'hour', '小时')
S['u.hours'] = ('jam', 'hours', '小时')

SCALE = 50  # minutes: the longest airtime on the page, every bar is drawn against it
CINE = [('basic', 1, 18, 449000), ('ext', 2, 35, 749000), ('pro', 3, 50, 949000)]
FPV = [('basic', 2, 10, 499000), ('std', 4, 20, 849000), ('ext', 6, 30, 1099000), ('full', 8, 40, 1349000)]
TIME = [('t30', '½', 'u.hour', ('30 menit', '30 minutes', '30 分钟'), (1, 2), 499000, True),
        ('t60', '1', 'u.hour', ('1 jam', '1 hour', '1 小时'), (2, 4), 899000, False),
        ('t120', '2', 'u.hours', ('2 jam', '2 hours', '2 小时'), (3, 6), 1499000, False),
        ('tx', '+1', 'u.hour', ('Tiap jam tambahan', 'Each extra hour', '每增加 1 小时'), None, 599000, False)]
# one recommended tier (ember pill) and one best-value tier (lowest price per minute) per group
REC = {'cine.ext', 'fpv.std', 'time.t60'}
BEST = {'cine.pro', 'fpv.full', 'time.t120'}
S['bd.rec'] = ('Rekomendasi', 'Recommended', '推荐')
S['bd.best'] = ('Paling hemat', 'Best value', '最划算')
SVC = {'cine': ('Aerial Cinematic', 'Aerial Cinematic', '电影级航拍'), 'fpv': ('High-Action FPV', 'High-Action FPV', 'FPV 高速跟拍')}


def book(pack):
    return f'<a class="btn btn-line btn-sm book" data-wa-pack="{pack}" href="https://wa.me/6285714727038" target="_blank" rel="noopener" data-i18n="pk.book">{S["pk.book"][0]}</a>'


def battery_rows(svc, tiers):
    out = []
    for key, n, mins, price in tiers:
        pk = f'{svc}.{key}'
        per = int(price / mins / 100 + 0.5) * 100
        base_n, base_price = tiers[0][1], tiers[0][3]
        save = n // base_n * base_price - price if n > base_n else 0
        if save:
            S[f'sv.{pk}'] = (f'Hemat {rp(save)}', f'Save {rp(save)}', f'省 {rp(save)}')
        save_line = T(f"sv.{pk}", cls="save") if save else ''
        badges = ''.join(T(k, cls=c) for k, c, on in (('bd.rec', 'pill pill-ember', pk in REC), ('bd.best', 'pill pill-best', pk in BEST)) if on)
        badges = f'\n                <span class="badges">{badges}</span>' if badges else ''
        S[f'air.{mins}'] = (f'~{mins} menit airtime', f'~{mins} min airtime', f'约 {mins} 分钟飞行时间')
        S[f'per.{pk}'] = (f'~{rp(per)} per menit', f'~{rp(per)} per minute', f'约 {rp(per)}/分钟')
        S[f'pk.{pk}'] = (f'{SVC[svc][0]} {S["tn."+key][0]} ({n} baterai, {rp(price)})',
                         f'{SVC[svc][1]} {S["tn."+key][1]} ({n} {"battery" if n == 1 else "batteries"}, {rp(price)})',
                         f'{SVC[svc][2]} {S["tn."+key][2]}（{n} 块电池，{rp(price)}）')
        unit = 'u.batt1' if n == 1 else 'u.battn'
        extra = f'\n                {T("pr.mount", cls="pill")}' if key == 'full' else ''  # goes under the airtime bar
        out.append(f'''            <li class="tier{' is-rec' if pk in REC else ''}">
              <span class="num" aria-hidden="true">{n}</span>
              <div class="name">
                {T("tn."+key, cls="tn")}
                <span class="mono unit">{n} {T(unit)}</span>{badges}
              </div>
              <div class="air">
                <span class="air-top">{T(f"air.{mins}", cls="air-label")}{extra.strip()}</span>
                <span class="bar" aria-hidden="true"><i style="width:{mins/SCALE*100:.0f}%"></i></span>
              </div>
              <div class="cost"><b>{rp_big(price)}</b>{T(f"per.{pk}", cls="per")}{save_line}</div>
              {book(pk)}
            </li>''')
    return '\n'.join(out)


def time_rows():
    out = []
    for key, num, unit, name, caps, price, jkt in TIME:
        S[f'tm.{key}'] = name
        if caps:
            S[f'tm.{key}.d'] = (f'Termasuk hingga {caps[0]} baterai Mini atau {caps[1]} baterai FPV',
                                f'Includes up to {caps[0]} Mini or {caps[1]} FPV batteries',
                                f'最多含 {caps[0]} 块 Mini 或 {caps[1]} 块 FPV 电池')
        detail = T(f"tm.{key}.d", cls="air-note") if caps else ''
        pk = 'time.' + key
        prices = {k: pr for k, _, _, _, _, pr, _ in TIME}
        ref = {'t60': 't30', 't120': 't60'}.get(key)
        save = 2 * prices[ref] - price if ref else 0
        if save:
            S[f'sv.{pk}'] = (f'Hemat {rp(save)}', f'Save {rp(save)}', f'省 {rp(save)}')
        save_line = T(f"sv.{pk}", cls="save") if save else ''
        badges = ''.join(T(k, cls=c) for k, c, on in (('bd.rec', 'pill pill-ember', pk in REC), ('bd.best', 'pill pill-best', pk in BEST)) if on)
        badges = f'\n                <span class="badges">{badges}</span>' if badges else ''
        action = book("time." + key) if caps else '<span class="book"></span>'
        S[f'pk.time.{key}'] = (f'Sewa waktu, {name[0].lower()} ({rp(price)})', f'Time hire, {name[1].lower()} ({rp(price)})', f'按时长预约，{name[2]}（{rp(price)}）')
        out.append(f'''            <li class="tier tier-time{' is-rec' if pk in REC else ''}">
              <span class="num" aria-hidden="true">{num}</span>
              <div class="name">
                {T(f"tm.{key}", cls="tn")}{badges}
              </div>
              <div class="air">
                {detail}
              </div>
              <div class="cost"><b>{rp_big(price)}</b>{save_line}</div>
              {action}
            </li>''')
    return '\n'.join(out)


pricing = f'''
  <!-- ============ PRICING ============ -->
  <section class="sec" id="pricing" aria-labelledby="prTitle">
    <div class="wrap">
      <div class="sec-head">
        <div>
          {T("pr.eyebrow", "p", "mono sec-eyebrow")}
          <h2 class="sec-title" id="prTitle">
            {T("pr.h1", cls="t-white")}
            {T("pr.h2", cls="t-ember")}
          </h2>
        </div>
        {T("pr.lead", "p", "sec-lead")}
      </div>

      <div class="grp">
        <div class="grp-side">
          <p class="mono">// DJI Mini 4 Pro</p>
          {T("pr.a.title", "h3", "grp-title")}
          {T("pr.a.note", "p", "grp-note")}
          <div class="batt">
            <img src="assets/mini-4-pro-battery.webp" alt="" width="270" height="420">
            <div>{T("pr.a.tag", cls="pill")}{T("pr.a.batt", "div", "name")}{T("pr.a.battm", "div", "meta")}</div>
          </div>
        </div>
        <ul class="tiers">
{battery_rows('cine', CINE)}
        </ul>
      </div>

      <div class="grp">
        <div class="grp-side">
          <p class="mono">// Nazgul Evoque V3 · CineLog35 V3</p>
          {T("pr.b.title", "h3", "grp-title")}
          {T("pr.b.note", "p", "grp-note")}
          <div class="batt">
            <img src="assets/cnhl-1500-6s.webp" alt="" width="520" height="496">
            <div>{T("pr.a.tag", cls="pill")}{T("pr.b.batt", "div", "name")}{T("pr.b.battm", "div", "meta")}</div>
          </div>
        </div>
        <ul class="tiers">
{battery_rows('fpv', FPV)}
        </ul>
      </div>

      <div class="grp">
        <div class="grp-side">
          {T("pr.c.eyebrow", "p", "mono")}
          {T("pr.c.title", "h3", "grp-title")}
          {T("pr.c.note", "p", "grp-note")}
        </div>
        <ul class="tiers">
{time_rows()}
        </ul>
      </div>

      <div class="fine">
        <div>{T("pr.fn1h", "p", "mono")}{T("pr.fn1", "p")}</div>
        <div>{T("pr.fn2h", "p", "mono")}{T("pr.fn2", "p")}</div>
        <div>{T("pr.fn3h", "p", "mono")}{T("pr.fn3", "p")}</div>
      </div>
    </div>
  </section>
'''

# ---------- bundles and add-ons ----------
S['ad.eyebrow'] = ('// Bundling dan add-on', '// Bundles and add-ons', '// 套餐与加购')
S['ad.h1'] = ('Gabung', 'Bundle', '组合预约')
S['ad.h2'] = ('dan hemat', 'and save', '更省')
S['ad.lead'] = ('Untuk event yang butuh kedua jenis drone, atau shooting seharian. Kebutuhan khusus bisa dibicarakan lewat WhatsApp.',
                'For events that need both kinds of drone, or a whole day of shooting. Custom requirements are sorted out on WhatsApp.',
                '适合需要两种机型或全天拍摄的活动。特殊需求可通过 WhatsApp 沟通。')
S['ad.hy.tag'] = ('Hybrid event', 'Hybrid event', '双机活动套餐')
S['ad.hy.title'] = ('Mini 4 Pro + FPV dalam satu job', 'Mini 4 Pro + FPV on one job', '同场使用 Mini 4 Pro + FPV')
S['ad.hy.lab'] = ('Hemat', 'Save', '立减')
S['ad.hy.desc'] = ('Booking satu paket cinematic dan satu paket FPV untuk event yang sama, dan total dipotong Rp250.000.',
                   'Book one cinematic package and one FPV package for the same event and Rp250.000 comes off the total.',
                   '同一场活动同时预约一个航拍套餐和一个 FPV 套餐，总价立减 Rp250.000。')
S['ad.hy.ex'] = ('Contoh: Extended Rp749.000 + Standard Rp849.000 = Rp1.598.000, menjadi Rp1.348.000',
                 'Example: Extended Rp749.000 + Standard Rp849.000 = Rp1.598.000, down to Rp1.348.000',
                 '示例：加长 Rp749.000 + 标准 Rp849.000 = Rp1.598.000，优惠后 Rp1.348.000')
S['ad.fd.tag'] = ('Full day', 'Full day', '全天')
S['ad.fd.title'] = ('4–5 jam, baterai tanpa batas', '4–5 hours, unlimited batteries', '4–5 小时，电池不限')
S['ad.fd.lab'] = ('Mulai', 'From', '起价')
S['ad.fd.desc'] = ('Untuk shooting seharian: terbang sebanyak yang dibutuhkan tanpa menghitung baterai.',
                   'For day-long shoots: fly as much as the job needs without counting batteries.',
                   '适合全天拍摄：按需飞行，不计电池数量。')
S['ad.fd.ex'] = ('Harga final mengikuti lokasi dan kebutuhan', 'Final price depends on location and scope', '最终价格视地点和需求而定')
S['ad.x.title'] = ('Add-on', 'Add-ons', '加购项目')
S['ad.x1'] = ('Baterai tambahan', 'Extra battery', '额外电池')
S['ad.x1d'] = ('Tambahan airtime di paket mana pun', 'More airtime on any package', '为任意套餐增加飞行时间')
S['ad.x1u'] = ('per buah', 'each', '每块')
S['ad.x2'] = ('Mount action cam', 'Action cam mount', '运动相机支架')
S['ad.x2d'] = ('Gratis di paket FPV Full Session', 'Free with the FPV Full Session package', 'FPV 全场套餐免费附赠')
S['ad.x3'] = ('Edit video highlight', 'Highlight video edit', '精彩集锦剪辑')
S['ad.x3d'] = ('Footage Anda dirangkai menjadi satu video highlight', 'Your footage cut into one highlight video', '将您的素材剪辑成一支精彩集锦')
S['ad.from'] = ('mulai', 'from', '起')
S['ad.custom'] = ('Kebutuhan khusus atau lokasi yang sulit? Kirim detailnya dan dapatkan penawaran.',
                  'Custom requirements or a tricky location? Send the details and get a quote.',
                  '有特殊需求或拍摄地点复杂？发送详情获取报价。')
S['pk.hybrid'] = ('Hybrid Event (Mini 4 Pro + FPV)', 'Hybrid Event (Mini 4 Pro + FPV)', '双机活动套餐（Mini 4 Pro + FPV）')
S['pk.fullday'] = ('Full Day 4–5 jam, baterai tanpa batas', 'Full Day, 4–5 hours, unlimited batteries', '全天 4–5 小时，电池不限')
S['svc.ask'] = ('Tanya via WhatsApp', 'Ask on WhatsApp', 'WhatsApp 咨询')

bundles = f'''
  <!-- ============ BUNDLES AND ADD-ONS ============ -->
  <section class="sec" id="addons" aria-labelledby="adTitle">
    <div class="wrap">
      <div class="sec-head">
        <div>
          {T("ad.eyebrow", "p", "mono sec-eyebrow")}
          <h2 class="sec-title" id="adTitle">
            {T("ad.h1", cls="t-white")}
            {T("ad.h2", cls="t-ember")}
          </h2>
        </div>
        {T("ad.lead", "p", "sec-lead")}
      </div>

      <div class="ways">
        <article class="way deal">
          <header class="way-top">
            {T("ad.hy.tag", cls="pill")}
            <span class="mono">Mini 4 Pro + FPV</span>
          </header>
          <p class="figure"><span class="mono" data-i18n="ad.hy.lab">{S["ad.hy.lab"][0]}</span><b>{rp(250000)}</b></p>
          {T("ad.hy.title", "h3", "way-title")}
          {T("ad.hy.desc", "p", "way-desc")}
          {T("ad.hy.ex", "p", "mono eg")}
          {book("hybrid")}
        </article>
        <article class="way deal">
          <header class="way-top">
            {T("ad.fd.tag", cls="pill")}
            <span class="mono">4–5 h</span>
          </header>
          <p class="figure"><span class="mono" data-i18n="ad.fd.lab">{S["ad.fd.lab"][0]}</span><b>{rp_big(2199000)}</b></p>
          {T("ad.fd.title", "h3", "way-title")}
          {T("ad.fd.desc", "p", "way-desc")}
          {T("ad.fd.ex", "p", "mono eg")}
          {book("fullday")}
        </article>
      </div>

      <div class="grp grp-addons">
        <div class="grp-side">
          {T("ad.x.title", "h3", "grp-title")}
        </div>
        <ul class="tiers extras">
          <li><div class="name">{T("ad.x1", cls="tn")}{T("ad.x1d", cls="per")}</div><div class="cost"><b>{rp_big(249000)}</b>{T("ad.x1u", cls="per")}</div></li>
          <li><div class="name">{T("ad.x2", cls="tn")}{T("ad.x2d", cls="per")}</div><div class="cost"><b>{rp_big(149000)}</b></div></li>
          <li><div class="name">{T("ad.x3", cls="tn")}{T("ad.x3d", cls="per")}</div><div class="cost"><b>{rp_big(749000)}</b>{T("ad.from", cls="per")}</div></li>
        </ul>
      </div>

      <div class="both">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 6.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4 3v-3H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z"/></svg>
        {T("ad.custom", "p")}
        <a class="btn btn-line btn-sm" data-wa href="https://wa.me/6285714727038" target="_blank" rel="noopener" data-i18n="svc.ask">{S["svc.ask"][0]}</a>
      </div>
    </div>
  </section>
'''

# ---------- FAQ ----------
S['fq.eyebrow'] = ('// FAQ dan ketentuan', '// FAQ and terms', '// 常见问题与条款')
S['fq.h1'] = ('Sebelum', 'Before', '预约')
S['fq.h2'] = ('booking', 'you book', '须知')
FAQ = [
    (('Bagaimana durasi dihitung?', 'Di paket baterai, durasi dihitung dari airtime, yaitu waktu terbang bersih. Persiapan di darat tidak memotong durasi yang Anda beli.'),
     ('How is duration counted?', "On battery packages, duration is counted as airtime: clean flight time. Setup on the ground doesn't cut into the minutes you bought."),
     ('时长如何计算？', '电池套餐按净飞行时间计算。地面准备不占用您购买的时长。')),
    (('Kenapa airtime FPV bisa berbeda?', 'Durasi FPV sangat bergantung pada agresivitas manuver di lokasi. Semakin agresif terbangnya, semakin cepat baterai habis, jadi angka sekitar 5 menit per baterai adalah estimasi.'),
     ('Why does FPV airtime vary?', 'FPV airtime depends heavily on how aggressively the drone is flown on site. Harder flying drains a battery faster, so about 5 minutes per battery is an estimate.'),
     ('为什么 FPV 的飞行时间会变化？', 'FPV 的飞行时间很大程度上取决于现场动作的激烈程度。飞得越激烈，电池消耗越快，因此每块电池约 5 分钟只是估算。')),
    (('Bagaimana kalau cuaca buruk?', 'Pilot berhak menunda atau menjadwalkan ulang penerbangan jika cuaca buruk atau lokasi berisiko tinggi, demi keselamatan.'),
     ('What happens in bad weather?', 'The pilot may delay or postpone a flight when the weather is bad or the location is high-risk. Safety comes first.'),
     ('遇到恶劣天气怎么办？', '如遇恶劣天气或高风险场地，飞手有权出于安全考虑推迟或改期飞行。')),
    (('Bagaimana cara kerja sewa waktu?', 'Anda membooking pilot di lokasi selama 30 menit, 1 jam, atau lebih. Waktu yang dibooking tetap dibayar, terbang atau tidak. Setiap slot sudah termasuk sejumlah baterai, dan baterai tambahan Rp249.000 per buah.'),
     ('How does time hire work?', 'You book the pilot on site for 30 minutes, 1 hour or longer. The time booked is paid whether or not the drone flies. Each slot includes a set number of batteries, and extra batteries are Rp249.000 each.'),
     ('按时长预约如何运作？', '您可预约飞手到场 30 分钟、1 小时或更久。无论是否起飞，均按预约时长计费。每个时段包含一定数量的电池，额外电池每块 Rp249.000。')),
    (('Apakah melayani di luar Jakarta?', 'Ya, seluruh Indonesia. REFLY × Wendrone berbasis di Jakarta. Harga paket belum termasuk transportasi, baik di dalam maupun di luar Jakarta: biayanya menyesuaikan jarak lokasi dan disepakati bersama sebelum booking.'),
     ('Do you fly outside Jakarta?', 'Yes, anywhere in Indonesia. REFLY × Wendrone is based in Jakarta. Transport is not included in the package prices, inside Jakarta or outside it: the cost depends on the distance and is agreed with you before booking.'),
     ('雅加达以外可以拍摄吗？', '可以，服务覆盖印尼全境。REFLY × Wendrone 常驻雅加达。套餐价格不含交通费，雅加达市内或市外均如此：交通费视距离而定，预约前与您商定。')),
    (('Apakah editing sudah termasuk?', 'Paket mencakup penerbangan dan footage-nya. Edit video highlight tersedia sebagai add-on mulai Rp749.000.'),
     ('Is editing included?', 'Packages cover the flying and the footage. A highlight video edit is an add-on from Rp749.000.'),
     ('套餐包含剪辑吗？', '套餐包含飞行拍摄和素材。精彩集锦剪辑为加购项目，Rp749.000 起。')),
    (('Bagaimana cara booking?', 'Kirim pesan WhatsApp berisi tanggal, lokasi, dan apa yang ingin direkam. Balasannya berisi paket yang sesuai, biaya transportasi, dan totalnya.'),
     ('How do I book?', 'Send a WhatsApp message with the date, the location and what you want to film. The reply has the package that fits, the transport cost and the total.'),
     ('如何预约？', '通过 WhatsApp 发送日期、地点和拍摄内容，即可收到合适的套餐、交通费和总价。')),
]
items = []
for i, (idn, en, zh) in enumerate(FAQ, 1):
    S[f'fq.q{i}'] = (idn[0], en[0], zh[0]); S[f'fq.a{i}'] = (idn[1], en[1], zh[1])
    items.append(f'''          <details class="q" id="faq{i}"{' open' if i == 1 else ''}>
            <summary>{T(f"fq.q{i}")}<i aria-hidden="true"></i></summary>
            {T(f"fq.a{i}", "p")}
          </details>''')
faq = f'''
  <!-- ============ FAQ AND TERMS ============ -->
  <section class="sec" id="faq" aria-labelledby="fqTitle">
    <div class="wrap">
      <div class="grp grp-faq">
        <div class="grp-side">
          {T("fq.eyebrow", "p", "mono sec-eyebrow")}
          <h2 class="sec-title" id="fqTitle">
            {T("fq.h1", cls="t-white")}
            {T("fq.h2", cls="t-ember")}
          </h2>
        </div>
        <div class="qs">
{chr(10).join(items)}
        </div>
      </div>
    </div>
  </section>
'''

# ---------- closing band and footer ----------
S['ct.h1'] = ('Siap', 'Ready', '准备好')
S['ct.h2'] = ('terbang?', 'to fly?', '起飞了吗？')
S['ct.lead'] = ('Kirim tanggal dan lokasi Anda. Balasannya berisi paket yang pas, biaya transportasi, dan totalnya.',
                'Send your date and location. The reply has the package that fits, the transport cost and the total.',
                '发送日期和地点，即可收到合适的套餐、交通费和总价。')
S['ct.copy'] = ('Salin nomor', 'Copy number', '复制号码')
S['ct.copied'] = ('Tersalin', 'Copied', '已复制')
S['ft.base'] = ('Berbasis di Jakarta, melayani seluruh Indonesia', 'Based in Jakarta, flying all over Indonesia', '常驻雅加达，服务印尼全境')
S['hero.cta'] = ('Booking via WhatsApp', 'Book on WhatsApp', 'WhatsApp 预约')
closing = f'''
  <!-- ============ CLOSING BAND ============ -->
  <section class="sec final" id="book" aria-labelledby="ctTitle">
    <div class="wrap">
      <div class="final-grid">
        <h2 class="final-title" id="ctTitle">
          {T("ct.h1", cls="t-white")}
          {T("ct.h2", cls="t-ember")}
        </h2>
        <div class="final-side">
          {T("ct.lead", "p", "sec-lead")}
          <a class="btn btn-ember" data-wa href="https://wa.me/6285714727038" target="_blank" rel="noopener">
            <span data-i18n="hero.cta">{S["hero.cta"][0]}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>
          </a>
          <p class="mono contact">WhatsApp <span class="num" id="waNumber">+62 857-1472-7038</span> <button type="button" class="copy-btn" id="copyBtn" data-i18n="ct.copy">{S["ct.copy"][0]}</button></p>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- ============ FOOTER ============ -->
<footer class="foot">
  <div class="wrap foot-row">
    <a class="brand" href="#home" aria-label="REFLY × Wendrone">
      <span class="brand-mark"><img src="assets/logo-mark.webp" alt="" width="36" height="36"></span>
      <span class="brand-name">REFLY <span>× Wendrone</span></span>
    </a>
    {T("ft.base", "p", "mono")}
    <nav class="foot-links" aria-label="Footer">
      <a href="#services" data-i18n="nav.services">Layanan</a>
      <a href="#pricing" data-i18n="nav.pricing">Harga</a>
      <a href="#addons" data-i18n="nav.addons">Bundling</a>
      <a href="#faq" data-i18n="nav.faq">FAQ</a>
    </nav>
    <p class="mono">© 2026 REFLY × Wendrone</p>
  </div>
</footer>
'''

# ---------- write body ----------
b = (R / 'src/body.html').read_text()
mark = '  <!-- ============ PRICING ============ -->'
if mark in b:
    b = b[:b.index(mark)].rstrip() + '\n</main>\n'
assert b.rstrip().endswith('</main>')
b = b.rstrip()[:-len('</main>')].rstrip() + '\n' + pricing + bundles + faq + closing
(R / 'src/body.html').write_text(b)

# ---------- write copy ----------
j = (R / 'src/main.js').read_text()
j = re.sub(r"\n      /\* gen:start \*/.*?/\* gen:end \*/\n", "\n", j, flags=re.S)
anchors = ["      'wa.text': 'Halo REFLY × Wendrone", "      'wa.text': \"Hi REFLY × Wendrone", "      'wa.text': '你好 REFLY × Wendrone"]
for li, anc in enumerate(anchors):
    block = '      /* gen:start */\n' + ''.join(f"      {json.dumps(k, ensure_ascii=False)}: {json.dumps(v[li], ensure_ascii=False)},\n" for k, v in S.items() if k not in ('hero.cta', 'svc.ask')) + '      /* gen:end */\n'
    assert anc in j, anc
    j = j.replace(anc, block + anc)
(R / 'src/main.js').write_text(j)
print('sections written;', len(S), 'strings per language')
