import React, { useState, useEffect, useRef } from 'react';
import {
  Keyboard, Award, Flame, Zap, Play, CheckCircle, RotateCcw,
  HelpCircle, EyeOff, Sparkles, BookOpen, Clock, AlertCircle, Heart,
  Settings, RefreshCw, FileText
} from 'lucide-react';
import { Lesson, Attempt, KeystrokeEvent, Finger, fingerToString } from '../types';
import { KEY_FINGER_MAP, FINGER_COLORS } from '../data/typingData';
import VirtualKeyboard from './VirtualKeyboard';
import HandGuide from './HandGuide';
import { SoundEngine, initAudio } from '../data/SoundEngine';
import TypingRace from './TypingRace';
import ProgressDashboard from './ProgressDashboard';

interface StudentModuleProps {
  lessons: Lesson[];
  attempts: Attempt[];
  onNewAttempt: (attempt: Attempt) => void;
  studentName: string;
}

export default function StudentModule({ lessons, attempts, onNewAttempt, studentName }: StudentModuleProps) {
  const [activeTab, setActiveTab] = useState<'lessons' | 'review' | 'dashboard' | 'race' | 'cert'>('lessons');

  const [layout] = useState<'QWERTY'>('QWERTY');
  const [showHands, setShowHands] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [typedInput, setTypedInput] = useState('');
  const [correctCharCount, setCorrectCharCount] = useState(0);
  const [wrongCharCount, setWrongCharCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [keysHistory, setKeysHistory] = useState<KeystrokeEvent[]>([]);

  const [grossWpm, setGrossWpm] = useState(0);
  const [netWpm, setNetWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [kpm, setKpm] = useState(0);

  const [reviewMode, setReviewMode] = useState<'difficult' | 'studied'>('difficult');

  const [lastBreakTime, setLastBreakTime] = useState<number>(Date.now());
  const [showBreakReminder, setShowBreakReminder] = useState(false);

  const typingAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // === INTEGRATION: Sound Engine ===
  const soundEngineRef = useRef(new SoundEngine());
  const [soundEnabled, setSoundEnabled] = useState(true);

  // === INTEGRATION: Keyboard tracking for VirtualKeyboard ===
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});

  // === INTEGRATION: Current target finger ===
  const nextTargetChar = activeLesson ? activeLesson.content[typedInput.length] : '';
  const currentKeyAssignment = nextTargetChar ? KEY_FINGER_MAP[nextTargetChar.toLowerCase()] : null;
  const currentTargetFinger = currentKeyAssignment ?? Finger.None;

  // === XP / Streak / Gamification ===
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Timer
  useEffect(() => {
    let interval: any = null;
    if (startTime !== null && activeLesson) {
      interval = setInterval(() => {
        const diff = Math.round((Date.now() - startTime) / 1000);
        setElapsedSeconds(diff);
        if (Date.now() - lastBreakTime > 300000) {
          setShowBreakReminder(true);
          setLastBreakTime(Date.now());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, activeLesson, lastBreakTime]);

  // === INTEGRATION: Track physical key presses ===
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false, [e.key]: false }));
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (typedInput.length === 0 || !activeLesson) {
      setGrossWpm(0);
      setNetWpm(0);
      setAccuracy(100);
      setKpm(0);
      return;
    }

    const minutes = elapsedSeconds / 60 || 0.01;
    const grossWords = typedInput.length / 5;
    const computedGrossWpm = Math.round(grossWords / minutes);

    const errorPenalties = wrongCharCount;
    const computedNetWpm = Math.max(0, Math.round(((typedInput.length - errorPenalties) / 5) / minutes));
    const computedKpm = Math.round(typedInput.length / minutes);

    const totalStrikes = correctCharCount + wrongCharCount;
    const computedAccuracy = totalStrikes > 0 ? Math.round((correctCharCount / totalStrikes) * 100) : 100;

    setGrossWpm(computedGrossWpm);
    setNetWpm(computedNetWpm);
    setAccuracy(computedAccuracy);
    setKpm(computedKpm);
  }, [typedInput, correctCharCount, wrongCharCount, elapsedSeconds, activeLesson]);

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setTypedInput('');
    setCorrectCharCount(0);
    setWrongCharCount(0);
    setStartTime(null);
    setElapsedSeconds(0);
    setKeysHistory([]);
    initAudio();
    setTimeout(() => {
      typingAreaRef.current?.focus();
    }, 150);
  };

  const handleKeyboardStroke = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeLesson) return;

    const val = e.target.value;
    if (val.length < typedInput.length) {
      setTypedInput(val);
      return;
    }

    if (startTime === null) {
      setStartTime(Date.now());
    }

    const lastCharIdx = val.length - 1;
    const typedChar = val[lastCharIdx];
    const expectedChar = activeLesson.content[lastCharIdx];

    const isCorrect = typedChar === expectedChar;

    if (isCorrect) {
      setCorrectCharCount(prev => prev + 1);
      // === INTEGRATION: Sound on correct ===
      if (soundEnabled) soundEngineRef.current.playTick();
    } else {
      setWrongCharCount(prev => prev + 1);
      // === INTEGRATION: Sound on error ===
      if (soundEnabled) soundEngineRef.current.playError();
    }

    const event: KeystrokeEvent = {
      key: typedChar,
      correct: isCorrect,
      timestamp: Date.now() - (startTime || Date.now()),
      finger: fingerToString(currentTargetFinger),
      char: typedChar,
      isCorrect,
      expected: expectedChar,
    };
    setKeysHistory(prev => [...prev, event]);
    setTypedInput(val);

    if (val.length === activeLesson.content.length) {
      const finalElapsed = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
      let correctCount = 0;
      let wrongCount = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === activeLesson.content[i]) correctCount++;
        else wrongCount++;
      }
      const finalKeystrokes = [...keysHistory, event];
      concludeAttempt(val, finalElapsed, correctCount, wrongCount, finalKeystrokes);
    }
  };

  const TEXT_ALTERNATIVES: Record<string, string[]> = {
    'text-2': [
      'Redactar con ideas propias fortalece el pensamiento y la originalidad academica. La mecanografia veloz te permite expresar conceptos complejos sin interrupciones.',
      'La integridad intelectual es un pilar fundamental en la era digital. Todo contenido extraido de fuentes externas debe ser citado correctamente.',
      'El analisis critico se desarrolla escribiendo resumenes con vocabulario personal. La tecnologia es una herramienta que amplifica tu capacidad de expresion.'
    ],
    'text-3': [
      'Cada pulsacion en el teclado genera una senal electrica que viaja al procesador central. Los switches mecanicos tienen una vida util de hasta 50 millones de pulsaciones.',
      'El monitor muestra pixeles que se iluminan en fracciones de segundo. La tarjeta grafica interpreta los datos binarios para crear imagenes en tiempo real.',
      'Los dispositivos de entrada como el teclado y el raton convierten acciones fisicas en datos digitales que la computadora procesa instantaneamente.'
    ]
  };

  const WORD_POOL = [
    'algoritmo', 'archivo', 'base', 'bit', 'byte', 'chip', 'ciber', 'clave', 'código',
    'compilar', 'cpu', 'datos', 'debug', 'digital', 'disco', 'dominio', 'enlace', 'firma',
    'fuente', 'hardware', 'host', 'internet', 'kernel', 'latencia', 'log', 'mail', 'nube',
    'pixel', 'puerto', 'rama', 'red', 'script', 'servidor', 'shell', 'token', 'virus', 'wifi'
  ];

  const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const generateVariantText = (lesson: Lesson): string => {
    if (lesson.category === 'key' && lesson.studiedKeys.length > 0) {
      const keys = lesson.studiedKeys.filter(k => k !== ' ');
      return Array.from({ length: 20 }, () => {
        const pair = Array.from({ length: 2 }, () => pickRandom(keys)).join('');
        return pair;
      }).join(' ');
    }

    if (lesson.category === 'word') {
      const pool = lesson.studiedKeys.length > 0 ? lesson.studiedKeys.filter(k => k !== ' ') : WORD_POOL;
      return Array.from({ length: 14 }, () => {
        const wordLen = 3 + Math.floor(Math.random() * 4);
        return Array.from({ length: wordLen }, () => pickRandom(pool)).join('');
      }).join(' ');
    }

    if (lesson.category === 'text') {
      const alternatives = TEXT_ALTERNATIVES[lesson.id];
      if (alternatives) {
        return pickRandom(alternatives);
      }
      if (lesson.studiedKeys.length > 0) {
        const keys = lesson.studiedKeys.filter(k => k !== ' ');
        const sentenceCount = 2 + Math.floor(Math.random() * 2);
        return Array.from({ length: sentenceCount }, () => {
          const wordCount = 5 + Math.floor(Math.random() * 8);
          return Array.from({ length: wordCount }, () => {
            const wordLen = 2 + Math.floor(Math.random() * 5);
            return Array.from({ length: wordLen }, () => pickRandom(keys)).join('');
          }).join(' ');
        }).join('. ') + '.';
      }
    }

    return lesson.content;
  };

  // === INTEGRATION: XP calculation ===
  function calcXp(wpm: number, acc: number, lessonLength: number): number {
    return Math.max(1, Math.round((wpm * acc / 100) + (lessonLength / 20)));
  }

  function updateStreak(wpm: number, acc: number) {
    if (acc >= 85 && wpm >= 15) {
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  }

  const concludeAttempt = (
    finalTypedInput?: string,
    finalElapsedSeconds?: number,
    finalCorrectCount?: number,
    finalWrongCount?: number,
    finalKeysHistory?: KeystrokeEvent[]
  ) => {
    if (!activeLesson) return;

    const input = finalTypedInput ?? typedInput;
    const seconds = finalElapsedSeconds ?? elapsedSeconds;
    const correct = finalCorrectCount ?? correctCharCount;
    const wrong = finalWrongCount ?? wrongCharCount;
    const history = finalKeysHistory ?? keysHistory;

    const minutes = seconds / 60 || 0.01;
    const grossWords = input.length / 5;
    const finalGrossWpm = Math.round(grossWords / minutes);
    const errorPenalties = wrong;
    const finalNetWpm = Math.max(0, Math.round(((input.length - errorPenalties) / 5) / minutes));
    const finalKpm = Math.round(input.length / minutes);
    const totalStrikes = correct + wrong;
    const finalAccuracy = totalStrikes > 0 ? Math.round((correct / totalStrikes) * 100) : 100;

    const isSuspicious = finalNetWpm > 120 && finalAccuracy === 100;

    // === INTEGRATION: XP & Streak ===
    const earnedXp = calcXp(finalNetWpm, finalAccuracy, input.length);
    updateStreak(finalNetWpm, finalAccuracy);
    setXp(prev => prev + earnedXp);

    // Level up check (every 100 XP)
    const newLevel = Math.min(9, Math.floor(xp / 100) + 1);
    if (newLevel > currentLevel) {
      setCurrentLevel(newLevel);
      if (soundEnabled) soundEngineRef.current.playSuccess();
    }

    const newAttempt: Attempt = {
      id: 'att-' + Math.random().toString(36).substr(2, 9),
      studentName,
      lessonId: activeLesson.id,
      lessonTitle: activeLesson.title,
      grossWpm: finalGrossWpm,
      netWpm: finalNetWpm,
      accuracy: finalAccuracy,
      kpm: finalKpm,
      timeSpent: seconds,
      date: new Date().toISOString(),
      keystrokeReplay: history,
      suspicious: isSuspicious,
      xpEarned: earnedXp,
      streakAtTime: streak + 1,
      levelAtTime: newLevel,
      keysStats: {},
      keystrokeEvents: history,
    };

    onNewAttempt(newAttempt);

    const currentLesson = activeLesson;
    const wantsToContinue = confirm(
      `Práctica completada: ${currentLesson.title}\nRendimiento: ${finalNetWpm} pal/min · Precisión: ${finalAccuracy}%\nXP Ganada: +${earnedXp}${streak > 0 ? ` · Racha: ${streak + 1}🔥` : ''}\n\n¿Quieres seguir practicando esta lección?`
    );
    if (wantsToContinue) {
      const lessonAttempts = attempts.filter(a => a.lessonId === currentLesson.id).length + 1;
      if (lessonAttempts >= 3) {
        const wantNewText = confirm(
          `Has practicado esta lección ${lessonAttempts} veces. ¿Quieres generar un texto nuevo para variar?`
        );
        if (wantNewText) {
          startLesson({ ...currentLesson, content: generateVariantText(currentLesson) });
          return;
        }
      }
      startLesson(currentLesson);
    } else {
      setActiveLesson(null);
    }
  };

  const canSkipEarly = () => {
    if (!activeLesson) return false;
    const minD = activeLesson.minDuration || 15;
    return elapsedSeconds >= 10 && accuracy >= 95 && netWpm >= activeLesson.targetWpm;
  };

  const forcesCompletion = () => {
    if (!activeLesson) return false;
    return netWpm < 15;
  };

  const handleEarlyExit = () => {
    if (canSkipEarly()) {
      concludeAttempt();
    }
  };

  const getGradeRating = (wpmVal: number) => {
    if (wpmVal >= 45) return { name: 'Leyenda del Teclado (Diamante)', color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500' };
    if (wpmVal >= 33) return { name: 'Nivel Excelente (Oro)', color: 'text-amber-500 bg-amber-950/40 border-amber-500' };
    if (wpmVal >= 22) return { name: 'Nivel Fluido (Plata)', color: 'text-slate-300 bg-slate-900 border-slate-600' };
    if (wpmVal >= 11) return { name: 'Nivel Inicial (Bronce)', color: 'text-amber-700 bg-amber-900/10 border-amber-800' };
    return { name: 'Práctica Básica Activa', color: 'text-rose-400 bg-rose-950/20 border-rose-900' };
  };

  const getTargetKeyStyle = (finger: Finger): string => {
    if (finger === Finger.None) return 'border-indigo-500 bg-indigo-500/10 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]';
    const colors = FINGER_COLORS[finger];
    return `${colors.border} ${colors.bg} ${colors.text} ${colors.glow || 'shadow-[0_0_8px_rgba(99,102,241,0.3)]'}`;
  };

  const generateCustomReview = () => {
    let baseText = '';

    if (reviewMode === 'difficult') {
      const studentAttempts = attempts.filter(a => a.studentName === studentName);
      const errorsMap: Record<string, number> = {};

      studentAttempts.forEach(a => {
        (a.keystrokeReplay || []).forEach(k => {
          if (!k.isCorrect) {
            errorsMap[k.expected] = (errorsMap[k.expected] || 0) + 1;
          }
        });
      });

      const difficultKeys = Object.entries(errorsMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(e => e[0]);

      if (difficultKeys.length === 0) {
        baseText = 'asdf jkl; asdf jkl; asdf';
      } else {
        baseText = Array.from({ length: 15 }, () => {
          const keyIdx = Math.floor(Math.random() * difficultKeys.length);
          return difficultKeys[keyIdx] + difficultKeys[keyIdx] + ' ';
        }).join('').trim();
      }
    } else if (reviewMode === 'studied') {
      const recentLesson = lessons[0];
      const keys = recentLesson.studiedKeys.filter(k => k !== ' ');
      baseText = Array.from({ length: 18 }, () => {
        const keyIdx = Math.floor(Math.random() * keys.length);
        return keys[keyIdx] + keys[keyIdx] + ' ';
      }).join('').trim();
    }

    const baseTextFinal = baseText;

    const customLesson: Lesson = {
      id: 'custom-review',
      title: `Revisión Personalizada: ${reviewMode.toUpperCase()}`,
      type: 'word',
      content: baseTextFinal,
      description: 'Práctica adaptativa generada automáticamente',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      category: 'word',
      targetWpm: 20,
      studiedKeys: [],
    };

    startLesson(customLesson);
  };

  const studentAttempts = attempts.filter(a => a.studentName === studentName);
  const studentMaxAccuracy = studentAttempts.length > 0
    ? Math.max(...studentAttempts.map(a => a.accuracy))
    : 0;
  const studentAvgAccuracy = studentAttempts.length > 0
    ? Math.round(studentAttempts.reduce((sum, a) => sum + a.accuracy, 0) / studentAttempts.length * 10) / 10
    : 0;
  const studentMaxWpm = studentAttempts.length > 0
    ? Math.max(...studentAttempts.map(a => a.netWpm))
    : 0;

  return (
    <div className={`space-y-6 ${highContrast ? 'text-white' : ''}`}>
      {/* Student Top Header / Profile Info */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="bg-indigo-600/90 text-white rounded-lg px-2.5 py-0.5 text-[10px] font-mono font-black tracking-widest uppercase shadow">ESTUDIANTE</span>
            <h2 className="text-xl font-bold tracking-tight text-white">{studentName}</h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">Entrenamiento de digitación táctil</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-850/50 border border-slate-750/60 rounded-xl p-2.5 px-4 text-center shadow-inner hover:bg-slate-800/80 transition-all min-w-[90px]">
            <span className="text-[10px] text-slate-500 block font-mono font-bold uppercase mb-0.5">Intentos</span>
            <span className="text-lg font-black text-indigo-400 font-mono">{studentAttempts.length}</span>
          </div>

          <div className="bg-slate-850/50 border border-slate-750/60 rounded-xl p-2.5 px-4 text-center shadow-inner hover:bg-slate-800/80 transition-all min-w-[120px]">
            <span className="text-[10px] text-slate-500 block font-mono font-bold uppercase mb-0.5">Rendimiento Promedio</span>
            <span className="text-lg font-black text-emerald-450 font-mono">
              {studentAttempts.length > 0
                ? Math.round(studentAttempts.reduce((acc, curr) => acc + curr.netWpm, 0) / studentAttempts.length)
                : 0
              } <sub className="text-xs font-normal">pal/min</sub>
            </span>
          </div>

          <div className="bg-slate-850/50 border border-slate-750/60 rounded-xl p-2.5 px-4 text-center shadow-inner hover:bg-slate-800/80 transition-all min-w-[110px]">
            <span className="text-[10px] text-slate-500 block font-mono font-bold uppercase mb-0.5">Máx Precisión</span>
            <span className="text-lg font-black text-amber-400 font-mono">{studentMaxAccuracy}%</span>
          </div>

          {/* === INTEGRATION: XP Badge === */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 px-3 text-center min-w-[90px]">
            <span className="text-[10px] text-amber-400 block font-mono font-bold uppercase mb-0.5">XP</span>
            <span className="text-lg font-black text-amber-300 font-mono">{xp}</span>
          </div>
        </div>
      </div>

      {/* === INTEGRATION: Streak & Level Bar === */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl px-5 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-400' : 'text-slate-600'}`} />
          <span className="text-xs font-mono text-slate-400">Racha: <b className={`${streak > 0 ? 'text-orange-400' : 'text-slate-500'}`}>{streak}</b></span>
          <span className="text-xs font-mono text-slate-500">Máx: <b className="text-slate-300">{maxStreak}</b></span>
        </div>
        <div className="flex items-center gap-3">
          <Award className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono text-slate-400">Nivel: <b className="text-indigo-400">{currentLevel}/9</b></span>
          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all" style={{ width: `${(xp % 100)}%` }} />
          </div>
          <span className="text-[10px] text-slate-500">{xp % 100}/100 XP</span>
        </div>
        <button
          onClick={() => { const next = !soundEnabled; setSoundEnabled(next); soundEngineRef.current.setMute(!next); }}
          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all ${soundEnabled ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
        >
          {soundEnabled ? '🔊 Sonido' : '🔇 Silencio'}
        </button>
      </div>

      {/* Break reminders block */}
      {showBreakReminder && (
        <div className="bg-indigo-950/40 border border-indigo-505/30 rounded-xl p-4 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">¡Pausa Ergonómica Recomendada!</p>
              <p className="text-xs text-slate-300 mt-1">Has estado digitando continuamente. Aparta la mirada de la pantalla, relaja tus dedos y gira tus muñecas por 20 segundos.</p>
            </div>
          </div>
          <button
            onClick={() => { setShowBreakReminder(false); setLastBreakTime(Date.now()); }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3.5 py-1.5 text-xs font-bold shrink-0 shadow shadow-indigo-600/30 transition-all"
          >
            Siguiente Drill
          </button>
        </div>
      )}

      {/* Module Navigation */}
      <div className="flex bg-slate-900/50 border border-slate-800/80 rounded-xl p-1 overflow-x-auto gap-1 shadow-inner backdrop-blur-md">
        <button
          onClick={() => { setActiveTab('lessons'); setActiveLesson(null); }}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap ${activeTab === 'lessons' ? 'bg-indigo-600 text-white shadow shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
        >
          <BookOpen className="w-3.5 h-3.5 inline mr-1.5" /> Ejercicios Curriculares
        </button>
        <button
          onClick={() => { setActiveTab('review'); setActiveLesson(null); }}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap ${activeTab === 'review' ? 'bg-indigo-600 text-white shadow shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
        >
          <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" /> Práctica Inteligente
        </button>
        <button
          onClick={() => { setActiveTab('dashboard'); setActiveLesson(null); }}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
        >
          <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> Progreso
        </button>
        <button
          onClick={() => { setActiveTab('race'); setActiveLesson(null); }}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap ${activeTab === 'race' ? 'bg-indigo-600 text-white shadow shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
        >
          <Flame className="w-3.5 h-3.5 inline mr-1.5" /> Nitro Race
        </button>
        <button
          onClick={() => { setActiveTab('cert'); setActiveLesson(null); }}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap ${activeTab === 'cert' ? 'bg-indigo-600 text-white shadow shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
        >
          <Award className="w-3.5 h-3.5 inline mr-1.5" /> Certificados
        </button>
      </div>

      {/* --- ACTIVE RUNNING LESSON OVERLAY --- */}
      {activeLesson && (
        <div className="flex flex-col gap-3 animate-fadeIn">

          {/* Controls bar — compact row */}
          <div className="flex flex-wrap items-center justify-between text-xs bg-slate-950/45 p-2.5 rounded-xl border border-slate-800 gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">⚡ Layout: <b className="text-indigo-400 font-black">{layout}</b></span>
              <button
                type="button"
                onClick={() => setShowHands(prev => !prev)}
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg border transition-all font-mono uppercase cursor-pointer ${showHands ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300 shadow shadow-indigo-600/10 hover:bg-indigo-600/55' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-805/50'}`}
              >
                {showHands ? '🖐️ Ocultar Manos' : '🖐️ Mostrar Manos'}
              </button>
              <span className="text-[10px] text-slate-500 font-mono">TIME:</span>
              <span className="text-lg font-mono font-bold text-indigo-400 bg-indigo-400/5 px-2.5 py-0.5 rounded border border-indigo-400/10">
                {Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <button
              onClick={() => setActiveLesson(null)}
              className="text-rose-400 hover:text-rose-350 hover:bg-rose-500/10 px-2.5 py-1 rounded-lg transition-colors text-xs font-mono font-bold"
            >
              [ GUARDAR / SALIR ]
            </button>
          </div>

          {/* Text Display — compact */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-5 relative overflow-hidden select-none min-h-[80px] flex items-center shadow-inner">
            <div className="text-lg md:text-xl leading-relaxed font-mono tracking-tight text-slate-550 break-words w-full">
              {activeLesson.content.split('').map((char, index) => {
                let charStyle = "text-slate-600";

                if (index < typedInput.length) {
                  const wasCorrect = typedInput[index] === char;
                  charStyle = wasCorrect
                    ? "text-white"
                    : "text-rose-450 bg-rose-400/10 underline decoration-rose-500 font-black";
                } else if (index === typedInput.length) {
                  charStyle = "text-white border-l-2 border-indigo-500 bg-indigo-500/20 px-0.5 animate-pulse font-bold";
                }

                return (
                  <span key={index} className={charStyle}>
                    {char}
                  </span>
                );
              })}
            </div>
            <div className="absolute bottom-2 right-3 text-[8px] text-slate-650 font-mono">
              TEXT SOURCE: CURRÍCULO_ESTRATÉGICO.DOCX
            </div>

            <textarea
              ref={typingAreaRef}
              className="absolute inset-0 opacity-0 cursor-default resize-none"
              value={typedInput}
              onChange={handleKeyboardStroke}
              autoFocus
              tabIndex={0}
              autoComplete="off"
            />
          </div>

          {/* Metrics row — compact */}
          <div className="grid grid-cols-5 gap-2">
            <div className="bg-slate-900/30 border border-slate-800 p-2 rounded-xl text-center">
              <span className="text-[9px] text-slate-500 font-mono block uppercase">Bruto</span>
              <span className="text-base font-bold text-slate-300 font-mono">{grossWpm}</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-800 p-2 rounded-xl text-center">
              <span className="text-[9px] text-slate-500 font-mono block uppercase">Neto</span>
              <span className="text-base font-bold text-indigo-400 font-mono">{netWpm}</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-800 p-2 rounded-xl text-center">
              <span className="text-[9px] text-slate-500 font-mono block uppercase">Precisión</span>
              <span className={`text-base font-bold font-mono ${accuracy >= 95 ? 'text-emerald-400' : accuracy >= 85 ? 'text-amber-400' : 'text-rose-450'}`}>{accuracy}%</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-800 p-2 rounded-xl text-center">
              <span className="text-[9px] text-slate-500 font-mono block uppercase">KPM</span>
              <span className="text-base font-bold text-amber-400 font-mono">{kpm}</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-800 p-2 rounded-xl text-center">
              <span className="text-[9px] text-slate-500 font-mono block uppercase">Meta</span>
              <span className="text-base font-bold text-slate-200 font-mono">{activeLesson.targetWpm}</span>
            </div>
          </div>

          {/* Keyboard + Hands side by side */}
          <div className="flex flex-col lg:flex-row gap-3 items-start">
            {/* Keyboard — takes remaining width */}
            <div className="flex-1 min-w-0 w-full lg:w-auto">
              <VirtualKeyboard
                nextKey={nextTargetChar}
                pressedKeys={pressedKeys}
                activeFingers={[currentTargetFinger]}
              />
            </div>

            {/* Hands + Info panel — fixed width on large screens */}
            <div className="w-full lg:w-[260px] shrink-0 space-y-3">
              {showHands && (
                <HandGuide activeFingers={[currentTargetFinger]} />
              )}

              {/* Compact info panel */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-3 space-y-2.5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Tecla</label>
                  {currentKeyAssignment ? (
                    <span className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-mono font-bold animate-pulse ${getTargetKeyStyle(currentTargetFinger)}`}>
                      {nextTargetChar.toUpperCase()}
                    </span>
                  ) : (
                    <span className="w-7 h-7 flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-400 rounded-md text-[10px] font-mono">—</span>
                  )}
                  {currentTargetFinger !== Finger.None && (
                    <span className="text-[9px] text-slate-400 font-mono ml-1">
                      {currentTargetFinger.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>Progreso</span>
                    <span>{netWpm}/{activeLesson.targetWpm}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(5, (netWpm / activeLesson.targetWpm) * 100))}%` }}
                    />
                  </div>
                </div>

                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                  <p className="text-[10px] font-semibold text-indigo-300">Optimized Duration: ON</p>
                  <p className="text-[8px] text-indigo-400/70 font-mono">Salta al alcanzar la meta.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Speed feedback */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-slate-800 gap-3">
            <div className="text-xs text-left text-slate-400 leading-relaxed">
              {forcesCompletion() && (
                <span className="text-rose-400 flex items-center gap-1.5 font-semibold font-mono">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  Memoria Rígida: Tu velocidad es &lt; 15 WPM. Completa todo el ejercicio para fijar memoria táctil.
                </span>
              )}
              {canSkipEarly() && (
                <span className="text-emerald-400 flex items-center gap-1.5 font-semibold font-mono">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Optimización de Duración: Has superado el benchmark. ¡Puedes completar la lección ahora!
                </span>
              )}
              {!canSkipEarly() && !forcesCompletion() && (
                <span className="font-mono">Tu objetivo es un mínimo de <b className="text-white font-bold">{activeLesson.targetWpm} pal/min</b>. Sigue manteniendo la constancia y el ritmo continuo.</span>
              )}
            </div>

            {canSkipEarly() && (
              <button
                onClick={handleEarlyExit}
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2 text-xs font-semibold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all w-full md:w-auto font-mono"
              >
                Saltar / Guardar Práctica
              </button>
            )}
          </div>

        </div>
      )}

      {/* --- TAB 1: CURRICULAR LESSONS --- */}
      {activeTab === 'lessons' && !activeLesson && (
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Estructura Curricular TICs</h3>
                <p className="text-xs text-slate-400">Selecciona un módulo de aprendizaje alineado para tu entrenamiento de velocidad.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowHands(prev => !prev)}
                  className={`text-xs font-bold py-1.5 px-4 rounded-xl border transition-all h-fit font-mono ${showHands ? 'bg-indigo-600/90 border-indigo-505 text-white shadow shadow-indigo-600/20' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
                >
                  {showHands ? 'Ocultar Manos' : 'Mostrar Manos'}
                </button>
                <button
                  onClick={() => setHighContrast(prev => !prev)}
                  className={`text-xs font-bold py-1.5 px-4 rounded-xl border transition-all h-fit font-mono ${highContrast ? 'bg-indigo-600/90 border-indigo-505 text-white shadow shadow-indigo-600/20' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
                >
                  {highContrast ? 'Modo Normal' : 'Modo Contraste'}
                </button>
              </div>
            </div>

            {/* Curriculum grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Category 1: Key Drills */}
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850/80 space-y-4 shadow-sm backdrop-blur-xs">
                <div className="flex items-center gap-2 border-b border-slate-850/65 pb-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse block" />
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">1. Key Drills (Teclas Básicas)</h4>
                </div>
                <div className="space-y-2">
                  {lessons.filter(l => l.category === 'key').map(l => (
                    <div key={l.id} className="bg-slate-900/60 hover:bg-slate-850 p-3.5 rounded-xl border border-slate-800/80 transition-all flex justify-between items-center group shadow-sm hover:border-indigo-500/20">
                      <div className="text-left">
                        <span className="text-xs font-bold text-white block truncate max-w-[130px]">{l.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Meta: {l.targetWpm} pal/min</span>
                      </div>
                      <button
                        onClick={() => startLesson(l)}
                        className="bg-slate-800 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg p-2 text-xs font-bold shadow-sm transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Word Drills */}
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850/80 space-y-4 shadow-sm backdrop-blur-xs">
                <div className="flex items-center gap-2 border-b border-slate-850/65 pb-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse block" />
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">2. Word Drills (Tránsito Fino)</h4>
                </div>
                <div className="space-y-2">
                  {lessons.filter(l => l.category === 'word').map(l => (
                    <div key={l.id} className="bg-slate-900/60 hover:bg-slate-850 p-3.5 rounded-xl border border-slate-800/80 transition-all flex justify-between items-center group shadow-sm hover:border-indigo-500/20">
                      <div className="text-left">
                        <span className="text-xs font-bold text-white block truncate max-w-[130px]">{l.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Meta: {l.targetWpm} pal/min</span>
                      </div>
                      <button
                        onClick={() => startLesson(l)}
                        className="bg-slate-800 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg p-2 text-xs font-bold shadow-sm transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3: Text Drills */}
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850/80 space-y-4 shadow-sm backdrop-blur-xs">
                <div className="flex items-center gap-2 border-b border-slate-850/65 pb-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 block animate-pulse" />
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">3. Text Drills (Simulación Real)</h4>
                </div>
                <div className="space-y-2">
                  {lessons.filter(l => l.category === 'text').map(l => (
                    <div key={l.id} className="bg-slate-900/60 hover:bg-slate-850 p-3.5 rounded-xl border border-slate-800/80 transition-all flex justify-between items-center group shadow-sm hover:border-indigo-500/20">
                      <div className="text-left">
                        <span className="text-xs font-bold text-white block truncate max-w-[130px]">{l.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Meta: {l.targetWpm} pal/min</span>
                      </div>
                      <button
                        onClick={() => startLesson(l)}
                        className="bg-slate-800 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg p-2 text-xs font-bold shadow-sm transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: CUSTOM REVIEW --- */}
      {activeTab === 'review' && !activeLesson && (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-left space-y-6 backdrop-blur-md shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-white">Entrenamiento Personalizado Inteligente</h3>
            <p className="text-xs text-slate-400">Configura un módulo de práctica enfocado adaptativo basado en tus estadísticas históricas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setReviewMode('difficult')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${reviewMode === 'difficult' ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg shadow-indigo-550/5' : 'bg-slate-950/40 border-slate-850 hover:border-slate-700/60'}`}
            >
              <span className="text-xs font-bold block mb-1">🔥 Difficult Keys (Estilo TypingMaster)</span>
              <p className="text-[11px] text-slate-400">Analiza tus pulsaciones y extrae automáticamente las teclas que más fallas.</p>
            </div>

            <div
              onClick={() => setReviewMode('studied')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${reviewMode === 'studied' ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg shadow-indigo-550/5' : 'bg-slate-950/40 border-slate-850 hover:border-slate-700/60'}`}
            >
              <span className="text-xs font-bold block mb-1">📘 Studied Keys (Lección Actual)</span>
              <p className="text-[11px] text-slate-400">Práctica exclusiva basada únicamente en las teclas de la lección seleccionada.</p>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={generateCustomReview}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-2 px-6 text-xs font-bold font-mono shadow shadow-indigo-600/20 transition-all hover:scale-102 active:scale-98"
            >
              Generar y Comenzar Ejercicio
            </button>
          </div>
        </div>
      )}

      {/* --- TAB 3: DASHBOARD --- */}
      {activeTab === 'dashboard' && (
        <ProgressDashboard
          attempts={attempts}
          studentName={studentName}
        />
      )}

      {/* --- TAB 4: RACE --- */}
      {activeTab === 'race' && (
        <TypingRace />
      )}

      {/* --- TAB 5: CERTIFICATES --- */}
      {activeTab === 'cert' && (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-left space-y-6 backdrop-blur-md shadow-xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">Certificados de Validación Dactilográfica</h3>
              <p className="text-xs text-slate-400">Verifica y descarga tus diplomas de maestría motriz alineados con los estándares TICs.</p>
            </div>

            <div className="bg-gradient-to-r from-amber-500/5 via-slate-950/90 to-indigo-500/5 p-10 rounded-2xl border-2 border-dashed border-indigo-500/45 text-center relative overflow-hidden ring-1 ring-indigo-500/10 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] opacity-[0.03] [background-size:12px_12px]" />

              <div className="space-y-4 relative z-10">
                <span className="text-[11px] text-amber-500 tracking-widest font-mono block font-black uppercase">DIPLOMA OFICIAL TICS</span>
                <h4 className="text-2xl font-serif text-slate-105 italic">Certificado de Excelencia de Escritura</h4>
                <p className="text-xs text-slate-500 font-mono">Otorgado con orgullo y mérito técnico a:</p>
                <p className="text-2xl font-black text-white tracking-wide font-sans">{studentName}</p>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Por demostrar habilidades ágiles excepcionales de digitación táctil autónoma, alcanzando una velocidad neta calificada de:
                </p>

                <div className="w-fit mx-auto bg-slate-900/80 border border-indigo-500/30 rounded-xl py-3 px-6 my-4 flex items-center gap-4 shadow-lg backdrop-blur-sm">
                  <span className="text-3xl font-black font-mono text-emerald-450">{studentMaxWpm || 24}</span>
                  <div className="text-left font-mono">
                    <span className="text-xs text-white block font-bold tracking-tight">pal/min</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Precisión promedio: {studentAvgAccuracy}%</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center text-[10px] text-slate-500 font-mono border-t border-slate-900 max-w-sm mx-auto">
                  <span>ID Registro: CCC-849-01</span>
                  <span>Firma: Comité Técnico TICs</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => alert('¡Certificado preparado para impresión! Guardado en la caché curricular.')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-2.5 px-6 text-xs font-bold font-mono shadow shadow-indigo-600/20 active:scale-95 transition-all"
              >
                Imprimir / Ver PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
