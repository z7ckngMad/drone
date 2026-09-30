import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, flatten, join, weld, simplify, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
await MeshoptEncoder.ready; await MeshoptSimplifier.ready;
const [,, src, out, ratioArg, errArg] = process.argv;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(src);
const root = doc.getRoot();
const count = (label) => {
  let v = 0, t = 0, p = 0;
  for (const m of root.listMeshes()) for (const pr of m.listPrimitives()) { p++; v += pr.getAttribute('POSITION').getCount(); const i = pr.getIndices(); t += (i ? i.getCount() : pr.getAttribute('POSITION').getCount()) / 3; }
  console.log(label.padEnd(10), 'nodes', root.listNodes().length, 'meshes', root.listMeshes().length, 'prims', p, 'verts', v, 'tris', Math.round(t));
};
count('raw');
// the export carries its own camera; the page brings its own
for (const n of root.listNodes()) if (n.getCamera()) n.dispose();
for (const c of root.listCameras()) c.dispose();
// the blades' see-through setting is ~3%: treat them as solid, so no extra render pass is needed
for (const e of root.listExtensionsUsed()) if (['KHR_materials_transmission', 'KHR_materials_ior'].includes(e.extensionName)) e.dispose();
for (const m of root.listMaterials()) if (m.getAlphaMode() === 'MASK') m.setAlphaMode('OPAQUE');
// no material uses a texture, so texture coordinates are dead weight (and they block welding)
for (const m of root.listMeshes()) for (const p of m.listPrimitives()) for (const sem of p.listSemantics()) if (sem.startsWith('TEXCOORD')) p.setAttribute(sem, null);
// the export splits every face's shading normals, which blocks simplification; the page rebuilds
// normals on load (sharp edges kept sharp), so the file carries positions only
for (const m of root.listMeshes()) for (const p of m.listPrimitives()) p.setAttribute('NORMAL', null);
await doc.transform(dedup(), prune(), flatten(), join(), weld());
count('joined');
await doc.transform(simplify({ simplifier: MeshoptSimplifier, ratio: +ratioArg, error: +errArg }), prune());
count('simplified');
// carbon and plastics exported glossy enough to mirror the studio lights (the top plate flashed white);
// a satin finish reads like the real frame. Blades stay a little glossier than the frame.
for (const m of root.listMaterials()) {
  if (m.getMetallicFactor() >= 0.5) continue;
  const floor = m.getName().includes('桨叶') ? 0.45 : 0.6;
  m.setRoughnessFactor(Math.max(m.getRoughnessFactor(), floor));
}
await doc.transform(meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
await io.write(out, doc);
