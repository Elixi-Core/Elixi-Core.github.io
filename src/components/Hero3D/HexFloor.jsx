import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural hexagonal grid floor — the seam glow is a pure fragment shader so
// it stays crisp at any zoom and costs almost nothing on mobile.
export function HexFloor() {
  const matRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uColorBase:  { value: new THREE.Color('#040608') },
      uColorEdge:  { value: new THREE.Color('#5eead4') }, // teal-400
      uColorPulse: { value: new THREE.Color('#a7fff0') },
      uScale:      { value: 8.0 },
    }),
    []
  );

  useFrame((_, dt) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += dt;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
      <planeGeometry args={[60, 60, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vWorld;
          void main() {
            vUv = uv;
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorld = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `}
        fragmentShader={`
          precision highp float;
          uniform float uTime;
          uniform vec3 uColorBase;
          uniform vec3 uColorEdge;
          uniform vec3 uColorPulse;
          uniform float uScale;
          varying vec2 vUv;
          varying vec3 vWorld;

          // Hex distance — returns the distance to the nearest hex edge in
          // honeycomb-tiled space. From iquilezles.org/articles/distfunctions2d.
          float hexDist(vec2 p) {
            p = abs(p);
            float c = max(p.x * 0.866025 + p.y * 0.5, p.y);
            return c;
          }

          vec4 hexCoords(vec2 uv) {
            // Two hex grids offset; pick whichever is closer.
            vec2 r = vec2(1.0, 1.7320508);
            vec2 h = r * 0.5;
            vec2 a = mod(uv, r) - h;
            vec2 b = mod(uv - h, r) - h;
            vec2 gv = (dot(a, a) < dot(b, b)) ? a : b;
            float d = hexDist(gv);
            return vec4(gv, d, length(uv));
          }

          void main() {
            vec2 uv = vUv * uScale - uScale * 0.5;
            // Compress depth so cells look bigger far away (forced perspective).
            uv.y *= 1.4;
            vec4 hc = hexCoords(uv);
            float edge = smoothstep(0.49, 0.502, hc.z);     // sharp seam line
            float glow = smoothstep(0.55, 0.42, hc.z) * 0.55; // inner-cell darkening
            // Slow ripple of brighter cells.
            float ripple = sin(uTime * 0.6 - hc.w * 0.7) * 0.5 + 0.5;
            ripple = smoothstep(0.7, 1.0, ripple) * 0.35;
            vec3 col = mix(uColorBase, uColorEdge, edge);
            col += uColorPulse * ripple * (1.0 - edge);
            // Distance fog — fade to base black at the edges.
            float fog = smoothstep(15.0, 35.0, length(vWorld.xz));
            col = mix(col, uColorBase, fog);
            // Vignette.
            float vig = smoothstep(28.0, 8.0, length(vWorld.xz));
            col *= 0.65 + vig * 0.55;
            gl_FragColor = vec4(col, 1.0 - fog * 0.85);
          }
        `}
      />
    </mesh>
  );
}
