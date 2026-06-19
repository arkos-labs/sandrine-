import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Star, Clock, Euro, ChevronRight, Briefcase, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { VerifiedBadge } from '../components/VerifiedBadge'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const ALL_SKILLS = ['Ménage', 'Repassage', 'Jardinage', 'Meubles', 'Cuisine', 'Bricolage', 'Garde d\'animaux', 'Peinture']

const CATEGORY_ICONS = {
  'Ménage': '🧹', 'Repassage': '👔', 'Jardinage': '🌿', 'Meubles': '🪑',
  'Cuisine': '🍳', 'Bricolage': '🔨', 'Garde d\'animaux': '🐾', 'Peinture': '🎨',
}

// ─── Mock data for demo display ──────────────────────────────────────────────
const MOCK_TASKERS = [
  { id: '1', full_name: 'Camille Bernard', avatar_url: null, bio: 'Spécialiste ménage et repassage, 5 ans d\'expérience. Douce, efficace et respectueuse.', skills: ['Ménage', 'Repassage', 'Cuisine'], hourly_rate: 22, verification_status: 'approved', rating: 4.9, reviews: 47 },
  { id: '2', full_name: 'Jordan Lefèvre', avatar_url: null, bio: 'Jardinier passionné et bricoleur de talent. Je transforme vos espaces extérieurs.', skills: ['Jardinage', 'Bricolage'], hourly_rate: 28, verification_status: 'approved', rating: 4.8, reviews: 31 },
  { id: '3', full_name: 'Alex Moreau', avatar_url: null, bio: 'Chef cuisinier à domicile, spécialités végétariennes et régimes spéciaux.', skills: ['Cuisine', 'Ménage'], hourly_rate: 35, verification_status: 'approved', rating: 5.0, reviews: 18 },
  { id: '4', full_name: 'Sam Dupont', avatar_url: null, bio: 'Assemblage de meubles toutes marques, rapide et soigné. Devis gratuit.', skills: ['Meubles', 'Bricolage'], hourly_rate: 30, verification_status: 'pending', rating: 4.7, reviews: 12 },
  { id: '5', full_name: 'Léa Martin', avatar_url: null, bio: 'Ménage professionnel, produits écologiques uniquement. Disponible week-ends.', skills: ['Ménage', 'Repassage'], hourly_rate: 20, verification_status: 'approved', rating: 4.6, reviews: 56 },
  { id: '6', full_name: 'Maxime Petit', avatar_url: null, bio: 'Peinture intérieure et extérieure, finitions impeccables garanties.', skills: ['Peinture', 'Bricolage'], hourly_rate: 32, verification_status: 'approved', rating: 4.9, reviews: 24 },
]

const MOCK_TASKS = [
  { id: '1', title: 'Grand ménage appartement 80m²', category: 'Ménage', description: 'Besoin d\'un ménage complet avant déménagement, cuisine et salles de bains comprises.', budget: 150, created_at: new Date(Date.now() - 3600000).toISOString(), proposals_count: 3 },
  { id: '2', title: 'Assemblage bibliothèque IKEA', category: 'Meubles', description: 'Bibliothèque BILLY en 5 colonnes, je fournis la visserie. Environ 2h de travail.', budget: 60, created_at: new Date(Date.now() - 7200000).toISOString(), proposals_count: 7 },
  { id: '3', title: 'Jardinage — taille haie + tonte', category: 'Jardinage', description: 'Jardin 300m², haie de 15m à tailler et pelouse à tondre. Matériel disponible sur place.', budget: 120, created_at: new Date(Date.now() - 10800000).toISOString(), proposals_count: 2 },
  { id: '4', title: 'Cours de cuisine végane', category: 'Cuisine', description: 'Je recherche quelqu\'un pour m\'apprendre 5 recettes véganes faciles. 3h de cours.', budget: 90, created_at: new Date(Date.now() - 14400000).toISOString(), proposals_count: 1 },
  { id: '5', title: 'Repassage 15 chemises', category: 'Repassage', description: 'Chemises de travail, repassage soigneux souhaité. Matériel disponible chez moi.', budget: 40, created_at: new Date(Date.now() - 18000000).toISOString(), proposals_count: 4 },
]

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'À l\'instant'
  if (h < 24) return `Il y a ${h}h`
  return `Il y a ${Math.floor(h / 24)}j`
}

function TaskerCard({ tasker, onClick }) {
  const initials = tasker.full_name.split(' ').map(n => n[0]).join('')
  return (
    <div onClick={onClick} className="card card-hover p-4 cursor-pointer">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0 text-base">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="font-semibold text-slate-900 text-sm">{tasker.full_name}</h3>
            <VerifiedBadge status={tasker.verification_status} />
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="text-slate-700 text-xs font-medium">{tasker.rating}</span>
            <span className="text-slate-400 text-xs">({tasker.reviews} avis)</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-slate-900 font-bold text-base">{tasker.hourly_rate}€</p>
          <p className="text-slate-400 text-xs">/heure</p>
        </div>
      </div>
      <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{tasker.bio}</p>
      <div className="flex flex-wrap gap-1.5">
        {tasker.skills.map(s => (
          <span key={s} className="skill-tag">{CATEGORY_ICONS[s] || '✦'} {s}</span>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-indigo-600 text-xs font-medium">Voir le profil</span>
        <ChevronRight size={14} className="text-indigo-600" />
      </div>
    </div>
  )
}

function TaskCard({ task, onOffer }) {
  return (
    <div className="card card-hover p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{CATEGORY_ICONS[task.category] || '📋'}</span>
          <span className="skill-tag text-xs">{task.category}</span>
        </div>
        <span className="text-slate-400 text-xs flex items-center gap-1">
          <Clock size={10} />
          {timeAgo(task.created_at)}
        </span>
      </div>
      <h3 className="font-semibold text-slate-900 text-base mb-1">{task.title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Euro size={14} className="text-emerald-600" />
            <span className="text-slate-900 font-bold">{task.budget}€</span>
          </div>
          <span className="text-slate-400 text-xs">• {task.proposals_count} offre{task.proposals_count > 1 ? 's' : ''}</span>
        </div>
        <button
          onClick={() => onOffer(task)}
          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors flex items-center gap-1"
        >
          Faire une offre
          <ChevronRight size={12} />
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
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <div className="page-container pt-6">
        {/* Hero toggle */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 mb-4">
            {isClient ? 'Trouver un prestataire' : 'Trouver une mission'}
          </h1>
          <div className="bg-slate-100 rounded-lg p-1 flex">
            <button
              id="toggle-client"
              onClick={() => setActiveRole('client')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-colors duration-150 ${
                isClient ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Users size={16} />
              Trouver un prestataire
            </button>
            <button
              id="toggle-tasker"
              onClick={() => setActiveRole('tasker')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-colors duration-150 ${
                !isClient ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Briefcase size={16} />
              Trouver une mission
            </button>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isClient ? 'Rechercher un prestataire...' : 'Rechercher une mission...'}
              className="input-field pl-10 text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-lg border transition-colors ${
              showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="card p-4 mb-4">
            <p className="text-slate-700 text-sm font-medium mb-3">Filtrer par compétence</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedSkill(null)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  !selectedSkill ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                Tout
              </button>
              {ALL_SKILLS.map(skill => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    selectedSkill === skill ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {CATEGORY_ICONS[skill]} {skill}
                </button>
              ))}
            </div>
            {isClient && (
              <div>
                <p className="text-slate-700 text-sm font-medium mb-2">
                  Tarif max : <span className="text-indigo-600 font-bold">{maxRate}€/h</span>
                </p>
                <input
                  type="range" min={15} max={100} value={maxRate}
                  onChange={e => setMaxRate(+e.target.value)}
                  className="w-full accent-indigo-600"
                />
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {isClient ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-sm">{filteredTaskers.length} prestataire{filteredTaskers.length > 1 ? 's' : ''}</p>
            </div>
            <div className="grid gap-3">
              {filteredTaskers.map((t) => (
                <TaskerCard key={t.id} tasker={t} onClick={() => navigate(`/profile/${t.id}`)} />
              ))}
              {filteredTaskers.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-slate-400">Aucun prestataire trouvé</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-sm">{filteredTasks.length} mission{filteredTasks.length > 1 ? 's' : ''} disponible{filteredTasks.length > 1 ? 's' : ''}</p>
              <button onClick={() => navigate('/post-task')} className="text-indigo-600 text-xs font-medium hover:text-indigo-700 transition-colors">
                + Publier la mienne
              </button>
            </div>
            <div className="space-y-3">
              {filteredTasks.map((t) => (
                <TaskCard key={t.id} task={t} onOffer={(task) => console.log('Offer on:', task.id)} />
              ))}
              {filteredTasks.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-slate-400">Aucune mission disponible pour le moment</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
