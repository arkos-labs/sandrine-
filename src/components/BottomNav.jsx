import { Link, useLocation } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function BottomNav() {
  const location = useLocation()
  const { currentRole } = useApp()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/marketplace', icon: Search, label: 'Recherche' },
    { path: '/post-task', icon: PlusCircle, label: 'Publier', primary: true },
    { path: '/messages', icon: MessageCircle, label: 'Messages', badge: 2 },
    { path: '/profile', icon: User, label: 'Profil' },
  ]

  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          if (item.primary) {
            return (
              <Link key={item.path} to={item.path} className="flex flex-col items-center justify-center w-14 group -mt-4">
                <div className="w-11 h-11 bg-[--color-tx-navy] text-white rounded-full flex items-center justify-center shadow-md group-hover:bg-[--color-tx-navy-light] transition-colors">
                  <Icon size={22} />
                </div>
              </Link>
            )
          }

          return (
            <Link key={item.path} to={item.path} className="flex flex-col items-center justify-center w-14 h-full relative group">
              <Icon size={22} className={`mb-1 transition-colors ${isActive ? 'text-[--color-tx-navy]' : 'text-[--color-tx-text-secondary] group-hover:text-[--color-tx-text]'}`} />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-[--color-tx-navy]' : 'text-[--color-tx-text-secondary] group-hover:text-[--color-tx-text]'}`}>{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-[--color-tx-danger] rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
