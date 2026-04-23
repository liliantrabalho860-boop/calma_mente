import { MoodType, moodEmojis, moodLabels, moodColors } from '@/types/calmamente';

interface MoodSelectorProps {
  selected?: MoodType;
  onSelect: (mood: MoodType) => void;
}

const moods: MoodType[] = ['calmo', 'ansioso', 'muito-ansioso', 'triste', 'cansado'];

const MoodSelector = ({ selected, onSelect }: MoodSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onSelect(mood)}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-300 min-w-[72px] ${
            selected === mood
              ? `${moodColors[mood]} scale-110 shadow-soft ring-2 ring-primary/30`
              : 'bg-muted/50 hover:bg-muted hover:scale-105'
          }`}
        >
          <span className="text-2xl">{moodEmojis[mood]}</span>
          <span className="text-xs font-medium text-foreground">{moodLabels[mood]}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
