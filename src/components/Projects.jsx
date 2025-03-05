import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-xl
        bg-neutral-900/40 backdrop-blur-sm
        border border-neutral-800/50 h-full
        transform transition-all duration-300
        hover:border-neutral-700/50 group
        cursor-pointer
      `}
    >
      {/* Project Image with Gradient Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Header Section */}
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between"
          >
            <h3 className="text-xl md:text-2xl text-neutral-200 font-light tracking-wider">
              {project.title}
            </h3>
            <span className="text-neutral-500 text-sm">{project.year}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className="text-neutral-400 text-sm line-clamp-2 md:line-clamp-3"
          >
            {project.description}
          </motion.p>
        </div>

        {/* Tech Stack and Links */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          className="space-y-4"
        >
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs text-neutral-300 bg-neutral-800/50 
                         rounded-full border border-neutral-700/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project Links */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm text-neutral-200 bg-neutral-800/50 
                           rounded-lg border border-neutral-700/30 hover:bg-neutral-700/50 
                           transition-colors duration-200">
              View Project
            </button>
            <button className="p-2 text-neutral-400 hover:text-neutral-200 
                           transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered
            ? 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
            : 'none'
        }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  const projects = [
    {
      title: "Ethereal Realms",
      description: "A groundbreaking virtual reality platform that merges AI-driven storytelling with immersive 3D environments, creating unique interactive experiences.",
      tech: ["React", "Three.js", "WebXR", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000",
      year: "2024",
      link: "#",
      github: "#"
    },
    {
      title: "Neural Nexus",
      description: "An advanced machine learning visualization tool that transforms complex neural network architectures into intuitive, interactive diagrams.",
      tech: ["Python", "WebGL", "D3.js", "PyTorch"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000",
      year: "2023",
      link: "#",
      github: "#"
    },
    {
      title: "Quantum Forge",
      description: "A revolutionary blockchain development platform with quantum-resistant cryptography, enabling secure and scalable decentralized applications.",
      tech: ["Solidity", "React Native", "AR.js", "Rust"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000",
      year: "2023",
      link: "#",
      github: "#"
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#0a0a0a] py-20 px-4 md:px-6 lg:px-8"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:128px_128px] [transform:perspective(1000px)_rotateX(60deg)] origin-[center_top] [animation:grid_20s_linear_infinite]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-neutral-300 text-sm tracking-[0.5em] uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-neutral-100 text-3xl md:text-4xl lg:text-5xl tracking-wider font-extralight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Digital Innovations
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isSelected={selectedProject === index}
                onClick={() => setSelectedProject(index)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;