
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative bg-neo-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          <div>
            <h1 className="text-8xl md:text-9xl leading-none text-neo-charcoal mb-8 tracking-wide font-black">
              PEN'S &<br/>
              <span className="bg-neo-charcoal text-neo-cream px-8 py-4 inline-block">PIXELS</span>
            </h1>
            <p className="text-2xl md:text-3xl text-neo-charcoal max-w-lg leading-tight tracking-wide font-light">
              RAW PUBLISHING<br/>
              FOR DIGITAL<br/>
              STORYTELLERS
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-neo-charcoal p-12 border-8 border-neo-charcoal">
              <h2 className="text-4xl text-neo-cream mb-6 tracking-wide font-black">
                WRITE
              </h2>
              <p className="text-xl text-neo-cream leading-relaxed font-light">
                Create powerful content with our minimalist editor designed for focus and clarity.
              </p>
            </div>
            
            <div className="bg-neo-sage p-12 border-8 border-neo-charcoal">
              <h2 className="text-4xl text-neo-charcoal mb-6 tracking-wide font-black">
                PUBLISH
              </h2>
              <p className="text-xl text-neo-charcoal leading-relaxed font-light">
                Share your thoughts with the world through our brutal publishing platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/login" className="flex-1">
                <Button className="w-full bg-neo-charcoal hover:bg-neo-sage text-neo-cream px-12 py-8 text-2xl tracking-wide border-8 border-neo-charcoal font-black transition-all duration-200">
                  START WRITING
                </Button>
              </Link>
              
              <Link to="/signup" className="flex-1">
                <Button className="w-full bg-neo-cream hover:bg-neo-charcoal hover:text-neo-cream text-neo-charcoal px-12 py-8 text-2xl tracking-wide border-8 border-neo-charcoal font-black transition-all duration-200">
                  JOIN NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
