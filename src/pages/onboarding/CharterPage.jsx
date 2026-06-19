import { useNavigate } from 'react-router-dom'
import { SafetyCharter } from '../../components/SafetyCharter'
import { useAuth } from '../../context/AuthContext'

export default function CharterPage() {
  const { updateProfile } = useAuth()
  const navigate = useNavigate()

  const handleSigned = async () => {
    await updateProfile({ charter_signed: true })
    navigate('/onboarding/verification')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-popover overflow-hidden"
        style={{ maxHeight: '90vh' }}>
        <SafetyCharter onSigned={handleSigned} />
      </div>
    </div>
  )
}
