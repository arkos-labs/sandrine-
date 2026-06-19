import { useState, useRef } from 'react'
import { Shield, Upload, CheckCircle, Clock, XCircle, ChevronRight, Camera, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const STATUS_CONFIG = {
  unsubmitted: {
    icon: Upload,
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    label: 'Non soumis',
    description: 'Veuillez soumettre une pièce d\'identité pour accéder à toutes les fonctionnalités.',
  },
  pending: {
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    label: 'En attente de vérification',
    description: 'Votre document est en cours d\'examen par notre équipe. Délai habituel : 24-48h.',
  },
  approved: {
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    label: 'Identité vérifiée',
    description: 'Votre identité a été vérifiée avec succès. Vous avez accès à toutes les fonctionnalités.',
  },
  rejected: {
    icon: XCircle,
    color: 'text-crimson-600',
    bg: 'bg-crimson-50',
    border: 'border-crimson-200',
    label: 'Document refusé',
    description: 'Votre document n\'a pas pu être vérifié. Veuillez soumettre une photo plus nette.',
  },
}

export default function VerificationPage() {
  const { profile, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [previewFront, setPreviewFront] = useState(null)
  const [previewBack, setPreviewBack] = useState(null)
  const [docType, setDocType] = useState('id') // 'id' | 'passport'
  const frontRef = useRef(null)
  const backRef = useRef(null)

  const verificationStatus = profile?.verification_status || 'unsubmitted'
  const statusCfg = STATUS_CONFIG[verificationStatus]
  const StatusIcon = statusCfg.icon

  const handleFileSelect = (side) => (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (side === 'front') setPreviewFront({ file, url })
    else setPreviewBack({ file, url })
  }

  const handleUpload = async () => {
    if (!previewFront) return
    setUploading(true)
    try {
      const userId = profile?.id
      const frontPath = `kyc/${userId}/front-${Date.now()}.jpg`

      await supabase.storage.from('kyc-documents').upload(frontPath, previewFront.file, {
        cacheControl: '3600',
        upsert: true,
      })

      if (previewBack) {
        const backPath = `kyc/${userId}/back-${Date.now()}.jpg`
        await supabase.storage.from('kyc-documents').upload(backPath, previewBack.file, {
          cacheControl: '3600',
          upsert: true,
        })
      }

      await updateProfile({ verification_status: 'pending' })
      setUploadDone(true)
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const canUpload = verificationStatus === 'unsubmitted' || verificationStatus === 'rejected'

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Shield size={26} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Vérification d'identité</h1>
          <p className="text-slate-500 text-sm">
            Pour garantir la sécurité de tous les membres, nous vérifions l'identité de chaque utilisateur.
          </p>
        </div>

        {/* Status card */}
        <div className={`card border ${statusCfg.border} p-5 mb-6`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${statusCfg.bg} border ${statusCfg.border} flex items-center justify-center`}>
              <StatusIcon size={22} className={statusCfg.color} />
            </div>
            <div>
              <p className={`font-bold text-base ${statusCfg.color}`}>{statusCfg.label}</p>
              <p className="text-slate-500 text-sm">{statusCfg.description}</p>
            </div>
          </div>
        </div>

        {canUpload && !uploadDone && (
          <div className="card p-5 mb-5">
            {/* Doc type selector */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setDocType('id')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  docType === 'id' ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <FileText size={16} />
                Carte d'identité
              </button>
              <button
                onClick={() => setDocType('passport')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  docType === 'passport' ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <FileText size={16} />
                Passeport
              </button>
            </div>

            {/* Upload zones */}
            <div className={`grid ${docType === 'id' ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mb-5`}>
              {/* Front */}
              <div>
                <p className="text-slate-500 text-xs mb-2 font-medium">{docType === 'id' ? 'Recto' : 'Page photo'}</p>
                <input ref={frontRef} type="file" accept="image/*" onChange={handleFileSelect('front')} className="hidden" id="kyc-front" />
                <label htmlFor="kyc-front"
                  className="block aspect-[3/2] border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors overflow-hidden group">
                  {previewFront ? (
                    <img src={previewFront.url} alt="Recto" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 group-hover:bg-slate-50">
                      <Camera size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <span className="text-slate-400 text-xs group-hover:text-indigo-500">Ajouter</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Back (only for ID) */}
              {docType === 'id' && (
                <div>
                  <p className="text-slate-500 text-xs mb-2 font-medium">Verso</p>
                  <input ref={backRef} type="file" accept="image/*" onChange={handleFileSelect('back')} className="hidden" id="kyc-back" />
                  <label htmlFor="kyc-back"
                    className="block aspect-[3/2] border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors overflow-hidden group">
                    {previewBack ? (
                      <img src={previewBack.url} alt="Verso" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 group-hover:bg-slate-50">
                        <Camera size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                        <span className="text-slate-400 text-xs group-hover:text-indigo-500">Ajouter</span>
                      </div>
                    )}
                  </label>
                </div>
              )}
            </div>

            {/* Privacy note */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-5">
              <p className="text-indigo-700 text-xs flex items-start gap-2">
                <Shield size={12} className="mt-0.5 flex-shrink-0" />
                Vos documents sont chiffrés et ne sont accessibles qu'à notre équipe de vérification. Ils sont supprimés après vérification.
              </p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!previewFront || uploading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {uploading ? <div className="spinner w-5 h-5" /> : (<><Upload size={18} /> Envoyer pour vérification</>)}
            </button>
          </div>
        )}

        {/* Submitted state */}
        {(uploadDone || verificationStatus === 'pending') && (
          <div className="card p-6 text-center border-amber-200 mb-5">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-3">
              <Clock size={24} className="text-amber-600" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-2">Documents reçus</h3>
            <p className="text-slate-500 text-sm">Notre équipe examinera votre dossier sous 24-48h. Vous recevrez une notification dès validation.</p>
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={() => navigate('/')}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          Continuer vers l'application
          <ChevronRight size={18} />
        </button>

        <p className="text-slate-400 text-xs text-center mt-4">
          Vous pourrez explorer la plateforme en attendant la vérification.
        </p>
      </div>
    </div>
  )
}
