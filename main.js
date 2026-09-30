/* REFLY × Wendrone — page script (vanilla JS, no dependencies) */
(function () {
  'use strict';

  var WA_NUMBER = '6285714727038';

  /* ---------- copy: Indonesian (default), English, Chinese ---------- */
  var I18N = {
    id: {
      'nav.services': 'Layanan', 'nav.pricing': 'Harga', 'nav.addons': 'Bundling', 'nav.faq': 'FAQ', 'nav.book': 'Booking',
      'hero.eyebrow': '// Solusi dokumentasi udara', 'hero.area': '// Dari Jakarta ke seluruh Indonesia',
      'hero.for': '// Untuk filmmaker<br>// Untuk event organizer',
      'hero.h1': 'Video', 'hero.h2': 'Udara', 'hero.h3': 'Cinematic', 'hero.h4': '& Action',
      'hero.lead': 'Rekaman 4K/60 yang lebar dan mulus dari <strong>DJI Mini 4 Pro</strong>, siap diperlambat dan di‑grading. Chase, dive, dan fly-through indoor dari <strong>drone FPV</strong>. Booking per baterai, atau bayar waktu pilot di lokasi, terbang atau tidak.',
      'hero.cta': 'Booking via WhatsApp', 'hero.cta2': 'Lihat harga',
      'card.cine': 'Aerial cinematic', 'card.cineMeta': 'Wide shot · ~18 menit per baterai',
      'card.fpv': 'High-action FPV', 'card.outMeta': '5" outdoor · ~5 menit per baterai', 'card.inMeta': '3.5" indoor · ~5 menit per baterai',
      'tile.batt': 'Per baterai', 'tile.battV': 'Mulai <b>Rp450.000</b><br>Hanya airtime',
      'tile.time': 'Per waktu', 'tile.timeV': 'Mulai <b>Rp500.000</b><br>Terbang atau tidak',
      'tile.both': 'Hybrid event', 'tile.bothV': 'Hemat <b>Rp250.000</b><br>Mini 4 Pro + FPV',
      'tile.free': 'Sudah termasuk', 'tile.freeV': '<b>Gratis</b><br>ND filter, strobe light',
      'svc.eyebrow': '// Layanan', 'svc.h1': 'Mulus', 'svc.h2': 'atau cepat?',
      'svc.lead': 'Dua gaya terbang, dua jenis footage. Pilih salah satu, atau booking keduanya untuk event yang sama.',
      'svc.best': 'Cocok untuk', 'svc.look': 'Tampilan', 'svc.air': 'Airtime', 'svc.from': 'Mulai', 'svc.see': 'Lihat paket',
      'svc.a.title': 'Mulus dan lebar', 'svc.a.desc': 'Kamera berstabilisasi yang menjaga horizon tetap rata saat drone melayang. Shot yang menunjukkan lokasi dan skalanya.',
      'svc.a.l1': 'Reveal', 'svc.a.l2': 'Orbit', 'svc.a.l3': 'Subjek',
      'svc.a.best': 'Reveal venue, lanskap, foto grup', 'svc.a.look': '4K/60, stabil, mudah diperlambat dan di‑grading', 'svc.a.air': '~18 menit per baterai',
      'svc.b.title': 'Cepat dan dekat', 'svc.b.desc': 'Diterbangkan manual lewat goggle, sehingga kamera bisa dive, chase, dan menembus celah. Shot yang membawa penonton masuk ke dalam aksi.',
      'svc.b.l1': 'Dive', 'svc.b.l2': 'Fly-through', 'svc.b.l3': 'Chase',
      'svc.b.best': 'Kendaraan, olahraga, tur venue one-take', 'svc.b.look': 'Manuver miring, kecepatan, dekat dengan aksi', 'svc.b.air': '~5 menit per baterai, outdoor dan indoor',
      'svc.both': 'Butuh keduanya dalam satu job? <strong>Hybrid event</strong> memadukan Mini 4 Pro dan FPV, hemat <strong>Rp250.000</strong>.', 'svc.ask': 'Tanya via WhatsApp',
      /* gen:start */
      "u.batt1": "baterai",
      "u.battn": "baterai",
      "pk.book": "Booking",
      "wa.pack": "Halo REFLY × Wendrone, saya ingin booking: {p}.",
      "tn.basic": "Basic",
      "tn.ext": "Extended",
      "tn.pro": "Pro",
      "tn.std": "Standard",
      "tn.full": "Full Session",
      "pr.eyebrow": "// Harga",
      "pr.h1": "Per baterai",
      "pr.h2": "atau per waktu",
      "pr.lead": "Paket baterai hanya menghitung airtime bersih. Sewa waktu membuat pilot standby di lokasi. Semua bar airtime memakai satu skala, jadi bisa langsung dibandingkan.",
      "pr.a.title": "Aerial cinematic",
      "pr.a.note": "4K/60. ND filter dan strobe light gratis di setiap paket.",
      "pr.a.batt": "Baterai Mini 4 Pro",
      "pr.a.battm": "~18 menit airtime per baterai",
      "pr.b.title": "High‑action FPV",
      "pr.b.note": "Outdoor dan indoor. ND filter dan strobe light gratis di setiap paket. Airtime berubah mengikuti agresivitas terbang.",
      "pr.b.batt": "Baterai FPV",
      "pr.b.battm": "~5 menit airtime per baterai",
      "pr.c.eyebrow": "// Pilot standby di lokasi",
      "pr.c.title": "Sewa waktu",
      "pr.c.note": "Pilot standby di lokasi selama slot dan terbang sesuai aba-aba. Anda membayar sesuai waktu yang dibooking, terbang atau tidak. Baterai tambahan Rp250.000 per buah.",
      "pr.mount": "Gratis mount cam",
      "pr.a.tag": "1 baterai",
      "pr.fn1h": "// Airtime",
      "pr.fn2h": "// Transportasi",
      "pr.fn1": "Airtime adalah estimasi. Airtime FPV sangat bergantung pada agresivitas manuver di lokasi.",
      "pr.fn2": "Harga belum termasuk transportasi, di dalam maupun di luar Jakarta. Biayanya menyesuaikan jarak lokasi dan disepakati bersama sebelum booking.",
      "u.hour": "jam",
      "u.hours": "jam",
      "air.18": "~18 menit airtime",
      "per.cine.basic": "~Rp25.000 per menit",
      "pk.cine.basic": "Aerial Cinematic Basic (1 baterai, Rp450.000)",
      "air.35": "~35 menit airtime",
      "per.cine.ext": "~Rp21.400 per menit",
      "pk.cine.ext": "Aerial Cinematic Extended (2 baterai, Rp750.000)",
      "air.50": "~50 menit airtime",
      "per.cine.pro": "~Rp19.000 per menit",
      "pk.cine.pro": "Aerial Cinematic Pro (3 baterai, Rp950.000)",
      "air.10": "~10 menit airtime",
      "per.fpv.basic": "~Rp50.000 per menit",
      "pk.fpv.basic": "High-Action FPV Basic (2 baterai, Rp500.000)",
      "air.20": "~20 menit airtime",
      "per.fpv.std": "~Rp42.500 per menit",
      "pk.fpv.std": "High-Action FPV Standard (4 baterai, Rp850.000)",
      "air.30": "~30 menit airtime",
      "per.fpv.ext": "~Rp36.700 per menit",
      "pk.fpv.ext": "High-Action FPV Extended (6 baterai, Rp1.100.000)",
      "air.40": "~40 menit airtime",
      "per.fpv.full": "~Rp33.800 per menit",
      "pk.fpv.full": "High-Action FPV Full Session (8 baterai, Rp1.350.000)",
      "tm.t30": "30 menit",
      "tm.t30.d": "Termasuk hingga 1 baterai Mini atau 2 baterai FPV",
      "pk.time.t30": "Sewa waktu, 30 menit (Rp500.000)",
      "tm.t60": "1 jam",
      "tm.t60.d": "Termasuk hingga 2 baterai Mini atau 4 baterai FPV",
      "pk.time.t60": "Sewa waktu, 1 jam (Rp900.000)",
      "tm.t120": "2 jam",
      "tm.t120.d": "Termasuk hingga 3 baterai Mini atau 6 baterai FPV",
      "pk.time.t120": "Sewa waktu, 2 jam (Rp1.500.000)",
      "tm.tx": "Tiap jam tambahan",
      "pk.time.tx": "Sewa waktu, tiap jam tambahan (Rp600.000)",
      "ad.eyebrow": "// Bundling dan add-on",
      "ad.h1": "Gabung",
      "ad.h2": "dan hemat",
      "ad.lead": "Untuk event yang butuh kedua jenis drone, atau shooting seharian. Kebutuhan khusus bisa dibicarakan lewat WhatsApp.",
      "ad.hy.tag": "Hybrid event",
      "ad.hy.title": "Mini 4 Pro + FPV dalam satu job",
      "ad.hy.lab": "Hemat",
      "ad.hy.desc": "Booking satu paket cinematic dan satu paket FPV untuk event yang sama, dan total dipotong Rp250.000.",
      "ad.hy.ex": "Contoh: Extended Rp750.000 + Standard Rp850.000 = Rp1.600.000, menjadi Rp1.350.000",
      "ad.fd.tag": "Full day",
      "ad.fd.title": "4–5 jam, baterai tanpa batas",
      "ad.fd.lab": "Mulai",
      "ad.fd.desc": "Untuk shooting seharian: terbang sebanyak yang dibutuhkan tanpa menghitung baterai.",
      "ad.fd.ex": "Harga final mengikuti lokasi dan kebutuhan",
      "ad.x.title": "Add-on",
      "ad.x1": "Baterai tambahan",
      "ad.x1d": "Tambahan airtime di paket mana pun",
      "ad.x1u": "per buah",
      "ad.x2": "Mount action cam",
      "ad.x2d": "Gratis di paket FPV Full Session",
      "ad.x3": "Edit video highlight",
      "ad.x3d": "Footage Anda dirangkai menjadi satu video highlight",
      "ad.from": "mulai",
      "ad.custom": "Kebutuhan khusus atau lokasi yang sulit? Kirim detailnya dan dapatkan penawaran.",
      "pk.hybrid": "Hybrid Event (Mini 4 Pro + FPV)",
      "pk.fullday": "Full Day 4–5 jam, baterai tanpa batas",
      "fq.eyebrow": "// FAQ dan ketentuan",
      "fq.h1": "Sebelum",
      "fq.h2": "booking",
      "fq.q1": "Bagaimana durasi dihitung?",
      "fq.a1": "Di paket baterai, durasi dihitung dari airtime, yaitu waktu terbang bersih. Persiapan di darat tidak memotong durasi yang Anda beli.",
      "fq.q2": "Kenapa airtime FPV bisa berbeda?",
      "fq.a2": "Durasi FPV sangat bergantung pada agresivitas manuver di lokasi. Semakin agresif terbangnya, semakin cepat baterai habis, jadi angka sekitar 5 menit per baterai adalah estimasi.",
      "fq.q3": "Bagaimana kalau cuaca buruk?",
      "fq.a3": "Pilot berhak menunda atau menjadwalkan ulang penerbangan jika cuaca buruk atau lokasi berisiko tinggi, demi keselamatan.",
      "fq.q4": "Bagaimana cara kerja sewa waktu?",
      "fq.a4": "Anda membooking pilot di lokasi selama 30 menit, 1 jam, atau lebih. Waktu yang dibooking tetap dibayar, terbang atau tidak. Setiap slot sudah termasuk sejumlah baterai, dan baterai tambahan Rp250.000 per buah.",
      "fq.q5": "Apakah melayani di luar Jakarta?",
      "fq.a5": "Ya, seluruh Indonesia. REFLY × Wendrone berbasis di Jakarta. Harga paket belum termasuk transportasi, baik di dalam maupun di luar Jakarta: biayanya menyesuaikan jarak lokasi dan disepakati bersama sebelum booking.",
      "fq.q6": "Apakah editing sudah termasuk?",
      "fq.a6": "Paket mencakup penerbangan dan footage-nya. Edit video highlight tersedia sebagai add-on mulai Rp750.000.",
      "fq.q7": "Bagaimana cara booking?",
      "fq.a7": "Kirim pesan WhatsApp berisi tanggal, lokasi, dan apa yang ingin direkam. Balasannya berisi paket yang sesuai, biaya transportasi, dan totalnya.",
      "ct.h1": "Siap",
      "ct.h2": "terbang?",
      "ct.lead": "Kirim tanggal dan lokasi Anda. Balasannya berisi paket yang pas, biaya transportasi, dan totalnya.",
      "ct.copy": "Salin nomor",
      "ct.copied": "Tersalin",
      "ft.base": "Berbasis di Jakarta, melayani seluruh Indonesia",
      /* gen:end */
      'wa.text': 'Halo REFLY × Wendrone, saya ingin booking jasa drone.'
    },
    en: {
      'nav.services': 'Services', 'nav.pricing': 'Pricing', 'nav.addons': 'Bundles', 'nav.faq': 'FAQ', 'nav.book': 'Book now',
      'hero.eyebrow': '// Drone videography', 'hero.area': '// From Jakarta to all of Indonesia',
      'hero.for': '// For filmmakers<br>// For event organizers',
      'hero.h1': 'Aerial', 'hero.h2': 'Footage', 'hero.h3': 'Cinematic', 'hero.h4': '& Action',
      'hero.lead': 'Smooth, wide 4K/60 from a <strong>DJI Mini 4 Pro</strong>, ready to slow down and grade. Chases, dives and indoor fly-throughs from <strong>FPV drones</strong>. Book by the battery, or pay for the pilot\'s time on site, flying or not.',
      'hero.cta': 'Book on WhatsApp', 'hero.cta2': 'See pricing',
      'card.cine': 'Aerial cinematic', 'card.cineMeta': 'Wide shots · ~18 min per battery',
      'card.fpv': 'High-action FPV', 'card.outMeta': '5" outdoor · ~5 min per battery', 'card.inMeta': '3.5" indoor · ~5 min per battery',
      'tile.batt': 'By battery', 'tile.battV': 'From <b>Rp450.000</b><br>Only airtime counts',
      'tile.time': 'By time', 'tile.timeV': 'From <b>Rp500.000</b><br>Flying or not',
      'tile.both': 'Hybrid event', 'tile.bothV': 'Save <b>Rp250.000</b><br>Mini 4 Pro + FPV',
      'tile.free': 'Included', 'tile.freeV': '<b>Free</b><br>ND filter, strobes',
      'svc.eyebrow': '// Services', 'svc.h1': 'Smooth', 'svc.h2': 'or fast?',
      'svc.lead': 'Two ways of flying, two kinds of footage. Pick one, or book both for the same event.',
      'svc.best': 'Best for', 'svc.look': 'The look', 'svc.air': 'Airtime', 'svc.from': 'From', 'svc.see': 'See packages',
      'svc.a.title': 'Smooth and wide', 'svc.a.desc': 'A stabilised camera that keeps the horizon level while the drone glides. The shots that show where you are and how big it is.',
      'svc.a.l1': 'Reveal', 'svc.a.l2': 'Orbit', 'svc.a.l3': 'Subject',
      'svc.a.best': 'Venue reveals, landscapes, group shots', 'svc.a.look': '4K/60, steady, easy to slow down and grade', 'svc.a.air': '~18 min per battery',
      'svc.b.title': 'Fast and close', 'svc.b.desc': 'Flown by hand through goggles, so the camera can dive, chase and thread through gaps. The shots that put the viewer inside the action.',
      'svc.b.l1': 'Dive', 'svc.b.l2': 'Fly-through', 'svc.b.l3': 'Chase',
      'svc.b.best': 'Vehicles, sports, one-take venue tours', 'svc.b.look': 'Banked turns, speed, close to the action', 'svc.b.air': '~5 min per battery, outdoor and indoor',
      'svc.both': 'Want both on one job? A <strong>hybrid event</strong> pairs the Mini 4 Pro with FPV and saves <strong>Rp250.000</strong>.', 'svc.ask': 'Ask on WhatsApp',
      /* gen:start */
      "u.batt1": "battery",
      "u.battn": "batteries",
      "pk.book": "Book",
      "wa.pack": "Hi REFLY × Wendrone, I'd like to book: {p}.",
      "tn.basic": "Basic",
      "tn.ext": "Extended",
      "tn.pro": "Pro",
      "tn.std": "Standard",
      "tn.full": "Full Session",
      "pr.eyebrow": "// Pricing",
      "pr.h1": "By battery",
      "pr.h2": "or by time",
      "pr.lead": "Battery packages count clean airtime only. Time hire keeps the pilot on site. All airtime bars share one scale, so they compare directly.",
      "pr.a.title": "Aerial cinematic",
      "pr.a.note": "4K/60. ND filter and strobe lights free with every package.",
      "pr.a.batt": "Mini 4 Pro battery",
      "pr.a.battm": "~18 min airtime each",
      "pr.b.title": "High‑action FPV",
      "pr.b.note": "Outdoor and indoor. ND filter and strobe lights free with every package. Airtime varies with how hard the drone is flown.",
      "pr.b.batt": "FPV battery",
      "pr.b.battm": "~5 min airtime each",
      "pr.c.eyebrow": "// Pilot on site",
      "pr.c.title": "Time hire",
      "pr.c.note": "The pilot stays on site for the whole slot and flies on cue. You pay for the time booked, flying or not. Extra batteries are Rp250.000 each.",
      "pr.mount": "Free cam mount",
      "pr.a.tag": "1 battery",
      "pr.fn1h": "// Airtime",
      "pr.fn2h": "// Transport",
      "pr.fn1": "Airtime figures are estimates. FPV airtime depends heavily on how aggressively the drone is flown on site.",
      "pr.fn2": "Prices do not include transport, inside Jakarta or outside it. The cost depends on the distance and is agreed with you before booking.",
      "u.hour": "hour",
      "u.hours": "hours",
      "air.18": "~18 min airtime",
      "per.cine.basic": "~Rp25.000 per minute",
      "pk.cine.basic": "Aerial Cinematic Basic (1 battery, Rp450.000)",
      "air.35": "~35 min airtime",
      "per.cine.ext": "~Rp21.400 per minute",
      "pk.cine.ext": "Aerial Cinematic Extended (2 batteries, Rp750.000)",
      "air.50": "~50 min airtime",
      "per.cine.pro": "~Rp19.000 per minute",
      "pk.cine.pro": "Aerial Cinematic Pro (3 batteries, Rp950.000)",
      "air.10": "~10 min airtime",
      "per.fpv.basic": "~Rp50.000 per minute",
      "pk.fpv.basic": "High-Action FPV Basic (2 batteries, Rp500.000)",
      "air.20": "~20 min airtime",
      "per.fpv.std": "~Rp42.500 per minute",
      "pk.fpv.std": "High-Action FPV Standard (4 batteries, Rp850.000)",
      "air.30": "~30 min airtime",
      "per.fpv.ext": "~Rp36.700 per minute",
      "pk.fpv.ext": "High-Action FPV Extended (6 batteries, Rp1.100.000)",
      "air.40": "~40 min airtime",
      "per.fpv.full": "~Rp33.800 per minute",
      "pk.fpv.full": "High-Action FPV Full Session (8 batteries, Rp1.350.000)",
      "tm.t30": "30 minutes",
      "tm.t30.d": "Includes up to 1 Mini or 2 FPV batteries",
      "pk.time.t30": "Time hire, 30 minutes (Rp500.000)",
      "tm.t60": "1 hour",
      "tm.t60.d": "Includes up to 2 Mini or 4 FPV batteries",
      "pk.time.t60": "Time hire, 1 hour (Rp900.000)",
      "tm.t120": "2 hours",
      "tm.t120.d": "Includes up to 3 Mini or 6 FPV batteries",
      "pk.time.t120": "Time hire, 2 hours (Rp1.500.000)",
      "tm.tx": "Each extra hour",
      "pk.time.tx": "Time hire, each extra hour (Rp600.000)",
      "ad.eyebrow": "// Bundles and add-ons",
      "ad.h1": "Bundle",
      "ad.h2": "and save",
      "ad.lead": "For events that need both kinds of drone, or a whole day of shooting. Custom requirements are sorted out on WhatsApp.",
      "ad.hy.tag": "Hybrid event",
      "ad.hy.title": "Mini 4 Pro + FPV on one job",
      "ad.hy.lab": "Save",
      "ad.hy.desc": "Book one cinematic package and one FPV package for the same event and Rp250.000 comes off the total.",
      "ad.hy.ex": "Example: Extended Rp750.000 + Standard Rp850.000 = Rp1.600.000, down to Rp1.350.000",
      "ad.fd.tag": "Full day",
      "ad.fd.title": "4–5 hours, unlimited batteries",
      "ad.fd.lab": "From",
      "ad.fd.desc": "For day-long shoots: fly as much as the job needs without counting batteries.",
      "ad.fd.ex": "Final price depends on location and scope",
      "ad.x.title": "Add-ons",
      "ad.x1": "Extra battery",
      "ad.x1d": "More airtime on any package",
      "ad.x1u": "each",
      "ad.x2": "Action cam mount",
      "ad.x2d": "Free with the FPV Full Session package",
      "ad.x3": "Highlight video edit",
      "ad.x3d": "Your footage cut into one highlight video",
      "ad.from": "from",
      "ad.custom": "Custom requirements or a tricky location? Send the details and get a quote.",
      "pk.hybrid": "Hybrid Event (Mini 4 Pro + FPV)",
      "pk.fullday": "Full Day, 4–5 hours, unlimited batteries",
      "fq.eyebrow": "// FAQ and terms",
      "fq.h1": "Before",
      "fq.h2": "you book",
      "fq.q1": "How is duration counted?",
      "fq.a1": "On battery packages, duration is counted as airtime: clean flight time. Setup on the ground doesn't cut into the minutes you bought.",
      "fq.q2": "Why does FPV airtime vary?",
      "fq.a2": "FPV airtime depends heavily on how aggressively the drone is flown on site. Harder flying drains a battery faster, so about 5 minutes per battery is an estimate.",
      "fq.q3": "What happens in bad weather?",
      "fq.a3": "The pilot may delay or postpone a flight when the weather is bad or the location is high-risk. Safety comes first.",
      "fq.q4": "How does time hire work?",
      "fq.a4": "You book the pilot on site for 30 minutes, 1 hour or longer. The time booked is paid whether or not the drone flies. Each slot includes a set number of batteries, and extra batteries are Rp250.000 each.",
      "fq.q5": "Do you fly outside Jakarta?",
      "fq.a5": "Yes, anywhere in Indonesia. REFLY × Wendrone is based in Jakarta. Transport is not included in the package prices, inside Jakarta or outside it: the cost depends on the distance and is agreed with you before booking.",
      "fq.q6": "Is editing included?",
      "fq.a6": "Packages cover the flying and the footage. A highlight video edit is an add-on from Rp750.000.",
      "fq.q7": "How do I book?",
      "fq.a7": "Send a WhatsApp message with the date, the location and what you want to film. The reply has the package that fits, the transport cost and the total.",
      "ct.h1": "Ready",
      "ct.h2": "to fly?",
      "ct.lead": "Send your date and location. The reply has the package that fits, the transport cost and the total.",
      "ct.copy": "Copy number",
      "ct.copied": "Copied",
      "ft.base": "Based in Jakarta, flying all over Indonesia",
      /* gen:end */
      'wa.text': "Hi REFLY × Wendrone, I'd like to book a drone shoot."
    },
    zh: {
      'nav.services': '服务', 'nav.pricing': '价格', 'nav.addons': '套餐', 'nav.faq': '常见问题', 'nav.book': '立即预约',
      'hero.eyebrow': '// 无人机影像', 'hero.area': '// 立足雅加达，服务印尼全境',
      'hero.for': '// 服务影视创作者<br>// 服务活动主办方',
      'hero.h1': '无人机', 'hero.h2': '航拍服务', 'hero.h3': '电影级质感', 'hero.h4': '& 高速跟拍',
      'hero.lead': '<strong>DJI Mini 4 Pro</strong> 拍摄平稳开阔的 4K/60 画面，可慢放、可调色。<strong>FPV 穿越机</strong>可拍摄追拍、俯冲和室内穿越镜头。可按电池套餐预约（只计空中飞行时间），也可按时长预约飞手到场（即使不起飞也按到场时间计费）。',
      'hero.cta': 'WhatsApp 预约', 'hero.cta2': '查看价格',
      'card.cine': '电影级航拍', 'card.cineMeta': '大场景 · 每块电池约 18 分钟',
      'card.fpv': 'FPV 高速跟拍', 'card.outMeta': '5 寸户外 · 每块电池约 5 分钟', 'card.inMeta': '3.5 寸室内 · 每块电池约 5 分钟',
      'tile.batt': '按电池计费', 'tile.battV': '<b>Rp450.000</b> 起<br>只计空中时间',
      'tile.time': '按时长计费', 'tile.timeV': '<b>Rp500.000</b> 起<br>无论是否起飞',
      'tile.both': '双机活动套餐', 'tile.bothV': '立减 <b>Rp250.000</b><br>Mini 4 Pro + FPV',
      'tile.free': '随单附赠', 'tile.freeV': '<b>免费</b><br>ND 滤镜、频闪灯',
      'svc.eyebrow': '// 服务', 'svc.h1': '平稳', 'svc.h2': '还是高速？',
      'svc.lead': '两种飞法，两种画面。可任选其一，也可同场预约两种。',
      'svc.best': '适合', 'svc.look': '画面', 'svc.air': '飞行时间', 'svc.from': '起价', 'svc.see': '查看套餐',
      'svc.a.title': '平稳开阔', 'svc.a.desc': '带云台增稳的相机在无人机滑行时保持地平线水平，拍出交代环境与规模的镜头。',
      'svc.a.l1': '揭示', 'svc.a.l2': '环绕', 'svc.a.l3': '主体',
      'svc.a.best': '场地全景、风光、合影', 'svc.a.look': '4K/60，稳定，便于慢放和调色', 'svc.a.air': '每块电池约 18 分钟',
      'svc.b.title': '高速贴近', 'svc.b.desc': '飞手戴眼镜手动操控，相机可以俯冲、追拍、穿越缝隙，让观众置身现场。',
      'svc.b.l1': '俯冲', 'svc.b.l2': '穿越', 'svc.b.l3': '追拍',
      'svc.b.best': '车辆、运动、一镜到底的场地穿越', 'svc.b.look': '倾斜转弯、速度感、贴近主体', 'svc.b.air': '每块电池约 5 分钟，户外和室内均可',
      'svc.both': '同一场需要两种？<strong>双机活动套餐</strong>搭配 Mini 4 Pro 和 FPV，立减 <strong>Rp250.000</strong>。', 'svc.ask': 'WhatsApp 咨询',
      /* gen:start */
      "u.batt1": "块电池",
      "u.battn": "块电池",
      "pk.book": "预约",
      "wa.pack": "你好 REFLY × Wendrone，我想预约：{p}。",
      "tn.basic": "基础",
      "tn.ext": "加长",
      "tn.pro": "专业",
      "tn.std": "标准",
      "tn.full": "全场",
      "pr.eyebrow": "// 价格",
      "pr.h1": "按电池",
      "pr.h2": "或按时长",
      "pr.lead": "电池套餐只计净飞行时间；按时长预约则飞手全程在场。所有飞行时间条使用同一比例，可直接比较。",
      "pr.a.title": "电影级航拍",
      "pr.a.note": "4K/60。每个套餐免费含 ND 滤镜和频闪灯。",
      "pr.a.batt": "Mini 4 Pro 电池",
      "pr.a.battm": "每块约 18 分钟飞行时间",
      "pr.b.title": "FPV 高速跟拍",
      "pr.b.note": "户外和室内均可。每个套餐免费含 ND 滤镜和频闪灯。飞行时间随动作激烈程度而变化。",
      "pr.b.batt": "FPV 电池",
      "pr.b.battm": "每块约 5 分钟飞行时间",
      "pr.c.eyebrow": "// 飞手到场待命",
      "pr.c.title": "按时长预约",
      "pr.c.note": "飞手在预约时段内全程在场，随时起飞。按预约时长计费，无论是否起飞。额外电池每块 Rp250.000。",
      "pr.mount": "赠相机支架",
      "pr.a.tag": "1 块电池",
      "pr.fn1h": "// 飞行时间",
      "pr.fn2h": "// 交通费",
      "pr.fn1": "飞行时间为估算值。FPV 的飞行时间很大程度上取决于现场飞行动作的激烈程度。",
      "pr.fn2": "价格不含交通费，雅加达市内或市外均如此。交通费视距离而定，预约前与您商定。",
      "u.hour": "小时",
      "u.hours": "小时",
      "air.18": "约 18 分钟飞行时间",
      "per.cine.basic": "约 Rp25.000/分钟",
      "pk.cine.basic": "电影级航拍 基础（1 块电池，Rp450.000）",
      "air.35": "约 35 分钟飞行时间",
      "per.cine.ext": "约 Rp21.400/分钟",
      "pk.cine.ext": "电影级航拍 加长（2 块电池，Rp750.000）",
      "air.50": "约 50 分钟飞行时间",
      "per.cine.pro": "约 Rp19.000/分钟",
      "pk.cine.pro": "电影级航拍 专业（3 块电池，Rp950.000）",
      "air.10": "约 10 分钟飞行时间",
      "per.fpv.basic": "约 Rp50.000/分钟",
      "pk.fpv.basic": "FPV 高速跟拍 基础（2 块电池，Rp500.000）",
      "air.20": "约 20 分钟飞行时间",
      "per.fpv.std": "约 Rp42.500/分钟",
      "pk.fpv.std": "FPV 高速跟拍 标准（4 块电池，Rp850.000）",
      "air.30": "约 30 分钟飞行时间",
      "per.fpv.ext": "约 Rp36.700/分钟",
      "pk.fpv.ext": "FPV 高速跟拍 加长（6 块电池，Rp1.100.000）",
      "air.40": "约 40 分钟飞行时间",
      "per.fpv.full": "约 Rp33.800/分钟",
      "pk.fpv.full": "FPV 高速跟拍 全场（8 块电池，Rp1.350.000）",
      "tm.t30": "30 分钟",
      "tm.t30.d": "最多含 1 块 Mini 或 2 块 FPV 电池",
      "pk.time.t30": "按时长预约，30 分钟（Rp500.000）",
      "tm.t60": "1 小时",
      "tm.t60.d": "最多含 2 块 Mini 或 4 块 FPV 电池",
      "pk.time.t60": "按时长预约，1 小时（Rp900.000）",
      "tm.t120": "2 小时",
      "tm.t120.d": "最多含 3 块 Mini 或 6 块 FPV 电池",
      "pk.time.t120": "按时长预约，2 小时（Rp1.500.000）",
      "tm.tx": "每增加 1 小时",
      "pk.time.tx": "按时长预约，每增加 1 小时（Rp600.000）",
      "ad.eyebrow": "// 套餐与加购",
      "ad.h1": "组合预约",
      "ad.h2": "更省",
      "ad.lead": "适合需要两种机型或全天拍摄的活动。特殊需求可通过 WhatsApp 沟通。",
      "ad.hy.tag": "双机活动套餐",
      "ad.hy.title": "同场使用 Mini 4 Pro + FPV",
      "ad.hy.lab": "立减",
      "ad.hy.desc": "同一场活动同时预约一个航拍套餐和一个 FPV 套餐，总价立减 Rp250.000。",
      "ad.hy.ex": "示例：加长 Rp750.000 + 标准 Rp850.000 = Rp1.600.000，优惠后 Rp1.350.000",
      "ad.fd.tag": "全天",
      "ad.fd.title": "4–5 小时，电池不限",
      "ad.fd.lab": "起价",
      "ad.fd.desc": "适合全天拍摄：按需飞行，不计电池数量。",
      "ad.fd.ex": "最终价格视地点和需求而定",
      "ad.x.title": "加购项目",
      "ad.x1": "额外电池",
      "ad.x1d": "为任意套餐增加飞行时间",
      "ad.x1u": "每块",
      "ad.x2": "运动相机支架",
      "ad.x2d": "FPV 全场套餐免费附赠",
      "ad.x3": "精彩集锦剪辑",
      "ad.x3d": "将您的素材剪辑成一支精彩集锦",
      "ad.from": "起",
      "ad.custom": "有特殊需求或拍摄地点复杂？发送详情获取报价。",
      "pk.hybrid": "双机活动套餐（Mini 4 Pro + FPV）",
      "pk.fullday": "全天 4–5 小时，电池不限",
      "fq.eyebrow": "// 常见问题与条款",
      "fq.h1": "预约",
      "fq.h2": "须知",
      "fq.q1": "时长如何计算？",
      "fq.a1": "电池套餐按净飞行时间计算。地面准备不占用您购买的时长。",
      "fq.q2": "为什么 FPV 的飞行时间会变化？",
      "fq.a2": "FPV 的飞行时间很大程度上取决于现场动作的激烈程度。飞得越激烈，电池消耗越快，因此每块电池约 5 分钟只是估算。",
      "fq.q3": "遇到恶劣天气怎么办？",
      "fq.a3": "如遇恶劣天气或高风险场地，飞手有权出于安全考虑推迟或改期飞行。",
      "fq.q4": "按时长预约如何运作？",
      "fq.a4": "您可预约飞手到场 30 分钟、1 小时或更久。无论是否起飞，均按预约时长计费。每个时段包含一定数量的电池，额外电池每块 Rp250.000。",
      "fq.q5": "雅加达以外可以拍摄吗？",
      "fq.a5": "可以，服务覆盖印尼全境。REFLY × Wendrone 常驻雅加达。套餐价格不含交通费，雅加达市内或市外均如此：交通费视距离而定，预约前与您商定。",
      "fq.q6": "套餐包含剪辑吗？",
      "fq.a6": "套餐包含飞行拍摄和素材。精彩集锦剪辑为加购项目，Rp750.000 起。",
      "fq.q7": "如何预约？",
      "fq.a7": "通过 WhatsApp 发送日期、地点和拍摄内容，即可收到合适的套餐、交通费和总价。",
      "ct.h1": "准备好",
      "ct.h2": "起飞了吗？",
      "ct.lead": "发送日期和地点，即可收到合适的套餐、交通费和总价。",
      "ct.copy": "复制号码",
      "ct.copied": "已复制",
      "ft.base": "常驻雅加达，服务印尼全境",
      /* gen:end */
      'wa.text': '你好 REFLY × Wendrone，我想预约无人机拍摄。'
    }
  };
  var LANGS = ['id', 'en', 'zh'];
  var HTML_LANG = { id: 'id', en: 'en', zh: 'zh-Hans' };
  var current = 'id';

  function t(key) { return (I18N[current] && I18N[current][key]) || I18N.id[key] || ''; }

  function setLang(lang, remember) {
    if (LANGS.indexOf(lang) < 0) lang = 'id';
    current = lang;
    document.documentElement.lang = HTML_LANG[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    var href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(t('wa.text'));
    document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = href; });
    document.querySelectorAll('[data-wa-pack]').forEach(function (a) {
      var msg = t('wa.pack').replace('{p}', t('pk.' + a.getAttribute('data-wa-pack')));
      a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
    });
    if (remember) { try { localStorage.setItem('refly-lang', lang); } catch (e) {} }
    if (window.__dock) window.__dock();
  }

  function initialLang() {
    var hash = (location.hash || '').replace('#', '');
    if (LANGS.indexOf(hash) >= 0) return hash;
    try { var saved = localStorage.getItem('refly-lang'); if (LANGS.indexOf(saved) >= 0) return saved; } catch (e) {}
    var nav = (navigator.language || 'id').toLowerCase();
    if (nav.indexOf('zh') === 0) return 'zh';
    if (nav.indexOf('id') === 0 || nav.indexOf('ms') === 0) return 'id';
    return 'en';
  }

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
  });
  setLang(initialLang(), false);

  /* ---------- nav: hairline once scrolled, phone menu ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('is-stuck', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var menuBtn = document.getElementById('menuBtn');
  var menuPanel = document.getElementById('menuPanel');
  menuBtn.addEventListener('click', function () {
    var open = menuPanel.hidden;
    menuPanel.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  menuPanel.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menuPanel.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- copy the WhatsApp number ---------- */
  var copyBtn = document.getElementById('copyBtn');
  var waNumber = document.getElementById('waNumber');
  if (copyBtn && waNumber) {
    copyBtn.addEventListener('click', function () {
      var done = function () {
        copyBtn.textContent = t('ct.copied');
        setTimeout(function () { copyBtn.textContent = t('ct.copy'); }, 1600);
      };
      var selectIt = function () {
        var r = document.createRange(); r.selectNodeContents(waNumber);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('+' + WA_NUMBER).then(done, selectIt);
      } else { selectIt(); }
    });
  }

  /* ---------- REC clock in the telemetry line ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var recTime = document.getElementById('recTime');
  if (recTime && !reduce) {
    var secs = 0;
    setInterval(function () {
      secs = (secs + 1) % (18 * 60); // one Mini 4 Pro battery
      var m = Math.floor(secs / 60), s = secs % 60;
      recTime.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }, 1000);
  }

  /* ---------- dock the product cards into the headline (desktop only) ----------
     Card A sits in the notch left of line 1; card B overlaps the first letter of line 4.
     Positions follow the text, so they hold in every language. */
  var headEl = document.querySelector('.hero-head');
  var cardsEl = document.getElementById('heroCards');
  var wide = window.matchMedia('(min-width: 1180px)');
  function dock() {
    if (!headEl || !cardsEl) return;
    var a = cardsEl.querySelector('.craft-a'), b = cardsEl.querySelector('.craft-b'), c = cardsEl.querySelector('.craft-c');
    if (!wide.matches) { [a, b, c].forEach(function (el) { el.removeAttribute('style'); }); return; }
    var h1 = headEl.querySelector('.headline');
    var lines = h1.querySelectorAll('span');
    var box = cardsEl.getBoundingClientRect();
    var fs = parseFloat(getComputedStyle(h1).fontSize);
    var first = lines[0].getBoundingClientRect(), last = lines[lines.length - 1].getBoundingClientRect();
    var gap = 28; // every card clears the type by this much, so no letter is ever cut
    // A (lead card): in the notch left of line 1, sitting on that line's baseline
    a.style.left = Math.round(first.left - box.left - gap - a.offsetWidth) + 'px';
    a.style.top = Math.round(first.bottom - box.top - 0.11 * fs - a.offsetHeight) + 'px';
    // B: under the last line, sharing its left edge
    var under = last.bottom - box.top + gap - 0.06 * fs;
    b.style.left = Math.round(last.left - box.left) + 'px';
    b.style.top = Math.round(under) + 'px';
    // C: under the last line, sharing its right edge, one clear step lower than B
    c.style.left = Math.round(last.right - box.left - c.offsetWidth) + 'px';
    c.style.top = Math.round(under + 56) + 'px';
    [a, b, c].forEach(function (el) { el.style.bottom = 'auto'; });
  }
  window.__dock = dock;

  /* ---------- services: flight paths stand still when motion is reduced ---------- */
  if (reduce) {
    document.querySelectorAll('.way-svg').forEach(function (svg) {
      try { svg.pauseAnimations(); svg.setCurrentTime(1.6); } catch (e) {}
    });
  }

  /* ---------- hero video: shown only when a <source> has been added ---------- */
  var video = document.getElementById('heroVideo');
  if (video && (video.querySelector('source') || video.getAttribute('src'))) {
    video.hidden = false;
    document.querySelector('.hero').classList.add('has-video');
  }

  /* ---------- hero ground: contour lines, like a survey map seen from above ---------- */
  var canvas = document.getElementById('heroGround');
  function hash(x, y) { var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); }
  function smooth(a) { return a * a * (3 - 2 * a); }
  function noise(x, y) {
    var xi = Math.floor(x), yi = Math.floor(y), xf = smooth(x - xi), yf = smooth(y - yi);
    var a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  }
  function height(x, y) { return 0.62 * noise(x, y) + 0.28 * noise(x * 2.1 + 9, y * 2.1 + 4) + 0.1 * noise(x * 4.3, y * 4.3); }

  function drawGround() {
    if (!canvas) return;
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var cell = 12, scale = 1 / 330;
    var cols = Math.ceil(w / cell) + 1, rows = Math.ceil(h / cell) + 1;
    var f = new Float32Array(cols * rows);
    for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) f[j * cols + i] = height(i * cell * scale + 3.7, j * cell * scale + 1.3);
    ctx.lineWidth = 1;
    for (var L = 0; L < 17; L++) {
      var lv = 0.16 + L * 0.042;
      ctx.strokeStyle = L % 4 === 0 ? 'rgba(242,239,235,0.085)' : 'rgba(242,239,235,0.045)';
      ctx.beginPath();
      for (j = 0; j < rows - 1; j++) {
        for (i = 0; i < cols - 1; i++) {
          var a = f[j * cols + i], b = f[j * cols + i + 1], c = f[(j + 1) * cols + i + 1], d = f[(j + 1) * cols + i];
          var pts = [];
          if ((a < lv) !== (b < lv)) pts.push([i + (lv - a) / (b - a), j]);
          if ((b < lv) !== (c < lv)) pts.push([i + 1, j + (lv - b) / (c - b)]);
          if ((d < lv) !== (c < lv)) pts.push([i + (lv - d) / (c - d), j + 1]);
          if ((a < lv) !== (d < lv)) pts.push([i, j + (lv - a) / (d - a)]);
          for (var k = 0; k + 1 < pts.length; k += 2) {
            ctx.moveTo(pts[k][0] * cell, pts[k][1] * cell);
            ctx.lineTo(pts[k + 1][0] * cell, pts[k + 1][1] * cell);
          }
        }
      }
      ctx.stroke();
    }
  }
  drawGround();
  dock();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(dock);
  window.addEventListener('load', dock);
  var rz;
  window.addEventListener('resize', function () { dock(); clearTimeout(rz); rz = setTimeout(drawGround, 150); });
})();
