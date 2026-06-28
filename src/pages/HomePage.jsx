import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, ShieldCheck, ArrowRight as ArrowRightIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const POPULAR_SERVICES = [
  {
    id: 'bricolage',
    label: 'Bricolage & réparation',
    price: 'À partir de 15€/h',
    bg: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80',
    tags: ['Meubles', 'Réparations', 'Montage'],
  },
  {
    id: 'informatique',
    label: 'Assistance informatique',
    price: 'À partir de 20€/h',
    bg: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    tags: ['Dépannage', 'Réseau', 'Installation'],
  },
  {
    id: 'animaux',
    label: 'Garde d’animaux',
    price: 'À partir de 12€/h',
    bg: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
    tags: ['Chiens', 'Chats', 'Promenade'],
  },
]

const TASKERS = [
  { id: '1', name: 'Camille B.', skills: ['Bricolage', 'Montage'], rating: '4.9', reviews: '127 avis', price: 'À partir de 15€/h', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '2', name: 'Marwan S.', skills: ['Informatique', 'Réseau'], rating: '4.8', reviews: '89 avis', price: 'À partir de 20€/h', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '3', name: 'Léa D.', skills: ['Photographie', 'Vidéo'], rating: '5.0', reviews: '54 avis', price: 'À partir de 30€/h', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80' },
]

export default function HomePage() {
  const { verificationStatus } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-[--color-tx-bg] font-sans text-[--color-tx-text] selection:bg-[--color-tx-primary-light] selection:text-[--color-tx-navy]">
      <TopNav />

      {/* Hero */}
      <section className="border-b border-[--color-tx-border] px-4 pt-20 pb-24">
        <div className="max-w-[760px] w-full mx-auto flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-[--color-tx-bg-alt] border border-[--color-tx-border] rounded-full text-xs font-medium text-[--color-tx-text-secondary]">
            <ShieldCheck size={14} className="text-[--color-tx-primary]" />
            Profils vérifiés par notre équipe
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] mb-5 max-w-3xl font-display tracking-tight text-[--color-tx-navy] text-balance">
            Votre entraide de confiance pour chaque besoin
          </h1>

          <p className="text-base md:text-lg text-[--color-tx-text-secondary] mb-10 max-w-xl leading-relaxed">
            Connecter la communauté LGBT+ avec des talents reconnus pour vos projets du quotidien.
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); navigate('/marketplace') }}
            className="w-full max-w-xl flex items-center gap-2 p-1.5 bg-white border border-[--color-tx-border] rounded-xl shadow-sm"
          >
            <Search className="text-[--color-tx-text-muted] ml-3 flex-shrink-0" size={18} aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Rechercher un service ou un membre"
              placeholder="Bricolage, informatique, garde d'animaux..."
              className="flex-1 bg-transparent border-none py-2.5 text-[--color-tx-text] placeholder:text-[--color-tx-text-muted] outline-none text-sm w-full min-w-0"
            />
            <button type="submit" className="btn-primary text-sm py-2.5 px-5 flex-shrink-0">
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[--color-tx-navy] mb-2 font-display tracking-tight">Services populaires</h2>
              <p className="text-[--color-tx-text-secondary] max-w-xl">Les catégories les plus demandées par la communauté.</p>
            </div>
            <button onClick={() => navigate('/marketplace')} className="text-sm font-medium text-[--color-tx-text-secondary] hover:text-[--color-tx-navy] transition-colors flex items-center gap-1.5 flex-shrink-0">
              Tout voir <ArrowRightIcon size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {POPULAR_SERVICES.map((service, i) => (
              <div
                key={i}
                className="relative h-[320px] rounded-xl overflow-hidden group cursor-pointer border border-[--color-tx-border]"
                onClick={() => navigate('/marketplace')}
              >
                <img src={service.bg} alt={service.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-white/95 text-[--color-tx-navy] text-xs font-semibold py-1.5 px-3 rounded-md">
                  {service.price}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{service.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-xs text-white/85 border border-white/25 rounded-md px-2.5 py-1">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Guide */}
      <section className="py-20 px-4 bg-[--color-tx-bg-alt] border-t border-b border-[--color-tx-border]">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-2xl md:text-4xl font-semibold text-[--color-tx-navy] mb-4 font-display leading-[1.15] tracking-tight">
              Un guide simple pour vos besoins du quotidien
            </h2>
            <p className="text-base md:text-lg text-[--color-tx-text-secondary] leading-relaxed max-w-md">
              Découvrez à quel point il est simple d'obtenir de l'aide professionnelle ou de proposer vos talents dans un espace sécurisé.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { num: '1', title: 'Choisissez votre service', desc: 'Parcourez notre large gamme de catégories et sélectionnez celle qui correspond à votre besoin : bricolage, soutien, informatique, et bien d’autres.' },
              { num: '2', title: 'Réservez un talent', desc: 'Sélectionnez parmi nos membres vérifiés, lisez les avis et planifiez la prestation à l’heure qui vous convient le mieux.' },
              { num: '3', title: 'Grandissons ensemble', desc: 'Détendez-vous pendant que le service est rendu avec bienveillance. Laissez un avis pour renforcer la solidarité communautaire.' },
            ].map((step, i) => (
              <div key={i} className="tx-card flex gap-5">
                <div className="w-9 h-9 rounded-lg bg-[--color-tx-navy] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[--color-tx-navy] mb-1.5 tracking-tight">{step.title}</h3>
                  <p className="text-[--color-tx-text-secondary] leading-relaxed text-[15px]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Taskers */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[--color-tx-navy] mb-2 font-display tracking-tight">Ils font vivre la communauté</h2>
              <p className="text-[--color-tx-text-secondary] max-w-xl">Des membres reconnus pour leur bienveillance et la qualité de leur entraide.</p>
            </div>
            <button onClick={() => navigate('/marketplace')} className="text-sm font-medium text-[--color-tx-text-secondary] hover:text-[--color-tx-navy] transition-colors flex items-center gap-1.5 flex-shrink-0">
              Tous les profils <ArrowRightIcon size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TASKERS.map((tasker, i) => (
              <div key={i} className="tx-card flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <img src={tasker.img} alt={tasker.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-semibold text-[--color-tx-navy] text-base tracking-tight mb-1 truncate">{tasker.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <Star size={13} className="fill-[--color-tx-navy] text-[--color-tx-navy]" aria-hidden="true" />
                      <span className="text-sm font-medium text-[--color-tx-text]">{tasker.rating}</span>
                      <span className="text-[--color-tx-text-secondary] text-sm">· {tasker.reviews}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tasker.skills.map(s => (
                    <span key={s} className="skill-tag text-xs">{s}</span>
                  ))}
                </div>

                <div className="mt-auto pt-5 border-t border-[--color-tx-border] flex items-center justify-between">
                  <span className="text-[--color-tx-text-secondary] text-sm font-medium">{tasker.price}</span>
                  <button onClick={() => navigate('/marketplace')} className="btn-secondary text-sm py-2 px-4">
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification CTA */}
      {verificationStatus !== 'approved' && (
        <section className="bg-[--color-tx-navy] text-white py-16 px-4">
          <div className="max-w-[640px] mx-auto text-center">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={22} />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">Rejoignez l'espace de confiance</h2>
            <p className="text-white/65 text-base mb-8 max-w-md mx-auto leading-relaxed">
              Complétez votre profil en vérifiant votre identité pour interagir, publier et réserver en toute sécurité.
            </p>
            <button
              onClick={() => navigate('/onboarding/verification')}
              className="bg-white text-[--color-tx-navy] font-medium rounded-lg py-3 px-6 text-sm hover:bg-white/90 transition-colors"
            >
              Vérifier mon identité
            </button>
          </div>
        </section>
      )}

      <BottomNav />
    </div>
  )
}
