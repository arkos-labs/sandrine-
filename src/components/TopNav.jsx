import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Heart, Search, Bell, Menu, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'

export function TopNav() {
  const { currentRole } = useApp()
  const { user, profile } = useAuth()
  
  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#9D5239] text-white text-xs font-bold py-2.5 px-4 text-center tracking-widest uppercase shadow-sm relative z-[60]">
        Découvrez notre charte de confiance · Communauté solidaire et sécurisée
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-[--color-tx-border] shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-[88px] flex items-center justify-between">

          {/* Left Links (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-start gap-8">
            <Link to="/" className="text-[13px] font-bold tracking-widest uppercase text-[--color-tx-navy] hover:text-[--color-tx-primary] transition-colors">Accueil</Link>
            <Link to="/marketplace" className="text-[13px] font-bold tracking-widest uppercase text-[--color-tx-text-secondary] hover:text-[--color-tx-primary] transition-colors">Trouver un service</Link>
          </div>

          {/* Center Logo */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2">
              <Heart className="text-[--color-tx-primary] fill-[--color-tx-primary]" size={20} />
              <span className="font-display font-semibold text-[1.6rem] text-[--color-tx-navy] tracking-tight leading-none uppercase">Queer Service</span>
            </div>
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[--color-tx-text-secondary]">Solidaire & Inclusif</span>
          </Link>

          {/* Right Links & Actions */}
          <div className="flex-1 flex items-center justify-end gap-5">
            <div className="hidden md:flex items-center gap-8 mr-4">
              <Link to="/comment-ca-marche" className="text-[13px] font-bold tracking-widest uppercase text-[--color-tx-text-secondary] hover:text-[--color-tx-primary] transition-colors">Comment ça marche</Link>
            </div>

            {/* Mobile icons */}
            <button className="md:hidden w-10 h-10 flex items-center justify-center text-[--color-tx-text-secondary] hover:text-[--color-tx-text] transition-colors relative">
              <Bell size={20} />
            </button>
            <button className="md:hidden w-10 h-10 flex items-center justify-center text-[--color-tx-text-secondary] hover:text-[--color-tx-text] transition-colors">
              <Menu size={22} />
            </button>

            {/* Desktop Icons/Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center text-[--color-tx-navy] hover:bg-[--color-tx-border]/30 rounded-full transition-colors relative">
                <Search size={18} />
              </button>
              
              {profile?.full_name ? (
                <div className="flex items-center gap-4 ml-2">
                  <Link to="/requests" className="text-[13px] font-bold tracking-widest uppercase text-[--color-tx-navy] hover:text-[--color-tx-primary] transition-colors">
                    Mes demandes
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 pl-3 border-l border-slate-200 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-9 h-9 bg-blue-100 text-[#0078FA] font-bold rounded-full flex items-center justify-center text-sm border-2 border-white shadow-sm uppercase">
                      {profile.full_name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Bonjour {profile.full_name.split(' ')[0]}
                    </span>
                  </Link>
                </div>
              ) : (
                <Link to="/auth" className="w-10 h-10 flex items-center justify-center text-[--color-tx-navy] hover:bg-[--color-tx-border]/30 rounded-full transition-colors">
                  <User size={18} />
                </Link>
              )}
            </div>
          </div>
          
        </div>
      </header>
    </>
  )
}
