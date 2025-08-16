import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const Footer = () => {
  const footerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const currentYear = new Date().getFullYear();

  const footerOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: 'home' },
        { name: 'About', href: 'about' },
        { name: 'Projects', href: 'projects' },
        { name: 'Contact', href: 'contact' }
      ]
    },
    {
      title: 'Social',
      links: [
        { name: 'GitHub', href: 'https://github.com/jatin-yadav05', icon: 'github' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jatin-yadav05/', icon: 'linkedin' },
        { name: 'Twitter', href: 'https://x.com/jatinyadav_05', icon: 'twitter' },
        { name: 'Email', href: 'mailto:jatin05yd@gmail.com', icon: 'envelope' }
      ]
    }
  ];

  return (
    <motion.footer
      ref={footerRef}
      style={{ opacity: footerOpacity, y: footerY }}
      className="relative bg-[#0a0a0a] pt-32 pb-10 overflow-hidden"
    >
      {/* Interactive Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03) 0%, transparent 60%)`,
            transition: 'background 0.3s ease'
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.05)_50%,transparent)] animate-wave" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-neutral-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section - Spans 4 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 space-y-6"
          >
            <motion.a 
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <span className="text-4xl font-light text-neutral-100 tracking-[0.2em] relative z-10">JY</span>
                <motion.div 
                  className="absolute -inset-2 bg-neutral-800/20 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.a>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Frontend Developer passionate about creating visually stunning and highly functional web interfaces.
            </p>
            <motion.div 
              className="pt-4 flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {footerLinks[1].links.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800/30 flex items-center justify-center
                           hover:bg-neutral-700/30 transition-colors duration-300 group"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon === 'github' && (
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {link.icon === 'linkedin' && (
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {link.icon === 'twitter' && (
                     <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-200 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  )}
                  {link.icon === 'envelope' && (
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation Links - Spans 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <h3 className="text-neutral-300 text-sm tracking-[0.2em] uppercase font-light">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks[0].links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group flex items-center gap-2 text-neutral-400 hover:text-neutral-200 
                             transition-colors duration-300"
                  >
                    <span className="h-px w-4 bg-neutral-700 group-hover:w-6 group-hover:bg-neutral-400 
                                   transition-all duration-300" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section - Spans 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-neutral-300 text-sm tracking-[0.2em] uppercase font-light">
              Let's Connect
            </h3>
            <div className="space-y-4">
              <p className="text-neutral-400 text-sm leading-relaxed">
                Feel free to reach out for collaborations or just a friendly hello
              </p>
              <motion.a
                href="mailto:jatin05yd@gmail.com"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-200 
                         transition-colors duration-300 group"
                whileHover={{ x: 5 }}
              >
                <i className="fas fa-envelope" />
                <span className="text-sm">jatin05yd@gmail.com</span>
                <span className="h-px w-4 bg-neutral-700 group-hover:w-6 group-hover:bg-neutral-400 
                               transition-all duration-300" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-neutral-800/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 text-sm">©</span>
              <motion.span 
                className="text-neutral-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {currentYear} Jatin Yadav
              </motion.span>
              <span className="text-neutral-700">|</span>
              <span className="text-neutral-500 text-sm">All rights reserved</span>
            </div>
            <div className="flex items-center space-x-6">
              {['Privacy Policy', 'Terms of Service'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors duration-300
                           relative group"
                  whileHover={{ y: -1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-400 group-hover:w-full 
                                 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 