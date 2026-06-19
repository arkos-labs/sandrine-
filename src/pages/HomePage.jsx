import { useNavigate } from 'react-router-dom'
import { Shield, Search, PlusCircle, Star, ArrowRight, Users, Briefcase, Award } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const STATS = [
  { label: 'Prestataires vérifiés', value: '1,240+', icon: Award },
  { label: 'Missions réalisées', value: '8,500+', icon: Briefcase },
  { label: 'Membres satisfaits', value: '99%', icon: Star },
]

const QUICK_CATEGORIES = [
  { icon: '🧹', label: 'Ménage' },
  { icon: '🌿', label: 'Jardinage' },
  { icon: '🍳', label: 'Cuisine' },
  { icon: '🪑', label: 'Meubles' },
]

const PRIDE_COLORS = ['#E53E3E', '#FF9F43', '#F4D03F', '#27AE60', '#3B82F6', '#8E44AD']

export default function HomePage() {
  const { profile, verificationStatus } = useAuth()
  const navigate = useNavigate()
  const firstName = profile?.full_name?.split(' ')?.[0] || ''

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <div className="page-container pt-4">

        {/* Hero greeting */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-5">
          <div className="pride-strip mb-5 w-20">
            {PRIDE_COLORS.map((c, i) => (
              <div key={i} className="flex-1" style={{ background: c }} />
            ))}
          </div>

          <p className="text-slate-400 text-sm font-medium mb-1">
            {firstName ? `Bonjour, ${firstName}` : 'Bonjour'}
          </p>
          <h1 className="text-2xl font-bold text-white mb-3 leading-tight">
            Votre espace de confiance
          </h1>
          <p className="text-slate-400 text-sm mb-5">
            Trouvez des prestataires vérifiés qui partagent vos valeurs.
          </p>

          <div className="flex gap-2">
            <button
              id="cta-find-tasker"
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-1.5 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
            >
              <Search size={15} />
              Explorer
            </button>
            <button
              id="cta-post-task"
              onClick={() => navigate('/post-task')}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg border border-slate-700 transition-colors"
            >
              <PlusCircle size={15} />
              Publier
            </button>
          </div>
        </div>

        {/* Verification alert if not verified */}
        {verificationStatus !== 'approved' && (
          <button
            onClick={() => navigate('/onboarding/verification')}
            className="w-full card border border-amber-200 p-4 flex items-center gap-3 mb-5 card-hover text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 font-semibold text-sm">
                {verificationStatus === 'unsubmitted' ? 'Complétez votre vérification' : 'Vérification en cours'}
              </p>
              <p className="text-slate-500 text-xs">
                {verificationStatus === 'unsubmitted'
                  ? 'Soumettez votre pièce d\'identité pour accéder à tout le contenu'
                  : 'Votre document est en cours d\'examen (24-48h)'}
              </p>
            </div>
            <ArrowRight size={16} className="text-slate-400" />
          </button>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-3 text-center">
              <Icon size={16} className="text-indigo-600 mx-auto mb-1" />
              <p className="text-slate-900 font-bold text-lg">{value}</p>
              <p className="text-slate-500 text-[10px] leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick access categories */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-slate-900 font-semibold">Catégories populaires</h2>
            <button onClick={() => navigate('/marketplace')} className="text-indigo-600 text-xs font-medium hover:text-indigo-700 transition-colors flex items-center gap-1">
              Tout voir <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {QUICK_CATEGORIES.map(cat => (
              <button
                key={cat.label}
                onClick={() => navigate('/marketplace')}
                className="flex flex-col items-center gap-2 p-3 rounded-xl card-hover bg-white border border-slate-200"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-slate-700 text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Safety features */}
        <div>
          <h2 className="text-slate-900 font-semibold mb-3">Pourquoi SafeTask</h2>
          <div className="space-y-2">
            {[
              { icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', title: 'Identité vérifiée', desc: 'Chaque prestataire passe par un contrôle d\'identité rigoureux.' },
              { icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', title: 'Charte Safe Space signée', desc: 'Tolérance zéro pour la discrimination — un engagement contractuel.' },
              { icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', title: 'Communauté inclusive', desc: 'Un espace pensé pour et par la communauté LGBTQIA+ et ses allié·e·s.' },
            ].map(({ icon: Icon, color, bg, border, title, desc }) => (
              <div key={title} className="card p-4 flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={16} className={color} />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
