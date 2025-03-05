import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Create transforms outside of useEffect
  const rotateX = useTransform(mouseY, [0, windowSize.height], [15, -15]);
  const rotateY = useTransform(mouseX, [0, windowSize.width], [-15, 15]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Update window size on mount and resize
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      updateWindowSize();
      window.addEventListener('resize', updateWindowSize);
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      setCursorPosition({ x: clientX, y: clientY });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateWindowSize);
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Add success animation
    controls.start({
      scale: [1, 0.9, 1.1, 1],
      transition: { duration: 0.5 }
    });

    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: form.name,
        to_name: 'Your Name',
        from_email: form.email,
        to_email: 'your@email.com',
        message: form.message,
      },
      'YOUR_PUBLIC_KEY'
    ).then(() => {
      setLoading(false);
      setSuccess(true);
      
      setForm({
        name: '',
        email: '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    }).catch((error) => {
      setLoading(false);
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const illustrationVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background with Gradient Mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:128px_128px] [transform:perspective(1000px)_rotateX(60deg)] origin-[center_top] [animation:grid_20s_linear_infinite]" />
        </div>
        {/* Dynamic Gradient Background */}
        <div 
          className="absolute inset-0 opacity-20 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,255,255,0.1), transparent 25%)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header with 3D Effect */}
        <motion.div
          style={{ 
            perspective: 1000,
            rotateX,
            rotateY
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 transform-gpu"
        >
          <motion.h2 
            className="text-neutral-300 text-sm tracking-[0.5em] uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            className="text-neutral-100 text-3xl md:text-4xl lg:text-5xl tracking-wider font-extralight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Let's Create Together
          </motion.p>
          {/* Animated Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-[1px] w-24 bg-gradient-to-r from-transparent via-neutral-500 to-transparent mx-auto mt-6"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Glowing border effect on form hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-neutral-800/20 via-neutral-700/20 to-neutral-800/20 rounded-lg blur-lg transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
              
              <div className="relative bg-neutral-900/50 backdrop-blur-xl p-8 rounded-lg border border-neutral-800/50">
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="relative">
                    <label className="block text-neutral-400 text-sm mb-2">Your Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50 
                                 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500/50
                                 focus:ring-2 focus:ring-neutral-500/20 transition-all duration-200 relative z-10"
                        required
                      />
                      {/* Input focus effect */}
                      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-neutral-700/20 to-neutral-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-neutral-400 text-sm mb-2">Your Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50 
                                 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500/50
                                 focus:ring-2 focus:ring-neutral-500/20 transition-all duration-200 relative z-10"
                        required
                      />
                      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-neutral-700/20 to-neutral-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-neutral-400 text-sm mb-2">Your Message</label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Hello, I'd like to talk about..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50 
                                 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500/50
                                 focus:ring-2 focus:ring-neutral-500/20 transition-all duration-200 resize-none relative z-10"
                        required
                      />
                      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-neutral-700/20 to-neutral-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    animate={controls}
                    className={`w-full py-4 rounded-lg text-neutral-200 font-light tracking-wider
                             relative overflow-hidden group
                             ${loading ? 'bg-neutral-800 cursor-not-allowed' : 'bg-neutral-700/80 hover:bg-neutral-600/80'}`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : success ? (
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Message Sent!
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </span>
                    {/* Button hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              </div>
            </form>
          </motion.div>

          {/* Enhanced Illustration */}
          <motion.div
            variants={illustrationVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block group perspective-1000"
            style={{ 
              transform: isHovered ? 'rotateX(5deg) rotateY(5deg)' : 'none',
              transition: 'transform 0.3s ease'
            }}
          >
            {/* 3D Rotating Circles */}
            <div className="absolute inset-0 flex items-center justify-center transform-gpu">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotateZ: [0, 360],
                    rotateX: [0, 30, 0],
                    rotateY: [0, 30, 0],
                  }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute w-${96 - i * 24} h-${96 - i * 24} rounded-full border-2
                           border-neutral-700/50 group-hover:border-neutral-600/50
                           transition-all duration-500`}
                />
              ))}
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateX: [0, 10, 0],
                rotateY: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-32 h-32 bg-neutral-800/20 rounded-xl backdrop-blur-sm 
                           border-2 border-neutral-700/30 rotate-45
                           group-hover:border-neutral-600/50 group-hover:scale-110
                           transition-all duration-500" />
            </motion.div>

            {/* Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  x: [0, i % 2 === 0 ? 10 : -10, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-2 h-2 bg-neutral-700/40
                         rounded-full transition-all duration-500 group-hover:scale-150
                         group-hover:bg-neutral-600/60"
                style={{
                  left: `${10 + i * 7}%`,
                  top: `${20 + (i * 5) % 40}%`,
                }}
              />
            ))}

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/0 via-neutral-700/0 to-neutral-800/0
                         group-hover:from-neutral-700/10 group-hover:via-neutral-600/10 group-hover:to-neutral-700/10
                         transition-all duration-700 blur-3xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 text-center"
        >
          <motion.p variants={itemVariants} className="text-neutral-400 mb-6">
            Or connect with me on social media
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center space-x-8">
            {[
              { name: 'github', icon: 'github', color: 'hover:text-neutral-300' },
              { name: 'linkedin', icon: 'linkedin', color: 'hover:text-neutral-300' },
              { name: 'twitter', icon: 'twitter', color: 'hover:text-neutral-300' }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={`#${social.name}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`transform transition-all duration-200 ${social.color}`}
              >
                <span className="sr-only">{social.name}</span>
                <div className="w-10 h-10 rounded-full border-2 border-neutral-800/50 flex items-center justify-center
                             hover:border-neutral-600/50 transition-all duration-300">
                  <i className={`fab fa-${social.icon} text-lg`} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Cursor Effect */}
      <motion.div
        className="fixed w-4 h-4 bg-neutral-400/30 rounded-full pointer-events-none mix-blend-screen hidden lg:block"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovered ? 2 : 1,
          opacity: isHovered ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.2 }}
      />
    </section>
  );
};

export default Contact; 