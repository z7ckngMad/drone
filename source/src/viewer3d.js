/* REFLY × Wendrone — 3D drone viewer.
   Turns any .shot[data-model] into a real 3D model that turns slowly and can be dragged.
   The model travels inside the page as base64 (<script type="application/octet-stream" id="glb-NAME">),
   so the single index.html needs no other files. The photo stays in place until the first frame
   renders, and stays for good if WebGL or the model fails. */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Box3, Vector3,
  PMREMGenerator, ACESFilmicToneMapping, SRGBColorSpace, MathUtils, TextureLoader,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const TURN_SECONDS = 14;          // one full turn when left alone (data-turn on the .shot overrides it)
const START_YAW = 200;            // degrees: opens on a three-quarter front view (data-yaw overrides it)
const TILT = 24;                  // degrees the camera looks down
const CREASE = 35;                // degrees: edges sharper than this stay sharp when shading is rebuilt

function bytesFrom(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const bin = atob(el.textContent.trim());
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

// The drone's colours live in texture pictures packed inside the model. By default the loader reads
// them with fetch(), which pages with a strict security policy (the Claude preview, some web hosts)
// refuse for blob: addresses, and the drone then renders white and chrome-like. Reading them through
// an <img> element instead works everywhere images are allowed.
function imageElementTextures(parser) {
  const loader = new TextureLoader(parser.options.manager);
  loader.setCrossOrigin(undefined);           // the pictures come from this page itself
  parser.textureLoader = loader;
  return { name: 'refly_image_element_textures' };
}

// True when a material that should be coloured by a texture ended up without it.
function coloursMissing(gltf) {
  const defs = gltf.parser.json.materials || [];
  let missing = false;
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
      const a = gltf.parser.associations.get(m);
      const def = a && defs[a.materials];
      if (def && def.pbrMetallicRoughness && def.pbrMetallicRoughness.baseColorTexture && !m.map) missing = true;
    });
  });
  return missing;
}

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

function mount(host) {
  const buf = bytesFrom('glb-' + host.dataset.model);
  if (!buf) return;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.className = 'shot-3d';
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new PerspectiveCamera(28, 2, 0.01, 1000);
  const pivot = new Group();
  scene.add(pivot);

  const turn = +host.dataset.turn || TURN_SECONDS;
  let reach = 1, height = 1, yaw = -MathUtils.degToRad(+host.dataset.yaw || START_YAW), spin = reduce ? 0 : (Math.PI * 2) / turn;
  let velocity = spin, dragging = false, lastX = 0, lastT = 0, visible = false, raf = 0, prev = 0, ready = false;

  function fit() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // fit the drone so nothing is cut off at any point of its turn: sideways it reaches as far as
    // the corner of its footprint, and from a tilted camera its height adds some of that reach too
    const vfov = MathUtils.degToRad(camera.fov);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * camera.aspect);
    const t = MathUtils.degToRad(TILT);
    const halfW = reach * 1.02, halfH = (height * Math.cos(t) + reach * Math.sin(t)) * 1.02;
    const dist = Math.max(halfW / Math.tan(hfov / 2), halfH / Math.tan(vfov / 2)) + reach * 0.12;
    camera.position.set(0, Math.sin(t) * dist, Math.cos(t) * dist);
    camera.near = dist * 0.05; camera.far = dist * 6;   // models come in any unit size
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  function frame(now) {
    raf = 0;
    const dt = prev ? Math.min((now - prev) / 1000, 0.05) : 0;
    prev = now;
    if (!dragging) {
      velocity += (spin - velocity) * Math.min(1, dt * 1.6);   // coast back to the idle turn after a flick
      yaw += velocity * dt;
    }
    pivot.rotation.y = yaw;
    renderer.render(scene, camera);
    if (!ready) { ready = true; host.classList.add('is-3d'); }
    if (visible && !document.hidden && (velocity !== 0 || dragging || spin !== 0)) raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf) { prev = 0; raf = requestAnimationFrame(frame); } }

  // drag to turn; vertical swipes still scroll the page on phones
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true; lastX = e.clientX; lastT = performance.now(); velocity = 0;
    canvas.setPointerCapture(e.pointerId); host.classList.add('is-dragging'); start();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now(), dx = e.clientX - lastX, dts = Math.max((now - lastT) / 1000, 0.001);
    const d = dx * 0.012;
    yaw += d; velocity = d / dts; lastX = e.clientX; lastT = now; start();
  });
  const end = () => { dragging = false; host.classList.remove('is-dragging'); start(); };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  loader.register(imageElementTextures);
  loader.parse(buf, '', (gltf) => {
    if (coloursMissing(gltf)) {                // never show a grey drone: keep the colour photo instead
      console.warn('REFLY: 3D model colours did not load, showing the photo.');
      renderer.dispose();
      return;
    }
    const model = gltf.scene;
    // models slimmed down for the web ship without shading normals (they block simplification);
    // rebuild them here, keeping hard edges hard
    model.traverse((o) => {
      if (o.isMesh && !o.geometry.attributes.normal) o.geometry = toCreasedNormals(o.geometry, MathUtils.degToRad(CREASE));
    });
    const box = new Box3().setFromObject(model);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    model.position.sub(center);
    reach = Math.hypot(size.x, size.z) / 2;   // farthest a corner gets from the turning axis
    height = size.y / 2;
    pivot.add(model);
    host.appendChild(canvas);
    fit();
    new ResizeObserver(() => { fit(); if (!raf) renderer.render(scene, camera); }).observe(host);
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start();
    }, { rootMargin: '80px' }).observe(host);
    document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) start(); });
    visible = true; start();
  }, () => { /* keep the photo */ });
}

function boot() {
  if (!webglOK()) return;
  document.querySelectorAll('.shot[data-model]').forEach((host) => {
    try { mount(host); } catch (e) { /* keep the photo */ }
  });
}

if (document.readyState === 'complete') setTimeout(boot, 0);
else window.addEventListener('load', () => setTimeout(boot, 0));
