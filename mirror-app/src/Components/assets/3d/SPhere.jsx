import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';

function MoonSphere() {
  // Load the texture
  const moonTexture = useLoader(TextureLoader, '/texture/galaxy1.png');

  return (
    <mesh>
      {/* Sphere geometry with higher segments for smoothness */}
      <sphereGeometry args={[1, 64, 64]} />
      {/* Apply the texture */}
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      {/* Lights for illumination */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      {/* Moon Sphere */}
      <MoonSphere />
      {/* Orbit controls for interactivity */}
      <OrbitControls enableZoom={true} />
    </>
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(window.innerWidth, window.innerHeight);
      }}
    >
      {/* Suspense for asynchronous loading */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
