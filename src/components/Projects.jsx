import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImagePreloader from './ImagePreloader';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      filter: "brightness(0.2)",
      transition: { duration: 0.3 }
    },
    initial: {
      scale: 1,
      filter: "brightness(0.8)",
      transition: { duration: 0.3 }
    }
  };

  const detailsVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = project.image;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [project.image]);

  // Simplified toggle function for both click and hover
  const toggleDetails = () => {
    setIsHovered(prev => !prev);
  };

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-xl bg-neutral-900/40 backdrop-blur-sm
                 border border-neutral-800/50 h-[300px] transform transition-all duration-300
                 hover:border-neutral-700/50 group cursor-pointer"
      onClick={toggleDetails}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => !('ontouchstart' in window) && setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
    >
      {/* Project Image with loading state */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        variants={imageVariants}
        animate={isHovered ? "hover" : "initial"}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
        )}
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>

      {/* Content Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 p-6 flex flex-col justify-between z-10"
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl text-neutral-200 font-light tracking-wider">
                  {project.title}
                </h3>
                <span className="text-neutral-400 text-sm">{project.year}</span>
              </div>
              <p className="text-neutral-400 text-sm line-clamp-3">
                {project.description}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs text-neutral-300 bg-neutral-800/50 
                             rounded-full border border-neutral-700/30 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Links */}
              <div className="flex items-center space-x-4">
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-neutral-200 bg-neutral-800/50 
                           rounded-lg border border-neutral-700/30 hover:bg-neutral-700/50 
                           transition-colors duration-200 backdrop-blur-sm flex items-center gap-2"
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span>View Project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-400 hover:text-neutral-200 
                           transition-colors duration-200 backdrop-blur-sm"
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" 
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)'
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
      title: "MotifyX",
      description: "MotifyX - An innovative collection of mesmerizing background patterns crafted for modern developers and designers.",
      tech: ["React", "TailwindCSS", "Framer Motion"],
      image: "/projectimages/motifyx.png",
      year: "2024",
      link: "https://motify-x.vercel.app/",
      github: "https://github.com/jatin-yadav05/MotifyX"
    },
    {
      title: "Medicare",
      description: "A comprehensive hospital management system built with React, MongoDb, and Tailwind CSS.",
      tech: ["React", "Node.js", "MongoDb", "ChatBase"],
      image: "/projectimages/medicare.png",
      year: "2024",
      link: "https://jatin-yadav05.github.io/hospital-management/",
      github: "https://github.com/jatin-yadav05/hospital-management"
    },
    {
      title: "Handicraft Marketplace",
      description: "A platform where customers can browse and purchase handmade products from A-ONE HANDICRAFTS.",
      tech: ["React", "Firebase", "Tailwind"],
      image: "/projectimages/handicraft-marketplace.png",
      year: "2024",
      link: "https://jatin-yadav05.github.io/HandiCraft-MarketPlace/",
      github: "https://github.com/jatin-yadav05/HandiCraft-MarketPlace"
    }
  ];

  // Get all project images for preloading
  const projectImages = projects.map(project => project.image);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0a0a] py-20 px-4 md:px-6 lg:px-8"
    >
      {/* Preload all project images */}
      <ImagePreloader images={projectImages} />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:128px_128px] [transform:perspective(1000px)_rotateX(60deg)] origin-[center_top]" />
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
            Recent Works
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