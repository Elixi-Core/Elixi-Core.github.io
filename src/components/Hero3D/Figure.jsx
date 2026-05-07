// Back-turned silhouette in front of the central monitor — the "you are here"
// anchor. Pure black material so it reads only as silhouette against the
// glowing screen behind it. Low-poly, costs almost nothing.
export function Figure() {
  return (
    <group position={[0, 0, -2.6]}>
      {/* Body — slim capsule */}
      <mesh position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.22, 1.0, 4, 12]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Head — round, slightly oval */}
      <mesh position={[0, 1.78, 0]}>
        <sphereGeometry args={[0.21, 18, 14]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Shoulders — short cylinder */}
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.1, 0.55, 4, 12]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Subtle rim glow on the back of the head/shoulders so the figure
          doesn't fully disappear when the bridge geometry is dark. */}
      <pointLight position={[0, 1.5, 0.4]} intensity={0.25} color="#5eead4" distance={2.4} decay={2} />
    </group>
  );
}
