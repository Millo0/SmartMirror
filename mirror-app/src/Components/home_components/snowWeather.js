
// 'use client';

// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// function Model({ url, scale = [1, 1, 1] }) {
//   // Load the GLB model using the useGLTF hook
//   const { scene } = useGLTF(url);

//   return <primitive object={scene} scale={scale} />;
// }

// export default function GLBViewer() {
//   return (
//     <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a2e' }}>
//       <Canvas
//         camera={{
//           fov: 45,
//           near: 0.1,
//           far: 1000,
//           position: [0, 2, 5],
//         }}
//       >
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <Environment preset="studio" />
//         <React.Suspense fallback={null}>
//           {/* Replace the URL with the path to your GLB file */}
//           <Model url="/cloud_test.glb" scale={[0.5, 0.5, 0.5]} />
//         </React.Suspense>
//         <OrbitControls enablePan enableZoom enableRotate />
//       </Canvas>
//     </div>
//   );
// }




'use client'

import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Cloud, OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import "./header.css";
import WeatherComponent from "./weather";

import { useGLTF, Environment } from '@react-three/drei';

function Model({ url, scale = [1, 1, 1] }) {
  // Load the GLB model using the useGLTF hook
  const { scene } = useGLTF(url);

  return <primitive object={scene} scale={scale} />;
}

function Light_Model({ url, scale = [2, 2.5, 2.5] }) {
  // Load the GLB model using the useGLTF hook
  const { scene } = useGLTF(url);

  return <primitive object={scene} scale={scale} position={[1, -12, 0]}/>;
}


function ModelDisplay() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setIsVisible(prev => !prev); // Toggle visibility
      }, 3000); // Toggle every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    useEffect(() => {
      if (isVisible) {
        const timeout = setTimeout(() => {
          setIsVisible(false); // Hide after 1 second
        }, 100); // Keep it visible for 1 second

        return () => clearTimeout(timeout); // Cleanup timeout
      }
    }, [isVisible]);

    return (
      <React.Suspense fallback={null}>
        {isVisible && <Light_Model url="/3_pack_of_storm_lightning.glb" />}
      </React.Suspense>
    );
}


// Custom shader material for the glow effect
const fragmentShader = `
  varying vec3 vPosition;
  void main() {
    float intensity = 1.0 - pow(length(gl_PointCoord - vec2(0.5, 0.5)) * 2.0, 2.0);
    gl_FragColor = vec4(0.8, 0.5, 1.0, intensity);
  }
`

const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function generateLightningPath(startPoint, endPoint, branchCount = 3, segmentsCount = 8) {
  const points = []
  const branches = []

  // Main bolt
  let currentPoint = startPoint.clone()
  const direction = endPoint.clone().sub(startPoint).divideScalar(segmentsCount)

  for (let i = 0; i <= segmentsCount; i++) {
    const offset = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      0,
      (Math.random() - 0.5) * 2
    )
    if (i !== 0 && i !== segmentsCount) {
      offset.multiplyScalar(2)
    }
    const point = currentPoint.clone().add(offset)
    points.push(point)
    currentPoint.add(direction)

    // Create branches
    if (i > 1 && i < segmentsCount - 1 && branches.length < branchCount) {
      const branchStart = point.clone()
      const branchEnd = branchStart.clone().add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          -5,
          (Math.random() - 0.5) * 10
        )
      )
      const branchPoints = generateLightningPath(
        branchStart,
        branchEnd,
        0,
        Math.floor(segmentsCount / 2)
      ).points
      branches.push(...branchPoints)
    }
  }

  return { points: points, branches: branches }
}

function LightningBolt() {
    const mainRef = useRef();
    const glowRef = useRef();
    const lightRef = useRef(); // Reference for the light
    const [visible, setVisible] = useState(false);

    const { points, branches } = useMemo(() => {
      const start = new THREE.Vector3(0, -3, 0);
      const end = new THREE.Vector3(0, -15, 0);
      return generateLightningPath(start, end);
    }, []);

    const allPoints = useMemo(() => [...points, ...branches], [points, branches]);

    useEffect(() => {
      const interval = setInterval(() => {
        setVisible(true);
        setTimeout(() => setVisible(false), 150);
      }, Math.random() * 5000 + 3000);

      return () => clearInterval(interval);
    }, []);

    useFrame(() => {
      if (mainRef.current) {
        mainRef.current.visible = visible;
      }
      if (glowRef.current) {
        glowRef.current.visible = visible;
      }
      if (lightRef.current) {
        lightRef.current.intensity = visible ? 2 : 0; // Adjust the intensity
      }
    });

    return (
      <group>
        {/* Main lightning bolt */}
        <line ref={mainRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={allPoints.length}
              array={new Float32Array(allPoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#e4b5ff" linewidth={2} />
        </line>

        {/* Glow effect */}
        <points ref={glowRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={allPoints.length}
              array={new Float32Array(allPoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <shaderMaterial
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Point light for glowing effect */}
        <pointLight
          ref={lightRef}
          color="#e4b5ff"
          intensity={10000000000000}
          distance={10000000000000} // Adjust the range of the light
          decay={0.1}
          position={[5, 5, 5]} // Adjust the position if needed
        />
      </group>
    );
  }
function LightningBolt2() {
    const mainRef = useRef();
    const glowRef = useRef();
    const lightRef = useRef(); // Reference for the light
    const [visible, setVisible] = useState(false);

    const { points, branches } = useMemo(() => {
      const start = new THREE.Vector3(0, -3, 0);
      const end = new THREE.Vector3(0, -15, 0);
      return generateLightningPath(start, end);
    }, []);

    const allPoints = useMemo(() => [...points, ...branches], [points, branches]);

    useEffect(() => {
      const interval = setInterval(() => {
        setVisible(true);
        setTimeout(() => setVisible(false), 150);
      }, Math.random() * 5000 + 3000);

      return () => clearInterval(interval);
    }, []);

    useFrame(() => {
      if (mainRef.current) {
        mainRef.current.visible = visible;
      }
      if (glowRef.current) {
        glowRef.current.visible = visible;
      }
      if (lightRef.current) {
        lightRef.current.intensity = visible ? 2 : 0; // Adjust the intensity
      }
    });

    return (
      <group>
        {/* Main lightning bolt */}
        <line ref={mainRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={allPoints.length}
              array={new Float32Array(allPoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ff6347" linewidth={2} />
        </line>

        {/* Glow effect */}
        <points ref={glowRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={allPoints.length}
              array={new Float32Array(allPoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <shaderMaterial
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Point light for glowing effect */}
        <pointLight
          ref={lightRef}
          color="#ff6347"
          intensity={10000000000000}
          distance={10000000000000} // Adjust the range of the light
          decay={0.1}
          position={[5, 5, 5]} // Adjust the position if needed
        />
      </group>
    );
  }


function Rain() {
  const rainCount = 1000
  const positions = useMemo(() => {
    const pos = new Float32Array(rainCount * 3)
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  const ref = useRef()

  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= 0.1
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 2
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#8cb3ff" size={0.05} transparent opacity={0.6} />
    </points>
  )
}

function RotatingCloud() {
    const cloudRef = useRef();

    useFrame(() => {
      if (cloudRef.current) {
        cloudRef.current.rotation.y += 0.001; // Adjust speed by changing the value
      }
    });

    return <Cloud ref={cloudRef} position={[0, 5, 0]} scale={[1.7, 1.5, 1.5]} speed={1} opacity={0.5} />;
  }

  function CloudScene() {
    return (
      <>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        {/* <RotatingCloud /> */}
        {/* <LightningBolt />
        <LightningBolt2 /> */}
        {/* <Rain /> */}
        {/* <Light_Model url="/3_pack_of_storm_lightning.glb" scale={[2, 2.5, 2.5]} /> */}
        {/* <ModelDisplay /> */}
        <Model url="/cloud_test.glb" scale={[3, 3, 3]} />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </>
    );
  }


function Snow({ count = 12000 }) {
    const rainRef = useRef();

    useEffect(() => {
      const positions = [];
      const sizes = [];

      for (let i = 0; i < count; i++) {
        positions.push(
          Math.random() * 400 - 200,
          Math.random() * 500 - 250,
          Math.random() * 400 - 200
        );
        sizes.push(30);
      }

      rainRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(positions), 3)
      );

      rainRef.current.geometry.setAttribute(
        "size",
        new THREE.BufferAttribute(new Float32Array(sizes), 1)
      );
    }, [count]);

    useFrame(() => {
      if (rainRef.current) {
        let positions = rainRef.current.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] -= 0.2; // Move rain down

          if (positions[i] < -250) {
            positions[i] = 250; // Reset to top
          }
        }
        rainRef.current.geometry.attributes.position.needsUpdate = true;
      }
    });

    return (
      <points ref={rainRef}>
        <bufferGeometry />
        <pointsMaterial color={0xaaaaaa} size={0.1} transparent={true} />
      </points>
    );
  }

export default function CloudHeader() {
  let temperature = "..";
  let WeatherComponentt = WeatherComponent();
  if (WeatherComponentt && WeatherComponentt["weather"]) {
    temperature = Math.round(WeatherComponentt["weather"]["main"]["temp"]);
  }
  return (
    <div class="video-container">
        {/* <iframe
            src="/test/web.html"
            className="iframe-background"
            title="3D background with Three.js" // Adding a title for accessibility
        ></iframe> */}

      <Canvas camera={{ position: [0, 0, 20], fov: 75 }} gl={{ toneMappingExposure: 2 }}>
        <Suspense fallback={null}>
          <CloudScene />
          <Text
        position={[0, -8.5, 0]} // Place text in front of and slightly above the moon
        fontSize={6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`${temperature}°C`} {/* Display temperature */}
      </Text>
          <Snow />
        </Suspense>
      </Canvas>
    </div>
  )
}

