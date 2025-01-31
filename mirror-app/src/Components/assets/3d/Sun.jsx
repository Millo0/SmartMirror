import React, { useRef,useState, useEffect, Suspense } from "react";
import { Canvas, useFrame,useLoader } from "@react-three/fiber";
import { OrbitControls,useTexture,Text,Effects } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Bloom, EffectComposer, RenderPass,Noise } from '@react-three/postprocessing';
function Sun() {
  // Ref for the Earth mesh to handle rotation
  const earthRef = useRef();
  
  useFrame(({clock}) => {
    
    const a = clock.getElapsedTime();
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) {
      
      // Animate rotation
      earthRef.current.rotation.y += 0.001;
      //earthRef.current.rotation.x += 0.001;
      earthRef.current.rotation.z += 0.001;
      // Animate position slowly over time
    // earthRef.current.rotation.x = Math.sin(elapsedTime ) * 0.001; // Slow oscillation on x
    // earthRef.current.rotation.y = Math.cos(elapsedTime ) * 0.001; // Slow oscillation on y
    }
  });
 // const texture = useTexture('/texture/sunmap')
  const colorMap = useLoader(TextureLoader, 'texture/8k_sun.jpg')
  return (
    <>
    <ambientLight intensity={0.2} />
    <directionalLight />
    <mesh ref ={earthRef} >
      {/* Geometry and Material */}
      <sphereGeometry args={[1, 64, 64]} /> {/* Sphere for Earth */}
      <meshStandardMaterial  
           map={colorMap} emissive={"orange"}
           emissiveIntensity={1.5}
           toneMapped={false} /> {/* Yellow Earth */}
    </mesh>

    </>
  );
}

function EffectsWrapper() {
  return (
    <EffectComposer>
      {/* Bloom Effect */}
      <Bloom
        intensity={1.5} // Adjust bloom intensity
        kernelSize={3}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.5}
      />
    </EffectComposer>
  );
}

function Temperaturetext ()
{
  const [temperature] = useState(25); // Example temperature value
  return (
    <mesh position={[0, -2, 0]}>
     
        {/* Temperature Text */}
        <Text
     position={[0, -0.5, 0]} // Positioned in front of the moon
    fontSize={0.5} // Adjust text size
    color="#ffffff" // Text color
    anchorX="center" // Center alignment horizontally
    anchorY="middle" // Center alignment vertically
  >
    {`${temperature}°C`} {/* Temperature value */}
  </Text> 
    </mesh>

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

function EarthScene() {
  
  return (
    <Canvas
    
      camera={{ position: [0, 0, 5], fov: 75 }}
      
    >
     
 
      <OrbitControls enableZoom={true}/>
        
       {/* Ambient and Directional Lights */}
       <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="orange" />
      <Noise opacity={0.02} />
      {/* Realistic Sun */}
      <Sun />
      <Galaxy />
      {/* Bloom Effects */}
      <EffectsWrapper />
    </Canvas>
    
  );
}

function ResizeHandler() {
  useEffect(() => {
    const handleResize = () => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    
  }, []);
  return null;
}

export default EarthScene;
