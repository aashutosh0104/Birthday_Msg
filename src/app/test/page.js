'use client';
import { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';

export default function FireTest() {
  const ref = useRef();

  useEffect(() => {
    const fw = new Fireworks(ref.current);
    fw.start();
    return () => fw.stop();
  }, []);

  return (
    <div
      ref={ref}
      className="h-screen w-screen bg-black"
    >
      <h1 className="text-white text-3xl text-center pt-20">Fireworks Test Page</h1>
    </div>
  );
}
