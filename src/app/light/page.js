'use client';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './light.css';

export default function LightPage() {
    const [lightOn, setLightOn] = useState(false);
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);

    const handleClick = () => {
        setLightOn(true);
        launchConfetti();
    };

    const launchConfetti = () => {
        const duration = 4 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 70,
                origin: { x: 0 },
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 70,
                origin: { x: 1 },
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };
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
        <div className={`light-page ${lightOn ? 'light-on' : 'dark-mode'}`}>
            {!lightOn && (
                <>
                    <h1 className="light-heading">Light Up My Life</h1>
                    <button className="light-button" onClick={handleClick}>
                        Turn the Lights On ✨
                    </button>
                </>
            )}

            {lightOn && (
                <>
                    <div className="banner">🎉 Happy Birthday Madam Ji 🎉</div>
                    <div className="letter-card">
                        <h2>Dear Madam Ji,</h2>
                        <p>
                            On this special day, I want to take a moment to celebrate not just your birthday,
                            but the incredible person you are. Your presence lights up every room you enter,
                            just like how you've lit up our lives.
                        </p>
                        <p>
                            Your kindness, wisdom, and beautiful spirit inspire everyone around you.
                            You have this magical way of making ordinary moments feel extraordinary,
                            and today is all about celebrating the magic that is uniquely you.
                        </p>
                        <p>
                            May this new year of your life be filled with endless joy, beautiful surprises,
                            and all the happiness your heart can hold. You deserve nothing but the very best
                            that life has to offer.
                        </p>
                        <p className="bottom-wish">🎂✨ Wishing you the most wonderful birthday! 🎉🎈</p>
                    </div>
                </>
            )}

            <canvas ref={canvasRef} className="confetti-canvas"></canvas>
            {/* 🔊 Music Toggle Button - show only after light is on */}
            {lightOn && (
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={toggleMusic}
                        className="text-pink-600 bg-white/80 hover:bg-white shadow-md rounded-full p-3 transition-all"
                        title={isPlaying ? "Pause Music" : "Play Music"}
                    >
                        {isPlaying ? '🔊' : '🔇'}
                    </button>
                </div>
            )}
            <audio ref={audioRef} loop>
                <source src="/light/chand_si_mehbooba.mp3" type="audio/mpeg" />
            </audio>
        </div>
    );
}