import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Home, Search, PlusCircle, MessageCircle, User, LogOut, Bell, Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'

export function TopNav() {
  const { currentRole } = useApp()
  const { user } = useAuth()
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[--color-tx-border]">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[--color-tx-navy] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-display font-semibold text-[1.05rem] text-[--color-tx-navy] tracking-tight">Queer Service</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 items-center gap-2.5 px-3.5 py-2 bg-[--color-tx-bg-alt] border border-[--color-tx-border] rounded-lg">
          <Search className="text-[--color-tx-text-muted] flex-shrink-0" size={16} />
          <input
            type="text"
            placeholder="Quel service recherchez-vous ?"
            className="w-full bg-transparent border-none py-0.5 text-sm text-[--color-tx-text] placeholder:text-[--color-tx-text-muted] outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="md:hidden w-10 h-10 flex items-center justify-center text-[--color-tx-text-secondary] hover:text-[--color-tx-text] transition-colors">
            <Search size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-[--color-tx-text-secondary] hover:text-[--color-tx-text] transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[--color-tx-danger] rounded-full"></span>
          </button>

          <button className="md:hidden w-10 h-10 flex items-center justify-center text-[--color-tx-text-secondary] hover:text-[--color-tx-text] transition-colors">
            <Menu size={22} />
          </button>

          <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-[--color-tx-border] h-8">
            <Link to="/post-task" className="bg-[--color-tx-navy] text-white font-medium px-4 py-2 rounded-md text-sm hover:bg-[--color-tx-navy-light] transition-colors">
              Publier une annonce
            </Link>
            <div className="w-8 h-8 rounded-full border border-[--color-tx-border] text-[--color-tx-navy] flex items-center justify-center font-semibold text-sm bg-[--color-tx-bg-alt]">
              {user?.id !== 'guest' ? 'U' : 'G'}
            </div>
          </div>
        </div>
        
      </div>
    </header>
  )
}
