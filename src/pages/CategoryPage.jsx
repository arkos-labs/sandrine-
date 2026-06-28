import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ServiceCategoryModal } from '../components/ServiceCategoryModal'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'
import { Footer } from '../components/Footer'
import { Star, ShieldCheck, ArrowRight, Wrench, Leaf, Truck, SprayCan, Baby, PawPrint, Laptop, Home, BookOpen } from 'lucide-react'

const CATEGORY_DATA = {
  'bricolage': { label: 'Bricolage', icon: Wrench, color: 'text-[#0078FA]', bg: 'bg-blue-50', desc: "Des petits travaux d'intérieur au montage de meubles", verb: 'de bricolage' },
  'jardinage': { label: 'Jardinage', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50', desc: "Tonte de pelouse, taille de haies et entretien d'extérieur", verb: 'de jardinage' },
  'demenagement': { label: 'Déménagement', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50', desc: "Aide au déménagement et transport d'objets lourds", verb: 'de déménagement' },
  'menage': { label: 'Ménage', icon: SprayCan, color: 'text-teal-600', bg: 'bg-teal-50', desc: "Ménage régulier ou ponctuel, repassage et grand nettoyage", verb: 'de ménage' },
  'enfants': { label: 'Enfants', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-50', desc: "Baby-sitting, sortie d'école et garde d'enfants", verb: 'de garde d\'enfants' },
  'animaux': { label: 'Animaux', icon: PawPrint, color: 'text-purple-600', bg: 'bg-purple-50', desc: "Promenade, visite et garde de vos animaux de compagnie", verb: 'pour vos animaux' },
  'informatique': { label: 'Informatique', icon: Laptop, color: 'text-slate-700', bg: 'bg-slate-200', desc: "Dépannage informatique et installation de matériel", verb: 'informatique' },
  'aide': { label: 'Aide à domicile', icon: Home, color: 'text-orange-600', bg: 'bg-orange-50', desc: "Aide aux courses, préparation de repas et accompagnement", verb: 'd\'aide à domicile' },
  'cours': { label: 'Cours particuliers', icon: BookOpen, color: 'text-yellow-700', bg: 'bg-yellow-50', desc: "Soutien scolaire, cours de langues, musique et coaching", verb: 'de cours particuliers' }
}

const JOBBERS = [
  { id: '1', name: 'Ange', role: 'Top Profil', rating: '4.94', reviews: '431 avis', price: '30 €/h', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', top: true, tags: ['Bienveillance', 'LGBTQIA+', 'Efficace'] },
  { id: '2', name: 'Rida', role: 'Vérifié', rating: '4.96', reviews: '1081 avis', price: '30 €/h', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', top: true, tags: ['Qualité avant rapidité', 'Allié'] },
  { id: '3', name: 'Amadou', role: 'Vérifié', rating: '4.99', reviews: '935 avis', price: '20 €/h', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', top: true, tags: ['Organisé et méthodique', 'Travail soigné', 'Inclusif'] },
  { id: '4', name: 'Sami', role: 'Vérifié', rating: '4.95', reviews: '774 avis', price: '29 €/h', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', top: true, tags: ['Travail soigné', 'Respect des lieux', 'Espace Safe'] }
]

export default function CategoryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const catId = location.pathname.substring(1)
  const category = CATEGORY_DATA[catId] || CATEGORY_DATA['bricolage']
  const Icon = category.icon

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-800">
      <TopNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white border-b border-slate-100 flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
        <div className={`w-16 h-16 rounded-full ${category.bg} ${category.color} flex items-center justify-center mb-6 shadow-sm`}>
          <Icon size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
          {category.label}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          {category.desc}, trouvez le talent idéal au sein de notre communauté.
        </p>
        <button
          onClick={() => setIsCategoryModalOpen(true)}
          className="bg-[#0078FA] text-white font-bold text-lg rounded-full py-4 px-8 hover:bg-blue-600 transition-colors shadow-md flex items-center gap-2"
        >
          Demander un service
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Services List Block */}
      <section className="py-16 px-4 bg-white animate-in slide-in-from-bottom-8 duration-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
            Réserver tous les services {category.verb}
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Trouvez un prestataire qualifié pour tous vos besoins dans un espace bienveillant et inclusif.
          </p>
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-white text-[#0078FA] border-2 border-[#0078FA] font-bold text-lg rounded-full py-3 px-8 hover:bg-blue-50 transition-colors"
          >
            Demander un service {category.verb}
          </button>
        </div>
      </section>

      {/* Top Jobbers Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          Choisissez votre prestataire les yeux fermés
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOBBERS.map((jobber) => (
            <div 
              key={jobber.id} 
              onClick={() => navigate('/marketplace')}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={jobber.img} 
                  alt={jobber.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {jobber.top && (
                  <div className="absolute bottom-3 right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-10">
                    <Star size={12} className="fill-current" />
                    Top prestataire
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-bold text-slate-800">{jobber.name}</h3>
                  <span className="text-lg font-bold text-slate-800">{jobber.price}</span>
                </div>
                <p className="text-slate-500 text-sm mb-3 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-green-600" />
                  {category.label}
                </p>
                
                <div className="flex items-center gap-1.5 mb-4">
                  <Star size={16} className="text-[#FFB800] fill-[#FFB800]" />
                  <span className="font-bold text-slate-800">{jobber.rating}</span>
                  <span className="text-slate-400 text-sm">({jobber.reviews})</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {jobber.tags.map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <BottomNav />
      <ServiceCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
        initialCategory={catId}
      />
    </div>
  )
}
