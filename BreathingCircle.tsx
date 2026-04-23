import { useState, useEffect, useCallback } from 'react';

interface BreathingCircleProps {
  isActive: boolean;
  inhaleTime?: number;
  holdTime?: number;
  exhaleTime?: number;
}

type Phase = 'inspire' | 'segure' | 'expire' | 'pausa';

const phaseLabels: Record<Phase, string> = {
  inspire: 'Inspire...',
  segure: 'Segure...',
  expire: 'Expire...',
  pausa: 'Pausa...',
};

const BreathingCircle = ({ isActive, inhaleTime = 4, holdTime = 4, exhaleTime = 6 }: BreathingCircleProps) => {
  const [phase, setPhase] = useState<Phase>('inspire');
  const [counter, setCounter] = useState(inhaleTime);
  const [scale, setScale] = useState(1);

  const getPhaseTime = useCallback((p: Phase) => {
    switch (p) {
      case 'inspire': return inhaleTime;
      case 'segure': return holdTime;
      case 'expire': return exhaleTime;
      case 'pausa': return 2;
    }
  }, [inhaleTime, holdTime, exhaleTime]);

  const getNextPhase = (p: Phase): Phase => {
    switch (p) {
      case 'inspire': return 'segure';
      case 'segure': return 'expire';
      case 'expire': return 'pausa';
      case 'pausa': return 'inspire';
    }
  };

  useEffect(() => {
    if (!isActive) {
      setPhase('inspire');
      setCounter(inhaleTime);
      setScale(1);
      return;
    }

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          setPhase((currentPhase) => {
            const next = getNextPhase(currentPhase);
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, inhaleTime]);

  useEffect(() => {
    if (!isActive) return;
    const time = getPhaseTime(phase);
    setCounter(time);
    
    switch (phase) {
      case 'inspire':
        setScale(1.5);
        break;
      case 'segure':
        setScale(1.5);
        break;
      case 'expire':
        setScale(1);
        break;
      case 'pausa':
        setScale(1);
        break;
    }
  }, [phase, isActive, getPhaseTime]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center w-56 h-56">
        {/* Outer rings */}
        <div
          className="absolute w-full h-full rounded-full bg-primary/5 transition-transform duration-1000"
          style={{ transform: `scale(${scale * 1.1})` }}
        />
        <div
          className="absolute w-48 h-48 rounded-full bg-primary/10 transition-transform duration-1000"
          style={{ transform: `scale(${scale})` }}
        />
        {/* Main circle */}
        <div
          className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-primary/30 transition-transform ease-in-out shadow-glow flex items-center justify-center"
          style={{
            transform: `scale(${scale})`,
            transitionDuration: phase === 'inspire' ? `${inhaleTime}s` : phase === 'expire' ? `${exhaleTime}s` : '0.3s',
          }}
        >
          <span className="text-3xl font-bold text-primary">{counter}</span>
        </div>
      </div>
      <p className="text-lg font-display font-semibold text-foreground animate-pulse-soft">
        {phaseLabels[phase]}
      </p>
    </div>
  );
};

export default BreathingCircle;
