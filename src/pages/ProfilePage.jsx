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
    <div className="min-h-screen bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm] font-sans">
      <TopNav />
      <div className="page-container pt-8 max-w-4xl mx-auto space-y-8 pb-32 px-4 md:px-6">

        {/* Profile hero card */}
        <div className="ks-card overflow-hidden !p-0">
          <div className="h-32 bg-gradient-to-br from-[--color-ks-lacquer-black] to-[--color-ks-graphite] border-b border-[--color-ks-gold-hairline]"></div>
          <div className="px-6 md:px-10 pb-8 relative">
            <div className="flex items-start justify-between">
              <div className="relative -mt-16 mb-6">
                <div className="w-32 h-32 rounded-full bg-[--color-ks-lacquer-deep] border border-[--color-ks-gold-hairline] flex items-center justify-center text-[--color-ks-kinpaku] text-5xl font-display font-light">
                  {initials}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[--color-ks-graphite] border border-[--color-ks-gold-hairline] flex items-center justify-center hover:bg-[--color-ks-lacquer-deep] transition-colors text-[--color-ks-champagne]">
                  <Camera size={18} />
                </button>
              </div>
              <div className="mt-6">
                <button onClick={() => setEditing(!editing)} className="btn-secondary text-xs px-4 py-2 min-h-[36px]">
                  <Edit3 size={14} className="inline mr-2" /> {editing ? 'Annuler' : 'Modifier'}
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-display text-3xl md:text-4xl mb-2">{form.full_name || 'Mon profil'}</h1>
              <p className="text-[--color-ks-text-muted] font-mono tracking-widest text-sm mb-6 uppercase">{profile?.email || 'email@example.com'}</p>
              <div className="flex flex-wrap items-center gap-3">
                <VerifiedBadge status={verificationStatus} />
                {isTasker && (
                  <span className="bg-transparent border border-[--color-ks-kinpaku] text-[--color-ks-kinpaku] px-3 py-1 text-xs font-mono tracking-widest uppercase flex items-center gap-2 rounded-sm">
                    <Shield size={14} /> Pro
                  </span>
                )}
                <span className="bg-[--color-ks-graphite] border border-[--color-ks-gold-hairline] text-[--color-ks-text-muted] px-3 py-1 text-xs font-mono tracking-widest uppercase flex items-center gap-2 rounded-sm">
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
            className="w-full text-left ks-card flex items-center gap-6 group hover:border-[--color-ks-kinpaku] transition-colors"
          >
            <div className="w-14 h-14 rounded-full border border-[--color-ks-gold-hairline] flex items-center justify-center flex-shrink-0 bg-[--color-ks-lacquer-black] group-hover:bg-[--color-ks-graphite] transition-colors">
              <Clock size={24} className="text-[--color-ks-kinpaku]" />
            </div>
            <div className="flex-1">
              <p className="text-title text-xl mb-1 text-[--color-ks-champagne]">Vérification d'identité</p>
              <p className="text-[--color-ks-text-muted] text-sm">
                {verificationStatus === 'unsubmitted'
                  ? 'Soumettez votre pièce d\'identité pour débloquer toutes les fonctionnalités'
                  : 'Votre document est en cours d\'examen (24-48h)'}
              </p>
            </div>
            <ArrowRight size={20} className="text-[--color-ks-text-muted] hidden md:block group-hover:text-[--color-ks-champagne] transition-colors" />
          </button>
        )}

        {/* Edit profile */}
        {editing ? (
          <div className="ks-card p-8 md:p-10 space-y-8">
            <h2 className="text-headline text-2xl">Modifier mes informations</h2>
            <div className="space-y-6">
              <div>
                <label className="input-label mb-3">Nom complet</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))}
                  className="input-field"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="input-label mb-3">À propos (Bio)</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Parlez de vous, de votre expérience..."
                  maxLength={300}
                />
                <p className="text-[--color-ks-text-faint] font-mono text-[0.65rem] mt-2 text-right uppercase tracking-widest">{form.bio.length}/300</p>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary w-full text-sm py-4"
              >
                {saving ? <div className="spinner w-5 h-5 spinner-white" /> : 'Sauvegarder'}
              </button>
            </div>
          </div>
        ) : (
          <div className="ks-card p-8 md:p-10 space-y-4">
            <h2 className="text-headline text-2xl mb-2">À propos</h2>
            <p className="text-[--color-ks-text-warm] text-sm leading-relaxed font-light">{form.bio || 'Aucune présentation renseignée.'}</p>
          </div>
        )}

        {/* Tasker mode toggle */}
        <div className="ks-card p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-headline text-2xl">Prestations Pro</h2>
              <p className="text-[--color-ks-text-muted] text-sm mt-1">Proposez vos services sur la marketplace</p>
            </div>
            <button
              id="tasker-toggle"
              onClick={() => setForm(p => ({ ...p, is_tasker: !p.is_tasker }))}
              className={`transition-colors duration-300 ${isTasker ? 'text-[--color-ks-kinpaku]' : 'text-[--color-ks-text-faint]'}`}
            >
              {isTasker ? <ToggleRight size={48} strokeWidth={1.5} /> : <ToggleLeft size={48} strokeWidth={1.5} />}
            </button>
          </div>

          {isTasker && (
            <div className="mt-8 pt-8 border-t border-[--color-ks-gold-hairline] space-y-8">
              {/* Hourly rate */}
              <div>
                <label className="input-label mb-3">Tarif horaire (€/h)</label>
                <div className="relative max-w-[200px]">
                  <Euro size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted]" />
                  <input
                    type="number"
                    value={form.hourly_rate}
                    onChange={e => setForm(p => ({ ...p, hourly_rate: e.target.value }))}
                    min="10"
                    max="200"
                    className="input-field pl-12 text-lg font-display font-light"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="input-label mb-4">Mes prestations</label>
                <div className="flex flex-wrap gap-3">
                  {ALL_SKILLS.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`text-sm px-5 py-2.5 transition-all duration-300 rounded-sm border ${
                        form.skills.includes(skill)
                          ? 'bg-[--color-ks-kinpaku] text-[--color-ks-lacquer-deep] border-[--color-ks-kinpaku] font-medium'
                          : 'bg-[--color-ks-lacquer-black] text-[--color-ks-text-muted] border-[--color-ks-gold-hairline] hover:border-[--color-ks-champagne] hover:text-[--color-ks-champagne]'
                      }`}
                    >
                      {skill}
                      {form.skills.includes(skill) && <CheckCircle size={14} className="inline ml-2 -mt-0.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {!editing && (
                 <button
                 onClick={handleSave}
                 disabled={saving}
                 className="btn-secondary text-sm py-3 px-8"
               >
                 {saving ? <div className="spinner w-4 h-4 spinner-white mx-auto" /> : 'Mettre à jour'}
               </button>
              )}
            </div>
          )}
        </div>

        {saved && (
          <div className="flex items-center justify-center gap-3 bg-[--color-ks-lacquer-deep] border border-[--color-ks-kinpaku] rounded-md px-6 py-4 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle size={20} className="text-[--color-ks-kinpaku]" />
            <p className="text-[--color-ks-champagne] text-sm font-medium tracking-wide">Profil mis à jour avec succès</p>
          </div>
        )}

        {/* Danger zone */}
        <div className="pt-6 pb-8">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-3 border border-[--color-ks-vermilion] text-[--color-ks-vermilion] hover:bg-[--color-ks-vermilion] hover:text-[--color-ks-lacquer-black] py-4 text-sm font-mono tracking-widest uppercase transition-colors rounded-sm"
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
