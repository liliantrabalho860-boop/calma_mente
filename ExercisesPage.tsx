import { useState } from 'react';
import { ArrowLeft, Wind, Eye, Brain, Play, Pause, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BreathingCircle from '@/components/BreathingCircle';

type ExerciseType = 'breathing' | 'grounding' | 'meditation' | null;

const groundingSteps = [
  { sense: '👁️ Visão', instruction: 'Identifique 5 coisas que você pode VER ao seu redor.' },
  { sense: '✋ Tato', instruction: 'Identifique 4 coisas que você pode TOCAR.' },
  { sense: '👂 Audição', instruction: 'Identifique 3 sons que você pode OUVIR.' },
  { sense: '👃 Olfato', instruction: 'Identifique 2 cheiros que você pode SENTIR.' },
  { sense: '👅 Paladar', instruction: 'Identifique 1 sabor que você pode PROVAR.' },
];

const ExercisesPage = () => {
  const navigate = useNavigate();
  const [activeExercise, setActiveExercise] = useState<ExerciseType>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [groundingStep, setGroundingStep] = useState(0);
  const [meditationTime, setMeditationTime] = useState(180);
  const [isMeditating, setIsMeditating] = useState(false);

  // Meditation timer
  useState(() => {
    if (!isMeditating || meditationTime <= 0) return;
    const interval = setInterval(() => {
      setMeditationTime((t) => {
        if (t <= 1) {
          setIsMeditating(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  const exercises = [
    { type: 'breathing' as const, icon: Wind, label: 'Respiração Guiada', description: 'Técnica 4-4-6 para acalmar', color: 'bg-calm-mint' },
    { type: 'grounding' as const, icon: Eye, label: 'Grounding 5-4-3-2-1', description: 'Aterramento sensorial', color: 'bg-calm-lavender' },
    { type: 'meditation' as const, icon: Brain, label: 'Meditação Curta', description: '3 minutos de presença', color: 'bg-calm-blue' },
  ];

  if (activeExercise === 'breathing') {
    return (
      <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto flex flex-col">
        <button onClick={() => { setActiveExercise(null); setIsBreathing(false); }} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Voltar</span>
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">Respiração Guiada</h1>
        <p className="text-muted-foreground mb-8">Inspire por 4s, segure por 4s, expire por 6s</p>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <BreathingCircle isActive={isBreathing} />
          <button
            onClick={() => setIsBreathing(!isBreathing)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all hover:shadow-glow"
          >
            {isBreathing ? <><Pause className="w-5 h-5" /> Pausar</> : <><Play className="w-5 h-5" /> Iniciar</>}
          </button>
        </div>
      </div>
    );
  }

  if (activeExercise === 'grounding') {
    return (
      <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto">
        <button onClick={() => { setActiveExercise(null); setGroundingStep(0); }} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Voltar</span>
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">Grounding 5-4-3-2-1</h1>
        <p className="text-muted-foreground mb-8">Use seus sentidos para se ancorar no presente</p>
        
        <div className="space-y-4">
          {groundingSteps.map((step, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-4 transition-all duration-500 ${
                i === groundingStep ? 'ring-2 ring-primary/40 scale-[1.02] shadow-glow' : i < groundingStep ? 'opacity-50' : 'opacity-30'
              }`}
            >
              <p className="text-lg mb-1">{step.sense}</p>
              <p className="text-sm text-muted-foreground">{step.instruction}</p>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3 mt-6">
          {groundingStep > 0 && (
            <button onClick={() => setGroundingStep(groundingStep - 1)} className="flex-1 py-3 bg-muted text-foreground rounded-2xl font-semibold">
              Anterior
            </button>
          )}
          <button
            onClick={() => groundingStep < 4 ? setGroundingStep(groundingStep + 1) : setActiveExercise(null)}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all hover:shadow-glow"
          >
            {groundingStep < 4 ? 'Próximo' : 'Concluir'}
          </button>
        </div>
      </div>
    );
  }

  if (activeExercise === 'meditation') {
    const mins = Math.floor(meditationTime / 60);
    const secs = meditationTime % 60;
    
    return (
      <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto flex flex-col">
        <button onClick={() => { setActiveExercise(null); setIsMeditating(false); setMeditationTime(180); }} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Voltar</span>
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">Meditação Curta</h1>
        <p className="text-muted-foreground mb-8">Feche os olhos e foque na sua respiração</p>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div className="w-40 h-40 rounded-full bg-calm-blue flex items-center justify-center animate-float">
            <span className="text-3xl font-display font-bold text-foreground">
              {mins}:{secs.toString().padStart(2, '0')}
            </span>
          </div>
          <p className="text-center text-muted-foreground max-w-xs">
            Respire naturalmente. Observe seus pensamentos sem julgamento.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsMeditating(!isMeditating)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all hover:shadow-glow"
            >
              {isMeditating ? <><Pause className="w-5 h-5" /> Pausar</> : <><Play className="w-5 h-5" /> Iniciar</>}
            </button>
            <button
              onClick={() => { setIsMeditating(false); setMeditationTime(180); }}
              className="p-3 bg-muted rounded-2xl text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /><span className="text-sm">Voltar</span>
      </button>
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">Exercícios</h1>
      <p className="text-muted-foreground mb-8">Escolha um exercício para acalmar sua mente</p>

      <div className="space-y-3">
        {exercises.map((ex) => (
          <button
            key={ex.type}
            onClick={() => setActiveExercise(ex.type)}
            className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 text-left transition-all hover:shadow-glow hover:scale-[1.01]"
          >
            <div className={`w-12 h-12 ${ex.color} rounded-xl flex items-center justify-center`}>
              <ex.icon className="w-6 h-6 text-foreground/70" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{ex.label}</p>
              <p className="text-sm text-muted-foreground">{ex.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExercisesPage;
