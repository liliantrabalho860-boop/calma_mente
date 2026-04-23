import { useNavigate } from 'react-router-dom';
import { Wind, BookOpen, BarChart3, AlertTriangle, Leaf } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MoodEntry, moodEmojis } from '@/types/calmamente';

const greetings = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

const HomePage = () => {
  const navigate = useNavigate();
  const [moodEntries] = useLocalStorage<MoodEntry[]>('calmamente-moods', []);
  
  const todayEntry = moodEntries.find(
    (e) => new Date(e.timestamp).toDateString() === new Date().toDateString()
  );

  const features = [
    { icon: Wind, label: 'Exercícios', description: 'Respiração e meditação', path: '/exercises', color: 'bg-calm-mint' },
    { icon: BookOpen, label: 'Diário', description: 'Escreva seus sentimentos', path: '/journal', color: 'bg-calm-lavender' },
    { icon: BarChart3, label: 'Progresso', description: 'Acompanhe sua evolução', path: '/progress', color: 'bg-calm-blue' },
    { icon: AlertTriangle, label: 'SOS Ansiedade', description: 'Ajuda imediata', path: '/sos', color: 'bg-calm-rose' },
  ];

  return (
    <div className="min-h-screen pb-24 px-5 pt-12 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-1">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">CalmaMente</span>
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          {greetings()} ✨
        </h1>
        <p className="text-muted-foreground mt-1">
          Como você está se sentindo hoje?
        </p>
      </div>

      {/* Today's mood */}
      <button
        onClick={() => navigate('/checkin')}
        className="w-full glass-card rounded-2xl p-5 mb-6 text-left transition-all hover:shadow-glow hover:scale-[1.02] animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
      >
        {todayEntry ? (
          <div className="flex items-center gap-4">
            <span className="text-4xl">{moodEmojis[todayEntry.mood]}</span>
            <div>
              <p className="font-semibold text-foreground">Check-in de hoje</p>
              <p className="text-sm text-muted-foreground">
                Intensidade: {todayEntry.intensity}/10
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">🤔</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Fazer check-in emocional</p>
              <p className="text-sm text-muted-foreground">
                Toque para registrar como está
              </p>
            </div>
          </div>
        )}
      </button>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <button
            key={feature.path}
            onClick={() => navigate(feature.path)}
            className="glass-card rounded-2xl p-4 text-left transition-all hover:shadow-glow hover:scale-[1.02] animate-fade-in-up"
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <div className={`w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center mb-3`}>
              <feature.icon className="w-5 h-5 text-foreground/70" />
            </div>
            <p className="font-semibold text-sm text-foreground">{feature.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
          </button>
        ))}
      </div>

      {/* Motivational quote */}
      <div
        className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10 animate-fade-in-up"
        style={{ animationDelay: '0.6s' }}
      >
        <p className="text-sm text-center text-foreground/80 italic font-light">
          "A ansiedade não define quem você é. Você é mais forte do que pensa."
        </p>
      </div>
    </div>
  );
};

export default HomePage;
