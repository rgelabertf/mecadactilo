/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { KEYBOARD_ROWS, FINGER_COLORS } from '../data/typingData';
import { Finger } from '../types';

interface VirtualKeyboardProps {
  nextKey: string; // The character that needs to be typed next
  pressedKeys: Record<string, boolean>; // State of keys currently held down physically
  activeFingers: Finger[]; // Fingers highlighted currently
  onKeyClick?: (key: string) => void;
}

export default function VirtualKeyboard({
  nextKey,
  pressedKeys,
  activeFingers,
  onKeyClick,
}: VirtualKeyboardProps) {
  
  // Helper to determine if a key is the target key to type next
  const isTargetKey = (keyChar: string) => {
    if (!nextKey) return false;
    
    // Normalize space
    if (nextKey === " " && keyChar === " ") return true;
    
    // Check if matching lowercase/uppercase
    if (keyChar.toLowerCase() === nextKey.toLowerCase()) {
      return true;
    }

    // Handle shift key highlights for capitals
    const isUppercase = nextKey !== " " && nextKey === nextKey.toUpperCase() && /[A-ZÑ]/.test(nextKey);
    if (isUppercase) {
      const leftHandKeys = "qwertgbyvasdfcxz";
      const isLeftHandChar = leftHandKeys.includes(nextKey.toLowerCase());
      
      if (isLeftHandChar && keyChar === "ShiftRight") {
        return true; // Press right shift for left hand keys
      }
      if (!isLeftHandChar && keyChar === "ShiftLeft") {
        return true; // Press left shift for right hand keys
      }
    }

    return false;
  };

  // Helper to check if a key is physically held down
  const isKeyPressed = (keyChar: string) => {
    // Check direct key value or standardized code representation
    if (pressedKeys[keyChar.toLowerCase()]) return true;
    if (pressedKeys[keyChar]) return true;
    
    // Special keys mapping
    if (keyChar === "ShiftLeft" && pressedKeys["shift"]) return true;
    if (keyChar === "ShiftRight" && pressedKeys["shift"]) return true;
    if (keyChar === "Backspace" && pressedKeys["backspace"]) return true;
    if (keyChar === "Enter" && pressedKeys["enter"]) return true;
    if (keyChar === "CapsLock" && pressedKeys["capslock"]) return true;
    if (keyChar === "Tab" && pressedKeys["tab"]) return true;
    if (keyChar === " " && pressedKeys[" "]) return true;

    return false;
  };

  return (
    <div 
      className="w-full bg-slate-900/80 backdrop-blur border border-slate-800/80 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col gap-1.5 md:gap-2 select-none" 
      id="virtual-keyboard-panel"
    >
      {/* Keyboard rows container */}
      <div className="flex flex-col gap-1 md:gap-1.5 w-full overflow-x-auto pb-1" id="keyboard-grid">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 md:gap-1.5 justify-center w-full min-w-[650px]">
            {row.map((keyCfg) => {
              const isTarget = isTargetKey(keyCfg.key);
              const isPressed = isKeyPressed(keyCfg.key);
              const fingerColors = FINGER_COLORS[keyCfg.finger];

              // Base width defaults to a standard square key unless specified
              const widthClass = keyCfg.width || "w-10 h-10 md:w-12 md:h-12 flex-grow max-w-[48px] md:max-w-[54px]";

              // Determine classes dynamically
              let keyBgClass = "bg-slate-950 text-slate-300 border-slate-800";
              let animationClass = "";

              if (isPressed) {
                // Key is actively pressed
                keyBgClass = "bg-emerald-500 text-slate-950 border-emerald-400 font-bold scale-95 shadow-[0_0_12px_rgba(16,185,129,0.4)]";
              } else if (isTarget) {
                // Key is the target to hit
                keyBgClass = `${fingerColors.bg} ${fingerColors.text} ${fingerColors.glow} font-bold scale-[1.03] animate-pulse border-2`;
                animationClass = "ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-950";
              } else {
                // Normal color-coded passive key
                keyBgClass = `${fingerColors.bg} ${fingerColors.text} ${fingerColors.border} border/60 hover:bg-slate-800/30`;
              }

              return (
                <button
                  key={keyCfg.key}
                  id={`vkey-${keyCfg.key.replace(/\s+/g, "-")}`}
                  onClick={() => onKeyClick?.(keyCfg.key)}
                  className={`
                    ${widthClass} h-10 md:h-12 rounded-lg border flex items-center justify-center 
                    text-xs md:text-sm font-medium tracking-tight font-mono transition-all duration-100 cursor-pointer hover:scale-[1.02] active:scale-95
                    ${keyBgClass} ${animationClass}
                  `}
                >
                  {/* Visual letters or icons */}
                  <span>{keyCfg.display}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Helper guide legend below the keyboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] md:text-xs text-slate-400 px-1 pt-2 gap-2 border-t border-slate-800/80">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span className="w-2 h-2 rounded bg-teal-500 animate-pulse inline-block" />
          Teclas bordeadas en color <span className="font-bold text-slate-300">brillante</span> indican la tecla que debes presionar.
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-bold tracking-wider">¡Teclado Interactivo!</span>
        </span>
        <span className="font-mono text-slate-500 hidden sm:inline">
          Diseño estándar QWERTY / Español
        </span>
      </div>
    </div>
  );
}
