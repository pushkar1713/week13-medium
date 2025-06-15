
import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neo-charcoal border-t-8 border-neo-charcoal py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <Link to="/" className="text-5xl text-neo-cream tracking-wide font-black hover:opacity-80 transition-opacity block mb-6">
              PEN'S & PIXELS
            </Link>
            <p className="text-2xl text-neo-cream leading-tight tracking-wide font-light max-w-md">
              RAW DIGITAL PUBLISHING FOR THE MODERN STORYTELLER
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end space-y-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-neo-cream hover:bg-neo-sage text-neo-charcoal p-6 border-4 border-neo-cream transition-all duration-200"
            >
              <Github className="w-8 h-8" />
            </a>
            
            <div className="flex flex-col md:items-end space-y-4">
              <Link to="/about" className="text-2xl text-neo-cream hover:text-neo-sage tracking-wide font-light">
                ABOUT
              </Link>
              <Link to="/contact" className="text-2xl text-neo-cream hover:text-neo-sage tracking-wide font-light">
                CONTACT
              </Link>
              <Link to="/privacy" className="text-2xl text-neo-cream hover:text-neo-sage tracking-wide font-light">
                PRIVACY
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t-4 border-neo-cream text-center">
          <p className="text-xl text-neo-cream tracking-wide font-light">
            © {new Date().getFullYear()} PEN'S & PIXELS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
