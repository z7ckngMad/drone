import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup, weld, textureCompress, meshopt, simplify } from '@gltf-transform/functions';
import sharp from 'sharp';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
await MeshoptEncoder.ready; await MeshoptSimplifier.ready;
const [,, src, out, ratioArg, errArg, texArg] = process.argv;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(src);
const root = doc.getRoot();
const count = (label) => { let t = 0; for (const m of root.listMeshes()) for (const p of m.listPrimitives()) { const i = p.getIndices(); t += (i ? i.getCount() : p.getAttribute('POSITION').getCount()) / 3; } console.log(label.padEnd(10), 'tris', Math.round(t)); };
count('raw');
for (const n of root.listNodes()) if (n.getCamera()) n.dispose();
// shading normals split every face and block simplification; the page rebuilds them on load
for (const m of root.listMeshes()) for (const p of m.listPrimitives()) p.setAttribute('NORMAL', null);
await doc.transform(dedup(), prune(), weld());
count('welded');
await doc.transform(simplify({ simplifier: MeshoptSimplifier, ratio: +(ratioArg || 0.05), error: +(errArg || 0.003) }), prune());
count('simplified');
const tex = +(texArg || 1024);
await doc.transform(textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [tex, tex], quality: 82 }),
                    meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
await io.write(out, doc);
