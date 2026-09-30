REFLY × Wendrone website
========================

THE SITE IS ONE FILE: index.html
Everything is inside it (design, behaviour and pictures), so it is ready to use.

TO PREVIEW ON THIS COMPUTER
Double-click index.html. It opens in your browser. The fonts load from
Google Fonts when you are online; offline it still works with standard fonts.

TO PUT THE SITE ONLINE
Upload index.html to your web host. Nothing else is needed.

WHAT THE PAGE DOES
- Three languages: Indonesian (default), English, Chinese. The switch is top right.
  The page picks the visitor's language automatically the first time.
- Every "Book" button opens WhatsApp on 0857-1472-7038 with a message that
  already names the package the visitor chose.
- The FAQ opens and closes. The "Copy number" link copies the WhatsApp number.

THE SPINNING DRONES AT THE TOP
- The DJI Mini 4 Pro, the Nazgul Evoque V3 and the DJI Neo 2 are real 3D models,
  carried inside index.html. They turn on their own, and visitors can drag them left and right.
- The CineLog35 still uses its photo. To make it 3D too, send Claude its .glb file.
- On an old phone or browser without 3D support, the photos show instead.

TO ADD YOUR SHOWREEL TO THE TOP OF THE PAGE
1. Save your video as showreel.mp4 in this folder, next to index.html
   (short, muted, under about 8 MB), and upload it together with index.html.
2. Open index.html in a text editor, find the line with id="heroVideo", and change it to:
   <video class="hero-video" id="heroVideo" autoplay muted loop playsinline preload="metadata">
     <source src="showreel.mp4" type="video/mp4">
   </video>
   Or just ask Claude to do it once the video is in this folder.

TO CHANGE PRICES OR TEXT
Ask Claude in the "Drone" project. Claude edits the working files in _source,
rebuilds index.html and saves it back here. Keep the _source folder; do not upload it.
