import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid, Search, MessageSquare, User } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'services', label: 'Services', icon: Grid, path: '/marketplace' },
    { id: 'search', label: 'Search', icon: Search, path: '/search' },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare, path: '/chat' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 pb-safe z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl px-2">
      <div className="flex justify-between items-center h-[72px] max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center w-full h-full gap-1"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isActive ? 'bg-[#5B21B6] text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-[#5B21B6]' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
