import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, CheckCircle, Shield } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const CATEGORIES = [
  { id: 'Bricolage', label: 'Bricolage' },
  { id: 'Informatique', label: 'Informatique' },
  { id: 'Cours', label: 'Cours particuliers' },
  { id: 'Animaux', label: 'Garde d’animaux' },
  { id: 'Coaching', label: 'Coaching' },
  { id: 'Admin', label: 'Aide administrative' },
  { id: 'Photo', label: 'Photographie' },
  { id: 'Soutien', label: 'Soutien moral' },
]

export default function PostTaskPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    category: '',
    title: '', // Replaced with Prénom for Foyer mockup (we adapt to generic form)
    description: '',
    budget: '', // Replaced with Code postal
    date: '', // Replaced with Quand
    email: '',
    charter_accepted: false
  })

  const handleChange = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const isValid = form.category && form.description.trim() && form.charter_accepted

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    try {
      if (user && user.id !== 'guest') {
        const { error } = await supabase.from('tasks').insert([{
          client_id: user.id,
          category: form.category,
          title: form.title || 'Demande Queer Service',
          description: form.description.trim(),
          budget: form.budget ? parseFloat(form.budget) : 0,
          status: 'open',
        }])
        if (error) throw error
      }
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setSuccess(true) // For demo
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[--color-tx-bg-alt]">
        <div className="text-center max-w-sm tx-card bg-white p-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[--color-tx-success-light]">
            <CheckCircle size={40} className="text-[--color-tx-success]" />
          </div>
          <h2 className="text-3xl font-bold text-[--color-tx-navy] mb-4">Demande envoyée</h2>
          <p className="text-[--color-tx-text-secondary] text-base mb-8 leading-relaxed">
            Votre projet est maintenant visible par tous les prestataires vérifié·es. Vous recevrez des devis très bientôt.
          </p>
          <div className="flex flex-col gap-4">
            <button onClick={() => navigate('/marketplace')} className="btn-primary w-full py-3 text-base">
              Explorer les pros
            </button>
            <button onClick={() => { setSuccess(false); setForm({ ...form, description: '', charter_accepted: false }) }}
              className="btn-secondary w-full py-3 text-base">
              Publier un autre projet
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[--color-tx-bg-alt]">
      <TopNav />
      <div className="page-container pt-8 max-w-3xl mx-auto px-4 md:px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[--color-tx-text-secondary] hover:text-[--color-tx-primary] text-sm font-semibold mb-8 transition-colors">
          <ArrowLeft size={18} />
          Retour
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-[--color-tx-primary-light] text-[--color-tx-primary] rounded-full text-sm font-semibold">
            <Shield size={16} />
            Gratuit & sans engagement
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[--color-tx-navy] mb-4">Décrivez votre projet</h1>
          <p className="text-[--color-tx-text-secondary] text-lg">Recevez jusqu'à 3 devis de pro·s vérifié·es sous 48h.</p>
        </div>

        <form onSubmit={handleSubmit} className="tx-card bg-white p-6 md:p-10 space-y-8">
          {/* Category selection */}
          <div>
            <label className="font-semibold text-sm text-[--color-tx-navy] block mb-4">Catégorie du besoin</label>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, category: cat.id }))}
                  className={`px-5 py-2.5 text-sm transition-all duration-200 rounded-lg font-medium border ${
                    form.category === cat.id
                      ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary] border-[--color-tx-primary]'
                      : 'bg-white text-[--color-tx-text-secondary] border-[--color-tx-border] hover:border-[--color-tx-primary] hover:text-[--color-tx-primary]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-sm text-[--color-tx-navy] block mb-3">Décrivez votre besoin</label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Soyez le plus précis possible..."
              rows={5}
              className="input-field resize-none"
            />
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-sm text-[--color-tx-navy] block mb-3">Code postal</label>
              <input
                type="text"
                value={form.budget} // Mapped for demo
                onChange={handleChange('budget')}
                className="input-field"
                placeholder="Ex: 75001"
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-[--color-tx-navy] block mb-3">Quand ?</label>
              <input
                type="text"
                value={form.date}
                onChange={handleChange('date')}
                className="input-field"
                placeholder="Ex: Cette semaine"
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-[--color-tx-navy] block mb-3">Prénom</label>
              <input
                type="text"
                value={form.title}
                onChange={handleChange('title')}
                className="input-field"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-[--color-tx-navy] block mb-3">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                className="input-field"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          {/* Charter checkbox */}
          <div className="flex items-start gap-4 mt-6 bg-[--color-tx-bg-alt] p-5 rounded-xl border border-[--color-tx-border]">
            <input
              type="checkbox"
              id="charter"
              checked={form.charter_accepted}
              onChange={handleChange('charter_accepted')}
              className="mt-1 w-5 h-5 rounded border-[--color-tx-border] accent-[--color-tx-primary] cursor-pointer"
            />
            <label htmlFor="charter" className="text-sm text-[--color-tx-text] leading-relaxed cursor-pointer font-medium">
              Je m'engage à respecter la charte de bienveillance, de non-discrimination et la philosophie Ubuntu de Queer Service.
            </label>
          </div>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="btn-primary w-full text-lg py-4 mt-8"
          >
            {submitting ? <div className="spinner" /> : 'Envoyer ma demande'}
          </button>
        </form>
      </div>
      <BottomNav />
    </div>
  )
}
