import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Euro, Edit3, CheckCircle, Clock, ToggleLeft, ToggleRight, LogOut, Camera, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { VerifiedBadge } from '../components/VerifiedBadge'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const ALL_SKILLS = ['Ménage', 'Repassage', 'Jardinage', 'Meubles', 'Cuisine', 'Bricolage', 'Garde d\'animaux', 'Peinture']

const CATEGORY_ICONS = {
  'Ménage': '🧹', 'Repassage': '👔', 'Jardinage': '🌿', 'Meubles': '🪑',
  'Cuisine': '🍳', 'Bricolage': '🔨', 'Garde d\'animaux': '🐾', 'Peinture': '🎨',
}

const PRIDE_COLORS = ['#E53E3E', '#FF9F43', '#F4D03F', '#27AE60', '#3B82F6', '#8E44AD']

export default function ProfilePage() {
  const { profile, updateProfile, signOut, verificationStatus } = useAuth()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState(false)

  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    hourly_rate: profile?.hourly_rate || 25,
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
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <div className="page-container pt-4 space-y-4">

        {/* Profile hero card */}
        <div className="bg-slate-900 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-2xl font-bold">
                {initials}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center border border-indigo-500">
                <Camera size={10} className="text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-xl mb-1">{form.full_name || 'Mon profil'}</h1>
              <p className="text-slate-400 text-sm mb-2">{profile?.email}</p>
              <div className="flex items-center gap-2">
                <VerifiedBadge status={verificationStatus} />
                {isTasker && (
                  <span className="badge-verified">
                    <Star size={10} />
                    Tasker
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Verification status card */}
        {verificationStatus !== 'approved' && (
          <button
            onClick={() => navigate('/onboarding/verification')}
            className="card p-4 w-full text-left flex items-center gap-4 card-hover border-amber-200"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock size={18} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 font-semibold text-sm">Vérification d'identité</p>
              <p className="text-slate-500 text-xs">
                {verificationStatus === 'unsubmitted'
                  ? 'Soumettez votre pièce d\'identité pour débloquer toutes les fonctionnalités'
                  : 'Votre document est en cours d\'examen (24-48h)'}
              </p>
            </div>
            <ArrowRight size={16} className="text-slate-400" />
          </button>
        )}

        {/* Tasker mode toggle */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-slate-900 font-semibold">Mode Tasker</h2>
              <p className="text-slate-500 text-sm">Proposez vos services sur la marketplace</p>
            </div>
            <button
              id="tasker-toggle"
              onClick={() => setForm(p => ({ ...p, is_tasker: !p.is_tasker }))}
              className={isTasker ? 'text-indigo-600' : 'text-slate-300'}
            >
              {isTasker ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </button>
          </div>

          {isTasker && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
              {/* Hourly rate */}
              <div>
                <label className="input-label flex items-center gap-2">
                  <Euro size={14} />
                  Tarif horaire (€/h)
                </label>
                <div className="relative">
                  <Euro size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    value={form.hourly_rate}
                    onChange={e => setForm(p => ({ ...p, hourly_rate: e.target.value }))}
                    min="10"
                    max="200"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="input-label">Mes compétences</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SKILLS.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border transition-colors duration-150 ${
                        form.skills.includes(skill)
                          ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <span>{CATEGORY_ICONS[skill]}</span>
                      {skill}
                      {form.skills.includes(skill) && <CheckCircle size={12} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Edit profile */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900 font-semibold">Mon profil</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="btn-ghost text-sm flex items-center gap-1.5 text-indigo-600"
            >
              <Edit3 size={14} />
              {editing ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          {editing ? (
            <div className="space-y-4">
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
                <label className="input-label">Bio / Présentation</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Parlez de vous, de votre expérience..."
                  maxLength={300}
                />
                <p className="text-slate-400 text-xs mt-1">{form.bio.length}/300</p>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {saving ? <div className="spinner w-5 h-5" /> : (<><CheckCircle size={18} /> Sauvegarder</>)}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Nom</p>
                <p className="text-slate-900 text-sm">{form.full_name || '—'}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Bio</p>
                <p className="text-slate-600 text-sm">{form.bio || 'Aucune bio renseignée'}</p>
              </div>
            </div>
          )}
        </div>

        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
            <CheckCircle size={16} className="text-emerald-600" />
            <p className="text-emerald-700 text-sm font-medium">Profil mis à jour avec succès</p>
          </div>
        )}

        {/* Danger zone */}
        <div className="card p-4">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 text-crimson-600 hover:text-crimson-700 py-2 text-sm font-medium transition-colors"
          >
            <LogOut size={16} />
            Se déconnecter
          </button>
        </div>

        {/* Pride footer */}
        <div className="text-center pb-4">
          <div className="flex justify-center gap-0.5 mb-2">
            {PRIDE_COLORS.map((c, i) => (
              <div key={i} className="w-6 h-1.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <p className="text-slate-400 text-xs">SafeTask — Safe Space LGBTQIA+</p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
