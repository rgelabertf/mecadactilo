import { Lesson, Attempt, Level } from './types';

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

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'key-1',
    title: 'Fila Guía Básica (F, J, D, K)',
    type: 'key',
    content: 'ffjj ddkk fjdf fjdj djkf djkf jkdf fjdj fjdk ffjj ddkk fj fj dk dk',
    description: 'Practica las teclas de la fila guía: F, J, D, K',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    category: 'key',
    targetWpm: 15,
    minDuration: 15,
    studiedKeys: ['f', 'j', 'd', 'k', ' ']
  },
  {
    id: 'key-2',
    title: 'Fila Guía Expandida (A, S, L, Ñ / Semi-colon)',
    type: 'key',
    content: 'asdf jkl; asdf jkl; asdf jkl; askf jld; lasd fjsk asdf jkl; slad jfks',
    description: 'Expande tu alcance en la fila guía con A, S, L, Ñ',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    category: 'key',
    targetWpm: 18,
    minDuration: 15,
    studiedKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'ñ', ' ']
  },
  {
    id: 'key-3',
    title: 'Teclas de Entrada de Datos (E, I, R, U)',
    type: 'key',
    content: 'fjei dkrf fjei dkrf eire urie reur ieie eeee rrrr iiii uuuu feji rkdf',
    description: 'Aprende E, I, R, U en la fila superior',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    category: 'key',
    targetWpm: 20,
    minDuration: 20,
    studiedKeys: ['e', 'i', 'r', 'u', 'f', 'j', 'd', 'k', ' ']
  },
  {
    id: 'word-1',
    title: 'Terminología Esencial TICs',
    type: 'word',
    content: 'red web link link dato chip byte ram rom cpu disco red nodo wifi internet bit red',
    description: 'Practica vocabulario técnico de TICs',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    category: 'word',
    targetWpm: 25,
    minDuration: 30,
    studiedKeys: ['r', 'e', 'd', 'w', 'b', 'l', 'i', 'n', 'k', 'a', 't', 'o', 'c', 'h', 'p', 'y', 'm', 'u', 's', 'f', ' ']
  },
  {
    id: 'word-2',
    title: 'Variables y Operadores',
    type: 'word',
    content: 'suma resta variable funcion clase objeto bucle codigo script modulo retorno if else while true false',
    description: 'Escribe términos de programación',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    category: 'word',
    targetWpm: 28,
    minDuration: 30,
    studiedKeys: ['s', 'u', 'm', 'a', 'r', 'e', 't', 'v', 'i', 'b', 'l', 'f', 'n', 'c', 'o', 'd', 'g', 'p', 'h', 'w']
  },
  {
    id: 'text-1',
    title: 'Examen de Ciudadanía Digital',
    type: 'text',
    content: 'La ciudadania digital implica un uso seguro y responsable de la tecnologia. Un estudiante de TICs debe proteger sus datos personales y respetar siempre la propiedad intelectual de sus companeros.',
    description: 'Texto académico sobre ciudadanía digital',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    category: 'text',
    targetWpm: 30,
    minDuration: 45,
    studiedKeys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'y', 'z']
  },
  {
    id: 'text-2',
    title: 'Integridad Académica vs. Plagio',
    type: 'text',
    content: 'Escribir usando tus propias palabras entrena tu mente para pensar de forma independiente. El copiar y pegar informacion debilita la capacidad de analisis critico. La dactilografia fluida te da la velocidad necesaria para redactar ensayos originales con soltura.',
    description: 'Ensayo sobre integridad académica',
    difficulty: 'advanced',
    estimatedMinutes: 60,
    category: 'text',
    targetWpm: 35,
    minDuration: 60,
    studiedKeys: []
  },
  {
    id: 'text-3',
    title: 'El Hardware Detrás de Tu Pantalla',
    type: 'text',
    content: 'Debajo de las teclas se encuentra un circuito impreso que detecta cada pulsacion en milisegundos. Esta senal viaja directamente a la unidad central de procesamiento, permitiendo que tus dedos y la computadora se comuniquen al instante sin retrasos visibles.',
    description: 'Texto técnico sobre hardware de teclados',
    difficulty: 'advanced',
    estimatedMinutes: 60,
    category: 'text',
    targetWpm: 40,
    minDuration: 60,
    studiedKeys: []
  }
];

function generateMockKeystrokeStream(text: string, withErrors: boolean, speedMultiplier: number = 1): { stream: any[], totalTimeSec: number } {
  const stream: any[] = [];
  let currentMs = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const delay = (80 + Math.random() * 150 + (char === ' ' || char === ',' || char === '.' ? 180 : 0)) * speedMultiplier;
    currentMs += delay;

    if (withErrors && i > 0 && i % 18 === 0) {
      const wrongChar = char === ' ' ? 'a' : 'x';
      stream.push({
        key: wrongChar,
        correct: false,
        timestamp: currentMs,
        finger: undefined,
        char: wrongChar,
        isCorrect: false,
        expected: char
      });
      currentMs += 250;
      currentMs += (80 + Math.random() * 100) * speedMultiplier;
      stream.push({
        key: char,
        correct: true,
        timestamp: currentMs,
        finger: undefined,
        char,
        isCorrect: true,
        expected: char
      });
    } else {
      stream.push({
        key: char,
        correct: true,
        timestamp: currentMs,
        finger: undefined,
        char,
        isCorrect: true,
        expected: char
      });
    }
  }

  return {
    stream,
    totalTimeSec: Math.max(1, Math.round(currentMs / 1000))
  };
}

const attempt1Data = generateMockKeystrokeStream(INITIAL_LESSONS[0].content, false, 0.82);
const attempt2Data = generateMockKeystrokeStream(INITIAL_LESSONS[5].content, true, 1.25);
const attempt3Data = generateMockKeystrokeStream(INITIAL_LESSONS[0].content, true, 3.50);

const cheatData: any[] = [];
let t = 0;
const cheatText = INITIAL_LESSONS[5].content;
for (let i = 0; i < cheatText.length; i++) {
  cheatData.push({
    key: cheatText[i],
    correct: true,
    timestamp: t,
    finger: undefined,
    char: cheatText[i],
    isCorrect: true,
    expected: cheatText[i]
  });
  t += 20;
}

export const INITIAL_ATTEMPTS: Attempt[] = [
  {
    id: 'att-1',
    lessonId: 'key-1',
    userId: 'Mateo Fernández',
    wpm: 28,
    kpm: 140,
    accuracy: 100,
    duration: attempt1Data.totalTimeSec,
    timestamp: new Date('2026-06-18T09:30:00Z').getTime(),
    keysStats: {},
    keystrokeEvents: attempt1Data.stream,
    studentName: 'Mateo Fernández',
    studentGrade: 4,
    lessonTitle: 'Fila Guía Básica (F, J, D, K)',
    grossWpm: 28,
    netWpm: 28,
    timeSpent: attempt1Data.totalTimeSec,
    date: '2026-06-18T09:30:00Z',
    keystrokeReplay: attempt1Data.stream,
    suspicious: false
  },
  {
    id: 'att-2',
    lessonId: 'text-2',
    userId: 'Sofía Rodríguez',
    wpm: 38,
    kpm: 190,
    accuracy: 94.7,
    duration: attempt2Data.totalTimeSec,
    timestamp: new Date('2026-06-19T14:15:00Z').getTime(),
    keysStats: {},
    keystrokeEvents: attempt2Data.stream,
    studentName: 'Sofía Rodríguez',
    studentGrade: 6,
    lessonTitle: 'Integridad Académica vs. Plagio',
    grossWpm: 38,
    netWpm: 36,
    timeSpent: attempt2Data.totalTimeSec,
    date: '2026-06-19T14:15:00Z',
    keystrokeReplay: attempt2Data.stream,
    suspicious: false
  },
  {
    id: 'att-3',
    lessonId: 'key-1',
    userId: 'Lucas Mendoza',
    wpm: 11,
    kpm: 55,
    accuracy: 81.8,
    duration: attempt3Data.totalTimeSec,
    timestamp: new Date('2026-06-20T08:45:00Z').getTime(),
    keysStats: {},
    keystrokeEvents: attempt3Data.stream,
    studentName: 'Lucas Mendoza',
    studentGrade: 4,
    lessonTitle: 'Fila Guía Básica (F, J, D, K)',
    grossWpm: 11,
    netWpm: 9,
    timeSpent: attempt3Data.totalTimeSec,
    date: '2026-06-20T08:45:00Z',
    keystrokeReplay: attempt3Data.stream,
    suspicious: false
  },
  {
    id: 'att-cheat',
    lessonId: 'text-2',
    userId: 'Felipe Hack',
    wpm: 182,
    kpm: 910,
    accuracy: 100,
    duration: 2,
    timestamp: new Date('2026-06-20T10:12:00Z').getTime(),
    keysStats: {},
    keystrokeEvents: cheatData,
    studentName: 'Felipe Hack',
    studentGrade: 5,
    lessonTitle: 'Integridad Académica vs. Plagio',
    grossWpm: 182,
    netWpm: 182,
    timeSpent: 2,
    date: '2026-06-20T10:12:00Z',
    keystrokeReplay: cheatData,
    suspicious: true
  }
];

export function getLessonById(id: string): Lesson | undefined {
  return INITIAL_LESSONS.find(l => l.id === id);
}

export function getLevelById(id: number): Level | undefined {
  return LEVEL_DATA.find(l => l.id === id);
}
