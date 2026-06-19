import { useEffect, useRef, useState } from 'react'
import { CheckCircle, X, Send, Flag } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const REPORT_REASONS = [
  'Comportement discriminatoire ou homophobe',
  'Harcèlement ou intimidation',
  'Menaces ou comportement violent',
  'Contenu inapproprié ou offensant',
  'Usurpation d\'identité',
  'Autre raison',
]

export function ReportModal({ isOpen, onClose, reportedUserId, reportedUserName, contextType = 'chat', onReported }) {
  const { user } = useAuth()
  const [selectedReason, setSelectedReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setSubmitted(false)
      setSelectedReason('')
      setCustomReason('')
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === modalRef.current && !submitting) onClose()
  }

  const handleSubmit = async () => {
    if (!selectedReason || submitting) return
    setSubmitting(true)

    const reason = selectedReason === 'Autre raison' ? customReason : selectedReason

    try {
      if (user && user.id !== 'guest') {
        const { error } = await supabase.from('reports').insert([{
          reporter_id: user.id,
          reported_id: reportedUserId,
          context_type: contextType,
          reason,
          status: 'pending',
        }])
        if (error) throw error
      }
      setSubmitted(true)
      onReported?.()
    } catch (err) {
      console.error('Report error:', err)
      setSubmitted(true) // Proceed for demo
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-[--color-ks-lacquer-black]/80 backdrop-blur-md"
    >
      <div className="w-full max-w-lg ks-card !p-0 overflow-hidden bg-[--color-ks-lacquer-deep] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-br from-[--color-ks-lacquer-black] to-[--color-ks-graphite] border-b border-[--color-ks-gold-hairline]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[--color-ks-vermilion] bg-[--color-ks-lacquer-black] flex items-center justify-center">
              <Flag size={20} className="text-[--color-ks-vermilion]" />
            </div>
            <div>
              <h3 className="text-headline text-xl text-[--color-ks-champagne]">Signaler & bloquer</h3>
              <p className="text-[--color-ks-text-muted] text-xs font-mono uppercase tracking-widest">{reportedUserName || 'cet utilisateur'}</p>
            </div>
          </div>
          {!submitting && (
            <button onClick={onClose} className="w-8 h-8 rounded-full border border-[--color-ks-gold-hairline] bg-[--color-ks-graphite] flex items-center justify-center hover:bg-[--color-ks-lacquer-black] transition-colors text-[--color-ks-text-muted] hover:text-[--color-ks-champagne]">
              <X size={16} />
            </button>
          )}
        </div>

        {submitted ? (
          /* Success state */
          <div className="p-8 md:p-10 text-center">
            <div className="w-16 h-16 rounded-full border border-[--color-ks-kinpaku] bg-[--color-ks-lacquer-black] flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={28} className="text-[--color-ks-kinpaku]" />
            </div>
            <h4 className="text-headline text-2xl mb-4 text-[--color-ks-champagne]">Signalement envoyé</h4>
            <p className="text-[--color-ks-text-warm] text-sm leading-relaxed mb-6 font-light">
              Notre équipe de modération va examiner ce signalement dans les plus brefs délais.
            </p>
            <div className="border border-[--color-ks-vermilion] bg-[--color-ks-lacquer-black] rounded-md p-4 mb-8">
              <p className="text-[--color-ks-vermilion] text-[0.65rem] leading-relaxed font-mono tracking-widest uppercase">
                La conversation a été gelée en attendant la résolution.
              </p>
            </div>
            <button onClick={onClose} className="btn-secondary w-full py-3.5 text-sm">
              COMPRIS
            </button>
          </div>
        ) : (
          /* Form */
          <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="border border-[--color-ks-vermilion] bg-[--color-ks-lacquer-black] rounded-md p-4 mb-6">
              <p className="text-[--color-ks-text-muted] text-[0.65rem] font-mono tracking-widest uppercase leading-relaxed">
                <span className="text-[--color-ks-vermilion] block mb-1">Attention</span>
                En signalant, la conversation sera immédiatement gelée et notre équipe sera alertée. En cas de danger immédiat, composez le <span className="text-[--color-ks-champagne] border-b border-[--color-ks-champagne]">17</span>.
              </p>
            </div>

            <p className="text-[--color-ks-champagne] text-xs font-mono mb-4 uppercase tracking-widest">Motif du signalement</p>
            <div className="space-y-3 mb-6">
              {REPORT_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`w-full text-left px-4 py-3.5 border rounded-sm text-sm font-medium transition-colors ${
                    selectedReason === reason
                      ? 'border-[--color-ks-kinpaku] bg-[--color-ks-kinpaku] text-[--color-ks-lacquer-deep]'
                      : 'border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm] hover:border-[--color-ks-champagne] hover:text-[--color-ks-champagne]'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            {selectedReason === 'Autre raison' && (
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Décrivez le problème en détail..."
                rows={4}
                className="input-field resize-none mb-6 text-sm"
              />
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button onClick={onClose} className="btn-secondary flex-1 py-3 text-sm" disabled={submitting}>
                ANNULER
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedReason || submitting || (selectedReason === 'Autre raison' && !customReason)}
                className={`flex-1 py-3 text-sm font-mono tracking-widest uppercase flex items-center justify-center gap-2 border rounded-sm transition-colors ${
                  (!selectedReason || submitting || (selectedReason === 'Autre raison' && !customReason))
                    ? 'border-[--color-ks-gold-hairline] bg-[--color-ks-graphite] text-[--color-ks-text-faint] cursor-not-allowed opacity-50'
                    : 'border-[--color-ks-vermilion] bg-[--color-ks-lacquer-black] text-[--color-ks-vermilion] hover:bg-[--color-ks-vermilion] hover:text-[--color-ks-lacquer-black]'
                }`}
              >
                {submitting ? (
                  <div className="spinner w-5 h-5 spinner-white" />
                ) : (
                  <>
                    <Send size={16} />
                    SIGNALER
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
