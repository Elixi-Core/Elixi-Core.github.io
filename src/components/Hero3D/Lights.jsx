// Lighting rig for the hero scene. Cool teal key light from above + soft
// magenta fill from the crystals (placed in CrystalAccent.jsx) + a touch of
// warm rim from the camera side so the figure silhouette has shoulders.
export function Lights() {
  return (
    <>
      <ambientLight intensity={0.18} color="#4a6f78" />

      {/* Key light — overhead cool teal, the dominant scene illumination. */}
      <pointLight
        position={[0, 6, -2]}
        intensity={3.2}
        color="#5eead4"
        distance={20}
        decay={2}
      />

      {/* Camera-side warm rim — hints the figure's outline so it's not a
          black blob from any angle. */}
      <pointLight
        position={[0, 2.2, 4]}
        intensity={0.7}
        color="#fdba74"
        distance={9}
        decay={2}
      />

      {/* Floor wash — subtle teal lift directly below the monitor. */}
      <spotLight
        position={[0, 5.5, -4.5]}
        target-position={[0, 0, -3]}
        angle={0.7}
        penumbra={0.6}
        intensity={2.0}
        color="#7ff5dc"
        distance={14}
        decay={1.5}
      />
    </>
  );
}
