import { motion, AnimatePresence } from 'framer-motion';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiThreedotjs, SiTailwindcss, SiPython, SiFigma, SiNodedotjs, SiMongodb, SiCplusplus, SiMysql, SiLinux } from 'react-icons/si';

const technologies = [
  {
    name: 'JavaScript',
    icon: SiJavascript,
    color: '#F7DF1E',
    category: 'Frontend'
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: '#3178C6',
    category: 'Frontend'
  },
  {
    name: 'React',
    icon: SiReact,
    color: '#61DAFB',
    category: 'Frontend'
  },
  {
    
    name: 'Next.js',
    icon: SiNextdotjs,
    color: '#ffffff',
    category: 'Frontend'
  },
  {
    name: 'Three.js',
    icon: SiThreedotjs,
    color: '#ffffff',
    category: '3D'
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    color: '#339933',
    category: 'Backend'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    color: '#47A248',
    category: 'Backend'
  },
  {
    name: 'MySQL',
    icon: SiMysql,
    color: '#336791',
    category: 'Backend'
  },
  {
    name: 'Python',
    icon: SiPython,
    color: '#3776AB',
    category: 'Backend'
  },
  {
    name: 'C++',
    icon: SiCplusplus,
    color: '#00599C',
    category: 'Systems'
  },
  {
    name: 'Linux',
    icon: SiLinux,
    color: '#FCC624',
    category: 'Systems'
  },
  {
    name: 'Figma',
    icon: SiFigma,
    color: '#F24E1E',
    category: 'Design'
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    color: '#06B6D4',
    category: 'Styling'
  }
];

const TechStack = () => {
  const categories = [...new Set(technologies.map(tech => tech.category))];

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
        <motion.div 
          className="absolute inset-0 opacity-[0.05]"
          animate={{
            backgroundPosition: ['0px 0px', '128px 128px'],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:128px_128px] [transform:perspective(1000px)_rotateX(60deg)] origin-[center_top]" />
        </motion.div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-neutral-300 text-xs tracking-[0.5em] uppercase mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tech Stack
          </motion.h2>
          <motion.p 
            className="text-neutral-100 text-3xl tracking-wider font-extralight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Technologies I Work With
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                className="relative group"
              >
                <motion.div 
                  className="bg-neutral-900/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-800/50"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.h3 
                    className="text-neutral-300 text-sm tracking-[0.2em] uppercase mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + categoryIndex * 0.1 }}
                  >
                    {category}
                  </motion.h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {technologies
                      .filter(tech => tech.category === category)
                      .map((tech, techIndex) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ 
                            scale: 1.03,
                            backgroundColor: "rgba(38, 38, 38, 0.5)"
                          }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: techIndex * 0.1,
                            type: "spring",
                            stiffness: 300
                          }}
                          className="flex flex-col items-center gap-2 p-4 rounded-lg bg-neutral-800/30 transition-colors"
                        >
                          <motion.div
                            animate={{ 
                              y: [0, -2, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              times: [0, 0.5, 1]
                            }}
                          >
                            <tech.icon 
                              className="w-8 h-8 transition-all duration-300"
                              style={{ color: tech.color }}
                            />
                          </motion.div>
                          <motion.span 
                            className="text-neutral-400 text-xs tracking-wider"
                            whileHover={{ color: tech.color }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech.name}
                          </motion.span>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStack;