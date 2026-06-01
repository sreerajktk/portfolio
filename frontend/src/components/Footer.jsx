import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUp, Code } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 relative border-t border-slate-800">
      {/* Scroll to Top Trigger */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={scrollToTop}
          className="p-3 bg-primary-600 hover:bg-primary-500 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-primary-500/30 hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Brand Details */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 text-white font-bold text-lg">
              <Code className="h-5 w-5 text-primary-500" />
              <span className="tracking-wider">SREERAJ K T K</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              MERN Stack Developer & Full Stack Specialist. Building performant, modern, and highly scalable web architectures with a focus on UI/UX excellence.
            </p>
          </div>

          {/* Quick Contact Information */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
              Direct Contact
            </h4>
            <div className="flex items-center space-x-3 text-sm hover:text-white transition-colors duration-200">
              <Phone className="h-4 w-4 text-primary-500" />
              <a href="tel:+919539487225">+91-9539487225</a>
            </div>
            <div className="flex items-center space-x-3 text-sm hover:text-white transition-colors duration-200">
              <Mail className="h-4 w-4 text-primary-500" />
              <a href="mailto:sreerajk8@gmail.com">sreerajk8@gmail.com</a>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="h-4 w-4 text-primary-500" />
              <span>Kozhikode, Kerala, India</span>
            </div>
          </div>

          {/* Social Profiles & Developer Anchors */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Professional Portals
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/sreerajktk" // Placeholder or actual GitHub path
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white rounded-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/sreerajktk" // Placeholder or actual LinkedIn path
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white rounded-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-slate-600">
              Kerala's Malabar region & globally-ready Full Stack expert.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Sreeraj K T K. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Engineered using MERN Stack (React, Node, Express, MongoDB) & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
