import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, KHRDracoMeshCompression, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { prune, dedup, weld, textureCompress, meshopt, simplify } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import sharp from 'sharp';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
await MeshoptEncoder.ready; await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'draco3d.decoder': await draco3d.createDecoderModule(),
  'meshopt.encoder': MeshoptEncoder,
});
const doc = await io.read(process.argv[2]);
doc.getRoot().listExtensionsUsed().filter(e => e.extensionName === 'KHR_draco_mesh_compression').forEach(e => e.dispose());
await doc.transform(
  dedup(), prune(), weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: +(process.argv[4] || 0.35), error: 0.0015 }),
  textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024], quality: 82 }),
  meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
);
await io.write(process.argv[3], doc);
