import React from 'react';
import { ArrowRight } from 'lucide-react';

const Text = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="space-y-8">
        <h1 className="font-bold text-white" style={{fontSize:"4rem",width:'60rem'}}>
          Find your next{' '}
          <span className="text-yellow-300">
            perfect
          </span>
          <br className="hidden sm:block" /> 
          place with ease
        </h1>

        <p className=" text-orange-100 font-semibold" style={{fontSize:"2.8rem"}}>
          Omlifespace will help you find your home fast, easy and comfortable.
          <br className="hidden sm:block" /> 
     

        </p>

        <a 
          href="#explore"
          className="inline-flex items-center gap-2 px-6 py-3 text-lg 
                   text-white bg-blue-500/60 rounded-lg hover:bg-blue-600"
        >
          Let's Start
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Text;