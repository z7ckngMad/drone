3D model tools (not part of the website)
========================================

The page uses the slimmed models in ../assets/models. These two scripts made them
from the original model files:

  opt-mini4pro.mjs  DJI Mini 4 Pro: about 1.7 MB, colours kept as small WebP pictures.
  opt-nazgul.mjs    Nazgul Evoque V3 (F5V3.glb, 52 MB): 150 KB. Removes the camera and
                    shading normals (the page rebuilds them), simplifies to about 40,000
                    triangles and gives the carbon a satin finish so it doesn't flash white.
  opt-neo2.mjs      DJI Neo 2 (Dji_Neo_2.glb, 43 MB): 350 KB, colour picture kept at 768px.

To run them: npm install in this folder, then
  node opt-mini4pro.mjs "<original Mini 4 Pro>.glb" ../assets/models/mini4pro.glb 0.3
  node --max-old-space-size=6000 opt-nazgul.mjs F5V3.glb ../assets/models/nazgul.glb 0.025 0.006
  node --max-old-space-size=6000 opt-neo2.mjs Dji_Neo_2.glb ../assets/models/neo2.glb 0.03 0.004 768
and run build.py in the folder above to rebuild index.html.
