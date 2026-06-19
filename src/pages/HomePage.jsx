import { useNavigate } from 'react-router-dom'
import { Shield, Search, PlusCircle, Star, ArrowRight, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const QUICK_CATEGORIES = [
  { icon: 'P', label: 'Peinture', count: '412 pro·s', color: 'var(--color-ks-kinpaku)' },
  { icon: 'É', label: 'Électricité', count: '318 pro·s', color: 'var(--color-ks-patina)' },
  { icon: 'Pl', label: 'Plomberie', count: '276 pro·s', color: 'var(--color-ks-kinpaku-rich)' },
  { icon: 'M', label: 'Menuiserie', count: '198 pro·s', color: 'var(--color-ks-patina-pale)' },
]

export default function HomePage() {
  const { profile, verificationStatus } = useAuth()
  const navigate = useNavigate()
  const firstName = profile?.full_name?.split(' ')?.[0] || ''

  return (
    <div className="min-h-screen bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm] font-sans">
      <TopNav />
      <div className="page-container p-0 md:px-6 max-w-6xl mx-auto">

        {/* Hero greeting */}
        <div className="bg-[--color-ks-lacquer-deep] border border-[--color-ks-gold-hairline] p-8 md:p-16 mb-16 relative overflow-hidden rounded-md mt-6 md:mt-0">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[--color-ks-graphite-2] to-transparent opacity-20 pointer-events-none"></div>
          <div className="absolute top-8 right-8 w-[1px] h-32 bg-[--color-ks-gold-hairline] pointer-events-none"></div>
          <div className="absolute top-8 right-8 h-[1px] w-32 bg-[--color-ks-gold-hairline] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-black] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[--color-ks-patina] animate-pulse"></span>
              <span className="text-[--color-ks-text-muted] text-[0.65rem] font-mono uppercase tracking-widest">
                Espace bienveillant & vérifié
              </span>
            </div>

            <h1 className="text-display mb-6">
              VOS TRAVAUX,<br />EN TOUTE CONFIANCE.
            </h1>
            <p className="text-[--color-ks-text-warm] text-lg md:text-xl font-normal mb-10 max-w-2xl leading-relaxed">
              Trouvez des artisan·es et prestataires de confiance près de chez vous. Une communauté qui rénove sans jugement, avec précision et respect.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => navigate('/marketplace')}
                className="btn-primary"
              >
                <Search size={18} />
                Rechercher un·e pro
              </button>
              <button
                onClick={() => navigate('/post-task')}
                className="btn-secondary"
              >
                <PlusCircle size={18} />
                Publier un projet
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-0">
          {/* Mini stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { val: '2 400+', label: 'PRO·S VÉRIFIÉ·ES' },
              { val: '4,9/5', label: 'NOTE MOYENNE' },
              { val: '48 villes', label: 'COUVERTES EN FRANCE' }
            ].map((stat, i) => (
              <div key={i} className="ks-card flex flex-col items-center justify-center text-center">
                <p className="text-[--color-ks-champagne] text-3xl font-display font-light mb-1">{stat.val}</p>
                <p className="text-[--color-ks-text-muted] text-[0.7rem] font-mono tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Verification alert if not verified */}
          {verificationStatus !== 'approved' && (
            <button
              onClick={() => navigate('/onboarding/verification')}
              className="w-full bg-[--color-ks-lacquer-deep] border border-[--color-ks-gold-hairline-strong] p-6 rounded-md flex items-center gap-6 mb-16 transition-all hover:bg-[--color-ks-raised-lacquer] text-left group"
            >
              <div className="w-12 h-12 rounded-full border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-black] flex items-center justify-center flex-shrink-0 group-hover:border-[--color-ks-kinpaku] transition-colors">
                <Shield size={20} className="text-[--color-ks-kinpaku]" />
              </div>
              <div className="flex-1">
                <p className="text-[--color-ks-champagne] font-medium text-lg mb-1">
                  {verificationStatus === 'unsubmitted' ? 'Complétez votre vérification' : 'Vérification en cours'}
                </p>
                <p className="text-[--color-ks-text-muted] text-sm">
                  {verificationStatus === 'unsubmitted'
                    ? 'Soumettez votre pièce d\'identité pour accéder à tout le contenu.'
                    : 'Votre document est en cours d\'examen (24-48h).'}
                </p>
              </div>
              <ArrowRight size={20} className="text-[--color-ks-text-muted] group-hover:text-[--color-ks-kinpaku] transition-colors hidden sm:block" />
            </button>
          )}

          {/* Quick access categories */}
          <div className="mb-20">
            <div className="flex items-end justify-between mb-8 border-b border-[--color-ks-gold-hairline] pb-4">
              <div>
                <h2 className="text-headline">Catégories populaires</h2>
              </div>
              <button onClick={() => navigate('/marketplace')} className="hidden sm:flex text-[--color-ks-text-muted] hover:text-[--color-ks-kinpaku] text-[0.75rem] font-mono tracking-widest uppercase items-center gap-2 transition-colors">
                TOUT VOIR <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="ks-bento grid grid-cols-2 md:grid-cols-4 gap-2">
              {QUICK_CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  onClick={() => navigate('/marketplace')}
                  className="ks-bento-tile flex flex-col items-start hover:bg-[--color-ks-graphite] transition-colors text-left"
                >
                  <div className="text-2xl font-display font-light mb-4" style={{ color: cat.color }}>
                    {cat.icon}
                  </div>
                  <span className="text-[--color-ks-champagne] text-base font-medium">{cat.label}</span>
                  <span className="text-[--color-ks-text-muted] text-xs mt-1 font-mono tracking-wider">{cat.count}</span>
                </button>
              ))}
            </div>
            <button onClick={() => navigate('/marketplace')} className="mt-6 w-full sm:hidden btn-secondary">
              Toutes les catégories
            </button>
          </div>

          {/* Safety features */}
          <div className="mb-16">
            <h2 className="text-headline mb-8 border-b border-[--color-ks-gold-hairline] pb-4">Pourquoi SafeTask</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Identité vérifiée', desc: 'Chaque prestataire passe par un contrôle rigoureux avant chaque mise en relation.' },
                { icon: Star, title: 'Charte signée', desc: 'Tolérance zéro pour la discrimination. Chaque membre signe notre charte.' },
                { icon: Users, title: 'Communauté', desc: 'Un espace pensé pour et par la communauté et ses allié·e·s, ouvert à tou·tes.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="ks-card flex flex-col items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-deep] flex items-center justify-center flex-shrink-0 mb-2">
                    <Icon size={18} className="text-[--color-ks-kinpaku]" />
                  </div>
                  <div>
                    <p className="text-[--color-ks-champagne] font-medium text-lg mb-2">{title}</p>
                    <p className="text-[--color-ks-text-muted] text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
