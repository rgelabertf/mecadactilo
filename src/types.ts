export enum Finger {
  LeftPinky = "LeftPinky",
  LeftRing = "LeftRing",
  LeftMiddle = "LeftMiddle",
  LeftIndex = "LeftIndex",
  LeftThumb = "LeftThumb",
  RightThumb = "RightThumb",
  RightIndex = "RightIndex",
  RightMiddle = "RightMiddle",
  RightRing = "RightRing",
  RightPinky = "RightPinky",
  None = "None"
}

export interface KeyFingerAssignment {
  key: string;
  finger: Finger;
  colorClass: string;
  activeColorClass: string;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  keys: string[];
  exercises: string[];
  minWpm: number;
  minAccuracy: number;
}

export interface UserStats {
  currentLevel: number;
  xp: number;
  streak: number;
  maxStreak: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  wpm: number;
  accuracy: number;
  level: number;
  unlockedLevels: number[];
}

export interface HTMLAnimationConfig {
  type: string;
  duration: number;
  id: string;
  title: string;
  htmlCode: string;
  isActive: boolean;
}

export type KeyDifficulty = 'home' | 'top' | 'bottom' | 'upper' | 'ok' | 'difficult' | 'problematic';

export interface KeyStat {
  correct: number;
  incorrect: number;
  total: number;
  key: string;
  errors: number;
  delays: number[];
  status: KeyDifficulty;
}

export type KeyboardLayout = 'QWERTY' | 'AZERTY' | 'Dvorak' | 'DvorakLeft' | 'DvorakRight';

export type ActivityCategory = 'key' | 'word' | 'text' | 'lesson' | 'race' | 'custom';

export interface Lesson {
  id: string;
  title: string;
  type: 'key' | 'word' | 'text';
  content: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  category: ActivityCategory;
  targetWpm: number;
  minDuration?: number;
  studiedKeys: string[];
}

export interface KeystrokeEvent {
  key: string;
  correct: boolean;
  timestamp: number;
  finger?: string;
  char: string;
  isCorrect: boolean;
  expected: string;
}

export interface Attempt {
  id: string;
  lessonId: string;
  userId: string;
  wpm: number;
  kpm: number;
  accuracy: number;
  duration: number;
  timestamp: number;
  keysStats: Record<string, KeyStat>;
  keystrokeEvents: KeystrokeEvent[];
  xpEarned?: number;
  streakAtTime?: number;
  levelAtTime?: number;
  studentName: string;
  studentGrade?: number;
  lessonTitle: string;
  grossWpm: number;
  netWpm: number;
  timeSpent: number;
  date: string;
  keystrokeReplay: KeystrokeEvent[];
  suspicious: boolean;
}

export function fingerToString(finger: Finger): string {
  switch (finger) {
    case Finger.LeftPinky: return 'L1';
    case Finger.LeftRing: return 'L2';
    case Finger.LeftMiddle: return 'L3';
    case Finger.LeftIndex: return 'L4';
    case Finger.LeftThumb: return 'L5';
    case Finger.RightThumb: return 'R5';
    case Finger.RightIndex: return 'R4';
    case Finger.RightMiddle: return 'R3';
    case Finger.RightRing: return 'R2';
    case Finger.RightPinky: return 'R1';
    default: return 'N0';
  }
}

export function stringToFinger(s: string): Finger {
  const map: Record<string, Finger> = {
    'L1': Finger.LeftPinky, 'L2': Finger.LeftRing, 'L3': Finger.LeftMiddle,
    'L4': Finger.LeftIndex, 'L5': Finger.LeftThumb, 'R5': Finger.RightThumb,
    'R4': Finger.RightIndex, 'R3': Finger.RightMiddle, 'R2': Finger.RightRing,
    'R1': Finger.RightPinky,
  };
  return map[s] ?? Finger.None;
}
