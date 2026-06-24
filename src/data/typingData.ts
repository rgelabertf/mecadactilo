/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Finger, Level } from "../types";

// Finger-to-color mapping for visually associating fingers with keyboard keys
export const FINGER_COLORS: Record<Finger, { bg: string; text: string; border: string; glow: string }> = {
  [Finger.LeftPinky]: {
    bg: "bg-pink-100 dark:bg-pink-950/40",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-300 dark:border-pink-800",
    glow: "shadow-[0_0_15px_rgba(244,114,182,0.5)] border-pink-500"
  },
  [Finger.LeftRing]: {
    bg: "bg-orange-100 dark:bg-orange-950/40",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-300 dark:border-orange-800",
    glow: "shadow-[0_0_15px_rgba(251,146,60,0.5)] border-orange-500"
  },
  [Finger.LeftMiddle]: {
    bg: "bg-amber-100 dark:bg-amber-950/40",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-300 dark:border-amber-800",
    glow: "shadow-[0_0_15px_rgba(251,191,36,0.5)] border-amber-500"
  },
  [Finger.LeftIndex]: {
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-300 dark:border-emerald-800",
    glow: "shadow-[0_0_15px_rgba(52,211,153,0.5)] border-emerald-500"
  },
  [Finger.LeftThumb]: {
    bg: "bg-slate-100 dark:bg-slate-800/60",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-300 dark:border-slate-700",
    glow: "shadow-[0_0_15px_rgba(148,163,184,0.5)] border-slate-400"
  },
  [Finger.RightThumb]: {
    bg: "bg-slate-100 dark:bg-slate-800/60",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-300 dark:border-slate-700",
    glow: "shadow-[0_0_15px_rgba(148,163,184,0.5)] border-slate-400"
  },
  [Finger.RightIndex]: {
    bg: "bg-teal-100 dark:bg-teal-950/40",
    text: "text-teal-600 dark:text-teal-400",
    border: "border-teal-300 dark:border-teal-800",
    glow: "shadow-[0_0_15px_rgba(45,212,191,0.5)] border-teal-500"
  },
  [Finger.RightMiddle]: {
    bg: "bg-cyan-100 dark:bg-cyan-950/40",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-300 dark:border-cyan-800",
    glow: "shadow-[0_0_15px_rgba(34,211,238,0.5)] border-cyan-500"
  },
  [Finger.RightRing]: {
    bg: "bg-blue-100 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-300 dark:border-blue-800",
    glow: "shadow-[0_0_15px_rgba(96,165,250,0.5)] border-blue-500"
  },
  [Finger.RightPinky]: {
    bg: "bg-violet-100 dark:bg-violet-950/40",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-300 dark:border-violet-800",
    glow: "shadow-[0_0_15px_rgba(167,139,250,0.5)] border-violet-500"
  },
  [Finger.None]: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-400",
    border: "border-gray-200 dark:border-gray-750",
    glow: ""
  }
};

// Maps letters/keys to their responsible finger
export const KEY_FINGER_MAP: Record<string, Finger> = {
  // Row 1 (Numbers)
  "1": Finger.LeftPinky, "!": Finger.LeftPinky,
  "2": Finger.LeftRing, "@": Finger.LeftRing,
  "3": Finger.LeftMiddle, "#": Finger.LeftMiddle,
  "4": Finger.LeftIndex, "$": Finger.LeftIndex,
  "5": Finger.LeftIndex, "%": Finger.LeftIndex,
  "6": Finger.RightIndex, "^": Finger.RightIndex,
  "7": Finger.RightIndex, "&": Finger.RightIndex,
  "8": Finger.RightMiddle, "*": Finger.RightMiddle,
  "9": Finger.RightRing, "(": Finger.RightRing,
  "0": Finger.RightPinky, ")": Finger.RightPinky,
  "-": Finger.RightPinky, "_": Finger.RightPinky,
  "=": Finger.RightPinky, "+": Finger.RightPinky,

  // Row 2
  "q": Finger.LeftPinky, "Q": Finger.LeftPinky,
  "w": Finger.LeftRing, "W": Finger.LeftRing,
  "e": Finger.LeftMiddle, "E": Finger.LeftMiddle,
  "r": Finger.LeftIndex, "R": Finger.LeftIndex,
  "t": Finger.LeftIndex, "T": Finger.LeftIndex,
  "y": Finger.RightIndex, "Y": Finger.RightIndex,
  "u": Finger.RightIndex, "U": Finger.RightIndex,
  "i": Finger.RightMiddle, "I": Finger.RightMiddle,
  "o": Finger.RightRing, "O": Finger.RightRing,
  "p": Finger.RightPinky, "P": Finger.RightPinky,
  "[": Finger.RightPinky, "{": Finger.RightPinky,
  "]": Finger.RightPinky, "}": Finger.RightPinky,

  // Row 3 (Home Row)
  "a": Finger.LeftPinky, "A": Finger.LeftPinky,
  "s": Finger.LeftRing, "S": Finger.LeftRing,
  "d": Finger.LeftMiddle, "D": Finger.LeftMiddle,
  "f": Finger.LeftIndex, "F": Finger.LeftIndex,
  "g": Finger.LeftIndex, "G": Finger.LeftIndex,
  "h": Finger.RightIndex, "H": Finger.RightIndex,
  "j": Finger.RightIndex, "J": Finger.RightIndex,
  "k": Finger.RightMiddle, "K": Finger.RightMiddle,
  "l": Finger.RightRing, "L": Finger.RightRing,
  "ñ": Finger.RightPinky, "Ñ": Finger.RightPinky,
  ";": Finger.RightPinky, ":": Finger.RightPinky,
  "'": Finger.RightPinky, "\"": Finger.RightPinky,

  // Row 4
  "z": Finger.LeftPinky, "Z": Finger.LeftPinky,
  "x": Finger.LeftRing, "X": Finger.LeftRing,
  "c": Finger.LeftMiddle, "C": Finger.LeftMiddle,
  "v": Finger.LeftIndex, "V": Finger.LeftIndex,
  "b": Finger.LeftIndex, "B": Finger.LeftIndex,
  "n": Finger.RightIndex, "N": Finger.RightIndex,
  "m": Finger.RightIndex, "M": Finger.RightIndex,
  ",": Finger.RightMiddle, "<": Finger.RightMiddle,
  ".": Finger.RightRing, ">": Finger.RightRing,
  "/": Finger.RightPinky, "?": Finger.RightPinky,

  // Spacebar
  " ": Finger.RightThumb, // Both thumbs are valid, we associate with space bar typing
};

// Keyboard Rows UI Configuration
export interface KeyConfig {
  key: string;
  display: string;
  finger: Finger;
  width?: string; // custom width for special keys like space, backspace, shift
}

export const KEYBOARD_ROWS: KeyConfig[][] = [
  [
    { key: "`", display: "`", finger: Finger.LeftPinky },
    { key: "1", display: "1", finger: Finger.LeftPinky },
    { key: "2", display: "2", finger: Finger.LeftRing },
    { key: "3", display: "3", finger: Finger.LeftMiddle },
    { key: "4", display: "4", finger: Finger.LeftIndex },
    { key: "5", display: "5", finger: Finger.LeftIndex },
    { key: "6", display: "6", finger: Finger.RightIndex },
    { key: "7", display: "7", finger: Finger.RightIndex },
    { key: "8", display: "8", finger: Finger.RightMiddle },
    { key: "9", display: "9", finger: Finger.RightRing },
    { key: "0", display: "0", finger: Finger.RightPinky },
    { key: "-", display: "-", finger: Finger.RightPinky },
    { key: "=", display: "=", finger: Finger.RightPinky },
    { key: "Backspace", display: "⌫", finger: Finger.RightPinky, width: "w-14 md:w-20 flex-grow" }
  ],
  [
    { key: "Tab", display: "Tab ↹", finger: Finger.LeftPinky, width: "w-12 md:w-16" },
    { key: "q", display: "Q", finger: Finger.LeftPinky },
    { key: "w", display: "W", finger: Finger.LeftRing },
    { key: "e", display: "E", finger: Finger.LeftMiddle },
    { key: "r", display: "R", finger: Finger.LeftIndex },
    { key: "t", display: "T", finger: Finger.LeftIndex },
    { key: "y", display: "Y", finger: Finger.RightIndex },
    { key: "u", display: "U", finger: Finger.RightIndex },
    { key: "i", display: "I", finger: Finger.RightMiddle },
    { key: "o", display: "O", finger: Finger.RightRing },
    { key: "p", display: "P", finger: Finger.RightPinky },
    { key: "[", display: "[", finger: Finger.RightPinky },
    { key: "]", display: "]", finger: Finger.RightPinky },
    { key: "\\", display: "\\", finger: Finger.RightPinky }
  ],
  [
    { key: "CapsLock", display: "Bloq Mayús", finger: Finger.LeftPinky, width: "w-14 md:w-20" },
    { key: "a", display: "A", finger: Finger.LeftPinky },
    { key: "s", display: "S", finger: Finger.LeftRing },
    { key: "d", display: "D", finger: Finger.LeftMiddle },
    { key: "f", display: "F", finger: Finger.LeftIndex },
    { key: "g", display: "G", finger: Finger.LeftIndex },
    { key: "h", display: "H", finger: Finger.RightIndex },
    { key: "j", display: "J", finger: Finger.RightIndex },
    { key: "k", display: "K", finger: Finger.RightMiddle },
    { key: "l", display: "L", finger: Finger.RightRing },
    { key: "ñ", display: "Ñ", finger: Finger.RightPinky },
    { key: ";", display: ";", finger: Finger.RightPinky },
    { key: "Enter", display: "Intro ↵", finger: Finger.RightPinky, width: "w-16 md:w-24 flex-grow" }
  ],
  [
    { key: "ShiftLeft", display: "Shift ⇧", finger: Finger.LeftPinky, width: "w-16 md:w-24" },
    { key: "z", display: "Z", finger: Finger.LeftPinky },
    { key: "x", display: "X", finger: Finger.LeftRing },
    { key: "c", display: "C", finger: Finger.LeftMiddle },
    { key: "v", display: "V", finger: Finger.LeftIndex },
    { key: "b", display: "B", finger: Finger.LeftIndex },
    { key: "n", display: "N", finger: Finger.RightIndex },
    { key: "m", display: "M", finger: Finger.RightIndex },
    { key: ",", display: ",", finger: Finger.RightMiddle },
    { key: ".", display: ".", finger: Finger.RightRing },
    { key: "/", display: "/", finger: Finger.RightPinky },
    { key: "ShiftRight", display: "Shift ⇧", finger: Finger.RightPinky, width: "w-16 md:w-24 flex-grow" }
  ],
  [
    { key: "ControlLeft", display: "Ctrl", finger: Finger.LeftPinky, width: "w-12" },
    { key: "AltLeft", display: "Alt", finger: Finger.LeftThumb, width: "w-12" },
    { key: " ", display: "Espacio", finger: Finger.RightThumb, width: "w-48 md:w-72 flex-grow" },
    { key: "AltRight", display: "AltGr", finger: Finger.RightThumb, width: "w-12" },
    { key: "ControlRight", display: "Ctrl", finger: Finger.RightPinky, width: "w-12" }
  ]
];

// Progressive tutorial levels
export const LEVEL_DATA: Level[] = [
  {
    id: 1,
    name: "Teclas Guía Base (Dígitos Principales)",
    description: "Aprende la posición de reposo básica. Dedos izquierdos en ASDF y dedos derechos en JKLÑ. ¡Aquí inicia todo!",
    keys: ["a", "s", "d", "f", "j", "k", "l", "ñ", " "],
    exercises: [
      "aaa sss ddd fff jjj kkk lll ñññ",
      "asdf jklñ asdf jklñ fada jala",
      "asdf jklñ sasa lala dada kaka",
      "da la sala a la foca de alba",
      "alfa jala la lasaña de asaf"
    ],
    minWpm: 12,
    minAccuracy: 90
  },
  {
    id: 2,
    name: "Estiramientos Laterales (Teclas G y H)",
    description: "Usa tus dedos índices para alcanzar las letras centrales de la fila guía sin mover el resto de la mano.",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", " "],
    exercises: [
      "fgf jhj fgf jhj gas has gal hal",
      "gato hada faja gala haga sala",
      "el hada jala la faja del gato",
      "gala y hadas saltan a la sala",
      "haga gala de su sagas de hadas"
    ],
    minWpm: 15,
    minAccuracy: 90
  },
  {
    id: 3,
    name: "Fila Superior Central (Vocales E e I)",
    description: "Aprende a subir los dedos medios. El dedo medio izquierdo alcanza la E, el dedo medio derecho alcanza la I.",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "e", "i", " "],
    exercises: [
      "ded kik ded kik eie iii eee kiki",
      "idea deidad jefe jefa dejas diles",
      "el jefe de la deidad lee la idea",
      "esas ideas de elias son geniales",
      "la hija de la jefa pide fideos"
    ],
    minWpm: 18,
    minAccuracy: 92
  },
  {
    id: 4,
    name: "Fila Superior Completa (Q, W, R, T, Y, U, O, P)",
    description: "Usa todos los dedos para cubrir la fila superior completa. Mantén los dedos en la fila central de guía.",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "e", "i", "q", "w", "r", "t", "y", "u", "o", "p", " "],
    exercises: [
      "quiero queso poder todo perro gato",
      "tarde verde agua ruego golpe heroe",
      "el perro y el gato quieren queso",
      "tu puedes escribir todo este texto",
      "quien quiere pescar un pulpo rojo"
    ],
    minWpm: 22,
    minAccuracy: 92
  },
  {
    id: 5,
    name: "Fila Inferior Central (C, V, N, M)",
    description: "Extiende tus dedos hacia abajo para la fila inferior central. Mantén el ritmo y la postura.",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "e", "i", "q", "w", "r", "t", "y", "u", "o", "p", "c", "v", "n", "m", " "],
    exercises: [
      "mano cuna vaca mesa vaso cama nido",
      "cine vino nave mono camino camino",
      "el mono come una manzana verde en la mesa",
      "mi vecino maneja una nueva nave azul",
      "mañana iremos en coche al cine nuevo"
    ],
    minWpm: 25,
    minAccuracy: 93
  },
  {
    id: 6,
    name: "Fila Inferior Completa (Z, X, B, Signos)",
    description: "Domina toda la fila inferior, incluyendo la Z, la X, la B y la puntuación básica como comas y puntos.",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "e", "i", "q", "w", "r", "t", "y", "u", "o", "p", "c", "v", "n", "m", "z", "x", "b", ",", ".", " "],
    exercises: [
      "zapato, xilofono, brazo, cabeza, voz.",
      "examen, exito, bajo, azul, verde, blanco.",
      "el exito requiere examenes de excelencia, amigo.",
      "la cebra y el buey comen hierba bajo la lluvia.",
      "un buen mecanografo practica con calma, paso a paso."
    ],
    minWpm: 28,
    minAccuracy: 94
  },
  {
    id: 7,
    name: "Fila de Números e Iniciación a Símbolos",
    description: "Usa la fila superior numérica de forma fluida. Evita mirar el teclado físico mientras lo haces.",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "e", "i", "q", "w", "r", "t", "y", "u", "o", "p", "c", "v", "n", "m", "z", "x", "b", ",", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " "],
    exercises: [
      "tengo 23 anos y mi codigo es el 9870.",
      "el año 2026 traera mas de 365 grandes retos.",
      "en la sala 5 hay 12 alumnos y en la 4 hay 18.",
      "el examen de nivel 1 es el dia 10 de octubre.",
      "cuenta de 10 en 10: 10, 20, 30, 40, 50 y mas."
    ],
    minWpm: 30,
    minAccuracy: 94
  },
  {
    id: 8,
    name: "Uso Correcto de Mayúsculas (Shift)",
    description: "Sincroniza tus dedos meñiques para presionar Shift con la mano contraria a la letra que deseas capitalizar.",
    keys: ["A-Z", "a-z", ",", ".", " "],
    exercises: [
      "El sol brilla en Madrid. Julia viaja hoy.",
      "Pedro y Maria estudian en la Universidad de Chile.",
      "Viernes Santo cae en Abril este año nuevo.",
      "Me encanta programar en React y TypeScript con calma.",
      "Europa y Asia son continentes con mucha historia antigua."
    ],
    minWpm: 32,
    minAccuracy: 95
  },
  {
    id: 9,
    name: "Reto Final de Maestría (Pangramas y Oraciones)",
    description: "¡Felicidades por llegar al reto de maestría! Pon a prueba tu destreza con pangramas que cubren todas las letras.",
    keys: ["A-Z", "a-z", ",", ".", ";", "!", "?", " "],
    exercises: [
      "El veloz murcielago hindu comia feliz cardillo y escabeche.",
      "¿Sabias que un buen mecanografo usa los diez dedos sin mirar?",
      "¡Sorprendente! El joven bardo quijotesco declamo versos con fluidez.",
      "La constancia vence lo que la dicha no alcanza en este viaje.",
      "El exito se alcanza entrenando la memoria muscular de tus dedos."
    ],
    minWpm: 35,
    minAccuracy: 95
  }
];
