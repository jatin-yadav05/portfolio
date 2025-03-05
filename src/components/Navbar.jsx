"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    ['Home', '/'],
    ['About', '#about'],
    ['Projects', '#projects'],
    ['Skills', '#skills'],
    ['Contact', '#contact'],
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-neutral-100 text-2xl md:text-3xl tracking-[0.2em] hover:text-neutral-200 transition-colors">
                JY
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map(([name, url]) => (
                  <Link
                    key={name}
                    href={url}
                    className="text-neutral-300 hover:text-neutral-100 px-3 py-2 text-sm tracking-[0.2em] transition-colors relative group"
                  >
                    {name.toUpperCase()}
                    <span className="absolute bottom-0 left-0 w-full h-px bg-neutral-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-neutral-300 hover:text-neutral-100 focus:outline-none p-2 translate-y-2.5 -translate-x-1"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  <span 
                    className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                    }`}
                  />
                  <span 
                    className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span 
                    className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm">
            {navLinks.map(([name, url]) => (
              <Link
                key={name}
                href={url}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-300 hover:text-neutral-100 block px-3 py-2 text-base tracking-[0.2em] transition-colors text-center"
              >
                {name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar; 