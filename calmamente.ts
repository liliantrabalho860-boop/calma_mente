export type MoodType = 'calmo' | 'ansioso' | 'muito-ansioso' | 'triste' | 'cansado';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  intensity: number;
  timestamp: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  mood?: MoodType;
  timestamp: string;
}

export const moodLabels: Record<MoodType, string> = {
  'calmo': 'Calmo',
  'ansioso': 'Ansioso',
  'muito-ansioso': 'Muito Ansioso',
  'triste': 'Triste',
  'cansado': 'Cansado',
};

export const moodEmojis: Record<MoodType, string> = {
  'calmo': '😌',
  'ansioso': '😰',
  'muito-ansioso': '😱',
  'triste': '😢',
  'cansado': '😴',
};

export const moodColors: Record<MoodType, string> = {
  'calmo': 'bg-calm-mint',
  'ansioso': 'bg-calm-peach',
  'muito-ansioso': 'bg-calm-rose',
  'triste': 'bg-calm-lavender',
  'cansado': 'bg-calm-blue',
};
