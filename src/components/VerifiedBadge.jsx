import { CheckCircle, Clock, XCircle } from 'lucide-react'

const statusConfig = {
  approved: {
    label: 'Vérifié',
    className: 'badge-verified',
    icon: CheckCircle,
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
        <Icon size={10} />
        {config.label}
      </span>
    )
  }

  if (status === 'pending') {
    return (
      <span className={config.className}>
        <Icon size={10} />
        {config.label}
      </span>
    )
  }

  return null
}

export function VerifiedCheck({ size = 14 }) {
  return (
    <span className="badge-verified">
      <CheckCircle size={10} />
      Vérifié
    </span>
  )
}
