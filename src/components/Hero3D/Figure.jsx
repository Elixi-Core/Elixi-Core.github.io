import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// Back-turned silhouette in front of the central monitor — the "you are here"
// anchor. Pure black material so it reads only as silhouette against the
// glowing screen behind it.
//
// Idle animation: subtle breathing bob (vertical), gentle side-to-side weight
// shift, and a slow head turn so the figure reads as "alive but standing".
// All three motions are honest-to-life slow — never look like a dance.
// prefers-reduced-motion freezes everything.
export function Figure() {
  const root     = useRef(null);
  const bodyRef  = useRef(null);
  const headRef  = useRef(null);
  const shoulders= useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useFrame((state) => {
    if (reducedMotion || !root.current) return;
    const t = state.clock.elapsedTime;

    // Breathing — chest/head rise on inhale, fall on exhale. ~4s cycle.
    const breath = Math.sin(t * 1.6) * 0.022;
    if (headRef.current)  headRef.current.position.y  = 1.78 + breath;
    if (shoulders.current) shoulders.current.position.y = 1.50 + breath * 0.6;
    if (bodyRef.current)  bodyRef.current.scale.y     = 1 + breath * 0.4;

    // Weight shift — slow side-to-side hip sway. ~6s cycle, ~3cm.
    root.current.position.x = 0 + Math.sin(t * 1.05) * 0.03;

    // Head turn — slow asymmetric look-around. ~12s cycle, ~12° each way.
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.52) * 0.21;
      // Tiny vertical chin movement so it doesn't feel like a turret.
      headRef.current.rotation.x = Math.sin(t * 0.7) * 0.04;
    }

    // Whole-body micro-sway (very subtle forward/back lean).
    root.current.rotation.z = Math.sin(t * 0.78) * 0.012;
  });

  return (
    <group ref={root} position={[0, 0, -2.6]}>
      {/* Body — slim capsule */}
      <mesh ref={bodyRef} position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.22, 1.0, 4, 12]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Head — round, slightly oval */}
      <mesh ref={headRef} position={[0, 1.78, 0]}>
        <sphereGeometry args={[0.21, 18, 14]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Shoulders — short cylinder */}
      <mesh ref={shoulders} position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.1, 0.55, 4, 12]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Subtle rim glow on the back of the head/shoulders so the figure
          doesn't fully disappear when the bridge geometry is dark. */}
      <pointLight position={[0, 1.5, 0.4]} intensity={0.25} color="#5eead4" distance={2.4} decay={2} />
    </group>
  );
}
