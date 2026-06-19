import { useRef, useState } from 'react'
import { CheckCircle, Shield, Heart, Star, AlertTriangle } from 'lucide-react'

const CHARTER_POINTS = [
  {
    icon: Heart,
    color: 'text-[--color-ks-champagne]',
    bg: 'bg-[--color-ks-lacquer-black]',
    border: 'border-[--color-ks-gold-hairline]',
    title: 'Respect absolu',
    text: 'Chaque membre de cette communauté mérite un respect total et inconditionnel. Les propos discriminatoires sous toute forme sont strictement interdits.',
  },
  {
    icon: Shield,
    color: 'text-[--color-ks-champagne]',
    bg: 'bg-[--color-ks-lacquer-black]',
    border: 'border-[--color-ks-gold-hairline]',
    title: 'Espace sécurisé',
    text: 'Cette plateforme est un refuge. Toute personne qui se sent en danger ou harcelée peut alerter immédiatement notre équipe. Nous prenons chaque signalement au sérieux.',
  },
  {
    icon: Star,
    color: 'text-[--color-ks-champagne]',
    bg: 'bg-[--color-ks-lacquer-black]',
    border: 'border-[--color-ks-gold-hairline]',
    title: 'Identité & dignité',
    text: 'Vous vous engagez à respecter l\'identité et les convictions de chacun·e. La bienveillance est le pilier de notre plateforme.',
  },
  {
    icon: AlertTriangle,
    color: 'text-[--color-ks-vermilion]',
    bg: 'bg-[--color-ks-lacquer-black]',
    border: 'border-[--color-ks-vermilion]',
    title: 'Tolérance zéro',
    text: 'Toute violation de cette charte entraîne un bannissement immédiat. Notre équipe de modération veille pour assurer la sécurité de tous.',
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
    <div className="flex flex-col h-full max-h-[85vh] ks-card !p-0 bg-[--color-ks-lacquer-deep] relative overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 text-center border-b border-[--color-ks-gold-hairline] bg-gradient-to-br from-[--color-ks-lacquer-black] to-[--color-ks-graphite]">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-deep] flex items-center justify-center">
            <Shield size={24} className="text-[--color-ks-kinpaku]" />
          </div>
        </div>
        <h2 className="text-display text-3xl mb-2 text-[--color-ks-champagne]">Charte de bienveillance</h2>
        <p className="text-[--color-ks-text-muted] text-[0.65rem] font-mono tracking-widest uppercase">Lisez et signez pour y accéder</p>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[--color-ks-lacquer-deep] custom-scrollbar"
      >
        <p className="text-[--color-ks-text-warm] text-sm leading-relaxed font-light border-l border-[--color-ks-kinpaku] pl-4">
          SafeTask est une plateforme dédiée à la mise en relation bienveillante.
          En vous inscrivant, vous vous engagez solennellement à respecter les principes suivants :
        </p>

        <div className="space-y-4 mt-8">
          {CHARTER_POINTS.map((point, i) => {
            const Icon = point.icon
            return (
              <div key={i} className={`${point.bg} border ${point.border} rounded-md p-5 transition-colors hover:border-[--color-ks-champagne]`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-deep] flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={point.color} />
                  </div>
                  <h3 className={`text-headline text-lg ${point.color}`}>{point.title}</h3>
                </div>
                <p className="text-[--color-ks-text-muted] text-sm font-light leading-relaxed">{point.text}</p>
              </div>
            )
          })}
        </div>

        <div className="border border-[--color-ks-gold-hairline] bg-[--color-ks-graphite] rounded-md p-6 mt-8">
          <p className="text-[--color-ks-champagne] text-sm leading-relaxed font-medium text-center uppercase tracking-wide">
            Ensemble, nous construisons un espace où chacun·e peut être soi-même, en toute confiance.
          </p>
        </div>

        {/* Spacer to ensure scroll reaches bottom */}
        <div className="h-8" />
      </div>

      {/* Sign section */}
      <div className="p-6 md:p-8 border-t border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-black]">
        {!hasScrolled && (
          <div className="bg-[--color-ks-graphite] border border-[--color-ks-gold-hairline] rounded-sm p-3 text-center mb-6 animate-pulse">
            <p className="text-[--color-ks-text-muted] text-xs font-mono uppercase tracking-widest">
              Faites défiler pour lire la charte
            </p>
          </div>
        )}

        <label className={`flex items-start gap-4 mb-8 cursor-pointer group ${!hasScrolled ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className={`mt-0.5 w-6 h-6 rounded-sm flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
            checked ? 'bg-[--color-ks-kinpaku] border-[--color-ks-kinpaku]' : 'bg-[--color-ks-lacquer-deep] border-[--color-ks-gold-hairline] group-hover:border-[--color-ks-champagne]'
          }`} onClick={() => hasScrolled && setChecked(!checked)}>
            {checked && <CheckCircle size={16} className="text-[--color-ks-lacquer-deep]" />}
          </div>
          <span className="text-[--color-ks-champagne] text-sm leading-relaxed font-light">
            Je m'engage solennellement à respecter la Charte de bienveillance de SafeTask.
          </span>
        </label>

        <button
          onClick={handleSign}
          disabled={!checked || !hasScrolled || signing}
          className="btn-primary w-full py-3.5 text-sm"
        >
          {signing ? (
            <div className="spinner w-5 h-5 spinner-white" />
          ) : (
            'SIGNER & CONTINUER'
          )}
        </button>
      </div>
    </div>
  )
}
