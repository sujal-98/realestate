import React, { useEffect } from 'react';
import 'swiper/swiper-bundle.css';
import './styles.css'; // Import the CSS file for styles

const Text = () => {
  useEffect(() => {
    const typewriter = document.getElementById('typewriter-text');
    const text1 = "Find your next ";
    const text2 = "<span class='grey-text'>perfect</span>";
    const text3 = "\n place with ease";
    const fullText = text1 + text2 + text3;
    let index = 0;
    const speed = 90; 
  
    const typeEffect = () => {
      if (index < fullText.length) {
        if (fullText.slice(index, index + 6) === '<span ') {
          const endIndex = fullText.indexOf('</span>', index) + 7;
          typewriter.innerHTML += fullText.slice(index, endIndex);
          index = endIndex;
        } 

        if (fullText.charAt(index) === '\n') {
          typewriter.innerHTML += '<br />';
          index++;
        } else {
          typewriter.innerHTML += fullText.charAt(index);
          index++;
        }
        setTimeout(typeEffect, speed);
      }
    };

    typewriter.innerHTML = ""; // Clear the initial text
    typeEffect(); 
  }, []);

  return (
    <div className='h-full'>
      
      <div className='flex flex-col gap-6 pl-10 pt-28 pb-28 px-1 max-w-6xl mx-auto'>
        <ul>
          <li>
            <div id="typewriter-text" className='text-left text-white font-bold text-3xl lg:text-8xl'></div>
          </li>
        </ul>
        <div className='text-white text-6xl sm:text-3xl text-left'>
          Omlifespace will help you find your home fast, easy and comfortable.<br />
          Our expert support is always available.
        </div>
        <a href="#" className='text-4xl sm:text-3xl text-blue-200 font-bold hover:underline text-left'>Let's Start ...</a>
      </div>
     
    </div>
  ); 
};

export default Text;
