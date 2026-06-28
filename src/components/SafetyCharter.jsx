import { useRef, useState } from 'react'
import { CheckCircle, Shield, Heart, Star, AlertTriangle } from 'lucide-react'

const CHARTER_POINTS = [
  {
    icon: Heart,
    color: 'text-[--color-tx-primary]',
    bg: 'bg-[--color-tx-primary-light]',
    border: 'border-[--color-tx-primary-light]',
    title: 'Respect absolu',
    text: 'Chaque membre de cette communauté mérite un respect total et inconditionnel. Les propos discriminatoires sous toute forme sont strictement interdits.',
  },
  {
    icon: Shield,
    color: 'text-[--color-tx-primary]',
    bg: 'bg-[--color-tx-primary-light]',
    border: 'border-[--color-tx-primary-light]',
    title: 'Espace sécurisé',
    text: 'Cette plateforme est un refuge. Toute personne qui se sent en danger ou harcelée peut alerter immédiatement notre équipe. Nous prenons chaque signalement au sérieux.',
  },
  {
    icon: Star,
    color: 'text-[--color-tx-primary]',
    bg: 'bg-[--color-tx-primary-light]',
    border: 'border-[--color-tx-primary-light]',
    title: 'Inclusivité non genrée',
    text: 'Vous vous engagez à respecter l\'identité et les convictions de chacun·e. L\'entraide et la bienveillance sont les piliers de notre plateforme.',
  },
  {
    icon: AlertTriangle,
    color: 'text-[--color-tx-danger]',
    bg: 'bg-[--color-tx-danger-light]',
    border: 'border-[--color-tx-danger-light]',
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
    <div className="flex flex-col h-full max-h-[85vh] tx-card !p-0 overflow-hidden relative">
      {/* Header */}
      <div className="p-6 md:p-8 text-center border-b border-[--color-tx-border] bg-[--color-tx-bg-alt]">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">
            <Shield size={28} className="text-[--color-tx-primary]" />
          </div>
        </div>
        <h2 className="text-display text-2xl md:text-3xl mb-2 text-[--color-tx-navy]">Charte de bienveillance</h2>
        <p className="text-[--color-tx-text-secondary] text-sm">Lisez et signez pour y accéder</p>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-white"
      >
        <p className="text-[--color-tx-text] text-base leading-relaxed border-l-4 border-[--color-tx-primary] pl-4">
          Queer Service est une plateforme d'entraide basée sur la philosophie Ubuntu : <strong>« Je suis parce que nous sommes. »</strong>
          En vous inscrivant, vous vous engagez solennellement à respecter les principes suivants :
        </p>

        <div className="space-y-4 mt-8">
          {CHARTER_POINTS.map((point, i) => {
            const Icon = point.icon
            return (
              <div key={i} className={`${point.bg} rounded-xl p-5`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon size={20} className={point.color} />
                  </div>
                  <h3 className={`text-headline text-lg ${point.color}`}>{point.title}</h3>
                </div>
                <p className="text-[--color-tx-text-secondary] text-sm leading-relaxed">{point.text}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-[--color-tx-navy] rounded-xl p-6 mt-8">
          <p className="text-white text-base leading-relaxed font-medium text-center">
            Ensemble, nous créons une communauté plus forte, plus autonome et plus solidaire.
          </p>
        </div>

        {/* Spacer to ensure scroll reaches bottom */}
        <div className="h-8" />
      </div>

      {/* Sign section */}
      <div className="p-6 md:p-8 border-t border-[--color-tx-border] bg-white">
        {!hasScrolled && (
          <div className="bg-[--color-tx-bg-alt] rounded-lg p-3 text-center mb-6 animate-pulse">
            <p className="text-[--color-tx-text-secondary] text-sm font-medium">
              Faites défiler pour lire la charte
            </p>
          </div>
        )}

        <label className={`flex items-start gap-4 mb-8 cursor-pointer group ${!hasScrolled ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className={`mt-0.5 w-6 h-6 rounded border-2 transition-colors flex-shrink-0 flex items-center justify-center ${
            checked ? 'bg-[--color-tx-primary] border-[--color-tx-primary]' : 'bg-white border-[--color-tx-border] group-hover:border-[--color-tx-primary]'
          }`} onClick={() => hasScrolled && setChecked(!checked)}>
            {checked && <CheckCircle size={16} className="text-white" />}
          </div>
          <span className="text-[--color-tx-text] text-sm md:text-base font-medium">
            Je m'engage solennellement à respecter la Charte de bienveillance de Queer Service.
          </span>
        </label>

        <button
          onClick={handleSign}
          disabled={!checked || !hasScrolled || signing}
          className="btn-primary w-full py-4 text-base"
        >
          {signing ? (
            <div className="spinner" />
          ) : (
            'SIGNER & CONTINUER'
          )}
        </button>
      </div>
    </div>
  )
}
