import React, { useEffect } from 'react';

const Text = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade');
    elements.forEach((el, index) => {
      el.style.animation = `fadeIn 1s ease-out forwards ${index * 0.5}s`;
    });
  }, []);

  return (
    <div className="h-full  relative left-[100px] top-[120px] lg:left-[200px] md:left-[175px] sm:left-[100px]"
    style={{width: "max-content"}}
    >
      <div className="animate-fade text-white text-4xl md:text-5xl lg:text-7xl font-bold mb-3">
        Find your next <span className="text-yellow-300">perfect</span>
        <br /> place with ease
      </div>
      
      <div className="animate-fade text-white text-xl md:text-2xl lg:text-3xl mt-3 mb-4">
        Omlifespace will help you find your home fast, easy and comfortable.
        <br /> Our expert support is always available.
      </div>
      
      <a href="#" className="animate-fade text-2xl md:text-3xl lg:text-4xl text-blue-300 font-bold hover:underline">
        Let's Start ...
      </a>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Text;