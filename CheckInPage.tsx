import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import MoodSelector from '@/components/MoodSelector';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MoodEntry, MoodType } from '@/types/calmamente';
import { toast } from 'sonner';

const CheckInPage = () => {
  const navigate = useNavigate();
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('calmamente-moods', []);
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>();
  const [intensity, setIntensity] = useState(5);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!selectedMood) {
      toast.error('Selecione como você está se sentindo');
      return;
    }

    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      mood: selectedMood,
      intensity,
      timestamp: new Date().toISOString(),
    };

    setMoodEntries([entry, ...moodEntries]);
    setSaved(true);
    toast.success('Check-in salvo! 💚');
    
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Voltar</span>
      </button>

      <h1 className="text-2xl font-display font-bold text-foreground mb-2">
        Check-in Emocional
      </h1>
      <p className="text-muted-foreground mb-8">
        Como você está se sentindo agora?
      </p>

      {saved ? (
        <div className="flex flex-col items-center gap-4 mt-12 animate-fade-in-up">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <p className="text-lg font-display font-semibold">Registrado!</p>
          <p className="text-muted-foreground text-center">
            Parabéns por cuidar da sua saúde emocional
          </p>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in-up">
          <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Intensidade: <span className="text-primary font-bold">{intensity}</span>/10
            </label>
            <input
              type="range"
              min={0}
              max={10}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Leve</span>
              <span>Intenso</span>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all hover:shadow-glow hover:scale-[1.02] active:scale-95"
          >
            Salvar Check-in
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckInPage;
