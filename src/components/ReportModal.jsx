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
      const { error } = await supabase.from('reports').insert([{
        reporter_id: user.id,
        reported_id: reportedUserId,
        context_type: contextType,
        reason,
        status: 'pending',
      }])

      if (!error) {
        setSubmitted(true)
        onReported?.()
      }
    } catch (err) {
      console.error('Report error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/50"
    >
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-popover overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-crimson-50 border border-crimson-100 flex items-center justify-center">
              <Flag size={18} className="text-crimson-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Signaler &amp; bloquer</h3>
              <p className="text-slate-500 text-xs">{reportedUserName || 'cet utilisateur'}</p>
            </div>
          </div>
          {!submitting && (
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <X size={18} className="text-slate-400" />
            </button>
          )}
        </div>

        {submitted ? (
          /* Success state */
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={26} className="text-emerald-600" />
            </div>
            <h4 className="text-slate-900 font-bold text-lg mb-2">Signalement envoyé</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-2">
              Notre équipe de modération va examiner ce signalement dans les plus brefs délais.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              La conversation a été <span className="text-crimson-600 font-semibold">gelée</span> en attendant la résolution.
            </p>
            <button onClick={onClose} className="btn-primary w-full">
              Compris
            </button>
          </div>
        ) : (
          /* Form */
          <div className="p-5">
            <div className="bg-crimson-50 border border-crimson-100 rounded-lg p-4 mb-5">
              <p className="text-crimson-700 text-sm font-medium">
                En signalant, la conversation sera immédiatement gelée et notre équipe sera alertée. En cas de danger immédiat, composez le <strong>17</strong>.
              </p>
            </div>

            <p className="text-slate-700 text-sm font-medium mb-3">Motif du signalement</p>
            <div className="space-y-2 mb-4">
              {REPORT_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors duration-150 ${
                    selectedReason === reason
                      ? 'border-crimson-300 bg-crimson-50 text-crimson-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
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
                rows={3}
                className="input-field resize-none mb-4 text-sm"
              />
            )}

            <div className="flex gap-3">
              <button onClick={onClose} className="btn-secondary flex-1" disabled={submitting}>
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedReason || submitting || (selectedReason === 'Autre raison' && !customReason)}
                className="btn-danger flex-1 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="spinner w-4 h-4" />
                ) : (
                  <>
                    <Send size={16} />
                    Signaler
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
