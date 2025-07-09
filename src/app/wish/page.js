'use client';
import { useEffect, useRef, useState } from 'react';
import './wish.css';

export default function WishPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const images = [
    { src: '/MemoryImages/img1.jpg', caption: 'This smile… my forever favorite' },
    { src: '/MemoryImages/img2.jpg', caption: 'With you, every moment is magic' },
    { src: '/MemoryImages/img3.jpg', caption: 'Laughs that last a lifetime' },
    { src: '/MemoryImages/img4.jpg', caption: 'Endless laughter with you' },
    { src: '/MemoryImages/img5.jpg', caption: 'A moment frozen in joy' }
  ];

  const handleClick = () => setUnlocked(true);

  const next = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  useEffect(() => {
    const positions = [
      { top: '10%', left: '5%' },
      { top: '10%', right: '5%' },
      { bottom: '10%', left: '10%' },
      { bottom: '10%', right: '10%' },
      { top: '30%', left: '25%' },
      { top: '50%', left: '15%' },
      { top: '70%', left: '30%' },
      { top: '30%', right: '25%' },
      { top: '50%', right: '15%' },
      { top: '70%', right: '30%' },
    ];

    const randomizedHearts = positions.map((pos, i) => ({
      ...pos,
      id: i,
      fontSize: `${24 + Math.random() * 16}px`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));

    setHearts(randomizedHearts);
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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 px-4 text-center overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute text-red-400 animate-float"
            style={{
              fontSize: heart.fontSize,
              animationDelay: heart.animationDelay,
              animationDuration: heart.animationDuration,
              ...heart,
            }}
          >
            ❤️
          </span>
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

      {/* Title */}
      <h1 className="font-cursive text-7xl mt-10 mb-6 z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
        Mirror of Memories
      </h1>

      {!unlocked ? (
        <div className="bg-white/50 backdrop-blur-md rounded-[30px] p-6 shadow-2xl max-w-sm w-full z-10">
          <button
            onClick={handleClick}
            className="bg-gradient-to-br from-pink-200 via-pink-100 to-purple-200 rounded-2xl p-12 h-[300px] w-full flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-inner focus:outline-none"
          >
            <div className="text-5xl mb-2 animate-bounce">💞</div>
            <p className="text-lg font-semibold text-gray-700">
              Click to unlock memories
            </p>
          </button>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center max-w-6xl w-full z-10 min-h-[500px]">
          {/* Arrows */}
          <div className="relative flex items-center justify-between w-full">
            {/* Left Arrow */}
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`bg-white rounded-full p-3 shadow-md text-pink-500 hover:bg-pink-100 z-20 absolute left-0 ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
            >
              ←
            </button>

            {/* Images */}
            <div className="flex items-center justify-center gap-8 mx-auto">
              {/* Left Image */}
              <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden transition-all duration-500">
                {images[currentIndex - 1] && (
                  <img
                    src={images[currentIndex - 1].src}
                    alt=""
                    className="w-full h-full object-cover blur-sm opacity-50 scale-90"
                  />
                )}
              </div>

              {/* Center Image */}
              <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl">
                <img
                  src={images[currentIndex].src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Image */}
              <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden transition-all duration-500">
                {images[currentIndex + 1] && (
                  <img
                    src={images[currentIndex + 1].src}
                    alt=""
                    className="w-full h-full object-cover blur-sm opacity-50 scale-90"
                  />
                )}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={next}
              disabled={currentIndex === images.length - 1}
              className={`bg-white rounded-full p-3 shadow-md text-pink-500 hover:bg-pink-100 z-20 absolute right-0 ${currentIndex === images.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
            >
              →
            </button>
          </div>

          {/* Caption */}
          <p className="text-white font-semibold mt-4 text-lg">
            {images[currentIndex].caption}
          </p>

          {/* Download Button */}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = images[currentIndex].src;
              link.download = `memory-${currentIndex + 1}.jpg`;
              link.click();
            }}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-lg transition duration-300"
          >
            Download This Memory
          </button>

          {/* Next Page Button */}
          <a
  href="/Cake"
  className="fixed bottom-4 right-4 px-6 py-3 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition"
>
  Next Page →
</a>
        </div>
      )}
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/MemoryImages/MemoryPageBg.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}