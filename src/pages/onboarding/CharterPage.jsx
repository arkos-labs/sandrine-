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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[--color-ks-lacquer-black] font-sans">
      <div className="w-full max-w-2xl" style={{ maxHeight: '95vh' }}>
        <SafetyCharter onSigned={handleSigned} />
      </div>
    </div>
  )
}
