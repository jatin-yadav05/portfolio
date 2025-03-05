import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
        { name: 'GitHub', href: 'https://github.com' },
        { name: 'LinkedIn', href: 'https://linkedin.com' },
        { name: 'Twitter', href: 'https://twitter.com' },
        { name: 'Instagram', href: 'https://instagram.com' }
      ]
    }
  ];

  return (
    <footer className="relative bg-[#0a0a0a] pt-20 pb-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <a 
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="text-neutral-100 text-2xl tracking-[0.2em] hover:text-neutral-200 transition-colors"
            >
              JY
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Crafting digital experiences with passion and precision. Let's build something amazing together.
            </p>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-neutral-300 text-sm tracking-[0.2em] uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {section.title === 'Navigation' ? (
                      <a
                        href={`#${link.href}`}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-neutral-300 text-sm tracking-[0.2em] uppercase">
              Contact
            </h3>
            <p className="text-neutral-400 text-sm">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <a
              href="mailto:your.email@example.com"
              className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors duration-200"
            >
              your.email@example.com
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-neutral-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-500 text-sm">
              © {currentYear} Your Name. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="/privacy"
                className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 