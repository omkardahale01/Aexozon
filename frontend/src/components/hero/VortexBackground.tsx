import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// 1. Starfield Layer
// --------------------------------------------------------
const Starfield = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random distribution in a large sphere
      const r = 20 + Math.random() * 30;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 10; // pushed back

      // 10% chance for warm/red tint, else white
      const isWarm = Math.random() < 0.1;
      const color = new THREE.Color(isWarm ? '#ffddcc' : '#ffffff');
      // random base opacity via color multiplier (since material handles global opacity)
      const intensity = 0.2 + Math.random() * 0.6;
      color.multiplyScalar(intensity);
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Very slow drift
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// --------------------------------------------------------
// 2. Spiral Ring System
// --------------------------------------------------------
const SpiralRings = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const rings = useMemo(() => {
    return [
      { radius: 3, speed: 1 / 40, tiltX: 0.1, tiltY: -0.1, color: '#BFE3FF' },
      { radius: 5, speed: 1 / 50, tiltX: -0.15, tiltY: 0.1, color: '#4AA8FF' },
      { radius: 8, speed: 1 / 70, tiltX: 0.05, tiltY: 0.2, color: '#3D8FE0' },
      { radius: 12, speed: 1 / 90, tiltX: -0.2, tiltY: -0.05, color: '#1a5b99' },
      { radius: 16, speed: 1 / 110, tiltX: 0.1, tiltY: 0.15, color: '#0d365e' },
    ];
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Rotate each ring individually
      groupRef.current.children.forEach((child, i) => {
        child.rotation.z -= rings[i].speed * delta * Math.PI * 2;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {rings.map((ring, i) => {
        // Create a dashed/gradient effect using a custom shader material on a tube/torus
        return (
          <mesh key={i} rotation={[ring.tiltX, ring.tiltY, 0]}>
            <torusGeometry args={[ring.radius, 0.02, 16, 100]} />
            <meshBasicMaterial 
              color={ring.color} 
              transparent 
              opacity={0.3 + (1 - i/rings.length) * 0.4} 
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// --------------------------------------------------------
// 3. Streak / Brush Overlay
// --------------------------------------------------------
// Using a particle system that forms radiating streaks
const StreakOverlay = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 20; // radiates outwards
      // cluster points along lines (streaks)
      const streakAngle = Math.floor(angle * 20) / 20; // 20 discrete streaks
      const finalAngle = streakAngle + (Math.random() - 0.5) * 0.05;
      
      pos[i * 3] = Math.cos(finalAngle) * radius;
      pos[i * 3 + 1] = Math.sin(finalAngle) * radius;
      pos[i * 3 + 2] = -5 + (Math.random() - 0.5) * 2;
    }
    return pos;
  }, []);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      // Rotate backwards extremely slowly (150s)
      pointsRef.current.rotation.z += (1 / 150) * delta * Math.PI * 2;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3D8FE0"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.15}
      />
    </Points>
  );
};

// --------------------------------------------------------
// 4. Core Glow
// --------------------------------------------------------
const CoreGlow = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      // 4s loop: opacity 0.8 -> 1 -> 0.8
      const t = (state.clock.elapsedTime % 4) / 4; 
      mat.opacity = 0.8 + 0.2 * Math.sin(t * Math.PI * 2);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -4]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={createRadialGradient()}
      />
    </mesh>
  );
};

// Helper to create a soft bloom texture programmatically
function createRadialGradient() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(191, 227, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(74, 168, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
  }
  return new THREE.CanvasTexture(canvas);
}

// --------------------------------------------------------
// Main Component
// --------------------------------------------------------
export const VortexBackground = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050506] overflow-hidden pointer-events-none z-0">
      
      {/* Outer glow halo (CSS) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 -top-[10%] w-[80vw] max-w-[1200px] aspect-square rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(61,143,224,0.08) 0%, rgba(5,5,6,0) 70%)',
          filter: 'blur(80px)',
          animation: reducedMotion ? 'none' : 'vortex-pulse 8s ease-in-out infinite'
        }}
      />
      
      <style>{`
        @keyframes vortex-pulse {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50% { transform: translate(-50%, 0) scale(1.05); }
        }
      `}</style>

      {/* Static Poster Fallback */}
      {(!isMounted || reducedMotion) && (
        <div className="absolute inset-0 bg-[#050506] flex items-center justify-center">
           {/* Simple static representation */}
           <div className="w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(74,168,255,0.15)_0%,rgba(5,5,6,0)_60%)] filter blur-3xl" />
        </div>
      )}

      {/* WebGL Canvas */}
      {isMounted && !reducedMotion && (
        <Canvas 
          camera={{ position: [0, 0, 15], fov: 60 }} 
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          className="opacity-0 animate-[fade-in_1s_ease-out_forwards]"
        >
          <color attach="background" args={['#050506']} />
          <Starfield />
          <StreakOverlay />
          <SpiralRings />
          <CoreGlow />
        </Canvas>
      )}

      <style>{`
        @keyframes fade-in {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
