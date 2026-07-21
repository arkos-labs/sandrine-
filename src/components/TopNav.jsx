import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Heart, Search, Bell, Menu, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { ServiceCategoryModal } from './ServiceCategoryModal'

export function TopNav() {
  const { currentRole } = useApp()
  const { user, profile } = useAuth()
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  
  return (
    <>


      <header className="sticky top-0 z-50 bg-black border-b border-white/10 shadow-md">
        <div className="w-full mx-auto px-6 md:px-8 h-[130px] md:h-[150px] flex items-center justify-between relative">

          {/* Left Spacer */}
          <div className="flex-1"></div>

          {/* Center Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center justify-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src="/logo.png" alt="Queer Service" className="h-[96px] md:h-[116px] w-auto object-contain" />
          </Link>

          {/* Right Actions */}
          <div className="flex-1 flex items-center justify-end">
            {profile?.full_name ? (
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-[14px] font-bold tracking-widest uppercase text-white hover:text-white/80 transition-all border border-white/30 px-5 py-2.5 rounded-full hover:border-white/80 hover:bg-white/10"
              >
                <User size={18} />
                <span className="hidden sm:inline">Mon Profil</span>
              </Link>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center gap-2 text-[14px] font-bold tracking-widest uppercase text-white hover:text-white/80 transition-all border border-white/30 px-5 py-2.5 rounded-full hover:border-white/80 hover:bg-white/10"
              >
                <User size={18} />
                <span>S'identifier</span>
              </Link>
            )}
          </div>
          
        </div>
      </header>
      <ServiceCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
      />
    </>
  )
}
