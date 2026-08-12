import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const VortexParticles = ({ count, reducedMotion }: { count: number; reducedMotion: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create a swirling vortex of particles
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Radius distribution: denser near center, thinning out
      const radius = Math.pow(Math.random(), 1.5) * 15 + 1;
      
      // Angle based on radius (creates spiral/vortex effect)
      const angle = (radius * 1.5) + (Math.random() * Math.PI * 2);
      
      // Depth (z-axis) creates the tunnel effect
      // Closer to center = deeper
      const depth = (Math.random() - 0.5) * 10 - (15 / radius);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = depth;
    }
    return pos;
  }, [count]);

  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    // Slow continuous rotation
    pointsRef.current.rotation.z -= delta * 0.05;
    
    // Very subtle mouse parallax
    const targetX = pointer.x * 0.1;
    const targetY = pointer.y * 0.1;
    
    pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00e5ff"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
};

export const VortexBackground = () => {
  // Check for reduced motion preference
  const reducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Responsive particle count
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
  
  let particleCount = 10000;
  if (isMobile) particleCount = 3000;
  else if (isTablet) particleCount = 6000;

  return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none overflow-hidden">
      {/* Background gradients for extra depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <VortexParticles count={particleCount} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
