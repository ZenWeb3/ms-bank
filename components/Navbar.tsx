"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, []);

  const links = [
    { name: "Personal", href: "#personal" },
    { name: "Business", href: "#business" },
    { name: "Loans", href: "#loans" },
    { name: "Digital Banking", href: "#digital" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[120] transition-all duration-500 ${
        isScrolled || isMenuOpen 
          ? "bg-white/80 backdrop-blur-xl py-4 shadow-sm" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 flex items-center justify-between">
          
          {/* Logo */}
         {/* Logo Section */}
<div className="flex items-center gap-3 z-[130]">
  <div className="w-10 h-10 bg-linear-to-r from-[#5c0f28] via-[#b22234] via-[#3c3b6e] to-[#001a3d]   rounded-xl bg-[length:200%_200%] flex items-center justify-center text-white font-bold font-syne text-xl shadow-lg shadow-black/10">
    U
  </div>
  <span className="font-syne font-extrabold text-xl tracking-tighter text-black uppercase">
    United Mississippi <span className="hidden sm:inline">Bank</span>
  </span>
</div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex gap-8">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-all hover:-translate-y-0.5 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a 
              href="#get-started" 
              className="btn-primary-custom !px-8 !py-2.5 !text-[11px] uppercase tracking-widest shadow-lg shadow-maroon-900/20"
            >
              Get Started
            </a>
          </div>

          {/* Hamburger Menu Icon */}
          <button 
            className="lg:hidden z-[130] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-6 bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-6 bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-3xl z-[115] lg:hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        <div className="flex flex-col h-full pt-32 px-10 pb-12 overflow-y-auto">
          <ul className="flex flex-col gap-4">
            {links.map((link, i) => (
              <li 
                key={link.name}
                className={`transform transition-all duration-500 ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                <a 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-syne font-bold text-black hover:text-[#b22234] transition-colors py-2 block border-b border-gray-50"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-12 space-y-6">
            <a 
              href="#get-started"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary-custom w-full block text-center py-4 text-base font-bold shadow-xl shadow-maroon-900/20"
            >
              Open Account Today
            </a>
            
            <div className="flex flex-col gap-4 pt-8 border-t border-gray-100">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                <span>Member FDIC</span>
                <span>Equal Housing Lender</span>
              </div>
              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                © 2026 United Mississippi Bank. <br/> Sophisticated banking for modern life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}