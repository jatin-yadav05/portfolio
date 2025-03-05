"use client"
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skills = [
  { name: 'Frontend Development', level: 90, color: '#ffffff' },
  { name: 'Backend Development', level: 85, color: '#ffffff' },
  { name: 'UI/UX Design', level: 80, color: '#ffffff' },
  { name: 'Cloud Services', level: 75, color: '#ffffff' },
];

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

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
            <div className="aspect-square relative overflow-hidden bg-neutral-900 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
              <motion.div 
                className="absolute inset-0 opacity-20"
                style={{ y }}
              >
                {/* Add your image or 3D element here */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
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
                Full Stack Developer & Digital Craftsman
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                With a passion for creating seamless digital experiences, I combine technical expertise with creative problem-solving. My approach focuses on building scalable, user-centric solutions that make a lasting impact.
              </p>
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
              <button className="group relative px-8 py-3 bg-transparent overflow-hidden">
                <span className="relative z-10 text-neutral-300 text-sm tracking-[0.3em] uppercase">
                  Download Resume
                </span>
                <div className="absolute inset-0 border border-neutral-700 group-hover:border-neutral-500 transition-colors duration-300" />
                <div className="absolute inset-0 bg-neutral-100 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mouse Follow Effect */}
      <div className="hidden lg:block">
        <div className="fixed top-0 left-0 w-3 h-3 bg-neutral-100 rounded-full opacity-20 pointer-events-none mix-blend-difference" 
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </section>
  );
};

export default About; 