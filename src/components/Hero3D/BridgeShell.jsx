import { useMemo } from 'react';
import * as THREE from 'three';

// The curved cathedral / command-bridge wrapping the back half of the scene.
// Built from a half-sphere with inverted normals so we render the *interior*,
// then sliced flat at the floor. A second thinner ring acts as a horizon trim.
export function BridgeShell() {
  const innerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0c1014',
        roughness: 0.85,
        metalness: 0.2,
        side: THREE.BackSide,
      }),
    []
  );

  return (
    <group>
      {/* Inverted half-sphere — only the back half (z < 0) reads, but a full
          sphere lets the camera tilt up without seeing seams. */}
      <mesh material={innerMat} position={[0, 0, -2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[16, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      </mesh>

      {/* Horizon trim ring — thin emissive cyan band where the dome meets the floor. */}
      <mesh position={[0, 0.02, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[15.7, 16, 96, 1, 0, Math.PI * 2]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.55} />
      </mesh>

      {/* A few dim "console arches" on the back wall for depth — vertical pylons. */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = -Math.PI / 2 + (i / 5) * Math.PI; // half-circle behind the camera target
        const r = 13.5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, 4.5, Math.sin(angle) * r]}
            rotation={[0, -angle - Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.1, 7, 0.1]} />
            <meshStandardMaterial
              color="#0a0e12"
              emissive="#0e1c20"
              emissiveIntensity={0.7}
              roughness={0.5}
              metalness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}
