import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const Text = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const fullText = "perfect";
  
  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Background image wrapper */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/images/bg.jpg"
          alt="background"
          className="w-full h-full "
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-20 flex items-center min-h-screen">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
            Find your next{' '}
            <span className="text-yellow-300" id="typewriter-text">
              {text}
            </span>
            <br className="hidden sm:block" /> 
            <span className="mt-2 sm:mt-0">place with ease</span>
          </h1>

          <p className="text-orange-100 text-xl sm:text-2xl md:text-3xl font-semibold max-w-4xl hidden sm:block">
            Omlifespace will help you find your home fast, easy and comfortable.
          </p>

          <div className="pt-2 sm:pt-4">
            <a 
              href="#explore"
              className="inline-flex items-center justify-center 
                      px-3 py-3 sm:px-5 sm:py-3 md:px-8 md:py-4 
                      text-sm sm:text-base md:text-lg font-medium text-blue-900 
                      bg-gradient-to-r from-yellow-300 to-yellow-400 
                      rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                      transition-all duration-300 border border-yellow-500 sm:border-2"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline-block sm:inline-block ml-2 sm:ml-3">Explore Properties</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;