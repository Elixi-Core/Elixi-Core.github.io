// Magenta crystal cluster in the lower-right — the warm accent that keeps
// the scene from being all-cool teal. Octahedrons of varying sizes, emissive
// magenta, picked up by bloom.
export function CrystalAccent() {
  const cluster = [
    { p: [ 7.6, 0.6, -1.4], r: 0.5,  rot: [0.2, 0.4, 0.1] },
    { p: [ 8.4, 1.1, -2.0], r: 0.85, rot: [0.6, 0.1, 0.3] },
    { p: [ 6.9, 0.4,  0.4], r: 0.35, rot: [0.0, 0.3, 0.2] },
    { p: [ 8.9, 0.5, -3.2], r: 0.7,  rot: [0.4, 0.2, 0.0] },
    { p: [ 7.2, 1.7, -2.6], r: 0.6,  rot: [0.5, 0.5, 0.1] },
  ];

  return (
    <group>
      {cluster.map((c, i) => (
        <mesh key={i} position={c.p} rotation={c.rot}>
          <octahedronGeometry args={[c.r, 0]} />
          <meshStandardMaterial
            color="#f472b6"
            emissive="#ec4899"
            emissiveIntensity={1.4}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      ))}
      {/* Soft fill light so the crystals throw color onto the floor + walls. */}
      <pointLight position={[7.6, 1.4, -1.6]} color="#f472b6" intensity={2.4} distance={9} decay={2} />
    </group>
  );
}
