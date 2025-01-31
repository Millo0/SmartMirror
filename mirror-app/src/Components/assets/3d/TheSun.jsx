import React, { useMemo, useRef, useState, useEffect} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom,Glitch } from "@react-three/postprocessing";
import * as THREE from "three";




function Sun() {
  const sunRef = useRef();

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.01; // Slowly rotate
      const material = sunRef.current.material;
      if (material && material.emissive) {
        material.emissiveIntensity = 2.0; // Add glow effect
      }
    }
  });
  return (
    <Icosahedron ref={sunRef} args={[2, 15]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#FDB813" 
        emissive="#FFD700" 
        emissiveIntensity={1.5} 
      />
    </Icosahedron>
  );
}

function Galaxy() {
  const [particlesCount] = useState(1000); // Number of particles
  const galaxyRef = useRef();
  const positionsRef = useRef(new Float32Array(particlesCount * 3)); // Particle positions
  const brightnessRef = useRef(new Float32Array(particlesCount)); // Particle brightness
  const animationSpeedsRef = useRef(new Float32Array(particlesCount)); // Brightness change speeds
  const timeOffsetsRef = useRef(new Float32Array(particlesCount)); // Individual delays
  const orbitSpeedsRef = useRef(new Float32Array(particlesCount)); // Orbit speeds
  const radius = 100; // Orbit radius around the sun

  // Initialize particle positions, brightness, animation properties, and delays
  useEffect(() => {
    const positions = positionsRef.current;
    const brightness = brightnessRef.current;
    const animationSpeeds = animationSpeedsRef.current;
    const timeOffsets = timeOffsetsRef.current;
    const orbitSpeeds = orbitSpeedsRef.current;

    for (let i = 0; i < particlesCount; i++) {
      const angle = (i / particlesCount) * Math.PI * 2;

      // Set positions
      positions[i * 3 + 0] = Math.cos(angle) * radius + Math.random() * 10 - 5; // Random small offset
      positions[i * 3 + 1] = Math.random() * 200 - 100; // Random height
      positions[i * 3 + 2] = Math.sin(angle) * radius + Math.random() * 10 - 5;

      // Initialize brightness and animation properties
      brightness[i] = 0; // Start with 0 brightness (invisible)
      animationSpeeds[i] = 0.05 + Math.random() * 0.02; // Slow random fade speed
      timeOffsets[i] = Math.random() * 5000; // Random delay for each particle (in ms)
      orbitSpeeds[i] = 0.00001 + Math.random() * 0.00005; // Slow random orbit speed
    }
  }, [particlesCount]);

  // Update particle brightness and position
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * 1000; // Convert to milliseconds
    const positions = positionsRef.current;
    const brightness = brightnessRef.current;
    const animationSpeeds = animationSpeedsRef.current;
    const timeOffsets = timeOffsetsRef.current;

    for (let i = 0; i < particlesCount; i++) {
      // Check if the delay time has passed for this particle
      if (elapsedTime > timeOffsets[i]) {
        // Update brightness for light-on/off effect
        brightness[i] += animationSpeeds[i];
        if (brightness[i] > 1 || brightness[i] < 0) {
          animationSpeeds[i] *= -1; // Reverse the fade direction
        }
      }

      // Update orbit position
      const angle = (i / particlesCount) * Math.PI * 2 + performance.now() * orbitSpeedsRef.current[i];
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      positions[i * 3 + 0] = x;
      positions[i * 3 + 2] = z;
    }

    if (galaxyRef.current) {
      galaxyRef.current.geometry.attributes.position.needsUpdate = true;
      galaxyRef.current.geometry.attributes.brightness.needsUpdate = true;
    }
  });

  return (
    <points ref={galaxyRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          itemSize={3}
          array={positionsRef.current}
        />
        <bufferAttribute
          attach="attributes-brightness"
          count={particlesCount}
          itemSize={1}
          array={brightnessRef.current}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xFBD813} // Gold color
        size={0.5} // Size of particles
        transparent
        vertexColors={false}
        opacity={1.0} // Base opacity (brightness will add to this)
      />
    </points>
  );
}
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Sun />
      <Galaxy />
      <EffectComposer>
        <Bloom threshold={0} strength={2.5} radius={1.0} />
        
      </EffectComposer>
    </>
  );
}

export default function GalaxyScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60, near: 1.0, far: 1000 }}>
      <Scene />
    </Canvas>
  );
}
