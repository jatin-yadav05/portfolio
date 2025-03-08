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
      'service_7ukbc9m',
      'template_ihvy1wo',
      {
        from_name: form.name,
        to_name: 'Your Name',
        from_email: form.email,
        to_email: 'your@email.com',
        message: form.message,
      },
      'RCiDMduhtiQYBIhJ5'
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
                        placeholder="Jatin Yadav"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-700/20 to-neutral-600/20 
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
            className="relative hidden lg:block group perspective-1000 h-[500px]"
            style={{ 
              transform: isHovered ? 'rotateX(5deg) rotateY(5deg)' : 'none',
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Envelope Animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32"
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Envelope Body */}
              <div className="absolute inset-0 bg-neutral-800/40 backdrop-blur-sm rounded-lg border-2 border-neutral-700/50 
                           group-hover:border-neutral-500/50 group-hover:bg-neutral-700/40 transition-all duration-500" />
              {/* Envelope Flap */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 origin-bottom"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: [0, -20, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute bottom-0 left-0 w-full h-full bg-neutral-800/40 
                             transform-gpu origin-bottom rounded-t-lg border-t-2 border-x-2 border-neutral-600/50" />
              </motion.div>
              {/* Mail Icon */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg className="w-12 h-12 text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Connecting Lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                style={{
                  width: '2px',
                  height: '80px',
                  background: 'linear-gradient(to bottom, transparent, rgba(163,163,163,0.15), transparent)',
                  transform: `rotate(${i * 45}deg) translateY(-100px)`,
                }}
              />
            ))}

            {/* Floating Communication Icons */}
            {[
              { icon: 'message', delay: 0 },
              { icon: 'phone', delay: 0.3 },
              { icon: 'video', delay: 0.6 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -20, 0],
                  x: [0, i % 2 === 0 ? 20 : -20, 0],
                  rotate: [0, 10, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${40 + i * 20}%`,
                  top: `${30 + (i * 15)}%`,
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800/40 backdrop-blur-sm 
                             border border-neutral-700/50 flex items-center justify-center
                             group-hover:border-neutral-500/50 group-hover:bg-neutral-700/40 transition-all duration-500">
                  {item.icon === 'message' && (
                    <svg className="w-5 h-5 text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  )}
                  {item.icon === 'phone' && (
                    <svg className="w-5 h-5 text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  {item.icon === 'video' && (
                    <svg className="w-5 h-5 text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/0 via-neutral-700/5 to-neutral-800/0
                         group-hover:via-neutral-600/10 transition-all duration-700 blur-3xl pointer-events-none" />
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
              { 
                name: 'GitHub',
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                ),
                url: 'https://github.com/jatin-yadav05'
              },
              {
                name: 'LinkedIn',
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                url: 'https://www.linkedin.com/in/jatin-yadav05/'
              },
              {
                name: 'Twitter',
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ),
                url: 'https://x.com/jatinyadav_05'
              }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="transform transition-all duration-300"
              >
                <span className="sr-only">{social.name}</span>
                <div className="w-12 h-12 rounded-xl bg-neutral-800/40 backdrop-blur-sm border-2 border-neutral-700/50 
                             flex items-center justify-center text-neutral-400
                             hover:text-neutral-200 hover:border-neutral-500/50 hover:bg-neutral-700/40 
                             transition-all duration-300">
                  {social.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Email Contact */}
          <motion.a
            variants={itemVariants}
            href="mailto:jatin05yd@gmail.com"
            whileHover={{ scale: 1.05 }}
            className="mt-8 inline-flex items-center gap-3 text-neutral-400 hover:text-neutral-200 
                     transition-all duration-300 px-4 py-2 rounded-lg hover:bg-neutral-800/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            jatin05yd@gmail.com
          </motion.a>
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