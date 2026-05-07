import { Float, Text } from '@react-three/drei';

// Central floating monitor — drei's <Float> gives the slight idle bob, drei's
// <Text> renders MSDF text so it stays crisp at any zoom and accepts emissive
// materials cleanly (so bloom can pick it up).
export function CentralMonitor({ name, tag }) {
  return (
    <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.5}>
      <group position={[0, 2.4, -5.5]}>
        {/* Bezel */}
        <mesh>
          <boxGeometry args={[6.4, 2.6, 0.18]} />
          <meshStandardMaterial color="#0a0d10" roughness={0.4} metalness={0.85} />
        </mesh>

        {/* Glow halo behind the screen — a slightly larger dim plane the bloom
            pass picks up so the monitor reads as luminous from any angle. */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[7.2, 3.4]} />
          <meshBasicMaterial color="#0d2a30" transparent opacity={0.85} />
        </mesh>

        {/* Inner screen panel */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[6.0, 2.2]} />
          <meshStandardMaterial
            color="#031218"
            emissive="#0a3a40"
            emissiveIntensity={1.4}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Caesar Funches headline. drei's default font is a clean sans;
            the glow + outline + scale give the dominant visual impact. */}
        <Text
          position={[0, 0.42, 0.14]}
          fontSize={0.85}
          color="#d2fff5"
          letterSpacing={0.06}
          anchorX="center"
          anchorY="middle"
          maxWidth={5.6}
          fontWeight={800}
          outlineWidth={0.005}
          outlineColor="#5eead4"
          outlineOpacity={0.6}
        >
          {(name || 'CAESAR FUNCHES').toUpperCase()}
        </Text>

        {/* Sub-line tag */}
        <Text
          position={[0, -0.55, 0.14]}
          fontSize={0.22}
          color="#5eead4"
          letterSpacing={0.32}
          anchorX="center"
          anchorY="middle"
          maxWidth={5.6}
        >
          {(tag || '// SOC ANALYST · HOUSTON, TX').toUpperCase()}
        </Text>

        {/* Decorative HUD ticks at the corners */}
        <CornerTick x={-2.85} y={ 0.95} />
        <CornerTick x={ 2.85} y={ 0.95} flipX />
        <CornerTick x={-2.85} y={-0.95} flipY />
        <CornerTick x={ 2.85} y={-0.95} flipX flipY />
      </group>
    </Float>
  );
}

function CornerTick({ x, y, flipX = false, flipY = false }) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <group position={[x, y, 0.13]}>
      <mesh position={[(0.18 * sx) / 2, 0, 0]}>
        <planeGeometry args={[0.18, 0.02]} />
        <meshBasicMaterial color="#5eead4" />
      </mesh>
      <mesh position={[0, (0.18 * sy) / 2, 0]}>
        <planeGeometry args={[0.02, 0.18]} />
        <meshBasicMaterial color="#5eead4" />
      </mesh>
    </group>
  );
}
