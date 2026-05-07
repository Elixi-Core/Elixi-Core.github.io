import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Drifting particle field — gives the air "presence" without becoming snow.
// 1200 dots is performant on every device we care about.
export function ParticleField({ count = 1200 }) {
  const ref = useRef(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute in a roomy box around the camera target.
      positions[i * 3 + 0] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = Math.random() * 7 + 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
      speeds[i] = 0.04 + Math.random() * 0.08;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt; // drift upward
      if (arr[i * 3 + 1] > 7.5) arr[i * 3 + 1] = 0.2;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#9ee9d6"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
