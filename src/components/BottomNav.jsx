import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react'

const navItems = [
  { path: '/marketplace', icon: Search, label: 'Explorer' },
  { path: '/post-task', icon: PlusCircle, label: 'Publier' },
  { path: '/', icon: Home, label: 'Accueil' },
  { path: '/chat', icon: MessageCircle, label: 'Messages' },
  { path: '/profile', icon: User, label: 'Profil' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="bottom-nav md:hidden">
      <div className="bg-[--color-ks-lacquer-black] px-2 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] border-t border-[--color-ks-gold-hairline]">
        <div className="flex items-center justify-around">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(path)
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-all duration-300 ${
                  isActive
                    ? 'text-[--color-ks-kinpaku]'
                    : 'text-[--color-ks-text-faint] hover:text-[--color-ks-champagne]'
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span className={`text-[10px] font-sans font-medium tracking-wide ${isActive ? 'text-[--color-ks-kinpaku]' : 'text-[--color-ks-text-faint]'}`}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
