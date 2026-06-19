import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Star, Clock, Euro, Briefcase, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { VerifiedBadge } from '../components/VerifiedBadge'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const ALL_SKILLS = ['Ménage', 'Repassage', 'Jardinage', 'Meubles', 'Cuisine', 'Bricolage', 'Plomberie', 'Peinture']

const MOCK_TASKERS = [
  { id: '1', full_name: 'Camille Brunet', avatar_url: null, bio: 'Spécialiste des finitions soignées et des peintures écologiques. À l\'écoute, ponctuelle, chantier propre.', skills: ['Peinture'], hourly_rate: 35, verification_status: 'approved', rating: 4.9, reviews: 127 },
  { id: '2', full_name: 'Marwan Sehili', avatar_url: null, bio: 'Mise aux normes, tableaux électriques, dépannage rapide. Travail propre et pédagogue.', skills: ['Électricité'], hourly_rate: 45, verification_status: 'approved', rating: 4.8, reviews: 89 },
  { id: '3', full_name: 'Léa Dumont', avatar_url: null, bio: 'Salles de bain, fuites, robinetterie. Réactive et transparente sur les prix.', skills: ['Plomberie'], hourly_rate: 42, verification_status: 'approved', rating: 5.0, reviews: 54 },
  { id: '4', full_name: 'Théo Marchand', avatar_url: null, bio: 'Meubles sur-mesure, pose de parquet, agencement. Beau travail du bois.', skills: ['Menuiserie'], hourly_rate: 48, verification_status: 'approved', rating: 4.7, reviews: 66 },
  { id: '5', full_name: 'Inès Lambert', avatar_url: null, bio: 'Sols et murs, faïence, mosaïque. Finitions impeccables, joints nickel.', skills: ['Carrelage'], hourly_rate: 40, verification_status: 'approved', rating: 4.9, reviews: 98 },
  { id: '6', full_name: 'Sacha Petit', avatar_url: null, bio: 'Petits travaux, montage de meubles, fixations, dépannage du quotidien.', skills: ['Bricolage'], hourly_rate: 30, verification_status: 'approved', rating: 4.8, reviews: 41 },
]

const MOCK_TASKS = [
  { id: '1', title: 'Peinture salon 25m²', category: 'Peinture', description: 'Murs et plafonds, peinture blanche. Protection du sol nécessaire.', budget: 450, created_at: new Date(Date.now() - 3600000).toISOString(), proposals_count: 3 },
  { id: '2', title: 'Fuite sous évier', category: 'Plomberie', description: 'Goutte à goutte sous l\'évier de la cuisine, probablement le siphon.', budget: 80, created_at: new Date(Date.now() - 7200000).toISOString(), proposals_count: 7 },
  { id: '3', title: 'Montage lit coffre', category: 'Meubles', description: 'Lit double avec coffre intégré, cartons déjà dans la chambre.', budget: 120, created_at: new Date(Date.now() - 10800000).toISOString(), proposals_count: 2 },
]

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'À l\'instant'
  if (h < 24) return `Il y a ${h}h`
  return `Il y a ${Math.floor(h / 24)}j`
}

function TaskerCard({ tasker, onClick }) {
  return (
    <div onClick={onClick} className="ks-card cursor-pointer flex flex-col sm:flex-row gap-8 items-start group">
      <div className="w-full sm:w-36 h-36 border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-deep] flex items-center justify-center flex-shrink-0 transition-colors group-hover:border-[--color-ks-kinpaku]">
        <span className="text-[--color-ks-kinpaku] text-4xl font-display font-light">{tasker.full_name.charAt(0)}</span>
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-title text-[--color-ks-champagne]">{tasker.full_name}</h3>
              <VerifiedBadge status={tasker.verification_status} />
            </div>
            <p className="text-[--color-ks-text-muted] font-medium text-sm"><span className="skill-tag">{tasker.skills[0]}</span></p>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-eyebrow mb-1">dès</p>
            <p className="text-[--color-ks-kinpaku] font-display font-light text-3xl">{tasker.hourly_rate}€<span className="text-xl">/h</span></p>
          </div>
        </div>
        
        <p className="text-[--color-ks-text-warm] text-sm leading-relaxed mb-6 line-clamp-2">{tasker.bio}</p>
        
        <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-auto border-t border-[--color-ks-gold-hairline] pt-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Star size={18} strokeWidth={2} className="text-[--color-ks-kinpaku] fill-[--color-ks-kinpaku]" />
              <span className="text-[--color-ks-champagne] font-medium">{tasker.rating}</span>
              <span className="text-[--color-ks-text-muted] text-sm">({tasker.reviews})</span>
            </div>
            <span className="text-[--color-ks-patina] text-xs font-mono tracking-widest uppercase">
              Dispo 48h
            </span>
          </div>
          <button className="text-[--color-ks-champagne] text-sm font-medium hover:text-[--color-ks-kinpaku] transition-colors">
            Voir le profil →
          </button>
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task, onOffer }) {
  return (
    <div className="ks-card group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="skill-tag">{task.category}</span>
        </div>
        <span className="text-[--color-ks-text-muted] font-mono tracking-widest text-xs flex items-center gap-1.5 uppercase">
          <Clock size={14} />
          {timeAgo(task.created_at)}
        </span>
      </div>
      <h3 className="text-title text-[--color-ks-champagne] mb-3">{task.title}</h3>
      <p className="text-[--color-ks-text-warm] text-sm leading-relaxed mb-6 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between pt-5 border-t border-[--color-ks-gold-hairline]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Euro size={18} className="text-[--color-ks-kinpaku]" />
            <span className="text-[--color-ks-champagne] font-display font-light text-2xl">{task.budget}€</span>
          </div>
          <span className="text-[--color-ks-text-muted] font-mono tracking-widest text-xs uppercase">• {task.proposals_count} devis</span>
        </div>
        <button
          onClick={() => onOffer(task)}
          className="btn-secondary py-2 px-6 text-sm min-h-[40px]"
        >
          Proposer
        </button>
      </div>
    </div>
  )
}

export default function MarketplacePage() {
  const { activeRole, setActiveRole } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [maxRate, setMaxRate] = useState(100)
  const [showFilters, setShowFilters] = useState(false)

  const isClient = activeRole === 'client'

  const filteredTaskers = MOCK_TASKERS.filter(t => {
    const matchSearch = !search || t.full_name.toLowerCase().includes(search.toLowerCase()) ||
      t.bio.toLowerCase().includes(search.toLowerCase())
    const matchSkill = !selectedSkill || t.skills.includes(selectedSkill)
    const matchRate = t.hourly_rate <= maxRate
    return matchSearch && matchSkill && matchRate
  })

  const filteredTasks = MOCK_TASKS.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = !selectedSkill || t.category === selectedSkill
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm] font-sans">
      <TopNav />
      <div className="page-container pt-8 max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            {/* Mobile Tab Switcher */}
            <div className="mb-8 md:hidden">
              <div className="bg-[--color-ks-lacquer-deep] p-1 flex border border-[--color-ks-gold-hairline] rounded-md">
                <button
                  onClick={() => setActiveRole('client')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors duration-300 rounded-sm ${
                    isClient ? 'bg-[--color-ks-graphite] text-[--color-ks-champagne]' : 'text-[--color-ks-text-muted]'
                  }`}
                >
                  <Users size={16} />
                  Pro·s
                </button>
                <button
                  onClick={() => setActiveRole('tasker')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors duration-300 rounded-sm ${
                    !isClient ? 'bg-[--color-ks-graphite] text-[--color-ks-champagne]' : 'text-[--color-ks-text-muted]'
                  }`}
                >
                  <Briefcase size={16} />
                  Missions
                </button>
              </div>
            </div>

            <div className="ks-card hidden md:block mb-6 !p-4">
              <h2 className="text-eyebrow mb-4 px-2">Je cherche</h2>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveRole('client')}
                  className={`text-left px-4 py-3 text-sm transition-all rounded-md ${
                    isClient ? 'bg-[--color-ks-graphite] text-[--color-ks-kinpaku] font-medium' : 'text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] hover:bg-white/5'
                  }`}
                >
                  Des pros qualifié·es
                </button>
                <button
                  onClick={() => setActiveRole('tasker')}
                  className={`text-left px-4 py-3 text-sm transition-all rounded-md ${
                    !isClient ? 'bg-[--color-ks-graphite] text-[--color-ks-kinpaku] font-medium' : 'text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] hover:bg-white/5'
                  }`}
                >
                  Des missions
                </button>
              </div>
            </div>

            <div className="ks-card mb-6">
              <div className="flex items-center justify-between md:mb-6 cursor-pointer md:cursor-auto" onClick={() => setShowFilters(!showFilters)}>
                <h2 className="text-headline text-2xl">Filtres</h2>
                <Filter size={20} className="text-[--color-ks-champagne] md:hidden" />
              </div>
              
              <div className={`mt-6 md:mt-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <div className="mb-8">
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted]" />
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Rechercher..."
                      className="input-field pl-12 py-3"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-eyebrow mb-4">Catégorie</p>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setSelectedSkill(null)}
                      className={`text-sm text-left px-3 py-2 transition-all rounded-sm ${
                        !selectedSkill ? 'bg-[--color-ks-graphite] text-[--color-ks-kinpaku] font-medium' : 'text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] hover:bg-white/5'
                      }`}
                    >
                      Toutes
                    </button>
                    {ALL_SKILLS.map(skill => (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill)}
                        className={`text-sm text-left px-3 py-2 transition-all rounded-sm ${
                          selectedSkill === skill ? 'bg-[--color-ks-graphite] text-[--color-ks-kinpaku] font-medium' : 'text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] hover:bg-white/5'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {isClient && (
                  <div>
                    <p className="text-eyebrow mb-4 flex justify-between">
                      <span>Tarif max</span>
                      <span className="text-[--color-ks-kinpaku]">{maxRate}€/h</span>
                    </p>
                    <input
                      type="range" min={15} max={100} value={maxRate}
                      onChange={e => setMaxRate(+e.target.value)}
                      className="w-full accent-[--color-ks-kinpaku] h-1 bg-[--color-ks-graphite] rounded-full appearance-none cursor-pointer outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {isClient ? (
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[--color-ks-gold-hairline]">
                  <p className="text-[--color-ks-champagne] text-lg font-medium">
                    {filteredTaskers.length} pro·s trouvé·es
                  </p>
                  <div className="text-xs font-mono uppercase tracking-widest text-[--color-ks-text-muted]">
                    Trier par : <span className="text-[--color-ks-kinpaku]">Recommandé·es</span>
                  </div>
                </div>
                <div className="grid gap-6">
                  {filteredTaskers.map((t) => (
                    <TaskerCard key={t.id} tasker={t} onClick={() => navigate(`/profile/${t.id}`)} />
                  ))}
                  {filteredTaskers.length === 0 && (
                    <div className="text-center py-20 ks-card border-dashed">
                      <p className="text-[--color-ks-text-muted] font-medium text-lg">Aucun prestataire trouvé</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[--color-ks-gold-hairline]">
                  <p className="text-[--color-ks-champagne] text-lg font-medium">
                    {filteredTasks.length} mission{filteredTasks.length > 1 ? 's' : ''} dispo
                  </p>
                  <button onClick={() => navigate('/post-task')} className="text-[--color-ks-kinpaku] text-sm font-medium hover:text-[--color-ks-champagne] transition-colors">
                    + Publier un projet
                  </button>
                </div>
                <div className="space-y-6">
                  {filteredTasks.map((t) => (
                    <TaskCard key={t.id} task={t} onOffer={(task) => console.log('Offer on:', task.id)} />
                  ))}
                  {filteredTasks.length === 0 && (
                    <div className="text-center py-20 ks-card border-dashed">
                      <p className="text-[--color-ks-text-muted] font-medium text-lg">Aucune mission disponible pour le moment</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
