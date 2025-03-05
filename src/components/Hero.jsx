"use client"
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useCallback } from 'react';
import { OrbitControls, useGLTF, SpotLight, useAnimations, Environment, Stars } from '@react-three/drei';

// Skull model component
function Skull({ isMobile, onLoad }) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const { scene, animations } = useGLTF('/skull_salazar_downloadable/scene.gltf', true);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.roughness = 0.4;
            child.material.metalness = 0.6;
            child.material.needsUpdate = true;
          }
        }
      });
      setModelLoaded(true);
      onLoad && onLoad();
    }
  }, [scene, onLoad]);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach(action => action.play());
    }
  }, [actions]);

  if (!modelLoaded) return null;

  return (
    <group>
      <primitive 
        object={scene}
        scale={isMobile ? 2.8 : 5}
        position={[0, isMobile ? -1.5 : -1.5, isMobile ? 1 : 0]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  );
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  const handleMediaQuery = useCallback((event) => {
    setIsMobile(event.matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQuery);
    };
  }, [handleMediaQuery]);

  const handleModelLoad = useCallback(() => {
    setModelLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Canvas
        frameloop='demand'
        shadows="basic"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        camera={{ 
          position: [0, 0, isMobile ? 14 : 16],
          fov: isMobile ? 35 : 30,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 2.5}
            autoRotate
            autoRotateSpeed={1.2}
            enableDamping={true}
            dampingFactor={0.05}
          />

          <Environment preset="night" />
          <Stars 
            radius={300} 
            depth={50} 
            count={isMobile ? 4500 : 8000}
            factor={12}
            saturation={1}
            fade={false}
            speed={0.5}
            size={2.5}
            color="#ffffff"
          />

          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5}
            color="#ffffff"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <SpotLight
            position={[-5, 5, 0]}
            angle={0.4}
            penumbra={0.5}
            intensity={2}
            color="#ffffff"
            castShadow
            shadow-bias={-0.0001}
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight 
            position={[0, 0, 5]} 
            intensity={1.2}
            color="#ffffff" 
            distance={50}
            decay={2}
          />
          <ambientLight intensity={0.4} />

          <Skull isMobile={isMobile} onLoad={handleModelLoad} />

          <fog attach="fog" args={['#000000', isMobile ? 10 : 12, isMobile ? 20 : 25]} />
        </Suspense>
      </Canvas>
    </div>
  );
} 