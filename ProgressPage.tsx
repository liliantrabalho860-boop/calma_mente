import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MoodEntry, moodLabels, moodEmojis } from '@/types/calmamente';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ProgressPage = () => {
  const navigate = useNavigate();
  const [moodEntries] = useLocalStorage<MoodEntry[]>('calmamente-moods', []);

  // Last 7 days mood data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayStart = startOfDay(date);
    const entry = moodEntries.find(
      (e) => startOfDay(new Date(e.timestamp)).getTime() === dayStart.getTime()
    );
    return {
      day: format(date, 'EEE', { locale: ptBR }),
      intensity: entry?.intensity ?? 0,
      mood: entry?.mood,
      registered: !!entry,
    };
  });

  // Mood frequency
  const moodFrequency = moodEntries.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const frequencyData = Object.entries(moodFrequency).map(([mood, count]) => ({
    name: moodLabels[mood as keyof typeof moodLabels],
    emoji: moodEmojis[mood as keyof typeof moodEmojis],
    count,
  }));

  const totalDays = new Set(
    moodEntries.map((e) => startOfDay(new Date(e.timestamp)).getTime())
  ).size;

  return (
    <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /><span className="text-sm">Voltar</span>
      </button>
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">Seu Progresso</h1>
      <p className="text-muted-foreground mb-8">Acompanhe sua evolução emocional</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="glass-card rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-primary">{totalDays}</p>
          <p className="text-xs text-muted-foreground mt-1">Dias registrados</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-primary">{moodEntries.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Total check-ins</p>
        </div>
      </div>

      {moodEntries.length === 0 ? (
        <div className="text-center mt-8 animate-fade-in-up">
          <div className="text-5xl mb-4">📊</div>
          <p className="text-foreground font-semibold">Sem dados ainda</p>
          <p className="text-sm text-muted-foreground mt-1">Faça check-ins para ver seu progresso</p>
        </div>
      ) : (
        <>
          {/* Intensity chart */}
          <div className="glass-card rounded-2xl p-4 mb-6">
            <h2 className="font-display font-semibold text-foreground mb-4">Intensidade (7 dias)</h2>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={last7Days}>
                <defs>
                  <linearGradient id="intensityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152, 35%, 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152, 35%, 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
                <Tooltip />
                <Area type="monotone" dataKey="intensity" stroke="hsl(152, 35%, 48%)" fill="url(#intensityGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Frequency chart */}
          {frequencyData.length > 0 && (
            <div className="glass-card rounded-2xl p-4">
              <h2 className="font-display font-semibold text-foreground mb-4">Frequência de Humor</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(220, 10%, 50%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(260, 35%, 85%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProgressPage;
