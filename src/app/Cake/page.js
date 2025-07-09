'use client';
import { useEffect, useRef, useState } from 'react';
import { Fireworks } from 'fireworks-js';
import './cake.css';

export default function CakePage() {
  const [cut, setCut] = useState(false);
  const fireworksRef = useRef(null);
  const fireworksInstance = useRef(null);

  const handleCut = () => {
    setCut(true);
  };

  useEffect(() => {
    if (cut && fireworksRef.current && !fireworksInstance.current) {
      fireworksInstance.current = new Fireworks(fireworksRef.current, {
        rocketsPoint: { min: 50, max: 50 },
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 90,
        trace: 5,
        explosion: 5,
      });
      fireworksInstance.current.start();
    }
  }, [cut]);

  return (
    <div className="cake-page">
      {/* Fireworks canvas */}
      <div ref={fireworksRef} className="fireworks"></div>

      {/* Top message after cut */}
      {cut && (
        <p className="cake-message top-message">🎉 Happy Birthday! 🎂</p>
      )}

      {/* Cake */}
      <div className="cake-box" onClick={handleCut}>
        {!cut && (
          <div className="candle">
            <div className="flame"></div>
          </div>
        )}

        <div className="layer top-layer">
          <div className="icing"></div>
        </div>
        <div className="layer middle-layer">
          <div className="icing"></div>
        </div>
        <div className="layer bottom-layer">
          <div className="icing"></div>
        </div>

        <div className="cherry left"></div>
        <div className="cherry right"></div>

        <div className={`cake-gap ${cut ? 'show-gap' : ''}`}></div>
        <div className={`cake-slice ${cut ? 'show-slice' : ''}`}>
          <div className="slice-icing"></div>
          <div className="slice-top"></div>
          <div className="slice-middle"></div>
          <div className="slice-bottom"></div>
        </div>
      </div>

      {/* Bottom message before cut */}
      {!cut && (
        <p className="cake-message bottom-message">Let's cut the cake 🎉</p>
      )}

      {/* 🎈 Floating Emoji Rain */}
      {cut && (
        <div className="floating-emojis">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="emoji"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Math.random() > 0.5 ? '🎉' : '🎈'}
            </span>
          ))}
        </div>
      )}
      {cut && (
  <a href="/light" className="next-button">
    Next Page →
  </a>
)}
    </div>
  );
}