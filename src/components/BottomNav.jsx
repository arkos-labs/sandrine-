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
      <div className="bg-white border-t border-slate-200 px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(path)
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg"
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className={isActive ? 'text-indigo-600' : 'text-slate-400'}
                />
                <span className={`text-[10px] font-medium ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
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
