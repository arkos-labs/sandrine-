import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, ShieldCheck, ArrowRight, Wrench, Leaf, Truck, SprayCan, Baby, PawPrint, Laptop, Home, BookOpen, MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'
import { Footer } from '../components/Footer'
import { RainbowCategories } from '../components/RainbowCategories'

const CATEGORIES = [
  { id: 'bricolage', label: 'Bricolage', icon: Wrench },
  { id: 'jardinage', label: 'Jardinage', icon: Leaf },
  { id: 'demenagement', label: 'Déménagement', icon: Truck },
  { id: 'menage', label: 'Ménage', icon: SprayCan },
  { id: 'enfants', label: 'Enfants', icon: Baby },
  { id: 'animaux', label: 'Animaux', icon: PawPrint },
  { id: 'informatique', label: 'Informatique', icon: Laptop },
  { id: 'aide', label: 'Aide à domicile', icon: Home },
  { id: 'cours', label: 'Cours particuliers', icon: BookOpen },
]

const JOBBERS = [
  { id: '1', name: 'Stéphane', role: 'Jardinier', rating: '4.93', reviews: '444 avis', price: '25 €/h', img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=300&q=80', top: true, tags: ['Espace Safe', 'Respect des lieux', 'Allié'] },
  { id: '2', name: 'Mame Diarra', role: 'Femme de ménage', rating: '4.88', reviews: '271 avis', price: '16 €/h', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=300&q=80', top: false, tags: ['Résultat impeccable', 'Inclusif', 'Discret'] },
  { id: '3', name: 'Ange', role: 'Bricolage', rating: '4.94', reviews: '431 avis', price: '30 €/h', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', top: true, tags: ['Bienveillance', 'LGBTQIA+', 'Efficace'] },
  { id: '4', name: 'Emma', role: 'Pet-sitter', rating: '4.97', reviews: '31 avis', price: '10 €/h', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', top: false, tags: ['Amoureuse des animaux', 'Safe Space'] },
]

export default function HomePage() {
  const { verificationStatus } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  
  const placeholders = [
    "Cours d'informatique", "Ranger du bois", "Fixer une étagère", 
    "Monter un meuble", "Déménager", "Ménage"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-800">
      <TopNav />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-28 md:pb-40 flex flex-col items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1920&q=80"
            alt="Services à domicile inclusifs"
            className="w-full h-[110%] object-cover object-center"
          />
          {/* Overlay gradient to lighten the image slightly */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center mt-4">
          
          {/* Text Container without card styling */}
          <div className="flex flex-col items-center text-center w-[92%] max-w-3xl mb-8 mt-4">
            


            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Le talent idéal, au sein<br className="hidden md:block" /> de notre communauté
            </h1>
            
            <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-medium">
              Trouvez des prestataires vérifiés, dans un espace bienveillant, inclusif et sécurisé pour tous.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-[92%] max-w-[600px] mx-auto flex flex-col items-center relative z-30 mb-10 mt-4">
            <div className="w-full bg-white rounded-[28px] p-2 flex items-center shadow-xl border border-slate-100">
              <div className="pl-4 text-slate-800">
                <Search size={22} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                className="flex-1 bg-transparent border-none py-4 px-3 text-slate-800 placeholder:text-slate-500 outline-none text-[15px] transition-all"
              />
              <button 
                onClick={() => navigate('/marketplace')}
                className="bg-[#5B21B6] text-white p-3.5 rounded-full hover:bg-purple-800 transition-colors flex-shrink-0 shadow-md"
              >
                <ArrowRight size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="w-full relative px-4">
            <RainbowCategories />
          </div>
        </div>
      </section>

      {/* Categories Row (Overlapping Hero) - Mobile Only */}
      <section className="relative z-20 px-4 -mt-16 mb-8 max-w-7xl mx-auto md:hidden">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex gap-4 overflow-x-auto snap-x no-scrollbar border border-slate-100">
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <button 
              key={id}
              onClick={() => navigate('/' + id)}
              className="flex flex-col items-center gap-3 min-w-[80px] snap-center group"
            >
              <div className="relative w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute inset-0 bg-rainbow-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
              </div>
              <span className="text-sm font-medium text-slate-700 whitespace-nowrap transition-colors duration-300">
                {label}
              </span>
            </button>
          ))}
        </div>
      </section>


      {/* Top Jobbers Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">
          Plus de 10 000 prestataires bienveillants, inclusifs et évalués
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
                  <div className="absolute bottom-3 right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Star size={12} className="fill-current" />
                    Top prestataire
                  </div>
                )}
                {/* Subtle gradient at bottom for text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-bold text-slate-800">{jobber.name}</h3>
                  <span className="text-lg font-bold text-slate-800">{jobber.price}</span>
                </div>
                <p className="text-slate-500 text-sm mb-3">{jobber.role}</p>
                
                <div className="flex items-center gap-1.5 mb-4">
                  <Star size={16} className="text-[#FFB800] fill-[#FFB800]" />
                  <span className="font-bold text-slate-800">{jobber.rating}</span>
                  <span className="text-slate-400 text-sm">({jobber.reviews})</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
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

      {/* Verification CTA (If not verified) */}
      {verificationStatus !== 'approved' && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-gradient-to-tr from-yellow-500/20 via-green-500/20 to-teal-500/20 blur-3xl"></div>
            
            <ShieldCheck size={48} className="mx-auto mb-6 text-white/90 relative z-10" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Rejoignez l'espace bienveillant</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Vérifiez votre identité pour interagir, publier et réserver en toute sécurité au sein de la communauté LGBT+ et alliés.
            </p>
            <button
              onClick={() => navigate('/onboarding/verification')}
              className="relative z-10 bg-white text-slate-900 font-bold text-lg rounded-full py-4 px-8 hover:bg-slate-50 transition-colors shadow-md"
            >
              Vérifier mon identité
            </button>
          </div>
        </section>
      )}

      <Footer />
      <BottomNav />
      
      {/* Hide default scrollbar for the categories row */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  )
}

