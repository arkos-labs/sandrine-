import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User, Shield, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/', icon: Home, label: 'Accueil' },
  { path: '/marketplace', icon: Search, label: 'Explorer' },
  { path: '/post-task', icon: PlusCircle, label: 'Publier' },
  { path: '/chat', icon: MessageCircle, label: 'Messages' },
  { path: '/profile', icon: User, label: 'Profil' },
]

export function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut, profile } = useAuth()

  return (
    <header className="hidden md:flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40">
      {/* Logo */}
      <button onClick={() => navigate('/')} className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Shield size={16} className="text-white" />
        </div>
        <span className="text-slate-900 font-bold text-lg">SafeTask</span>
      </button>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon size={16} strokeWidth={isActive ? 2.25 : 1.75} />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Right: avatar + logout */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900 leading-tight">{profile?.full_name || 'Mon profil'}</p>
          <p className="text-xs text-slate-500 leading-tight">{profile?.is_tasker ? 'Client & Tasker' : 'Client'}</p>
        </div>
        <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
          {profile?.full_name?.[0]?.toUpperCase() || '?'}
        </div>
        <button
          onClick={signOut}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          title="Se déconnecter"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}
