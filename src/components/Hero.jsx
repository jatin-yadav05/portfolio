"use client"
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { OrbitControls, useGLTF, SpotLight, useAnimations, Environment, Stars } from '@react-three/drei';
// import { KernelSize } from 'postprocessing';

// Skull model component
function Skull({ isMobile, onLoad }) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const { scene, animations } = useGLTF('/skull_salazar_downloadable/scene.gltf', true);
  const { actions } = useAnimations(animations, scene);

  // Optimize material updates
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.roughness = 0.4;
            child.material.metalness = 0.6;
            // Optimize materials
            child.material.needsUpdate = true;
            child.material.dithering = true;
            child.material.precision = 'lowp'; // Use low precision on mobile
            // Optimize geometry
            if (child.geometry) {
              child.geometry.computeBoundingSphere();
              child.geometry.computeBoundingBox();
            }
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
        position={[0, isMobile ? -1.5 : -1.5, isMobile ? 0 : 0]}
        rotation={[0, Math.PI * 1.5, 0]}
        dispose={null}
      />
    </group>
  );
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const canvasRef = useRef(null);

  const handleMediaQuery = useCallback((event) => {
    setIsMobile(event.matches);
  }, []);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animations and rendering when not visible
        if (canvasRef.current) {
          canvasRef.current.style.visibility = 'hidden';
        }
      } else {
        // Resume when visible again
        if (canvasRef.current) {
          canvasRef.current.style.visibility = 'visible';
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Handle scroll performance
  useEffect(() => {
    let rafId;
    let lastScrollTop = 0;

    const handleScroll = () => {
      if (rafId) {
        return;
      }

      rafId = requestAnimationFrame(() => {
        const currentScrollTop = window.pageYOffset;
        const isScrollingUp = currentScrollTop < lastScrollTop;
        
        if (canvasRef.current) {
          // Only update canvas when scrolling up to the hero section
          if (isScrollingUp && currentScrollTop < window.innerHeight) {
            canvasRef.current.style.visibility = 'visible';
          } else if (!isScrollingUp && currentScrollTop > window.innerHeight) {
            canvasRef.current.style.visibility = 'hidden';
          }
        }

        lastScrollTop = currentScrollTop;
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
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

  // Memoize camera settings
  const cameraSettings = useMemo(() => ({
    position: [0, 0, isMobile ? 14 : 16],
    fov: isMobile ? 35 : 30,
    near: 0.1,
    far: 1000
  }), [isMobile]);

  // Memoize stars settings
  const starsSettings = useMemo(() => ({
    radius: 300,
    depth: 50,
    count: isMobile ? 4000 : 6000,
    factor: 8,
    saturation: 1,
    fade: false,
    speed: 0.5,
    size: isMobile ? 1.5 : 2
  }), [isMobile]);

  return (
    <div className="relative w-full h-screen" ref={canvasRef}>
      <Canvas
        frameloop='demand'
        shadows="basic"
        dpr={[1, Math.min(2, window.devicePixelRatio)]}
        performance={{ min: 0.5 }}
        camera={cameraSettings}
        gl={{
          preserveDrawingBuffer: true,
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true,
          failIfMajorPerformanceCaveat: true, // Prevent running on devices that can't handle it well
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0); // Set clear color to black with 0 alpha
          gl.clearDepth(); // Clear depth buffer
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 2.5}
            autoRotate
            autoRotateSpeed={isMobile ? 1 : 1.8}
            enableDamping={true}
            dampingFactor={0.05}
            makeDefault // Ensure proper cleanup
          />

          <Environment preset="night" />
          <Stars {...starsSettings} />

          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5}
            color="#ffffff"
            castShadow={!isMobile}
            shadow-mapSize={[512, 512]}
          />
          <SpotLight
            position={[-5, 5, 0]}
            angle={0.4}
            penumbra={0.5}
            intensity={2}
            color="#ffffff"
            castShadow={!isMobile}
            shadow-bias={-0.0001}
            shadow-mapSize={[512, 512]}
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

          <fog attach="fog" args={['#000000', isMobile ? 12 : 12, isMobile ? 18 : 25]} />
        </Suspense>
      </Canvas>
    </div>
  );
} 