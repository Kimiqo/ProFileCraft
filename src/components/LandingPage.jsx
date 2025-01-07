import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigator = useNavigate();
  const handleNavigate = () => {
    navigator("/home");
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full  -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/landingPageVid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <main className="relative flex flex-col gap-5 items-center justify-center min-h-screen p-8 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
          Welcome to ProFile Craft
        </h2>
        <p className="mt-4 text-lg md:text-xl text-red-200 italic max-w-2xl">
          ProFile Craft is an intuitive CV/resumé builder empowering professionals and job seekers to create visually appealing profiles with ease.
        </p>
        <motion.button 
            className="bg-slate-50 p-3 rounded-md text-black"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.3, backgroundColor: 'green', color: 'white' }}
            transition={{ bounceDamping: 10, bounceStiffness: 500 }}
            onClick={handleNavigate}
          >
            Get Started
          </motion.button>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 flex items-center justify-center bg-slate-800 h-14 text-white text-sm w-full">
        <p>Kimiko Dev 2025 © All rights reserved</p>
      </footer>
    </div>
  );
}
