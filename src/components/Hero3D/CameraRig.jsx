import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Slow cinematic camera drift — figure-eight on a small radius around a fixed
// "viewing pose" so the scene reads as alive but never disorients the viewer.
// No mouse / touch / scroll input on the hero camera (per the user's "no
// glitchy interaction" feedback). The only input that affects the camera is
// the prefers-reduced-motion media query, which freezes the drift.
export function CameraRig({ reducedMotion = false }) {
  const { camera } = useThree();
  const t = useRef(0);

  // Lock initial orientation in case some other code touched it.
  useFrame((_, dt) => {
    if (reducedMotion) {
      camera.position.set(0, 1.65, 4.0);
      camera.lookAt(0, 2.0, -3);
      return;
    }
    t.current += dt;
    const tt = t.current * 0.18;
    // Figure-eight: x sin, y small bob, z slight breathe.
    const x = Math.sin(tt) * 0.45;
    const y = 1.65 + Math.sin(tt * 1.7) * 0.08;
    const z = 4.0 + Math.sin(tt * 0.7) * 0.18;
    camera.position.lerp(new THREE.Vector3(x, y, z), 0.06);
    camera.lookAt(0, 2.0, -3);
  });

  return null;
}
