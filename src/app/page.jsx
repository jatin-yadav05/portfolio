"use client"
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Hero = dynamic(() => import('../components/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const TechStack = dynamic(() => import('@/components/TechStack'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const CircularText = dynamic(() => import('@/components/ui/CircularText'), { ssr: false });

export default function Home() {
  const HeroBackground = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Noise overlay texture */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px 150px',
          }}
        />

        {/* Subtle light beam effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Dynamic dotted grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                        radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
                        radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
            backgroundSize: '30px 30px, 30px 30px',
            backgroundPosition: '0 0, 15px 15px',
            opacity: 0.3,
          }}
        />

        {/* Ambient light sources */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/20 blur-2xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-40 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />

        {/* Fine grain pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='white' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Diagonal highlight animation */}
        <motion.div
          className="absolute -inset-full h-[300%] w-[200%] opacity-10"
          style={{
            background: 'linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
            transform: 'rotate(-15deg)',
          }}
          animate={{
            left: ['-100%', '100%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeInOut"
          }}
        />

        {/* Edge lighting */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
        </div>
      </div>
    );
  };
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



        // Wait for all assets with timeout
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Loading timed out')), 15000)
        );

        await Promise.race([
          Promise.all([...imagePromises]),
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
          {/* <Hero /> */}
          <HeroBackground />

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
                <button
                  onClick={(event) => {
                    const dot = document.createElement('div');
                    dot.style.cssText = `
                      position: fixed;
                      width: 4px;
                      height: 4px;
                      background: white;
                      border-radius: 50%;
                      pointer-events: none;
                      z-index: 9999;
                      left: ${event.clientX}px;
                      top: ${event.clientY}px;
                    `;
                    document.body.appendChild(dot);

                    // Animate the dot
                    dot.animate([
                      { transform: 'scale(1)', opacity: 1 },
                      { transform: 'scale(50)', opacity: 0 }
                    ], {
                      duration: 400,
                      easing: 'ease-out'
                    }).onfinish = () => {
                      dot.remove();
                    };
                  }}
                  className="w-full cursor-pointer sm:w-auto px-12 py-4 bg-neutral-100 text-black hover:bg-neutral-200 transition-colors duration-300 text-xs tracking-[0.3em] uppercase"
                >
                  View Portfolio
                </button>
                <button
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full cursor-pointer sm:w-auto px-12 py-4 border border-neutral-400 text-neutral-100 hover:bg-neutral-100/5 hover:border-neutral-200 transition-all duration-300 text-xs tracking-[0.3em] uppercase"
                >
                  Get in Touch
                </button>
              </div>

              {/* Social Links */}
              <div className="pt-4 px-4">
                <div className="max-w-lg mx-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                    {[
                      {
                        name: 'GitHub',
                        url: 'https://github.com/jatin-yadav05',
                        icon: (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        )
                      },
                      {
                        name: 'LinkedIn',
                        url: 'https://www.linkedin.com/in/jatin-yadav05/',
                        icon: (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Twitter',
                        url: 'https://x.com/jatinyadav_05',
                        icon: (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Email',
                        url: 'mailto:jatin05yd@gmail.com',
                        icon: (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                        )
                      }
                    ].map(({ name, url, icon }) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-neutral-800/30 transition-all duration-300"
                      >
                        <div className="text-neutral-400 group-hover:text-white transition-colors duration-300">
                          {icon}
                        </div>
                        <span className="text-neutral-300 group-hover:text-white text-[10px] sm:text-xs tracking-[0.2em] uppercase transition-colors duration-300">
                          {name}
                        </span>
                        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-neutral-500 to-white transition-all duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
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

        {/* Div that stays in the right bottom always */}
        <div className="bottom-0 right-0 m-2 fixed z-50">
          <CircularText
            text="JATIN-YADAV-JATIN-YADAV-"
            onHover="speedUp"
            spinDuration={30}
            className="custom-class"
          />
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
