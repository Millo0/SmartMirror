'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Cloud, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSun({ position }) {
  const sunRef = useRef(null);
  const { nodes } = useGLTF('./assets/3d/the_sun.glb', true, (err) => {
    console.error("Error loading GLTF:", err);
  });
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.01;
      sunRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 + position[1];
    }
  });

  return (
    <mesh ref={sunRef} position={position} scale={[0.2, 0.2, 0.2]}>
      <primitive object={nodes.LOD3spShape} />
      <meshStandardMaterial color="#FFD700" emissive="#FFA500" />
    </mesh>
  );
}

function AnimatedCloud({ position }) {
  const cloudRef = useRef(null);

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      cloudRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + position[0];
    }
  });

  return <Cloud ref={cloudRef} position={position} scale={1} opacity={0.8} />;
}

function WeatherScene({ temperature, description }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedSun position={[-1, 1, 0]} />
      <AnimatedCloud position={[1, 0, 0]} />
      <Text
        position={[0, 0, 1]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        //font="/fonts/Inter-Bold.ttf"
      >
        {`${temperature}°C`}
      </Text>
      <Text
        position={[0, -1, 1]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
       // font="/fonts/Inter-Regular.ttf"
      >
        {description}
      </Text>
    </>
  );
}

export function WeatherForecast() {
  const [temperature] = useState(22);
  const [description] = useState('Partly Cloudy');

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <WeatherScene temperature={temperature} description={description} />
      </Canvas>
    </div>
  );
}
