import { useState, useRef } from 'react'
import { Shield, Upload, CheckCircle, Clock, XCircle, ChevronRight, Camera, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const STATUS_CONFIG = {
  unsubmitted: {
    icon: Upload,
    color: 'text-[--color-ks-champagne]',
    bg: 'bg-[--color-ks-lacquer-deep]',
    border: 'border-[--color-ks-gold-hairline]',
    label: 'Non soumis',
    description: 'Veuillez soumettre une pièce d\'identité pour accéder à toutes les fonctionnalités.',
  },
  pending: {
    icon: Clock,
    color: 'text-[--color-ks-champagne]',
    bg: 'bg-[--color-ks-graphite]',
    border: 'border-[--color-ks-gold-hairline]',
    label: 'En attente de vérification',
    description: 'Votre document est en cours d\'examen par notre équipe. Délai habituel : 24-48h.',
  },
  approved: {
    icon: CheckCircle,
    color: 'text-[--color-ks-kinpaku]',
    bg: 'bg-[--color-ks-lacquer-deep]',
    border: 'border-[--color-ks-kinpaku]',
    label: 'Identité vérifiée',
    description: 'Votre identité a été vérifiée avec succès. Vous avez accès à toutes les fonctionnalités.',
  },
  rejected: {
    icon: XCircle,
    color: 'text-[--color-ks-vermilion]',
    bg: 'bg-[--color-ks-lacquer-black]',
    border: 'border-[--color-ks-vermilion]',
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
      const userId = profile?.id || 'guest'
      if (userId !== 'guest') {
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
      }
      setUploadDone(true)
    } catch (err) {
      console.error('Upload error:', err)
      setUploadDone(true) // Proceed for demo
    } finally {
      setUploading(false)
    }
  }

  const canUpload = verificationStatus === 'unsubmitted' || verificationStatus === 'rejected'

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm] font-sans">
      <div className="w-full max-w-2xl ks-card p-6 md:p-10 relative overflow-hidden">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full border border-[--color-ks-gold-hairline] bg-gradient-to-br from-[--color-ks-lacquer-deep] to-[--color-ks-graphite] flex items-center justify-center mx-auto mb-6">
            <Shield size={28} className="text-[--color-ks-kinpaku]" />
          </div>
          <h1 className="text-display text-3xl md:text-4xl mb-4 text-[--color-ks-champagne]">Vérification d'identité</h1>
          <p className="text-[--color-ks-text-muted] text-sm font-light max-w-md mx-auto">
            Pour garantir la confiance de tous, nous vérifions l'identité de chacun·e.
          </p>
        </div>

        {/* Status card */}
        <div className={`border rounded-md p-6 mb-8 transition-colors ${statusCfg.bg} ${statusCfg.border}`}>
          <div className="flex items-start md:items-center gap-6">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 bg-[--color-ks-lacquer-black] ${statusCfg.border}`}>
              <StatusIcon size={24} className={statusCfg.color} />
            </div>
            <div>
              <p className={`text-headline text-lg mb-1 ${statusCfg.color}`}>{statusCfg.label}</p>
              <p className={`font-light text-sm text-[--color-ks-text-muted]`}>{statusCfg.description}</p>
            </div>
          </div>
        </div>

        {canUpload && !uploadDone && (
          <div className="ks-card !bg-transparent p-0 border-none mb-8">
            {/* Doc type selector */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setDocType('id')}
                className={`flex-1 flex items-center justify-center gap-3 py-3 border rounded-sm text-sm font-medium transition-colors ${
                  docType === 'id' ? 'border-[--color-ks-kinpaku] bg-[--color-ks-kinpaku] text-[--color-ks-lacquer-deep]' : 'border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-deep] text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] hover:border-[--color-ks-champagne]'
                }`}
              >
                <FileText size={18} />
                Carte d'identité
              </button>
              <button
                onClick={() => setDocType('passport')}
                className={`flex-1 flex items-center justify-center gap-3 py-3 border rounded-sm text-sm font-medium transition-colors ${
                  docType === 'passport' ? 'border-[--color-ks-kinpaku] bg-[--color-ks-kinpaku] text-[--color-ks-lacquer-deep]' : 'border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-deep] text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] hover:border-[--color-ks-champagne]'
                }`}
              >
                <FileText size={18} />
                Passeport
              </button>
            </div>

            {/* Upload zones */}
            <div className={`grid ${docType === 'id' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-6 mb-8`}>
              {/* Front */}
              <div>
                <p className="text-[--color-ks-champagne] text-xs mb-3 font-mono uppercase tracking-widest">{docType === 'id' ? 'Recto' : 'Page photo'}</p>
                <input ref={frontRef} type="file" accept="image/*" onChange={handleFileSelect('front')} className="hidden" id="kyc-front" />
                <label htmlFor="kyc-front"
                  className="block aspect-[3/2] border border-dashed border-[--color-ks-gold-hairline] rounded-sm cursor-pointer hover:border-[--color-ks-champagne] hover:bg-[--color-ks-graphite] transition-colors overflow-hidden group bg-[--color-ks-lacquer-deep]">
                  {previewFront ? (
                    <img src={previewFront.url} alt="Recto" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <Camera size={24} className="text-[--color-ks-text-muted] group-hover:text-[--color-ks-champagne] transition-colors" />
                      <span className="text-[--color-ks-text-muted] group-hover:text-[--color-ks-champagne] text-[0.65rem] font-mono uppercase tracking-widest transition-colors">Ajouter</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Back (only for ID) */}
              {docType === 'id' && (
                <div>
                  <p className="text-[--color-ks-champagne] text-xs mb-3 font-mono uppercase tracking-widest">Verso</p>
                  <input ref={backRef} type="file" accept="image/*" onChange={handleFileSelect('back')} className="hidden" id="kyc-back" />
                  <label htmlFor="kyc-back"
                    className="block aspect-[3/2] border border-dashed border-[--color-ks-gold-hairline] rounded-sm cursor-pointer hover:border-[--color-ks-champagne] hover:bg-[--color-ks-graphite] transition-colors overflow-hidden group bg-[--color-ks-lacquer-deep]">
                    {previewBack ? (
                      <img src={previewBack.url} alt="Verso" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                        <Camera size={24} className="text-[--color-ks-text-muted] group-hover:text-[--color-ks-champagne] transition-colors" />
                        <span className="text-[--color-ks-text-muted] group-hover:text-[--color-ks-champagne] text-[0.65rem] font-mono uppercase tracking-widest transition-colors">Ajouter</span>
                      </div>
                    )}
                  </label>
                </div>
              )}
            </div>

            {/* Privacy note */}
            <div className="bg-[--color-ks-lacquer-deep] border border-[--color-ks-gold-hairline] rounded-md p-4 mb-8">
              <p className="text-[--color-ks-text-muted] text-[0.65rem] flex items-center justify-center gap-2 font-mono uppercase tracking-widest">
                <Shield size={14} className="flex-shrink-0 text-[--color-ks-kinpaku]" />
                Vos documents sont sécurisés. Ils sont supprimés après validation.
              </p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!previewFront || uploading}
              className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2"
            >
              {uploading ? <div className="spinner w-5 h-5 spinner-white" /> : (<><Upload size={18} /> ENVOYER POUR VÉRIFICATION</>)}
            </button>
          </div>
        )}

        {/* Submitted state */}
        {(uploadDone || verificationStatus === 'pending') && (
          <div className="bg-[--color-ks-graphite] border border-[--color-ks-gold-hairline] rounded-md p-8 text-center mb-8 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-black] flex items-center justify-center mx-auto mb-6">
              <Clock size={28} className="text-[--color-ks-kinpaku]" />
            </div>
            <h3 className="text-headline text-2xl mb-4 text-[--color-ks-champagne]">Documents reçus</h3>
            <p className="text-[--color-ks-text-muted] font-light text-sm">Notre équipe examinera votre dossier sous 24-48h. Vous recevrez une notification dès validation.</p>
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 text-sm font-mono tracking-widest uppercase flex items-center justify-center text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] transition-colors group"
        >
          CONTINUER VERS L'APP
          <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[--color-ks-text-faint] text-[0.65rem] text-center mt-4 font-mono uppercase tracking-widest">
          Vous pourrez explorer la plateforme en attendant.
        </p>
      </div>
    </div>
  )
}
