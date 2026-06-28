import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Star, Clock, Euro, Briefcase, Users, MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { VerifiedBadge } from '../components/VerifiedBadge'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const ALL_SKILLS = ['Bricolage', 'Informatique', 'Cours particuliers', 'Garde d’animaux', 'Coaching', 'Aide administrative', 'Photographie', 'Cuisine', 'Coiffure', 'Transport', 'Accompagnement médical', 'Soutien moral']

const MOCK_TASKERS = [
  { id: '1', full_name: 'Camille Brunet', avatar_url: null, bio: 'Spécialiste en petits travaux. À l\'écoute, ponctuelle, chantier propre.', skills: ['Bricolage'], hourly_rate: 35, verification_status: 'approved', rating: 4.9, reviews: 127 },
  { id: '2', full_name: 'Marwan Sehili', avatar_url: null, bio: 'Dépannage informatique et installation réseau. Patient et pédagogue.', skills: ['Informatique'], hourly_rate: 45, verification_status: 'approved', rating: 4.8, reviews: 89 },
  { id: '3', full_name: 'Léa Dumont', avatar_url: null, bio: 'Photographe passionnée, spécialisée dans les portraits et événements.', skills: ['Photographie'], hourly_rate: 60, verification_status: 'approved', rating: 5.0, reviews: 54 },
  { id: '4', full_name: 'Théo Marchand', avatar_url: null, bio: 'Accompagnement pour vos démarches et écoute attentive.', skills: ['Aide administrative', 'Soutien moral'], hourly_rate: 25, verification_status: 'approved', rating: 4.7, reviews: 66 },
  { id: '5', full_name: 'Inès Lambert', avatar_url: null, bio: 'Passionnée d\'animaux, je garde vos petits compagnons avec amour.', skills: ['Garde d’animaux'], hourly_rate: 15, verification_status: 'approved', rating: 4.9, reviews: 98 },
  { id: '6', full_name: 'Sacha Petit', avatar_url: null, bio: 'Coaching de vie et aide à l\'organisation. Un espace safe pour vous.', skills: ['Coaching'], hourly_rate: 50, verification_status: 'approved', rating: 4.8, reviews: 41 },
]

const MOCK_TASKS = [
  { id: '1', title: 'Aide installation box internet', category: 'Informatique', description: 'Je n\'arrive pas à configurer ma nouvelle box.', budget: 40, created_at: new Date(Date.now() - 3600000).toISOString(), proposals_count: 3 },
  { id: '2', title: 'Garde de chat pour le weekend', category: 'Garde d’animaux', description: 'Besoin de quelqu\'un pour passer nourrir mon chat samedi et dimanche.', budget: 30, created_at: new Date(Date.now() - 7200000).toISOString(), proposals_count: 7 },
  { id: '3', title: 'Besoin d\'aide pour déclarer mes impôts', category: 'Aide administrative', description: 'Démarche complexe, besoin d\'un accompagnement.', budget: 50, created_at: new Date(Date.now() - 10800000).toISOString(), proposals_count: 2 },
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
    <div onClick={onClick} className="tx-card cursor-pointer flex flex-col sm:flex-row gap-6 items-start group">
      <div className="w-full sm:w-32 h-32 bg-[--color-tx-bg-alt] border border-[--color-tx-border] rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="text-[--color-tx-navy] text-3xl font-bold">{tasker.full_name.charAt(0)}</span>
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h3 className="font-bold text-lg text-[--color-tx-navy]">{tasker.full_name}</h3>
              <VerifiedBadge status={tasker.verification_status} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-[#FBBF24] fill-[#FBBF24]" />
              <span className="text-[--color-tx-text] font-semibold text-sm">{tasker.rating}</span>
              <span className="text-[--color-tx-text-secondary] text-sm">({tasker.reviews} avis)</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-[--color-tx-primary] font-bold text-2xl">{tasker.hourly_rate}€<span className="text-base text-[--color-tx-text-secondary] font-normal">/h</span></p>
          </div>
        </div>
        
        <p className="text-[--color-tx-text-secondary] text-sm leading-relaxed mb-4 line-clamp-2">{tasker.bio}</p>
        
        <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-auto">
          <div className="flex items-center gap-2">
             <span className="skill-tag text-xs">{tasker.skills[0]}</span>
          </div>
          <button className="text-[--color-tx-primary] text-sm font-semibold hover:text-[--color-tx-primary-hover] transition-colors">
            Voir le profil →
          </button>
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task, onOffer }) {
  return (
    <div className="tx-card group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="skill-tag text-xs">{task.category}</span>
        </div>
        <span className="text-[--color-tx-text-secondary] font-medium text-xs flex items-center gap-1.5">
          <Clock size={14} />
          {timeAgo(task.created_at)}
        </span>
      </div>
      <h3 className="font-bold text-xl text-[--color-tx-navy] mb-2">{task.title}</h3>
      <p className="text-[--color-tx-text-secondary] text-sm leading-relaxed mb-6 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between pt-5 border-t border-[--color-tx-border]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <span className="text-[--color-tx-navy] font-bold text-2xl">{task.budget}€</span>
          </div>
          <span className="text-[--color-tx-text-muted] font-medium text-sm">• {task.proposals_count} devis</span>
        </div>
        <button
          onClick={() => onOffer(task)}
          className="btn-secondary py-2 px-6 text-sm"
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
    <div className="min-h-screen bg-[--color-tx-bg-alt]">
      <TopNav />
      <div className="page-container pt-8 max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[--color-tx-navy] mb-2">
            {isClient ? 'Trouvez le pro idéal' : 'Trouvez des missions'}
          </h1>
          <p className="text-[--color-tx-text-secondary]">
            {isClient ? 'Découvrez des profils vérifiés près de chez vous.' : 'Parcourez les demandes de services et proposez vos devis.'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            {/* Mobile Tab Switcher */}
            <div className="mb-8 md:hidden">
              <div className="bg-white p-1 flex border border-[--color-tx-border] rounded-xl shadow-sm">
                <button
                  onClick={() => setActiveRole('client')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors rounded-lg ${
                    isClient ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary]'
                  }`}
                >
                  <Users size={16} />
                  Pro·s
                </button>
                <button
                  onClick={() => setActiveRole('tasker')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors rounded-lg ${
                    !isClient ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary]'
                  }`}
                >
                  <Briefcase size={16} />
                  Missions
                </button>
              </div>
            </div>

            <div className="tx-card hidden md:block mb-6 !p-4">
              <h2 className="font-semibold text-sm text-[--color-tx-navy] mb-3 px-2 uppercase tracking-wide">Je cherche</h2>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveRole('client')}
                  className={`text-left px-4 py-3 text-sm transition-all rounded-lg font-medium ${
                    isClient ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary] hover:bg-[--color-tx-bg-alt]'
                  }`}
                >
                  Des pros qualifié·es
                </button>
                <button
                  onClick={() => setActiveRole('tasker')}
                  className={`text-left px-4 py-3 text-sm transition-all rounded-lg font-medium ${
                    !isClient ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary] hover:bg-[--color-tx-bg-alt]'
                  }`}
                >
                  Des missions
                </button>
              </div>
            </div>

            <div className="tx-card mb-6">
              <div className="flex items-center justify-between md:mb-6 cursor-pointer md:cursor-auto" onClick={() => setShowFilters(!showFilters)}>
                <h2 className="font-bold text-lg text-[--color-tx-navy]">Filtres</h2>
                <Filter size={20} className="text-[--color-tx-primary] md:hidden" />
              </div>
              
              <div className={`mt-6 md:mt-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <div className="mb-6">
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted]" />
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Mot-clé..."
                      className="input-field pl-11"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-semibold text-sm text-[--color-tx-navy] mb-3">Catégorie</p>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setSelectedSkill(null)}
                      className={`text-sm text-left px-3 py-2 transition-all rounded-lg font-medium ${
                        !selectedSkill ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary] hover:bg-[--color-tx-bg-alt]'
                      }`}
                    >
                      Toutes catégories
                    </button>
                    {ALL_SKILLS.map(skill => (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill)}
                        className={`text-sm text-left px-3 py-2 transition-all rounded-lg font-medium ${
                          selectedSkill === skill ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary] hover:bg-[--color-tx-bg-alt]'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {isClient && (
                  <div>
                    <p className="font-semibold text-sm text-[--color-tx-navy] mb-4 flex justify-between">
                      <span>Tarif max</span>
                      <span className="text-[--color-tx-primary]">{maxRate}€/h</span>
                    </p>
                    <input
                      type="range" min={15} max={100} value={maxRate}
                      onChange={e => setMaxRate(+e.target.value)}
                      className="w-full accent-[--color-tx-primary] h-1.5 bg-[--color-tx-border] rounded-full appearance-none cursor-pointer outline-none"
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
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[--color-tx-text-secondary] font-medium">
                    <span className="text-[--color-tx-navy] font-bold">{filteredTaskers.length}</span> prestataires correspondent
                  </p>
                </div>
                <div className="grid gap-4">
                  {filteredTaskers.map((t) => (
                    <TaskerCard key={t.id} tasker={t} onClick={() => navigate(`/profile/${t.id}`)} />
                  ))}
                  {filteredTaskers.length === 0 && (
                    <div className="text-center py-20 bg-white border border-dashed border-[--color-tx-border] rounded-xl">
                      <p className="text-[--color-tx-text-secondary] font-medium text-lg">Aucun prestataire trouvé</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[--color-tx-text-secondary] font-medium">
                    <span className="text-[--color-tx-navy] font-bold">{filteredTasks.length}</span> missions disponibles
                  </p>
                  <button onClick={() => navigate('/post-task')} className="text-[--color-tx-primary] font-semibold text-sm hover:underline">
                    + Publier une mission
                  </button>
                </div>
                <div className="grid gap-4">
                  {filteredTasks.map((t) => (
                    <TaskCard key={t.id} task={t} onOffer={(task) => console.log('Offer on:', task.id)} />
                  ))}
                  {filteredTasks.length === 0 && (
                    <div className="text-center py-20 bg-white border border-dashed border-[--color-tx-border] rounded-xl">
                      <p className="text-[--color-tx-text-secondary] font-medium text-lg">Aucune mission disponible pour le moment</p>
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
