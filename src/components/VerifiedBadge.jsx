import { Check, Clock, XCircle } from 'lucide-react'

const statusConfig = {
  approved: {
    label: 'Vérifié·e',
    className: 'badge-verified',
    icon: Check,
  },
  pending: {
    label: 'En attente',
    className: 'badge-pending',
    icon: Clock,
  },
  rejected: {
    label: 'Refusé',
    className: 'badge-rejected',
    icon: XCircle,
  },
  unsubmitted: {
    label: 'Non vérifié',
    className: 'badge-rejected',
    icon: XCircle,
  },
}

export function VerifiedBadge({ status = 'unsubmitted', size = 'sm' }) {
  const config = statusConfig[status] || statusConfig.unsubmitted
  const Icon = config.icon

  if (status === 'approved') {
    return (
      <span className={config.className}>
        <Icon size={12} strokeWidth={2.5} /> {config.label}
      </span>
    )
  }

  if (status === 'pending') {
    return (
      <span className={config.className}>
        <Icon size={12} strokeWidth={2} />
        {config.label}
      </span>
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
