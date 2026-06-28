import { useState, useEffect } from 'react'
import { X, Search, ChevronRight, ArrowLeft, Wrench, Leaf, Truck, SprayCan, Baby, PawPrint, Laptop, Home, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ROOT_CATEGORIES = [
  { id: 'bricolage', label: 'Bricolage', icon: Wrench, color: 'bg-orange-100 text-orange-600' },
  { id: 'jardinage', label: 'Jardinage', icon: Leaf, color: 'bg-green-100 text-green-600' },
  { id: 'demenagement', label: 'Déménagement', icon: Truck, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'menage', label: 'Ménage', icon: SprayCan, color: 'bg-teal-100 text-teal-600' },
  { id: 'enfants', label: 'Enfants', icon: Baby, color: 'bg-pink-100 text-pink-600' },
  { id: 'animaux', label: 'Animaux', icon: PawPrint, color: 'bg-purple-100 text-purple-600' },
  { id: 'informatique', label: 'Informatique', icon: Laptop, color: 'bg-slate-200 text-slate-700' },
  { id: 'aide', label: 'Aide à domicile', icon: Home, color: 'bg-orange-100 text-orange-600' },
  { id: 'cours', label: 'Cours particuliers', icon: BookOpen, color: 'bg-yellow-100 text-yellow-700' },
]

const SUBCATEGORIES = {
  'bricolage': ['Montage de meubles', 'Fixation au mur', 'Petits travaux', 'Peinture', 'Plomberie', 'Électricité', 'Autre demande'],
  'jardinage': ['Tonte de pelouse', 'Taille de haies', 'Débroussaillage', 'Entretien de jardin', 'Création de jardin', 'Autre demande'],
  'demenagement': ['Aide au déménagement', 'Transport de meubles', 'Montage/Démontage', 'Manutention', 'Autre demande'],
  'menage': ['Ménage régulier', 'Grand nettoyage', 'Nettoyage électroménager', 'Nettoyage textile', 'Nettoyage voiture', 'Repassage', 'Lavage de vitres', 'Autre demande'],
  'enfants': ['Garde d\'enfants', 'Baby-sitting', 'Sortie d\'école', 'Aide aux devoirs', 'Autre demande'],
  'animaux': ['Garde de chien', 'Garde de chat', 'Promenade de chien', 'Visite à domicile', 'Toilettage', 'Autre demande'],
  'informatique': ['Dépannage PC/Mac', 'Installation réseau/box', 'Réparation smartphone', 'Initiation', 'Autre demande'],
  'aide': ['Courses et livraison', 'Préparation de repas', 'Aide administrative', 'Soutien moral', 'Autre demande'],
  'cours': ['Soutien scolaire', 'Cours de langues', 'Cours de musique', 'Coaching sportif', 'Autre demande']
}

export function ServiceCategoryModal({ isOpen, onClose, initialCategory = null }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  // Reset to initial category when opened
  useEffect(() => {
    if (isOpen) {
      setActiveCategory(initialCategory)
      setSearch('')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, initialCategory])

  if (!isOpen) return null

  const handleRootCategoryClick = (id) => {
    setActiveCategory(id)
    setSearch('')
  }

  const handleSubCategoryClick = (subCatLabel) => {
    onClose()
    navigate('/post-task', { state: { category: activeCategory, title: subCatLabel } })
  }

  const renderContent = () => {
    if (!activeCategory) {
      // Show Root Categories
      const filteredCategories = ROOT_CATEGORIES.filter(c => 
        c.label.toLowerCase().includes(search.toLowerCase())
      )

      return (
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="text-3xl font-bold text-slate-800">Demander un service</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 pb-6">
            <div className="bg-slate-100 rounded-xl flex items-center px-4 py-3 border border-transparent focus-within:border-[#0078FA] focus-within:bg-white transition-colors shadow-sm">
              <Search size={20} className="text-slate-400 mr-3" />
              <input 
                type="text"
                placeholder="De quel service avez-vous besoin ?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-slate-800 placeholder:text-slate-400 text-lg"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCategories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => handleRootCategoryClick(category.id)}
                    className="flex items-center p-4 rounded-2xl border border-slate-200 hover:border-[#0078FA]/50 hover:shadow-md transition-all group bg-white text-left"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 ${category.color} group-hover:scale-110 transition-transform`}>
                      <Icon size={28} strokeWidth={2} />
                    </div>
                    <span className="flex-1 text-lg font-medium text-slate-700 group-hover:text-slate-900">
                      {category.label}
                    </span>
                    <ChevronRight size={20} className="text-slate-400 group-hover:text-[#0078FA] transition-colors" />
                  </button>
                )
              })}
              
              {filteredCategories.length === 0 && (
                <div className="col-span-1 sm:col-span-2 text-center py-10 text-slate-500">
                  Aucun service trouvé pour "{search}"
                </div>
              )}
            </div>
          </div>
        </>
      )
    } else {
      // Show Subcategories
      const catData = ROOT_CATEGORIES.find(c => c.id === activeCategory)
      const subcats = SUBCATEGORIES[activeCategory] || []
      const filteredSubcats = subcats.filter(s => s.toLowerCase().includes(search.toLowerCase()))
      const Icon = catData.icon

      return (
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveCategory(null)}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft size={24} strokeWidth={2.5} />
              </button>
              <h2 className="text-3xl font-bold text-slate-800">{catData.label}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 pb-4">
            <div className="bg-slate-100 rounded-xl flex items-center px-4 py-3 border border-transparent focus-within:border-[#0078FA] focus-within:bg-white transition-colors shadow-sm">
              <Search size={20} className="text-slate-400 mr-3" />
              <input 
                type="text"
                placeholder="De quel service avez-vous besoin ?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-slate-800 placeholder:text-slate-400 text-lg"
              />
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="px-6 pb-4 text-sm font-medium text-[#0078FA] flex items-center gap-2">
            <button onClick={() => setActiveCategory(null)} className="hover:underline">Services</button>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-600">{catData.label}</span>
          </div>

          {/* Subcategories List */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="flex flex-col gap-2">
              {filteredSubcats.map((subcat, idx) => (
                <div key={idx}>
                  <button
                    onClick={() => handleSubCategoryClick(subcat)}
                    className="w-full flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${catData.color}`}>
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <span className="flex-1 text-lg text-slate-700 font-medium group-hover:text-slate-900 group-hover:translate-x-1 transition-transform">
                      {subcat}
                    </span>
                    <ChevronRight size={20} className="text-slate-400 group-hover:text-[#0078FA] transition-colors" />
                  </button>
                  {idx !== filteredSubcats.length - 1 && <hr className="border-slate-100 my-1 mx-4" />}
                </div>
              ))}

              {filteredSubcats.length === 0 && (
                <div className="text-center py-10 text-slate-500">
                  Aucun sous-service trouvé pour "{search}"
                </div>
              )}
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose} />
    </div>
  )
}
