import React, { useRef,useState, useEffect, Suspense } from "react";
import { Canvas, useFrame,useLoader } from "@react-three/fiber";
import { OrbitControls,useTexture,Text } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader';

//import { OrbitControls } from "three-stdlib"; code in js.


// const w = window.innerWidth;
// const h = window.innerHeight;
// const scene = THREE.Scene();
// const camera = THREE.PerspectiveCamera(75,w/h,0.1,1000);

// camera.position.z =5;
// const renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setSize(w,h);

// document.body.appendChild(renderer.domElement);

// new OrbitControls(camera,renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new  THREE.MeshStandardMaterial({color: 0xffff00});

// const cube = new THREE.Mesh(geometry,material);

// scene.add(cube);

// // material.map.colorSpace = THREE.SRGBColorSpace;
// const earthMesh = new THREE.Mesh(geometry, material);
// scene.add(earthMesh);
// //earthGroup.add(earthMesh);

// const hemilight = new THREE.HemisphereLight();

// scene.add(hemilight);

// function animate() {
//     requestAnimationFrame(animate);
  
//     earthMesh.rotation.y += 0.002;
//     earthMesh.rotation.x += 0.02;
//     renderer.render(scene, camera);
//   }
  
//   animate();
//   function handleWindowResize () {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }
//   window.addEventListener('resize', handleWindowResize, false);


//import bla from '../../../../public/texture/75acb3ebf6cc25845fa52981eadfb4a1f91d61b7_2_690x345.jpeg'
 
function Earth() {
  // Ref for the Earth mesh to handle rotation
  const earthRef = useRef();
  const [temperature] = useState(25); // Example temperature value
  useFrame(({clock}) => {
    
    const a = clock.getElapsedTime();
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) {
      
      // Animate rotation
      earthRef.current.rotation.y += 0.001;
      earthRef.current.rotation.x += 0.001;
      
      // Animate position slowly over time
    // earthRef.current.rotation.x = Math.sin(elapsedTime ) * 0.001; // Slow oscillation on x
    // earthRef.current.rotation.y = Math.cos(elapsedTime ) * 0.001; // Slow oscillation on y
    }
  });
 // const texture = useTexture('/texture/sunmap')
  const colorMap = useLoader(TextureLoader, 'texture/75acb3ebf6cc25845fa52981eadfb4a1f91d61b7_2_690x345.jpeg')
  return (
    <>
    <ambientLight intensity={1} />
    <directionalLight />
    <mesh ref={earthRef} position={[0, 0, -6]}>
    <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial  
           map={colorMap} /> {/* Moon Texture */}
    </mesh>
      {/* Temperature Text */}
      <Text
        position={[0, -2.5, 0]} // Place text in front of and slightly above the moon
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`${temperature}°C`} {/* Display temperature */}
      </Text>
    </>
  );
}

function Temperaturetext ()
{
  const [temperature] = useState(25); // Example temperature value
  return (
    <mesh position={[0, -2, 0]}>
     
        {/* Temperature Text */}
        <Text
     position={[0, 1.5,100]} // Positioned in front of the moon
    fontSize={1} // Adjust text size
    color="#ffffff" // Text color
    anchorX="center" // Center alignment horizontally
    anchorY="middle" // Center alignment vertically
  >
    {`${temperature}°C`} {/* Temperature value */}
  </Text> 
    </mesh>

  );
}
function EarthScene() {
  
  return (
    <Canvas
    
      camera={{ position: [0, 0, 5], fov: 75 }}
      
    >
     
       {/* Ambient Light */}
       <ambientLight intensity={0.2} />

{/* Moonlight (SpotLight for reflection) */}
<spotLight
  position={[2, 2, 2]} // Position of moonlight
  angle={0.3} // Spread of light
  penumbra={1} // Soft edges
  intensity={2} // Brightness
  castShadow
/>

{/* Optional: Point Light for general glow */}
<pointLight position={[-5, 2, 3]} intensity={0.5} color="#ffffff" />
<spotLight position={[5, 5, 5]} intensity={1} castShadow />
      {/* Earth Mesh */}
       <Suspense fallback={null}> 
      
      <OrbitControls enableZoom={true}/>
        
      </Suspense> 
      {/* Orbit Controls */}
      <Earth />
      
      {/* Resize Handler */}
     
     
      
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
