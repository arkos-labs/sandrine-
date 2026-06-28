import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Star, Clock, Briefcase, Users, ShieldCheck, Heart, ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const CATEGORIES = [
  'Bricolage',
  'Informatique',
  'Garde d’animaux',
  'Ménage',
  'Déménagement',
  'Soutien scolaire',
  'Jardinage',
  'Photographie',
  'Aide à domicile'
]

const MOCK_TASKERS = [
  { id: '1', full_name: 'Camille B.', bio: 'Montage de meubles, fixations, petites réparations. Ponctuelle et soignée.', skills: ['Bricolage', 'Montage'], hourly_rate: 15, category: 'Bricolage', rating: 4.9, reviews: 127, distance: '1,2 km', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '2', full_name: 'Marwan S.', bio: 'Dépannage informatique, configuration réseau et installation à domicile.', skills: ['Informatique', 'Réseau'], hourly_rate: 20, category: 'Informatique', rating: 4.8, reviews: 89, distance: '2,4 km', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '3', full_name: 'Yanis K.', bio: 'Garde et promenade d’animaux, à domicile ou en pension de jour.', skills: ['Animaux', 'Promenade'], hourly_rate: 12, category: 'Garde d’animaux', rating: 4.7, reviews: 63, distance: '3,1 km', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '4', full_name: 'Inès M.', bio: 'Ménage régulier ou ponctuel, repassage soigné. Produits écologiques.', skills: ['Ménage', 'Repassage'], hourly_rate: 14, category: 'Ménage', rating: 5.0, reviews: 41, distance: '1,8 km', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '5', full_name: 'Léa D.', bio: 'Photographe passionnée, spécialisée dans les portraits et événements.', skills: ['Photographie', 'Vidéo'], hourly_rate: 30, category: 'Photographie', rating: 5.0, reviews: 54, distance: '4,0 km', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '6', full_name: 'Sacha P.', bio: 'Soutien scolaire en mathématiques et physique pour collégiens et lycéens.', skills: ['Maths', 'Physique'], hourly_rate: 25, category: 'Soutien scolaire', rating: 4.8, reviews: 41, distance: '2,9 km', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '7', full_name: 'Thomas R.', bio: 'Aide au déménagement, port de charges lourdes et montage avec camionnette.', skills: ['Manutention', 'Transport'], hourly_rate: 22, category: 'Déménagement', rating: 4.9, reviews: 112, distance: '5,0 km', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '8', full_name: 'Sophie L.', bio: 'Entretien de votre jardin, tonte de pelouse et taille de haies.', skills: ['Jardinage', 'Plantes'], hourly_rate: 18, category: 'Jardinage', rating: 4.6, reviews: 34, distance: '6,2 km', img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&h=200&q=80' },
]

const MOCK_TASKS = [
  { id: '1', title: 'Aide installation box internet', category: 'Informatique', description: 'Je n\'arrive pas à configurer ma nouvelle box.', budget: 40, created_at: new Date(Date.now() - 3600000).toISOString(), proposals_count: 3 },
  { id: '2', title: 'Garde de chat pour le weekend', category: 'Garde d’animaux', description: 'Besoin de quelqu\'un pour passer nourrir mon chat samedi et dimanche.', budget: 30, created_at: new Date(Date.now() - 7200000).toISOString(), proposals_count: 7 },
  { id: '3', title: 'Besoin d\'aide pour un déménagement', category: 'Déménagement', description: 'Besoin de 2 personnes avec camion pour transporter des meubles sur 10km.', budget: 150, created_at: new Date(Date.now() - 10800000).toISOString(), proposals_count: 2 },
  { id: '4', title: 'Tonte de pelouse 200m2', category: 'Jardinage', description: 'Je cherche quelqu\'un avec sa propre tondeuse pour un passage rapide.', budget: 45, created_at: new Date(Date.now() - 86400000).toISOString(), proposals_count: 5 },
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
    <div onClick={onClick} className="bg-white rounded-[20px] p-6 border border-[--color-tx-border] cursor-pointer hover:shadow-md transition-all flex flex-col h-full">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <img src={tasker.img} alt={tasker.full_name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-display text-[1.1rem] text-[--color-tx-navy] leading-none">{tasker.full_name}</h3>
              <ShieldCheck size={12} className="text-[--color-tx-success]" />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[--color-tx-text-muted]">
              <Star size={10} className="text-[#C84B31]" />
              <span className="font-bold text-[--color-tx-navy]">{tasker.rating}</span>
              <span>· {tasker.reviews} avis · à {tasker.distance}</span>
            </div>
          </div>
        </div>
        <button className="text-[--color-tx-text-muted] hover:text-[--color-tx-danger] transition-colors flex-shrink-0">
          <Heart size={18} />
        </button>
      </div>

      <p className="text-[--color-tx-text-secondary] text-[13px] leading-relaxed mb-4 line-clamp-2">{tasker.bio}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tasker.skills.map(s => (
          <span key={s} className="bg-[#F4EFEA] text-[--color-tx-text-secondary] font-semibold text-[11px] px-3 py-1 rounded-full">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5 border-t border-[--color-tx-border] flex items-center justify-between">
        <span className="font-display text-lg text-[--color-tx-navy] leading-none">{tasker.hourly_rate}€<span className="text-[11px] font-sans text-[--color-tx-text-muted]">/h</span></span>
        <button className="bg-[#1A3326] hover:bg-[#1A3326]/90 text-white text-[10px] font-bold tracking-widest uppercase py-2.5 px-6 rounded-md transition-colors">
          Contacter
        </button>
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
      <h3 className="font-semibold text-xl text-[--color-tx-navy] mb-2">{task.title}</h3>
      <p className="text-[--color-tx-text-secondary] text-sm leading-relaxed mb-6 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between pt-5 border-t border-[--color-tx-border]">
        <div className="flex items-center gap-6">
          <span className="text-[--color-tx-navy] font-semibold text-2xl">{task.budget}€</span>
          <span className="text-[--color-tx-text-muted] font-medium text-sm">• {task.proposals_count} devis</span>
        </div>
        <button onClick={() => onOffer(task)} className="btn-secondary py-2 px-6 text-sm">
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
  const [location, setLocation] = useState('Paris')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [minRating, setMinRating] = useState(null)
  const [verifiedOnly, setVerifiedOnly] = useState(true)

  const isClient = activeRole === 'client'

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setMinRating(null)
    setVerifiedOnly(false)
    setSearch('')
  }

  const filteredTaskers = MOCK_TASKERS.filter(t => {
    const matchSearch = !search || t.full_name.toLowerCase().includes(search.toLowerCase()) ||
      t.bio.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(t.category)
    const matchRating = !minRating || t.rating >= minRating
    return matchSearch && matchCategory && matchRating
  })

  const filteredTasks = MOCK_TASKS.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase())
    return matchSearch
  })

  return (
    <div className="min-h-screen bg-[--color-tx-bg-alt]">
      <TopNav />
      <div className="page-container pt-6 max-w-[1200px] mx-auto px-4 md:px-6">

        {/* Breadcrumb + Header */}
        <p className="text-sm text-[--color-tx-text-muted] mb-3">Accueil <span className="mx-1">›</span> Trouver un service</p>
        <h1 className="text-3xl md:text-4xl font-display mb-6">
          {isClient ? 'Trouver un talent' : 'Trouver des missions'}
        </h1>

        {/* Search bar */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 bg-white border border-[--color-tx-border] rounded-[2rem] shadow-sm mb-12">
          <div className="flex items-center gap-2.5 flex-1 px-4 py-1.5">
            <Search className="text-[--color-tx-text-muted] flex-shrink-0" size={18} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Bricolage"
              className="flex-1 bg-transparent border-none py-1.5 text-[--color-tx-text] placeholder:text-[--color-tx-text-muted] outline-none text-[15px] w-full min-w-0"
            />
          </div>
          <div className="hidden sm:block w-px h-6 bg-[--color-tx-border]" />
          <div className="flex items-center gap-2.5 flex-1 px-4 py-1.5">
            <MapPin className="text-[--color-tx-text-muted] flex-shrink-0" size={18} />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Ville ou code postal"
              className="flex-1 bg-transparent border-none py-1.5 text-[--color-tx-text] placeholder:text-[--color-tx-text-muted] outline-none text-[15px] w-full min-w-0"
            />
          </div>
          <button className="bg-[--color-tx-primary] text-white font-bold tracking-widest uppercase text-[12px] py-3.5 px-8 flex-shrink-0 rounded-[1.5rem] hover:bg-[--color-tx-primary-hover] transition-colors">Rechercher</button>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="mb-6 md:hidden">
          <div className="bg-white p-1 flex border border-[--color-tx-border] rounded-xl shadow-sm">
            <button
              onClick={() => setActiveRole('client')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors rounded-lg ${
                isClient ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary]'
              }`}
            >
              <Users size={16} /> Talents
            </button>
            <button
              onClick={() => setActiveRole('tasker')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors rounded-lg ${
                !isClient ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary]'
              }`}
            >
              <Briefcase size={16} /> Missions
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">

          {/* Filters Sidebar */}
          {isClient && (
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-[#F9F8F6] rounded-[20px] p-6 border border-[--color-tx-border]">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-[1.6rem] text-[--color-tx-navy] leading-none">Filtres</h2>
                  <button onClick={clearFilters} className="text-[11px] text-[--color-tx-text-secondary] uppercase tracking-wider font-bold hover:text-[--color-tx-navy]">Effacer</button>
                </div>

                <div className="mb-8">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[--color-tx-text-muted] mb-4">Catégorie</p>
                  <div className="flex flex-col gap-3">
                    {CATEGORIES.map(cat => (
                      <label key={cat} className="flex items-center gap-3 text-[14px] text-[--color-tx-navy] cursor-pointer group">
                        <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-[--color-tx-primary] border-[--color-tx-primary]' : 'bg-white border-[--color-tx-border] group-hover:border-[--color-tx-primary]'}`}>
                          {selectedCategories.includes(cat) && <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="sr-only"
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[--color-tx-text-muted] mb-4">Note minimum</p>
                  <div className="flex flex-wrap gap-2">
                    {[{ label: '4,5+', value: 4.5 }, { label: '4,0+', value: 4.0 }].map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => setMinRating(opt.value)}
                        className={`text-[13px] px-4 py-1.5 rounded-full border transition-colors ${
                          minRating === opt.value
                            ? 'bg-[--color-tx-success-light] text-[--color-tx-success] border-[--color-tx-success-light] font-bold'
                            : 'bg-transparent text-[--color-tx-text-secondary] border-[--color-tx-border] hover:border-[--color-tx-navy]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[--color-tx-border] pt-6">
                  <span className="text-[13px] font-medium text-[--color-tx-navy]">Vérifiés uniquement</span>
                  <button
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={`relative w-9 h-5 rounded-full transition-colors ${verifiedOnly ? 'bg-[--color-tx-primary]' : 'bg-[#E5E2DC]'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${verifiedOnly ? 'translate-x-4' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {isClient ? (
              <div>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <p className="text-[--color-tx-text-secondary] text-sm">
                    <span className="text-[--color-tx-navy] font-semibold">{filteredTaskers.length} talents</span> disponibles · {location}
                  </p>
                  <button className="flex items-center gap-1.5 text-sm text-[--color-tx-text-secondary] border border-[--color-tx-border] bg-white rounded-lg px-3 py-1.5">
                    Trier par : <span className="font-medium text-[--color-tx-navy]">Mieux notés</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
                <div className="columns-1 sm:columns-2 gap-5 space-y-5">
                  {filteredTaskers.map((t) => (
                    <div key={t.id} className="break-inside-avoid">
                      <TaskerCard tasker={t} onClick={() => navigate(`/profile/${t.id}`)} />
                    </div>
                  ))}
                  {filteredTaskers.length === 0 && (
                    <div className="sm:col-span-2 text-center py-20 bg-white border border-dashed border-[--color-tx-border] rounded-xl">
                      <p className="text-[--color-tx-text-secondary] font-medium text-lg">Aucun talent trouvé</p>
                    </div>
                  )}
                </div>
                
                {filteredTaskers.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                    <button className="w-8 h-8 rounded border border-[--color-tx-border] flex items-center justify-center text-[12px] font-medium text-[--color-tx-navy] hover:border-[--color-tx-navy]">1</button>
                    <button className="w-8 h-8 flex items-center justify-center text-[12px] font-medium text-[--color-tx-text-secondary] hover:text-[--color-tx-navy]">2</button>
                    <button className="w-8 h-8 flex items-center justify-center text-[12px] font-medium text-[--color-tx-text-secondary] hover:text-[--color-tx-navy]">3</button>
                    <span className="text-[--color-tx-text-secondary]">...</span>
                    <button className="w-8 h-8 rounded border border-[--color-tx-border] flex items-center justify-center text-[--color-tx-text-secondary] hover:text-[--color-tx-navy] hover:border-[--color-tx-navy]"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[--color-tx-text-secondary] font-medium">
                    <span className="text-[--color-tx-navy] font-semibold">{filteredTasks.length}</span> missions disponibles
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
