'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

export default function Home() {
  const router = useRouter();
  const [hearts, setHearts] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const bgImages = [
    '/Background/Background_image_1.png',
    '/Background/Background_image_2.png',
    '/Background/Background_image_3.png',
    '/Background/Background_image_4.png',
    '/Background/Background_image_5.png',
    '/Background/Background_image_6.png',
  ];

  // Change background every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Generate hearts every few seconds
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 10 }).map(() => ({
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 5}s`,
        duration: `${4 + Math.random() * 6}s`,
        width: `${20 + Math.random() * 10}px`,
        height: `${20 + Math.random() * 10}px`,
        id: Math.random().toString(36).substr(2, 9)
      }));
      setHearts(prev => [...prev, ...newHearts]);
    };

    generateHearts();
    const interval = setInterval(generateHearts, 3000);
    return () => clearInterval(interval);
  }, []);

  // Toggle music
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClick = () => {
    router.push('/wish');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/15 via-white/10 to-pink-100/15 z-0"></div>

      {/* Floating Hearts */}
      <div className="heart-bg absolute inset-0 z-0 pointer-events-none">
        {hearts.map((heart) => (
          <svg
            key={heart.id}
            className="svg-heart absolute animate-float"
            viewBox="0 0 32 29.6"
            fill="red"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              width: heart.width,
              height: heart.height,
            }}
          >
            <path d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.2C14.8,2.1,11.8,0,8.4,0
              C3.8,0,0,3.8,0,8.4c0,9.2,16,21.2,16,21.2s16-12,16-21.2
              C32,3.8,28.2,0,23.6,0z"/>
          </svg>
        ))}
      </div>

      {/* 🔊 Music Toggle Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleMusic}
          className="text-pink-600 bg-white/80 hover:bg-white shadow-md rounded-full p-3 transition-all"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Stylish White Box */}
      <div className="backdrop-blur-2xl bg-white/40 shadow-2xl rounded-[2rem] px-12 py-20 max-w-xl w-full text-center relative z-10 animate-fade-in min-h-[650px] flex flex-col justify-between transition duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_#f9a8d4]">
        <h1 className="text-5xl font-extrabold mb-4 text-pink-600 font-cursive drop-shadow-[2px_2px_2px_rgba(249,168,212,0.6)]">
          🎂 Happy Birthday Bachha 🎈💖
        </h1>
        <p className="text-lg text-gray-700 mb-8 px-4">
          You make life sweeter just by being in it! Wishing you love, sparkles, laughter, and magic all day long. ✨🌸
        </p>
        <button
          onClick={handleClick}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg animate-pulse transition-all duration-300"
        >
          Click for Surprise 💝
        </button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/Background/Happy_birthday_song.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}