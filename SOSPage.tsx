import { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BreathingCircle from '@/components/BreathingCircle';

const calmingPhrases = [
  "Isso vai passar. Você já superou momentos difíceis antes.",
  "Você está seguro(a). Sua ansiedade não pode te machucar.",
  "Respire. Cada respiração te traz de volta ao presente.",
  "Você não está sozinho(a). Muitas pessoas entendem o que sente.",
  "Seu corpo está reagindo, mas você está no controle.",
  "Este momento é temporário. Você é permanente.",
  "Foque no agora. Só este instante importa.",
  "Você é mais forte do que a sua ansiedade.",
];

const SOSPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'start' | 'breathing' | 'phrases'>('start');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);

  const nextPhrase = () => {
    setPhraseIndex((i) => (i + 1) % calmingPhrases.length);
  };

  return (
    <div className="min-h-screen px-5 pt-8 max-w-lg mx-auto flex flex-col bg-background">
      <button onClick={() => navigate('/')} className="self-end p-2 text-muted-foreground hover:text-foreground">
        <X className="w-6 h-6" />
      </button>

      {step === 'start' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
          <div className="w-24 h-24 bg-calm-rose rounded-full flex items-center justify-center animate-pulse-soft">
            <Heart className="w-12 h-12 text-foreground/60" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Estou aqui com você
            </h1>
            <p className="text-muted-foreground max-w-xs">
              Vamos fazer isso juntos. Escolha o que pode te ajudar agora.
            </p>
          </div>
          <div className="w-full space-y-3">
            <button
              onClick={() => { setStep('breathing'); setIsBreathing(true); }}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all hover:shadow-glow text-lg"
            >
              🫁 Respiração Guiada
            </button>
            <button
              onClick={() => setStep('phrases')}
              className="w-full py-4 bg-calm-lavender text-foreground rounded-2xl font-semibold transition-all hover:shadow-soft text-lg"
            >
              💬 Frases Calmantes
            </button>
          </div>
        </div>
      )}

      {step === 'breathing' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-fade-in-up">
          <BreathingCircle isActive={isBreathing} inhaleTime={4} holdTime={4} exhaleTime={6} />
          <div className="flex gap-3">
            <button
              onClick={() => setIsBreathing(!isBreathing)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold"
            >
              {isBreathing ? 'Pausar' : 'Continuar'}
            </button>
            <button
              onClick={() => setStep('start')}
              className="px-6 py-3 bg-muted text-foreground rounded-2xl font-semibold"
            >
              Voltar
            </button>
          </div>
        </div>
      )}

      {step === 'phrases' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
          <div className="glass-card rounded-3xl p-8 text-center max-w-sm">
            <p className="text-lg font-display font-semibold text-foreground leading-relaxed">
              "{calmingPhrases[phraseIndex]}"
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={nextPhrase}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all hover:shadow-glow"
            >
              Próxima frase
            </button>
            <button
              onClick={() => setStep('start')}
              className="px-6 py-3 bg-muted text-foreground rounded-2xl font-semibold"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSPage;
