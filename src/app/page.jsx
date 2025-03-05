"use client"
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Dynamically import the Hero component with no SSR
const Hero = dynamic(() => import('../components/Hero'), { ssr: false });

export default function Home() {
  useEffect(() => {
    let mounted = true;

    const preloadAssets = async () => {
      try {
        // Preload images in parallel
        const imageUrls = [
          'https://placehold.co/2000x1200/111111/EEEEEE?text=Project+1',
          'https://placehold.co/2000x1200/111111/EEEEEE?text=Project+2',
          'https://placehold.co/2000x1200/111111/EEEEEE?text=Project+3'
        ];
        const imagePromises = imageUrls.map(url => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = () => reject(`Failed to load image: ${url}`);
            img.src = url;
          });
        });

        // Preload 3D model
        const modelPromise = fetch('/pc/scene.gltf')
          .then(res => {
            if (!res.ok) throw new Error('Failed to load 3D model');
            return res.blob();
          });

        // Wait for all assets with timeout
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Loading timed out')), 15000)
        );

        await Promise.race([
          Promise.all([...imagePromises, modelPromise]),
          timeout
        ]);

        // Ensure smooth transition
        await new Promise(resolve => setTimeout(resolve, 500));

        if (mounted) {
          // Remove the initial loader after a short delay
          const initialLoader = document.getElementById('initial-loader');
          if (initialLoader) {
            initialLoader.style.opacity = '0';
            setTimeout(() => {
              if (initialLoader.parentNode) {
                initialLoader.parentNode.removeChild(initialLoader);
              }
            }, 500);
          }
        }

      } catch (error) {
        console.error('Loading error:', error);
        // Even on error, we should remove the loader after a timeout
        if (mounted) {
          setTimeout(() => {
            const initialLoader = document.getElementById('initial-loader');
            if (initialLoader) {
              initialLoader.style.opacity = '0';
              setTimeout(() => {
                if (initialLoader.parentNode) {
                  initialLoader.parentNode.removeChild(initialLoader);
                }
              }, 500);
            }
          }, 1000);
        }
      }
    };

    preloadAssets();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0a0a0a]">
      <div className="relative min-h-screen">
        {/* Subtle background effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-60"></div>
        </div>

        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section */}
        <div id="home" className="relative h-screen w-full">
          <Hero />

          {/* Content Container */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-4xl px-6 select-none">
            <div className="space-y-12 text-center">
              {/* Name */}
              <div className="space-y-3">
                <p className="text-neutral-400 text-sm tracking-[0.5em] uppercase">Welcome</p>
                <h1 className="text-neutral-100 text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] leading-tight">
                  JATIN<br className="sm:hidden" /> YADAV
                </h1>
              </div>
              
              {/* Role */}
              <div className="space-y-2">
                <p className="text-neutral-300 text-base sm:text-lg tracking-[0.5em] uppercase">
                  Full Stack Developer
                </p>
                <p className="text-neutral-500 text-sm tracking-[0.2em]">
                  CRAFTING DIGITAL EXPERIENCES
                </p>
              </div>
              
              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <button className="w-full sm:w-auto px-12 py-4 bg-neutral-100 text-black hover:bg-neutral-200 transition-colors duration-300 text-xs tracking-[0.3em] uppercase">
                  View Portfolio
                </button>
                <button className="w-full sm:w-auto px-12 py-4 border border-neutral-400 text-neutral-100 hover:bg-neutral-100/5 hover:border-neutral-200 transition-all duration-300 text-xs tracking-[0.3em] uppercase">
                  Get in Touch
                </button>
              </div>

              {/* Social Links */}
              <div className="pt-8 flex justify-center gap-10 sm:gap-14">
                {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="text-neutral-300 hover:text-white transition-all duration-300 text-xs tracking-[0.2em] uppercase relative group overflow-hidden"
                  >
                    <span className="relative -translate-y-.5 z-10 group-hover:-translate-y-1 transition-transform duration-300 inline-block">
                      {platform}
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/30"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        </div>

        {/* Minimal scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="relative">
            <svg 
              width="24" 
              height="36" 
              viewBox="0 0 24 36" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-60 transition-opacity duration-500 hover:opacity-100"
            >
              <rect 
                x="1" 
                y="1" 
                width="22" 
                height="34" 
                rx="11" 
                stroke="#eeeeee" 
                strokeWidth="2"
                className="animate-pulse"
              />
              <circle 
                cx="12" 
                cy="15" 
                r="3"
                fill="#eeeeee"
                className="animate-[floatDelayed_2s_ease-in-out_infinite]"
              >
                <animate
                  attributeName="cy"
                  values="10;18;10"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <span className="text-neutral-400 text-xs tracking-wider animate-pulse">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about">
        <About />
      </div>

      {/* Projects Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Skills Section */}
      <div id="skills">
        <TechStack />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
