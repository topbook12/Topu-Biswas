'use client';

import { useRef, useMemo, useSyncExternalStore, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function OrbMesh({ isMobile = false }: { isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create gradient material colors
  const colors = useMemo(() => ({
    primary: new THREE.Color('#7C3AED'), // Purple
    secondary: new THREE.Color('#06B6D4'), // Cyan
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (glowRef.current) {
      // Pulsing glow effect
      const scale = 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float
      speed={isMobile ? 1 : 2}
      rotationIntensity={isMobile ? 0.2 : 0.5}
      floatIntensity={isMobile ? 0.5 : 1}
    >
      <group>
        {/* Main orb */}
        <mesh ref={meshRef} scale={isMobile ? 1.2 : 1.8}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color={colors.primary}
            attach="material"
            distort={isMobile ? 0.2 : 0.4}
            speed={isMobile ? 1 : 2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh scale={isMobile ? 1.3 : 2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={colors.secondary}
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Outer glow */}
        <mesh ref={glowRef} scale={isMobile ? 1.5 : 2.2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={colors.primary}
            transparent
            opacity={0.05}
          />
        </mesh>

        {/* Ring around orb */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={isMobile ? 1.5 : 2.2}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshBasicMaterial color={colors.secondary} transparent opacity={0.6} />
        </mesh>

        {/* Second ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} scale={isMobile ? 1.4 : 2}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshBasicMaterial color={colors.primary} transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// Particle field for depth
function Particles({ count = 100, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  if (isMobile) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#7C3AED"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Use useSyncExternalStore for window width (React 18+ recommended pattern)
function useWindowWidth() {
  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    return window.innerWidth;
  }, []);

  const getServerSnapshot = useCallback(() => 0, []);

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

interface FloatingOrbProps {
  className?: string;
}

export default function FloatingOrb({ className = '' }: FloatingOrbProps) {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const isClient = windowWidth > 0;

  // Don't render canvas until client-side
  if (!isClient) {
    return (
      <div className={`w-full h-full ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 animate-pulse opacity-80 blur-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#06B6D4" intensity={0.5} />
        <pointLight position={[10, -10, 5]} color="#7C3AED" intensity={0.5} />
        
        <OrbMesh isMobile={isMobile} />
        <Particles count={isMobile ? 0 : 80} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
