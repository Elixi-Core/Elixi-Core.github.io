// scene.js — Cyber-Ops Command Center
// ---------------------------------------------------------------------------
// Procedural Three.js scene that overlays the existing portfolio. Each of the
// 10 sections is represented by a CRT-style monitor; clicking a monitor
// dollies the camera in and opens that section's content in a <dialog>.
//
// Vanilla, no build step. Three.js loads via the <importmap> in index.html.
// Progressive enhancement: if WebGL fails, we hide the canvas and reveal the
// underlying semantic <main>. The Skip-3D button is the only escape hatch on
// mobile (per user choice — full 3D on phones with FPS-tier auto-degrade).

import * as THREE                   from 'three';
import { OrbitControls }            from 'three/addons/controls/OrbitControls.js';
import { EffectComposer }           from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }               from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass }          from 'three/addons/postprocessing/UnrealBloomPass.js';

// ---------------------------------------------------------------------------
// Section → monitor configuration. The HTML id determines which DOM subtree
// gets cloned into the dialog when a monitor is clicked.
// ---------------------------------------------------------------------------
const MONITORS = [
  // back wall, top row, left → right
  { sectionId: 'about',          tag: '01', label: 'ABOUT',         icon: 'user',     pos: [-3.4, 2.5, -4.9], rot: [0, 0, 0],            size: [1.6, 1.0] },
  { sectionId: 'education',      tag: '02', label: 'EDUCATION',     icon: 'cap',      pos: [-1.1, 2.5, -4.9], rot: [0, 0, 0],            size: [1.6, 1.0] },
  { sectionId: 'skills',         tag: '03', label: 'SKILLS',        icon: 'shield',   pos: [ 1.1, 2.5, -4.9], rot: [0, 0, 0],            size: [1.6, 1.0] },
  { sectionId: 'projects',       tag: '04', label: 'PROJECTS',      icon: 'grid',     pos: [ 3.4, 2.5, -4.9], rot: [0, 0, 0],            size: [1.8, 1.2], featured: true },
  // left wall
  { sectionId: 'competitions',   tag: '05', label: 'COMPETITIONS',  icon: 'trophy',   pos: [-4.9, 2.5, -2.0], rot: [0,  Math.PI / 2, 0], size: [1.6, 1.0] },
  { sectionId: 'experience',     tag: '06', label: 'EXPERIENCE',    icon: 'briefcase',pos: [-4.9, 2.5,  0.4], rot: [0,  Math.PI / 2, 0], size: [1.6, 1.0] },
  // right wall
  { sectionId: 'reflections',    tag: '07', label: 'REFLECTIONS',   icon: 'spark',    pos: [ 4.9, 2.5, -2.0], rot: [0, -Math.PI / 2, 0], size: [1.6, 1.0] },
  { sectionId: 'certifications', tag: '08', label: 'CERTIFICATIONS',icon: 'cert',     pos: [ 4.9, 2.5,  0.4], rot: [0, -Math.PI / 2, 0], size: [1.6, 1.0] },
  // desk surface (laid flatter on the desk, angled toward viewer)
  { sectionId: 'documents',      tag: '09', label: 'DOCUMENTS',     icon: 'file',     pos: [-0.7, 1.05, 1.2], rot: [-Math.PI / 6, 0.25, 0], size: [1.0, 0.65] },
  { sectionId: 'contact',        tag: '10', label: 'CONTACT',       icon: 'phone',    pos: [ 0.7, 1.05, 1.2], rot: [-Math.PI / 6, -0.25, 0], size: [1.0, 0.65] },
];

// ---------------------------------------------------------------------------
// Boot guard — bail out cleanly if WebGL is unavailable. The <main> markup
// stays visible because we never set body.scene-active.
// ---------------------------------------------------------------------------
function webglSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch { return false; }
}

if (!webglSupported()) {
  document.getElementById('scene')?.remove();
  document.getElementById('scene-loading')?.remove();
  console.info('[scene] WebGL unavailable — flat layout only.');
} else {
  init();
}

// ===========================================================================
function init() {
  const canvas       = document.getElementById('scene');
  const loadingVeil  = document.getElementById('scene-loading');
  const skipBtn      = document.getElementById('skip-3d');
  const hint         = document.getElementById('scene-hint');
  const dialog       = document.getElementById('section-dialog');
  const dialogTitle  = document.getElementById('dialog-title');
  const dialogBody   = document.getElementById('dialog-body');
  const dialogClose  = dialog?.querySelector('.dialog-close');
  const isTouchDevice= window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion= window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall      = window.matchMedia('(max-width: 768px)').matches;

  // Activate the scene layer as soon as we know WebGL works.
  document.body.classList.add('scene-active');
  if (skipBtn) skipBtn.hidden = false;

  // Persisted "skip 3D" preference.
  if (localStorage.getItem('skip3d') === '1') {
    deactivate();
    return;
  }

  // ---- Renderer / scene / camera --------------------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isSmall,                    // skip MSAA on phones
    alpha: false,
    powerPreference: isTouchDevice ? 'low-power' : 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.0 : 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070b);
  scene.fog = new THREE.Fog(0x05070b, 8, 16);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(0, 1.7, 4.5);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.6, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 2.4;
  controls.maxDistance = 6.5;
  controls.minPolarAngle = Math.PI / 3.4;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.rotateSpeed = isTouchDevice ? 0.45 : 0.7;
  controls.zoomSpeed   = 0.7;
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
  controls.minAzimuthAngle = -Math.PI / 2.2;
  controls.maxAzimuthAngle =  Math.PI / 2.2;

  // ---- Lighting --------------------------------------------------------------
  const ambient = new THREE.AmbientLight(0x6688aa, 0.18);
  scene.add(ambient);

  const cyanRim = new THREE.PointLight(0x00ffd0, 4.2, 14, 1.6);
  cyanRim.position.set(0, 4.2, 0);
  scene.add(cyanRim);

  const greenAccent = new THREE.PointLight(0x37ff7c, 1.4, 9, 1.8);
  greenAccent.position.set(-3.5, 2.2, -4);
  scene.add(greenAccent);

  const deskLamp = new THREE.SpotLight(0xffd28a, 4.5, 6, Math.PI / 5, 0.5, 1.5);
  deskLamp.position.set(0, 2.4, 2.3);
  deskLamp.target.position.set(0, 0.85, 1.2);
  scene.add(deskLamp);
  scene.add(deskLamp.target);

  // ---- Floor (steel grid) ----------------------------------------------------
  scene.add(buildFloor());

  // ---- Walls + ceiling -------------------------------------------------------
  scene.add(buildRoom());

  // ---- Wall plaque "CAESAR FUNCHES" hero name -------------------------------
  const plaque = buildPlaque('CAESAR FUNCHES', 'CYBER OPS · SOC ANALYST');
  plaque.position.set(0, 4.05, -4.92);
  scene.add(plaque);

  // ---- Desk + chair (low-poly) -----------------------------------------------
  scene.add(buildDesk());

  // ---- Build the 10 monitors -------------------------------------------------
  const monitors = [];
  for (const cfg of MONITORS) {
    const mon = buildMonitor(cfg);
    monitors.push(mon);
    scene.add(mon.group);
  }

  // ---- Bloom (off on mobile / reduced-motion) --------------------------------
  let composer = null;
  if (!isSmall && !reducedMotion) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.85,  // strength
      0.6,   // radius
      0.18   // threshold
    );
    composer.addPass(bloom);
  }

  // ---- Hotspot raycaster -----------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;

  function setPointer(ev) {
    const x = ev.clientX !== undefined ? ev.clientX : ev.touches?.[0]?.clientX;
    const y = ev.clientY !== undefined ? ev.clientY : ev.touches?.[0]?.clientY;
    if (x === undefined) return false;
    pointer.x = (x / window.innerWidth) * 2 - 1;
    pointer.y = -(y / window.innerHeight) * 2 + 1;
    return true;
  }

  function pickMonitor() {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(monitors.map(m => m.screen), false);
    return hits.length ? hits[0].object.userData.cfg : null;
  }

  function setHover(cfg) {
    if (hovered === cfg) return;
    if (hovered) {
      const m = monitors.find(m => m.cfg.sectionId === hovered.sectionId);
      if (m) m.screenMaterial.uniforms.uHover.value = 0;
    }
    hovered = cfg;
    if (hovered) {
      const m = monitors.find(m => m.cfg.sectionId === hovered.sectionId);
      if (m) m.screenMaterial.uniforms.uHover.value = 1;
    }
    canvas.style.cursor = hovered ? 'pointer' : '';
  }

  canvas.addEventListener('pointermove', (ev) => {
    if (!setPointer(ev)) return;
    setHover(pickMonitor());
    lastInteraction = performance.now();
  });

  canvas.addEventListener('click', (ev) => {
    if (!setPointer(ev)) return;
    const cfg = pickMonitor();
    if (cfg) openSection(cfg);
    lastInteraction = performance.now();
  });

  canvas.addEventListener('pointerdown', () => { lastInteraction = performance.now(); });
  controls.addEventListener('start', () => { lastInteraction = performance.now(); });

  // ---- Section dialog (cloned from existing semantic HTML) -------------------
  let savedCamPos = null;
  let savedTarget = null;

  function openSection(cfg) {
    const node = document.getElementById(cfg.sectionId);
    if (!node || !dialog) return;

    // Camera dolly toward the monitor's focus point.
    savedCamPos = camera.position.clone();
    savedTarget = controls.target.clone();
    const focusPos = new THREE.Vector3(...cfg.pos);
    const fwd = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(...cfg.rot));
    const camTarget = focusPos.clone().add(fwd.multiplyScalar(2.0));
    tween(camera.position, camTarget, 600);
    tween(controls.target,  focusPos.clone(), 600);

    // Pull section content into the dialog.
    const heading = node.querySelector('h2')?.textContent?.trim() || cfg.label;
    dialogTitle.textContent = `${cfg.tag} · ${heading}`;
    dialogBody.innerHTML = '';
    // Clone everything except the section's own header (we render our own title).
    for (const child of node.children) {
      if (!child.classList.contains('section-head') && !child.matches('.hero-grid')) {
        dialogBody.appendChild(child.cloneNode(true));
      }
    }
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    history.replaceState(null, '', `#${cfg.sectionId}`);
  }

  function closeSection() {
    if (savedCamPos) tween(camera.position, savedCamPos.clone(), 600);
    if (savedTarget) tween(controls.target, savedTarget.clone(), 600);
    savedCamPos = savedTarget = null;
    history.replaceState(null, '', '#');
  }

  dialogClose?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('close', closeSection);
  dialog?.addEventListener('cancel', closeSection); // Esc

  // ---- Deep-link support: open a section by id if URL hash is set ----------
  window.addEventListener('scene:open', (ev) => {
    const id = ev?.detail?.sectionId;
    if (!id) return;
    const cfg = MONITORS.find(m => m.sectionId === id);
    if (cfg) openSection(cfg);
  });
  // Notify the page once monitors are built; script.js handles deep-link.
  window.dispatchEvent(new Event('scene:ready'));

  // ---- Skip-3D toggle --------------------------------------------------------
  skipBtn?.addEventListener('click', () => {
    const active = !document.body.classList.contains('scene-active');
    if (active) {
      activate();
    } else {
      deactivate();
    }
  });

  function activate() {
    document.body.classList.add('scene-active');
    skipBtn?.setAttribute('aria-pressed', 'false');
    skipBtn && (skipBtn.textContent = 'Skip 3D · Read as text');
    localStorage.removeItem('skip3d');
  }
  function deactivate() {
    document.body.classList.remove('scene-active');
    skipBtn?.setAttribute('aria-pressed', 'true');
    skipBtn && (skipBtn.textContent = 'Resume 3D scene');
    localStorage.setItem('skip3d', '1');
  }

  // ---- Mobile first-visit hint ----------------------------------------------
  if (isSmall && !localStorage.getItem('seenMobileHint') && hint) {
    hint.hidden = false;
    setTimeout(() => { hint.hidden = true; localStorage.setItem('seenMobileHint', '1'); }, 4500);
  }

  // ---- Resize ---------------------------------------------------------------
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer?.setSize(window.innerWidth, window.innerHeight);
    }, 120);
  });

  // ---- FPS probe + render loop ----------------------------------------------
  let lastInteraction = performance.now();
  let frameCount = 0;
  let probeStart  = performance.now();
  let tier        = 'full';
  const targetFps = isSmall ? 30 : 60;
  const frameInterval = 1000 / targetFps;
  let lastFrame = 0;

  // Pause when tab not visible (saves battery).
  document.addEventListener('visibilitychange', () => {
    lastFrame = performance.now();
  });

  renderer.setAnimationLoop((time) => {
    if (document.hidden) return;
    if (time - lastFrame < frameInterval) return;
    lastFrame = time;

    // FPS probe — runs for the first ~3s, then locks in a tier.
    frameCount++;
    if (probeStart && time - probeStart > 3000) {
      const fps = (frameCount / ((time - probeStart) / 1000));
      if (fps < 30)      tier = 'lite';
      else if (fps < 45) tier = 'reduced';
      else               tier = 'full';
      window.__sceneTier = tier;
      probeStart = 0;
      // Apply tier consequences.
      if (tier === 'lite') {
        controls.autoRotate = false;
        deskLamp.intensity = 0;
        greenAccent.intensity = 0;
      }
      if (tier === 'reduced' && composer) {
        composer = null; // drop bloom on a struggling device
      }
    }

    controls.update();

    // Auto-orbit when idle (3s no input) and not in a dialog.
    if (!dialog?.open && time - lastInteraction > 3000 && tier !== 'lite' && !reducedMotion) {
      const az = controls.getAzimuthalAngle() + 0.0009;
      controls.setAzimuthalAngle(az);
    }

    // Update tweens.
    runTweens(time);

    // Update screen shader uniforms.
    for (const m of monitors) m.screenMaterial.uniforms.uTime.value = time / 1000;

    if (composer) composer.render();
    else          renderer.render(scene, camera);

    if (loadingVeil && !loadingVeil.classList.contains('hidden')) {
      loadingVeil.classList.add('hidden');
      setTimeout(() => loadingVeil.remove(), 600);
    }
  });

  // ---- Cleanup --------------------------------------------------------------
  window.addEventListener('pagehide', () => {
    monitors.forEach(m => {
      m.screenMaterial.dispose();
      m.screenTexture.dispose();
    });
    renderer.dispose();
  });
}

// ===========================================================================
// Procedural geometry helpers
// ===========================================================================

function buildFloor() {
  const tex = makeGridTexture(1024, 16, 'rgba(40, 220, 200, 0.55)', 'rgba(8, 12, 16, 1)');
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  const geo = new THREE.PlaneGeometry(20, 20);
  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.35,
    metalness: 0.6,
    emissive: 0x002028,
    emissiveIntensity: 0.4,
  });
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0;
  return m;
}

function buildRoom() {
  const group = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x0e1218,
    roughness: 0.85,
    metalness: 0.2,
  });
  const ceilingMat = wallMat.clone();
  ceilingMat.color.setHex(0x080a0e);

  // back, left, right walls and ceiling
  const back = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 0.2), wallMat);
  back.position.set(0, 3, -5);
  group.add(back);

  const left = new THREE.Mesh(new THREE.BoxGeometry(0.2, 6, 12), wallMat);
  left.position.set(-5, 3, 0);
  group.add(left);

  const right = new THREE.Mesh(new THREE.BoxGeometry(0.2, 6, 12), wallMat);
  right.position.set(5, 3, 0);
  group.add(right);

  const ceil = new THREE.Mesh(new THREE.BoxGeometry(12, 0.2, 12), ceilingMat);
  ceil.position.set(0, 6, 0);
  group.add(ceil);

  // Wall accent strips — neon trim along the floor of each wall.
  const trim = new THREE.MeshStandardMaterial({ color: 0x00ffd0, emissive: 0x00ffd0, emissiveIntensity: 1.5 });
  const back2 = new THREE.Mesh(new THREE.BoxGeometry(10, 0.06, 0.06), trim);
  back2.position.set(0, 0.05, -4.85);
  group.add(back2);
  const left2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 10), trim);
  left2.position.set(-4.85, 0.05, 0);
  group.add(left2);
  const right2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 10), trim);
  right2.position.set(4.85, 0.05, 0);
  group.add(right2);

  return group;
}

function buildPlaque(line1, line2) {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#05070b'; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = '#00ffd0';
  x.font = '700 96px "JetBrains Mono", monospace';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = '#00ffd0'; x.shadowBlur = 28;
  x.fillText(line1, c.width / 2, 100);
  x.fillStyle = '#37ff7c'; x.shadowBlur = 12;
  x.font = '600 36px "JetBrains Mono", monospace';
  x.fillText(line2, c.width / 2, 190);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
  const geo = new THREE.PlaneGeometry(3.2, 0.8);
  return new THREE.Mesh(geo, mat);
}

function buildDesk() {
  const group = new THREE.Group();
  const deskMat = new THREE.MeshStandardMaterial({ color: 0x14181f, roughness: 0.6, metalness: 0.7 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 1.4), deskMat);
  top.position.set(0, 0.85, 1.2);
  group.add(top);
  const legMat = new THREE.MeshStandardMaterial({ color: 0x0a0c10, roughness: 0.8, metalness: 0.4 });
  for (const x of [-1.55, 1.55]) {
    for (const z of [0.6, 1.8]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.85, 0.08), legMat);
      leg.position.set(x, 0.42, z);
      group.add(leg);
    }
  }
  // Chair — simple low-poly seat + back.
  const chairMat = new THREE.MeshStandardMaterial({ color: 0x121620, roughness: 0.7, metalness: 0.3 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.7), chairMat);
  seat.position.set(0, 0.55, 2.6);
  group.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.06), chairMat);
  back.position.set(0, 1.0, 2.92);
  group.add(back);

  // Tiny LED indicator on the desk.
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x37ff7c })
  );
  led.position.set(1.4, 0.92, 0.7);
  group.add(led);
  return group;
}

function buildMonitor(cfg) {
  const [w, h] = cfg.size;
  const group = new THREE.Group();

  // Bezel
  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x101418, roughness: 0.45, metalness: 0.85 });
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, h + 0.1, 0.08), bezelMat);
  group.add(bezel);

  // Screen — emissive ShaderMaterial with scanlines and hover boost.
  const screenTex = makeMonitorTexture(cfg);
  const screenMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uMap:    { value: screenTex },
      uTime:   { value: 0 },
      uHover:  { value: 0 },
      uColor:  { value: new THREE.Color(cfg.featured ? 0x37ff7c : 0x00ffd0) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uMap;
      uniform float uTime;
      uniform float uHover;
      uniform vec3  uColor;
      varying vec2 vUv;

      void main() {
        vec4 base = texture2D(uMap, vUv);
        // Scanlines: alternating darker bands sweeping slowly upward.
        float scan = 0.5 + 0.5 * sin((vUv.y + uTime * 0.04) * 600.0);
        scan = mix(0.85, 1.0, scan);
        // Slight horizontal jitter for CRT character.
        float jitter = sin(uTime * 1.2 + vUv.y * 30.0) * 0.0015;
        vec4 t = texture2D(uMap, vUv + vec2(jitter, 0.0));
        // Vignette toward the corners.
        float vig = smoothstep(1.05, 0.45, length(vUv - 0.5) * 1.4);
        vec3 col = t.rgb * scan * vig;
        // Hover boost.
        col += uColor * 0.18 * uHover;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });

  const screen = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMaterial);
  screen.position.z = 0.05;
  screen.userData.cfg = cfg;
  group.add(screen);

  // Position + rotate the whole monitor.
  group.position.set(...cfg.pos);
  group.rotation.set(...cfg.rot);

  return { group, screen, screenMaterial, screenTexture: screenTex, cfg };
}

// ---------------------------------------------------------------------------
// Procedural CRT screen texture — section number + label + glyph.
// Drawn once per monitor at startup; bandwidth-free, infinitely tweakable.
// ---------------------------------------------------------------------------
function makeMonitorTexture(cfg) {
  const c = document.createElement('canvas');
  c.width  = 512;
  c.height = Math.round(512 * (cfg.size[1] / cfg.size[0]));
  const x = c.getContext('2d');

  // Background — deep cyan-tinted black.
  const bg = x.createLinearGradient(0, 0, 0, c.height);
  bg.addColorStop(0, '#04181c');
  bg.addColorStop(1, '#02080c');
  x.fillStyle = bg;
  x.fillRect(0, 0, c.width, c.height);

  // Decorative grid.
  x.strokeStyle = 'rgba(0, 255, 208, 0.10)';
  x.lineWidth = 1;
  for (let i = 0; i < c.width; i += 32) {
    x.beginPath(); x.moveTo(i, 0); x.lineTo(i, c.height); x.stroke();
  }
  for (let j = 0; j < c.height; j += 32) {
    x.beginPath(); x.moveTo(0, j); x.lineTo(c.width, j); x.stroke();
  }

  // Section tag (big, top-left).
  const accent = cfg.featured ? '#37ff7c' : '#00ffd0';
  x.fillStyle = accent;
  x.shadowColor = accent;
  x.shadowBlur = 18;
  x.font = '700 96px "JetBrains Mono", monospace';
  x.textBaseline = 'top';
  x.fillText(cfg.tag, 24, 18);

  // Label (bigger, centered).
  x.shadowBlur = 8;
  x.font = '700 44px "JetBrains Mono", monospace';
  x.textAlign = 'center';
  x.fillText(cfg.label, c.width / 2, c.height / 2 - 12);

  // Subtitle blip / glyph.
  x.fillStyle = 'rgba(180, 230, 220, 0.85)';
  x.shadowBlur = 0;
  x.font = '600 22px "Inter", sans-serif';
  const subs = {
    user: '◉ identity',
    cap:  '▲ academic',
    shield: '⚙ tooling',
    grid: '▦ portfolio',
    trophy: '✦ challenges',
    briefcase: '■ work history',
    spark: '✷ growth',
    cert: '◆ credentials',
    file: '⬇ downloads',
    phone: '☎ get in touch',
  };
  x.fillText(subs[cfg.icon] || '› section', c.width / 2, c.height / 2 + 50);

  // Faux status-line at bottom.
  x.textAlign = 'left';
  x.fillStyle = 'rgba(55, 255, 124, 0.65)';
  x.font = '500 14px "JetBrains Mono", monospace';
  x.fillText('> READY · 0 ALERTS · NODE-7', 18, c.height - 22);

  // Cursor.
  x.fillStyle = 'rgba(0, 255, 208, 0.9)';
  x.fillRect(c.width - 28, c.height - 30, 10, 14);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter  = THREE.LinearFilter;
  tex.magFilter  = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

function makeGridTexture(size, divisions, lineColor, bgColor) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d');
  x.fillStyle = bgColor;  x.fillRect(0, 0, size, size);
  x.strokeStyle = lineColor; x.lineWidth = 2;
  const step = size / divisions;
  for (let i = 0; i <= divisions; i++) {
    x.beginPath(); x.moveTo(i * step, 0); x.lineTo(i * step, size); x.stroke();
    x.beginPath(); x.moveTo(0, i * step); x.lineTo(size, i * step); x.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------------------------------------------------------------------------
// Tiny tweener — no GSAP needed. lerps Vector3 values toward a target over
// duration ms with easeOutCubic.
// ---------------------------------------------------------------------------
const tweens = [];
function tween(target, to, durationMs) {
  const from = target.clone();
  tweens.push({ target, from, to, dur: durationMs, start: performance.now() });
}
function runTweens(now) {
  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i];
    const t = Math.min(1, (now - tw.start) / tw.dur);
    const e = 1 - Math.pow(1 - t, 3); // easeOutCubic
    tw.target.lerpVectors(tw.from, tw.to, e);
    if (t >= 1) tweens.splice(i, 1);
  }
}
