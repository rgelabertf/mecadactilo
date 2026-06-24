/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Finger } from '../types';
import { FINGER_COLORS } from "../data/typingData";

interface HandGuideProps {
  activeFingers: Finger[];
}

export default function HandGuide({ activeFingers }: HandGuideProps) {
  // Helper to check if a finger is active
  const isFingerActive = (finger: Finger) => activeFingers.includes(finger);

  // Get active styling or default style for each finger
  const getFingerStyle = (finger: Finger) => {
    const isActive = isFingerActive(finger);
    const colors = FINGER_COLORS[finger];
    
    if (isActive) {
      return {
        fill: "currentColor",
        class: `${colors.text} filter drop-shadow-[0_0_8px_rgba(20,184,166,0.6)] animate-pulse transition-all duration-150`,
        strokeWidth: "2",
        stroke: "white"
      };
    }
    
    return {
      fill: "rgba(30, 41, 59, 0.4)", // dark slate background
      class: "text-slate-700 dark:text-slate-700 transition-all duration-300",
      strokeWidth: "1.5",
      stroke: "rgba(148, 163, 184, 0.2)" // light border
    };
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center justify-between shadow-xl" id="hand-guide-panel">
      {/* Visual Header / Guide */}
      <div className="w-full text-center mb-4">
        <h3 className="text-sm font-semibold text-slate-200">Guía de Posición Manual</h3>
        <p className="text-xs text-slate-400 mt-1">
          Coloca los dedos sobre la fila guía <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20">ASDF</span> y <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20">JKLÑ</span>
        </p>
      </div>

      {/* SVG Canvas for Left and Right Hands */}
      <div className="flex justify-center items-center gap-12 w-full max-w-lg min-h-[180px]">
        
        {/* LEFT HAND SVG */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">Mano Izquierda</span>
          <svg viewBox="0 0 150 160" className="w-36 h-36 md:w-40 md:h-40" id="left-hand-svg">
            {/* Palm Base */}
            <path
              d="M30,120 Q30,140 60,150 Q90,150 100,120 C100,105 105,95 100,85 C95,75 80,85 70,85 C60,85 55,80 40,85 C30,90 30,105 30,120 Z"
              fill="rgba(30, 41, 59, 0.2)"
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="1.5"
            />
            
            {/* Left Pinky (Meñique Izquierdo) */}
            <rect
              x="20" y="55" width="12" height="35" rx="6"
              fill={getFingerStyle(Finger.LeftPinky).fill}
              className={getFingerStyle(Finger.LeftPinky).class}
              stroke={getFingerStyle(Finger.LeftPinky).stroke}
              strokeWidth={getFingerStyle(Finger.LeftPinky).strokeWidth}
            />
            {/* Left Ring (Anular Izquierdo) */}
            <rect
              x="38" y="35" width="13" height="50" rx="6"
              fill={getFingerStyle(Finger.LeftRing).fill}
              className={getFingerStyle(Finger.LeftRing).class}
              stroke={getFingerStyle(Finger.LeftRing).stroke}
              strokeWidth={getFingerStyle(Finger.LeftRing).strokeWidth}
            />
            {/* Left Middle (Medio Izquierdo) */}
            <rect
              x="56" y="25" width="13" height="58" rx="6"
              fill={getFingerStyle(Finger.LeftMiddle).fill}
              className={getFingerStyle(Finger.LeftMiddle).class}
              stroke={getFingerStyle(Finger.LeftMiddle).stroke}
              strokeWidth={getFingerStyle(Finger.LeftMiddle).strokeWidth}
            />
            {/* Left Index (Índice Izquierdo) */}
            <rect
              x="74" y="32" width="13" height="52" rx="6"
              fill={getFingerStyle(Finger.LeftIndex).fill}
              className={getFingerStyle(Finger.LeftIndex).class}
              stroke={getFingerStyle(Finger.LeftIndex).stroke}
              strokeWidth={getFingerStyle(Finger.LeftIndex).strokeWidth}
            />
            {/* Left Thumb (Pulgar Izquierdo) */}
            <g transform="rotate(-30, 105, 85)">
              <rect
                x="100" y="70" width="14" height="32" rx="7"
                fill={getFingerStyle(Finger.LeftThumb).fill}
                className={getFingerStyle(Finger.LeftThumb).class}
                stroke={getFingerStyle(Finger.LeftThumb).stroke}
                strokeWidth={getFingerStyle(Finger.LeftThumb).strokeWidth}
              />
            </g>

            {/* Fingertip Guides for Home Position */}
            {!isFingerActive(Finger.LeftPinky) && <circle cx="26" cy="65" r="3" className="fill-pink-500/40" />}
            {!isFingerActive(Finger.LeftRing) && <circle cx="445" cy="45" r="3" className="fill-orange-500/40" transform="translate(-400, 0)" />}
            {!isFingerActive(Finger.LeftMiddle) && <circle cx="62" cy="35" r="3" className="fill-amber-500/40" />}
            {!isFingerActive(Finger.LeftIndex) && <circle cx="80" cy="42" r="3" className="fill-emerald-500/40" />}
          </svg>
        </div>

        {/* RIGHT HAND SVG */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">Mano Derecha</span>
          <svg viewBox="0 0 150 160" className="w-36 h-36 md:w-40 md:h-40" id="right-hand-svg">
            {/* Palm Base */}
            <path
              d="M120,120 Q120,140 90,150 Q60,150 50,120 C50,105 45,95 50,85 C55,75 70,85 80,85 C90,85 95,80 110,85 C120,90 120,105 120,120 Z"
              fill="rgba(30, 41, 59, 0.2)"
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="1.5"
            />
            
            {/* Right Thumb (Pulgar Derecho) */}
            <g transform="rotate(30, 45, 85)">
              <rect
                x="36" y="70" width="14" height="32" rx="7"
                fill={getFingerStyle(Finger.RightThumb).fill}
                className={getFingerStyle(Finger.RightThumb).class}
                stroke={getFingerStyle(Finger.RightThumb).stroke}
                strokeWidth={getFingerStyle(Finger.RightThumb).strokeWidth}
              />
            </g>
            {/* Right Index (Índice Derecho) */}
            <rect
              x="63" y="32" width="13" height="52" rx="6"
              fill={getFingerStyle(Finger.RightIndex).fill}
              className={getFingerStyle(Finger.RightIndex).class}
              stroke={getFingerStyle(Finger.RightIndex).stroke}
              strokeWidth={getFingerStyle(Finger.RightIndex).strokeWidth}
            />
            {/* Right Middle (Medio Derecho) */}
            <rect
              x="81" y="25" width="13" height="58" rx="6"
              fill={getFingerStyle(Finger.RightMiddle).fill}
              className={getFingerStyle(Finger.RightMiddle).class}
              stroke={getFingerStyle(Finger.RightMiddle).stroke}
              strokeWidth={getFingerStyle(Finger.RightMiddle).strokeWidth}
            />
            {/* Right Ring (Anular Derecho) */}
            <rect
              x="99" y="35" width="13" height="50" rx="6"
              fill={getFingerStyle(Finger.RightRing).fill}
              className={getFingerStyle(Finger.RightRing).class}
              stroke={getFingerStyle(Finger.RightRing).stroke}
              strokeWidth={getFingerStyle(Finger.RightRing).strokeWidth}
            />
            {/* Right Pinky (Meñique Derecho) */}
            <rect
              x="118" y="55" width="12" height="35" rx="6"
              fill={getFingerStyle(Finger.RightPinky).fill}
              className={getFingerStyle(Finger.RightPinky).class}
              stroke={getFingerStyle(Finger.RightPinky).stroke}
              strokeWidth={getFingerStyle(Finger.RightPinky).strokeWidth}
            />

            {/* Fingertip Guides for Home Position */}
            {!isFingerActive(Finger.RightIndex) && <circle cx="69" cy="42" r="3" className="fill-teal-500/40" />}
            {!isFingerActive(Finger.RightMiddle) && <circle cx="87" cy="35" r="3" className="fill-cyan-500/40" />}
            {!isFingerActive(Finger.RightRing) && <circle cx="105" cy="45" r="3" className="fill-blue-500/40" />}
            {!isFingerActive(Finger.RightPinky) && <circle cx="124" cy="65" r="3" className="fill-violet-500/40" />}
          </svg>
        </div>

      </div>

      {/* Interactive Legend */}
      <div className="w-full flex justify-between gap-1 mt-4 border-t border-slate-800/80 pt-3 text-[10px] font-mono">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-pink-400">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400/20 border border-pink-400/40" />
            <span>Meñique Izq. (A,Q,Z)</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400/20 border border-orange-400/40" />
            <span>Anular Izq. (S,W,X)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/40" />
            <span>Medio Izq. (D,E,C)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/40" />
            <span>Índice Izq. (F,G,R,V)</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-end text-right">
          <div className="flex items-center gap-1.5 text-violet-400">
            <span>Meñique Der. (Ñ,P)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400/20 border border-violet-400/40" />
          </div>
          <div className="flex items-center gap-1.5 text-blue-400">
            <span>Anular Der. (L,O)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400/20 border border-blue-400/40" />
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span>Medio Der. (K,I)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/20 border border-cyan-400/40" />
          </div>
          <div className="flex items-center gap-1.5 text-teal-400">
            <span>Índice Der. (J,H,U,N)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400/20 border border-teal-400/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
