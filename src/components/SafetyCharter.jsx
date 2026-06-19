import { useRef, useState } from 'react'
import { CheckCircle, Shield, Heart, Star, AlertTriangle } from 'lucide-react'

const CHARTER_POINTS = [
  {
    icon: Heart,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    title: 'Respect absolu',
    text: 'Chaque membre de cette communauté mérite un respect total et inconditionnel. Les propos homophobes, transphobes, racistes, misogynes ou discriminatoires sous toute forme sont strictement interdits.',
  },
  {
    icon: Shield,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    title: 'Espace sécurisé',
    text: 'Cette plateforme est un refuge. Toute personne qui se sent en danger ou harcelée peut alerter immédiatement notre équipe. Nous prenons chaque signalement au sérieux et agissons dans les 24h.',
  },
  {
    icon: Star,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    title: 'Identité & dignité',
    text: 'Vous vous engagez à respecter l\'identité de genre, l\'orientation sexuelle et les pronoms de chaque personne. Le mégenrage intentionnel est considéré comme une violation de la charte.',
  },
  {
    icon: AlertTriangle,
    color: 'text-crimson-600',
    bg: 'bg-crimson-50',
    border: 'border-crimson-100',
    title: 'Tolérance zéro',
    text: 'Toute violation de cette charte entraîne un bannissement immédiat et permanent sans recours. Notre équipe de modération est disponible 24h/24 et 7j/7 pour assurer la sécurité de tous.',
  },
]

export function SafetyCharter({ onSigned }) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [checked, setChecked] = useState(false)
  const [signing, setSigning] = useState(false)
  const scrollRef = useRef(null)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 40
    if (isAtBottom) setHasScrolled(true)
  }

  const handleSign = async () => {
    if (!checked || !hasScrolled) return
    setSigning(true)
    await onSigned()
    setSigning(false)
  }

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Header */}
      <div className="p-6 text-center border-b border-slate-200">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Shield size={26} className="text-indigo-600" />
          </div>
        </div>
        <h2 className="text-slate-900 font-bold text-xl mb-1">Charte Safe Space</h2>
        <p className="text-slate-500 text-sm">Lisez et signez pour accéder à la plateforme</p>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar"
      >
        <p className="text-slate-600 text-sm leading-relaxed">
          SafeTask est une plateforme dédiée à la communauté <span className="font-semibold text-slate-900">LGBTQIA+ et ses allié·e·s</span>.
          En vous inscrivant, vous vous engagez solennellement à respecter les principes suivants :
        </p>

        {CHARTER_POINTS.map((point, i) => {
          const Icon = point.icon
          return (
            <div key={i} className={`${point.bg} border ${point.border} rounded-xl p-4`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center border ${point.border}`}>
                  <Icon size={16} className={point.color} />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{point.title}</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{point.text}</p>
            </div>
          )
        })}

        <div className="card-flat p-5 border-indigo-100">
          <p className="text-slate-700 text-sm leading-relaxed font-medium text-center">
            Ensemble, nous construisons un espace où chacun·e peut être pleinement soi-même, en toute sécurité.
          </p>
        </div>

        {/* Spacer to ensure scroll reaches bottom */}
        <div className="h-4" />
      </div>

      {/* Sign section */}
      <div className="p-5 border-t border-slate-200">
        {!hasScrolled && (
          <p className="text-slate-400 text-xs text-center mb-3">
            Faites défiler pour lire la charte complète
          </p>
        )}

        <label className={`flex items-start gap-3 mb-4 cursor-pointer group ${!hasScrolled ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 transition-colors duration-150 flex-shrink-0 ${
            checked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'
          }`} onClick={() => hasScrolled && setChecked(!checked)}>
            {checked && <CheckCircle size={12} className="text-white" />}
          </div>
          <span className="text-slate-600 text-sm leading-relaxed">
            Je m'engage solennellement à respecter la Charte Safe Space de SafeTask. Je comprends que toute violation entraîne un <strong className="text-slate-900">bannissement immédiat et permanent</strong>.
          </span>
        </label>

        <button
          onClick={handleSign}
          disabled={!checked || !hasScrolled || signing}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {signing ? (
            <div className="spinner w-5 h-5" />
          ) : (
            <>
              <CheckCircle size={18} />
              Signer la Charte & continuer
            </>
          )}
        </button>
      </div>
    </div>
  )
}
