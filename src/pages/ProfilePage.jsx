import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Euro, Edit3, CheckCircle, Clock, ToggleLeft, ToggleRight, LogOut, Camera, ArrowRight, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { VerifiedBadge } from '../components/VerifiedBadge'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const ALL_SKILLS = ['Peinture', 'Électricité', 'Plomberie', 'Menuiserie', 'Rénovation', 'Carrelage', 'Jardinage', 'Montage & pose']

export default function ProfilePage() {
  const { profile, updateProfile, signOut, verificationStatus } = useAuth()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState(false)

  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    hourly_rate: profile?.hourly_rate || 35,
    skills: profile?.skills || [],
    is_tasker: profile?.is_tasker || false,
  })

  const isTasker = form.is_tasker

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({
        full_name: form.full_name,
        bio: form.bio,
        hourly_rate: parseFloat(form.hourly_rate),
        skills: form.skills,
        is_tasker: form.is_tasker,
      })
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const initials = form.full_name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase() || '?'

  return (
    <div className="min-h-screen bg-[--color-tx-bg-alt]">
      <TopNav />
      <div className="page-container pt-8 max-w-4xl mx-auto space-y-6 pb-32 px-4 md:px-6">

        {/* Profile hero card */}
        <div className="tx-card overflow-hidden !p-0 border-none">
          <div className="h-28 bg-[--color-tx-navy]"></div>
          <div className="px-6 md:px-10 pb-8 bg-white relative">
            <div className="flex items-start justify-between">
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-[--color-tx-primary] text-5xl font-bold">
                  <div className="w-full h-full rounded-full bg-[--color-tx-primary-light] flex items-center justify-center">
                    {initials}
                  </div>
                </div>
                <button className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[--color-tx-bg-alt] border border-[--color-tx-border] flex items-center justify-center hover:bg-[--color-tx-border] transition-colors text-[--color-tx-text-secondary] shadow-sm">
                  <Camera size={18} />
                </button>
              </div>
              <div className="mt-4">
                <button onClick={() => setEditing(!editing)} className="btn-secondary text-sm px-4 py-2">
                  <Edit3 size={16} className="inline mr-2" /> {editing ? 'Annuler' : 'Modifier'}
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-[--color-tx-navy] mb-1">{form.full_name || 'Mon profil'}</h1>
              <p className="text-[--color-tx-text-secondary] text-sm mb-4">{profile?.email || 'email@example.com'}</p>
              
              <div className="flex flex-wrap items-center gap-3">
                <VerifiedBadge status={verificationStatus} />
                {isTasker && (
                  <span className="bg-white border border-[--color-tx-primary] text-[--color-tx-primary] px-3 py-1 text-xs font-semibold uppercase flex items-center gap-1.5 rounded-full">
                    <Shield size={14} /> Professionnel
                  </span>
                )}
                <span className="bg-[--color-tx-bg-alt] border border-[--color-tx-border] text-[--color-tx-text-secondary] px-3 py-1 text-xs font-semibold uppercase flex items-center gap-1.5 rounded-full">
                  <Star size={14} /> Safe Space
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification status card */}
        {verificationStatus !== 'approved' && (
          <button
            onClick={() => navigate('/onboarding/verification')}
            className="w-full text-left tx-card flex items-center gap-6 group hover:border-[--color-tx-primary] hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-[--color-tx-primary-light] flex items-center justify-center flex-shrink-0">
              <Clock size={24} className="text-[--color-tx-primary]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg mb-1 text-[--color-tx-navy] group-hover:text-[--color-tx-primary] transition-colors">Vérification d'identité</p>
              <p className="text-[--color-tx-text-secondary] text-sm">
                {verificationStatus === 'unsubmitted'
                  ? 'Soumettez votre pièce d\'identité pour débloquer toutes les fonctionnalités'
                  : 'Votre document est en cours d\'examen (24-48h)'}
              </p>
            </div>
            <ArrowRight size={20} className="text-[--color-tx-text-muted] hidden md:block group-hover:text-[--color-tx-primary] transition-colors" />
          </button>
        )}

        {/* Edit profile */}
        {editing ? (
          <div className="tx-card p-6 md:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-[--color-tx-navy]">Mes informations</h2>
            <div className="space-y-6">
              <div>
                <label className="input-label">Nom complet</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))}
                  className="input-field"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="input-label">À propos (Bio)</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Parlez de vous, de votre expérience..."
                  maxLength={300}
                />
                <p className="text-[--color-tx-text-muted] text-xs mt-2 text-right">{form.bio.length}/300</p>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary w-full text-base py-3"
              >
                {saving ? <div className="spinner" /> : 'Enregistrer les modifications'}
              </button>
            </div>
          </div>
        ) : (
          <div className="tx-card p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-[--color-tx-navy] mb-2">À propos</h2>
            <p className="text-[--color-tx-text] text-[15px] leading-relaxed">{form.bio || 'Aucune présentation renseignée.'}</p>
          </div>
        )}

        {/* Tasker mode toggle */}
        <div className="tx-card p-6 md:p-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-[--color-tx-navy]">Prestations Pro</h2>
              <p className="text-[--color-tx-text-secondary] text-sm mt-1">Proposez vos services sur la marketplace</p>
            </div>
            <button
              id="tasker-toggle"
              onClick={() => setForm(p => ({ ...p, is_tasker: !p.is_tasker }))}
              className={`transition-colors duration-200 ${isTasker ? 'text-[--color-tx-primary]' : 'text-[--color-tx-border]'}`}
            >
              {isTasker ? <ToggleRight size={56} /> : <ToggleLeft size={56} />}
            </button>
          </div>

          {isTasker && (
            <div className="mt-8 pt-8 border-t border-[--color-tx-border] space-y-8 animate-in slide-in-from-top-4 fade-in">
              {/* Hourly rate */}
              <div>
                <label className="input-label mb-3">Tarif horaire moyen (€/h)</label>
                <div className="relative max-w-[200px]">
                  <Euro size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted]" />
                  <input
                    type="number"
                    value={form.hourly_rate}
                    onChange={e => setForm(p => ({ ...p, hourly_rate: e.target.value }))}
                    min="10"
                    max="200"
                    className="input-field pl-12 text-lg font-bold text-[--color-tx-navy]"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="input-label mb-4">Mes domaines d'expertise</label>
                <div className="flex flex-wrap gap-3">
                  {ALL_SKILLS.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`text-sm px-5 py-2.5 transition-all duration-200 rounded-lg font-medium border ${
                        form.skills.includes(skill)
                          ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary] border-[--color-tx-primary]'
                          : 'bg-white text-[--color-tx-text-secondary] border-[--color-tx-border] hover:border-[--color-tx-primary] hover:text-[--color-tx-primary]'
                      }`}
                    >
                      {skill}
                      {form.skills.includes(skill) && <CheckCircle size={16} className="inline ml-2 -mt-0.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {!editing && (
                 <button
                 onClick={handleSave}
                 disabled={saving}
                 className="btn-secondary py-3 px-8 text-sm"
               >
                 {saving ? <div className="spinner mx-auto" /> : 'Mettre à jour'}
               </button>
              )}
            </div>
          )}
        </div>

        {saved && (
          <div className="flex items-center justify-center gap-3 bg-[--color-tx-success-light] border border-[--color-tx-success] rounded-xl px-6 py-4 animate-in fade-in slide-in-from-bottom-2 shadow-sm">
            <CheckCircle size={20} className="text-[--color-tx-success]" />
            <p className="text-[--color-tx-success] text-sm font-bold">Profil mis à jour avec succès</p>
          </div>
        )}

        {/* Danger zone */}
        <div className="pt-4 pb-8">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-3 bg-white border border-[--color-tx-danger] text-[--color-tx-danger] hover:bg-[--color-tx-danger-light] py-4 text-sm font-bold uppercase transition-colors rounded-xl shadow-sm"
          >
            <LogOut size={18} />
            Se déconnecter
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
