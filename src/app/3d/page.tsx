'use client';

import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import HubScene from '@/components/3d/HubScene';
import { useMemo } from 'react';
import { useAppStore } from '@/lib/store';

export default function Hub3D() {
  const isTransitioning = useAppStore(state => state.isTransitioning);
  const transitionText = useAppStore(state => state.transitionText);

  const keyboardMap = useMemo(() => [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
  ], []);

  return (
    <main id="canvas-container" className="w-screen h-screen bg-black relative overflow-hidden">
      
      {/* HUD DEL TELETRASPORTO (Visibile solo quando sei dentro il portale) */}
      <div 
        className={`absolute inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-1000 ${
          isTransitioning ? 'bg-black/80 backdrop-blur-md opacity-100' : 'bg-transparent opacity-0'
        }`}
      >
         <h1 className="text-white text-3xl md:text-5xl font-mono font-bold tracking-[0.2em] animate-pulse">
            {transitionText}
         </h1>
      </div>

      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ fov: 60 }}>
          <HubScene />
        </Canvas>
      </KeyboardControls>
    </main>
  );
}