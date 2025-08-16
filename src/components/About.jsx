"use client"
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PixelTransition from './ui/PixelTransition';
import { useState } from 'react';
import Image from 'next/image';

const skills = [
  { name: 'Frontend Development', level: 90, color: '#ffffff' },
  { name: 'Backend Development', level: 85, color: '#ffffff' },
  { name: 'UI/UX Design', level: 90, color: '#ffffff' },
  { name: 'Database Management', level: 70, color: '#ffffff' },
];

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const istouchOn = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(istouchOn);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] py-20 overflow-x-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent" />
        <div
          className="absolute inset-0 opacity-10 bg-repeat"
          style={{
            backgroundImage: 'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
            backgroundSize: '149.76px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-neutral-300 text-sm tracking-[0.5em] uppercase mb-4">About Me</h2>
          <p className="text-neutral-100 text-3xl sm:text-4xl tracking-[0.2em] font-light">
            Crafting Digital Experiences
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square relative">
              <div className="absolute inset-0" />
              <motion.div
                className="absolute inset-0 opacity-60"
                style={{ y }}
              >
                {/* Add your image or 3D element here */}
                <PixelTransition
                  secondContent={
                    <Image
                      src="/myImage/profilepic-2.png"
                      alt="default pfp"
                      layout="fill"
                      objectFit="cover"
                    />}
                  firstContent={
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "#111"
                      }}
                    >
                      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>{isTouchDevice ? "Touch me!" : "Hover me!"}</p>
                    </div>
                  }
                  gridSize={42}
                  pixelColor='#ffffff'
                  animationStepDuration={0.5}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-neutral-100 text-2xl tracking-wider">
                Full Stack Developer & UI/UX Designer
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                With a passion for creating seamless digital experiences, I combine technical expertise with creative problem-solving. My approach focuses on building scalable, user-centric solutions that make a lasting impact.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/jatin-yadav05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                >
                  <i className="fab fa-github text-lg" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jatin-yadav05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                >
                  <i className="fab fa-linkedin text-lg" />
                </a>
                <a
                  href="https://x.com/jatinyadav_05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                >
                  <i className="fab fa-twitter text-lg" />
                </a>
                <a
                  href="mailto:jatin05yd@gmail.com"
                  className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                >
                  <i className="fas fa-envelope text-lg" />
                </a>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h4 className="text-neutral-300 tracking-[0.3em] uppercase text-sm">
                Expertise
              </h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-300">{skill.name}</span>
                      <span className="text-neutral-500">{skill.level}%</span>
                    </div>
                    <div className="h-px bg-neutral-800 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="absolute top-0 left-0 h-full bg-neutral-400"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-6"
            >
              <a
                href="/resume/Jatin Yadav Resume.pdf"
                download
                className="group relative inline-block px-8 py-3 bg-transparent overflow-x-hidden"
              >
                <span className="relative z-10 text-neutral-300 group-hover:text-neutral-900 text-sm tracking-[0.3em] uppercase transition-colors duration-300">
                  Download Resume
                </span>
                <div className="absolute inset-0 border border-neutral-700 group-hover:border-neutral-500 transition-colors duration-300" />
                <div className="absolute inset-0 bg-neutral-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0 bg-neutral-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out delay-75" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 