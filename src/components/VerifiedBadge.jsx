import { Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react'
export function VerifiedBadge({ status = 'unsubmitted', showText = true }) {
  if (status === 'approved') {
    return (
      <div className={`badge-verified inline-flex items-center justify-center`}>
        <ShieldCheck size={14} className="flex-shrink-0" />
        {showText && <span>Vérifié</span>}
      </div>
    )
  }
  
  if (status === 'pending') {
    return (
      <div className={`badge-pending inline-flex items-center justify-center`}>
        <Shield size={14} className="flex-shrink-0" />
        {showText && <span>En attente</span>}
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className={`inline-flex items-center justify-center gap-1 bg-[--color-tx-danger-light] text-[--color-tx-danger] text-[11px] font-bold px-2 py-0.5 rounded-full`}>
        <ShieldAlert size={14} className="flex-shrink-0" />
        {showText && <span>Refusé</span>}
      </div>
    )
  }

  return null
}

export function VerifiedCheck({ size = 14 }) {
  return (
    <span className="badge-verified">
      <Check size={12} strokeWidth={2.5} /> Vérifié·e
    </span>
  )
}
