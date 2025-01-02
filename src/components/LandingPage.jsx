import React from 'react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <>
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
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
      <main className="relative flex flex-col gap-5 mx-auto mt-10 p-5 rounded-lg justify-center justify-evenly text-center text-white" 
            style={{ height: 750, width: '97%' }}>
        <h2 className="text-3xl font-bold">Welcome to ProFile Craft</h2>
        <p className="mt-4 text-red-200 italic">
          ProFile Craft is an intuitive and sleek CV/resumé builder designed to empower professionals and job seekers in crafting outstanding profiles with ease. Whether you're a student, an experienced professional, or someone starting afresh, ProFile Craft helps you create visually appealing, tailored CVs that showcase your skills and achievements effectively.
        </p>
        <div className="flex flex-row gap-5 justify-center m-5">
          <motion.button 
            className="bg-slate-50 p-3 rounded-md text-black"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.3, backgroundColor: 'green', color: 'white' }}
            transition={{ bounceDamping: 10, bounceStiffness: 500 }}
          >
            Get Started
          </motion.button>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-row p-1 w-full bg-slate-800 h-14 bottom-0 left-0 right-0 items-center justify-center text-white text-base">
        <div>
          <h3>Kimiko Dev 2025 © All rights reserved</h3>
        </div>
      </footer>
    </>
  );
}
