'use client';

import { useRef, useMemo, useSyncExternalStore, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function OrbMesh({ isMobile = false }: { isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Create gradient material colors
  const colors = useMemo(() => ({
    primary: new THREE.Color('#7C3AED'), // Purple
    secondary: new THREE.Color('#06B6D4'), // Cyan
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;
    }
    if (glowRef.current) {
      // Pulsing glow effect
      const scale = 1.15 + Math.sin(time * 2) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.2;
    }
  });

  const baseScale = isMobile ? 0.9 : 1.2;

  return (
    <Float
      speed={isMobile ? 0.8 : 1.5}
      rotationIntensity={isMobile ? 0.1 : 0.3}
      floatIntensity={isMobile ? 0.3 : 0.6}
    >
      <group scale={baseScale}>
        {/* Outer glow - very subtle */}
        <mesh ref={glowRef} scale={1.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={colors.primary}
            transparent
            opacity={0.08}
          />
        </mesh>

        {/* Main orb with distortion */}
        <mesh ref={meshRef} scale={1}>
          <icosahedronGeometry args={[1, 5]} />
          <MeshDistortMaterial
            color={colors.primary}
            attach="material"
            distort={isMobile ? 0.15 : 0.3}
            speed={isMobile ? 1.5 : 2.5}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh scale={1.05}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={colors.secondary}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Primary ring - horizontal */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} scale={1.5}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshBasicMaterial 
            color={colors.secondary} 
            transparent 
            opacity={0.7} 
          />
        </mesh>

        {/* Secondary ring - angled */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]} scale={1.4}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshBasicMaterial 
            color={colors.primary} 
            transparent 
            opacity={0.5} 
          />
        </mesh>

        {/* Third ring - different angle */}
        <mesh rotation={[Math.PI / 4, -Math.PI / 3, 0]} scale={1.6}>
          <torusGeometry args={[1, 0.008, 16, 100]} />
          <meshBasicMaterial 
            color={colors.secondary} 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      </group>
    </Float>
  );
}

// Particle field for depth
function Particles({ count = 60, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
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
        size={0.03}
        color="#7C3AED"
        transparent
        opacity={0.5}
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
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} color="#06B6D4" intensity={0.6} />
        <pointLight position={[10, -10, 5]} color="#7C3AED" intensity={0.6} />
        <pointLight position={[0, 5, 2]} color="#ffffff" intensity={0.3} />
        
        {/* Main orb */}
        <OrbMesh isMobile={isMobile} />
        
        {/* Background particles */}
        <Particles count={isMobile ? 0 : 60} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
