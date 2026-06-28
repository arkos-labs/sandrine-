import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Home, 
  Bookmark, 
  MessageSquare, 
  User, 
  UserPlus, 
  LifeBuoy, 
  HelpCircle,
  Bell,
  ChevronDown,
  Plus,
  Wrench,
  Leaf,
  Truck,
  SprayCan,
  Baby,
  PawPrint,
  Laptop,
  Home as HomeIcon,
  BookOpen,
  Sparkles,
  ChevronRight
} from 'lucide-react'

const MENU_ITEMS = [
  { id: 'accueil', label: 'Accueil', icon: Home, active: true },
  { id: 'demandes', label: 'Mes demandes', icon: Bookmark, badge: '1 en cours', link: '/requests' },
  { id: 'messagerie', label: 'Messagerie', icon: MessageSquare },
  { id: 'compte', label: 'Compte', icon: User },
]

const BOTTOM_MENU_ITEMS = [
  { id: 'inviter', label: 'Inviter des amis', icon: UserPlus, sub: 'Gagnez 5% du montant dépensé par vos amis, à vie.' },
  { id: 'assistance', label: "Demandes d'assistances", icon: LifeBuoy },
  { id: 'aide', label: 'Centre d\'aide', icon: HelpCircle },
]

const CATEGORIES = [
  { id: 'pour_vous', label: 'Pour vous', icon: Sparkles, active: true },
  { id: 'bricolage', label: 'Bricolage', icon: Wrench },
  { id: 'jardinage', label: 'Jardinage', icon: Leaf },
  { id: 'demenagement', label: 'Déménagement', icon: Truck },
  { id: 'menage', label: 'Ménage', icon: SprayCan },
  { id: 'enfants', label: 'Enfants', icon: Baby },
  { id: 'animaux', label: 'Animaux', icon: PawPrint },
  { id: 'informatique', label: 'Informatique', icon: Laptop },
  { id: 'aide', label: 'Aide à domicile', icon: HomeIcon },
  { id: 'cours', label: 'Cours particuliers', icon: BookOpen },
]

export default function ProfilePage() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  
  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Nico'
  const initial = firstName.charAt(0).toUpperCase()

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-[260px] border-r border-slate-200 flex flex-col flex-shrink-0 bg-white">
        <div className="h-20 flex items-center px-6">
          <Link to="/" className="text-[28px] font-bold text-[#0078FA] tracking-tighter">
            yoojo
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col gap-2 px-3 py-2 overflow-y-auto">
          {MENU_ITEMS.map(item => (
            <div 
              key={item.id} 
              onClick={() => item.link && navigate(item.link)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                item.active ? 'bg-slate-100 text-[#0F172A] font-bold' : 'text-slate-600 font-medium hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <item.icon size={20} className={item.active ? 'text-[#0078FA] fill-current' : ''} strokeWidth={item.active ? 2.5 : 2} />
                  {item.id === 'accueil' && (
                    <div className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center border-2 border-white">
                      17
                    </div>
                  )}
                </div>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[11px] text-slate-500">{item.badge}</span>
              )}
            </div>
          ))}

          <div className="my-4 border-t border-slate-100"></div>

          {BOTTOM_MENU_ITEMS.map(item => (
            <div 
              key={item.id} 
              className="flex items-start gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors text-slate-600 font-medium hover:bg-slate-50"
            >
              <item.icon size={20} className="mt-0.5" strokeWidth={2} />
              <div className="flex flex-col">
                <span>{item.label}</span>
                {item.sub && <span className="text-[11px] text-slate-400 mt-1 leading-snug pr-4">{item.sub}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-[72px] border-b border-slate-200 flex items-center justify-center px-6 bg-white shrink-0 absolute top-0 left-0 right-0 z-20">
          <button 
            onClick={() => navigate('/post-task')}
            className="bg-[#0078FA] text-white font-bold text-[15px] px-6 py-2.5 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={18} strokeWidth={3} /> Demander un service
          </button>

          <div className="absolute right-6 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-orange-500 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-sm">
              {initial}
            </div>
            <span className="text-sm font-bold text-slate-800">{firstName}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pt-[72px]">
          <div className="max-w-[1000px] mx-auto px-8 py-8">
            
            {/* Address & Notifications */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 cursor-pointer hover:opacity-80">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <HomeIcon size={20} className="text-orange-500 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[15px] text-[#0F172A]">Domicile</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                  <span className="text-xs text-slate-500">10 Rue Crémieux, 75012 Paris</span>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-bold text-[13px] hover:bg-slate-50">
                <Bell size={16} /> Notifications
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">17</span>
              </button>
            </div>

            {/* Categories */}
            <div className="flex items-center justify-between border-b border-slate-200 mb-10 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map(cat => (
                <div 
                  key={cat.id} 
                  className={`flex flex-col items-center gap-2 pb-3 px-4 min-w-[90px] cursor-pointer relative ${
                    cat.active ? 'text-[#0078FA]' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <cat.icon size={24} className={cat.active ? 'fill-current' : ''} />
                  <span className="text-[11px] font-bold text-center leading-tight">{cat.label}</span>
                  {cat.active && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0078FA]"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Demandes en cours */}
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Demandes en cours</h2>
            <div 
              onClick={() => navigate('/requests')}
              className="bg-slate-50 rounded-[20px] p-4 flex items-center justify-between mb-12 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-2">
                  <div className="w-full h-full bg-[#E5B581] rounded flex flex-col justify-evenly px-2">
                    <div className="w-full h-1.5 bg-[#B8860B] rounded-sm"></div>
                    <div className="w-full h-1.5 bg-[#B8860B] rounded-sm"></div>
                    <div className="w-full h-1.5 bg-[#B8860B] rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-[#0F172A] mb-0.5">Montage de meubles IKEA</h3>
                  <p className="text-xs text-slate-500">Lundi 29 juin 2026 de 16:30 à 20:30 (4h)</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400 mr-2" />
            </div>

            {/* Les plus demandés */}
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Les plus demandés en ce moment</h2>
            <div className="flex gap-4 mb-12 overflow-x-auto scrollbar-hide pb-4 relative">
              
              <div className="w-[240px] flex-shrink-0 cursor-pointer group">
                <div className="h-[120px] bg-[#66C2A5] rounded-[20px] overflow-hidden mb-3 relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[#55A68C]"></div>
                  <div className="absolute bottom-2 right-4 w-12 h-12 bg-white rounded-full opacity-20"></div>
                  {/* Fake illustration details */}
                  <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-[#1F2937]"></div>
                  <div className="absolute bottom-4 right-8 w-8 h-8 rounded-full bg-[#1F2937]"></div>
                  <div className="absolute bottom-6 left-8 w-16 h-8 bg-[#FBBF24] rounded"></div>
                  <div className="absolute bottom-8 left-16 w-2 h-12 bg-slate-300 -rotate-45 origin-bottom-left"></div>
                </div>
                <h3 className="font-bold text-[13px] text-[#0F172A] group-hover:text-[#0078FA] transition-colors">Tondre la pelouse</h3>
              </div>

              <div className="w-[240px] flex-shrink-0 cursor-pointer group">
                <div className="h-[120px] bg-[#66C2A5] rounded-[20px] overflow-hidden mb-3 relative opacity-90">
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[#55A68C]"></div>
                  {/* Fake illustration details */}
                  <div className="absolute bottom-4 right-10 w-6 h-16 bg-[#EF4444] rounded-t-lg z-10"></div>
                  <div className="absolute bottom-10 right-6 w-10 h-10 bg-[#D97706] rounded"></div>
                  <div className="absolute bottom-4 left-10 w-16 h-12 bg-white/40 rounded"></div>
                  <div className="absolute bottom-4 left-14 w-16 h-16 bg-white/30 rounded"></div>
                </div>
                <h3 className="font-bold text-[13px] text-[#0F172A] group-hover:text-[#0078FA] transition-colors">Aide au déménagement</h3>
              </div>

              <div className="w-[240px] flex-shrink-0 cursor-pointer group">
                <div className="h-[120px] bg-[#E0F2FE] rounded-[20px] overflow-hidden mb-3 relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#BAE6FD]"></div>
                  <div className="absolute bottom-0 right-10 w-10 h-16 bg-[#0078FA] rounded-t-lg"></div>
                  <div className="absolute bottom-16 right-12 w-6 h-4 bg-[#FBBF24]"></div>
                  <div className="absolute bottom-14 right-6 w-16 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="font-bold text-[13px] text-[#0F172A] group-hover:text-[#0078FA] transition-colors">Ménage à domicile</h3>
              </div>

              <div className="w-[240px] flex-shrink-0 cursor-pointer group">
                <div className="h-[120px] bg-[#F3E8E0] rounded-[20px] overflow-hidden mb-3 relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[#E6D5C9]"></div>
                  <div className="absolute bottom-4 right-6 w-16 h-16 bg-[#8B5A2B] rounded shadow-sm flex flex-col justify-evenly">
                    <div className="h-1 w-full border-b border-black/20"></div>
                    <div className="h-1 w-full border-b border-black/20"></div>
                  </div>
                </div>
                <h3 className="font-bold text-[13px] text-[#0F172A] group-hover:text-[#0078FA] transition-colors">Assemblage de meubles</h3>
              </div>
              
              <div className="absolute right-0 top-[40px] w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-50 z-10">
                <ChevronRight size={18} className="text-slate-600" />
              </div>
            </div>

            {/* Réserver un bricoleur */}
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Réserver un bricoleur</h2>
            <div className="flex gap-4 pb-20">
              {[
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
              ].map((img, i) => (
                <div key={i} className="w-[180px] h-[120px] rounded-[20px] overflow-hidden flex-shrink-0 cursor-pointer relative group">
                  <img src={img} alt={`Bricoleur ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      
    </div>
  )
}
