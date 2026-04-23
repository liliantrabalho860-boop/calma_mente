import { NavLink, useLocation } from 'react-router-dom';
import { Home, Heart, BookOpen, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Início' },
  { to: '/checkin', icon: Heart, label: 'Check-in' },
  { to: '/journal', icon: BookOpen, label: 'Diário' },
  { to: '/progress', icon: BarChart3, label: 'Progresso' },
  { to: '/settings', icon: Settings, label: 'Config' },
];

const BottomNav = () => {
  const location = useLocation();
  
  // Hide nav on SOS page
  if (location.pathname === '/sos') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-primary scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
