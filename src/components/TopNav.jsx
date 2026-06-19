import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User, LogOut } from 'lucide-react'
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
    <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-black] sticky top-0 z-40">
      {/* Logo */}
      <button onClick={() => navigate('/')} className="flex items-center gap-2 transition-transform hover:opacity-80">
        <span className="text-[--color-ks-kinpaku] font-display text-3xl font-light tracking-wide uppercase">SafeTask</span>
      </button>

      {/* Nav links */}
      <nav className="flex items-center gap-6">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                isActive
                  ? 'text-[--color-ks-kinpaku] font-medium'
                  : 'text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] font-normal'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              <span className="font-sans">{label}</span>
            </button>
          )
        })}
      </nav>

      {/* Right: avatar + logout */}
      <div className="flex items-center gap-5">
        <div className="text-right hidden lg:block">
          <p className="text-sm font-sans font-medium text-[--color-ks-champagne]">{profile?.full_name || 'Mon profil'}</p>
          <p className="text-xs font-mono tracking-widest uppercase text-[--color-ks-text-faint] mt-1">{profile?.is_tasker ? 'Client & Pro' : 'Client'}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[--color-ks-lacquer-deep] border border-[--color-ks-gold-hairline] flex items-center justify-center text-[--color-ks-kinpaku] font-sans font-medium">
          {profile?.full_name?.[0]?.toUpperCase() || '?'}
        </div>
        <button
          onClick={signOut}
          className="p-2 text-[--color-ks-text-muted] hover:text-[--color-ks-vermilion] transition-colors"
          title="Se déconnecter"
        >
          <LogOut size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  )
}
