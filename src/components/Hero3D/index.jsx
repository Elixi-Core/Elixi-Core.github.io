import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import { HexFloor }        from './HexFloor.jsx';
import { BridgeShell }     from './BridgeShell.jsx';
import { CentralMonitor }  from './CentralMonitor.jsx';
import { Figure }          from './Figure.jsx';
import { ParticleField }   from './ParticleField.jsx';
import { CrystalAccent }   from './CrystalAccent.jsx';
import { Lights }          from './Lights.jsx';
import { CameraRig }       from './CameraRig.jsx';

// Hero3D — the full cinematic scene. Wraps everything in a sized container
// (full viewport) and exposes nothing to the outside but a single component.
// Behavior:
//   - No mouse / touch / scroll affects the camera.
//   - Bloom + chromatic aberration + vignette layered on every frame.
//   - prefers-reduced-motion freezes the camera and disables bloom.
//   - The container is a fixed-position div with absolutely positioned text
//     overlay (the static "↓ scroll" cue) on top of the canvas.

export function Hero3D({ name, tag }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-neutral-950" id="home">
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.6]}
        camera={{ fov: 55, near: 0.1, far: 80, position: [0, 1.65, 4.0] }}
        onCreated={({ gl }) => {
          gl.setClearColor('#040608', 1);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <fog attach="fog" args={['#040608', 8, 28]} />
        <Suspense fallback={null}>
          <Lights />
          <HexFloor />
          <BridgeShell />
          <CentralMonitor name={name} tag={tag} />
          <Figure />
          <ParticleField count={1200} />
          <CrystalAccent />
          <CameraRig reducedMotion={reducedMotion} />

          {!reducedMotion && (
            <EffectComposer multisampling={0} disableNormalPass>
              <Bloom mipmapBlur intensity={0.95} luminanceThreshold={0.32} luminanceSmoothing={0.18} />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.0008, 0.0012]}
              />
              <Vignette eskil={false} offset={0.18} darkness={0.85} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      {/* Text overlay — sits ON TOP of the canvas. The 3D monitor already shows
          the name; this overlay holds the CTAs + a scroll cue so they're plain
          DOM (selectable, accessible, keyboard-reachable). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-10 sm:pb-14">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-neutral-200">
          <div className="pointer-events-auto">
            <p className="font-mono text-xs sm:text-sm tracking-[0.32em] text-teal-400">
              // CYBER OPS · SOC ANALYST
            </p>
            <p className="mt-1 font-display text-base sm:text-lg text-neutral-300/80 max-w-md">
              Houston, TX — building hands-on SOC, digital forensics, and secure-AI-automation skills.
            </p>
          </div>
          <a
            href="#about"
            className="pointer-events-auto inline-flex items-center gap-2 self-start sm:self-end rounded-md border border-teal-400/60 bg-teal-400/10 px-4 py-2 font-mono text-xs sm:text-sm tracking-widest text-teal-300 transition hover:bg-teal-400/20 hover:text-teal-200"
          >
            ↓ ENTER PORTFOLIO
          </a>
        </div>
      </div>

      {/* Vignette ring at the canvas border — thin teal glow line that frames
          the hero like a viewport marker. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 rounded-md border border-teal-400/15"
      />
    </section>
  );
}
