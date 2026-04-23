import { ArrowLeft, Bell, Moon, Sun, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useLocalStorage('calmamente-notifications', true);
  const [darkMode, setDarkMode] = useLocalStorage('calmamente-dark-mode', false);
  const [userName, setUserName] = useLocalStorage('calmamente-user-name', '');

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <div className="min-h-screen pb-24 px-5 pt-8 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /><span className="text-sm">Voltar</span>
      </button>
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">Configurações</h1>
      <p className="text-muted-foreground mb-8">Personalize sua experiência</p>

      <div className="space-y-4">
        {/* Profile */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Seu nome</span>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value.slice(0, 50))}
            placeholder="Como quer ser chamado(a)?"
            className="w-full p-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            maxLength={50}
          />
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <span className="font-semibold text-foreground">Notificações</span>
                <p className="text-xs text-muted-foreground">Lembrete diário de check-in</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                notifications ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-card rounded-full shadow transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dark mode */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
              <div>
                <span className="font-semibold text-foreground">Tema escuro</span>
                <p className="text-xs text-muted-foreground">Menos brilho à noite</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                darkMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-card rounded-full shadow transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-12">
        CalmaMente v1.0 · Feito com 💚
      </p>
    </div>
  );
};

export default SettingsPage;
