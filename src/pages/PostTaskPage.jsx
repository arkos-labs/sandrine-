import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, CheckCircle, Shield } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const CATEGORIES = [
  { id: 'Peinture', label: 'Peinture' },
  { id: 'Électricité', label: 'Électricité' },
  { id: 'Plomberie', label: 'Plomberie' },
  { id: 'Menuiserie', label: 'Menuiserie' },
  { id: 'Rénovation', label: 'Rénovation' },
  { id: 'Carrelage', label: 'Carrelage' },
  { id: 'Jardinage', label: 'Jardinage' },
  { id: 'Montage & pose', label: 'Montage & pose' },
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
          title: form.title || 'Projet SafeTask',
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
      <div className="min-h-screen flex items-center justify-center p-6 bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm]">
        <div className="text-center max-w-sm ks-card bg-[--color-ks-lacquer-deep] p-10">
          <div className="w-16 h-16 rounded-full border border-[--color-ks-gold-hairline] flex items-center justify-center mx-auto mb-6 bg-[--color-ks-lacquer-black]">
            <CheckCircle size={32} strokeWidth={1.5} className="text-[--color-ks-patina]" />
          </div>
          <h2 className="text-3xl text-display mb-4">Demande envoyée</h2>
          <p className="text-[--color-ks-text-muted] text-sm mb-8 leading-relaxed">
            Votre projet est maintenant visible par tous les prestataires vérifié·es. Vous recevrez des devis très bientôt.
          </p>
          <div className="flex flex-col gap-4">
            <button onClick={() => navigate('/marketplace')} className="btn-primary w-full text-sm">
              Explorer les pros
            </button>
            <button onClick={() => { setSuccess(false); setForm({ ...form, description: '', charter_accepted: false }) }}
              className="btn-secondary w-full text-sm">
              Publier un autre projet
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm] font-sans">
      <TopNav />
      <div className="page-container pt-8 max-w-3xl mx-auto px-4 md:px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] font-mono tracking-widest text-[0.75rem] uppercase mb-10 transition-colors">
          <ArrowLeft size={16} strokeWidth={2} />
          Retour
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-[--color-ks-gold-hairline] bg-[--color-ks-lacquer-deep] rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[--color-ks-patina] animate-pulse"></span>
            <span className="text-[--color-ks-text-muted] text-[0.65rem] font-mono uppercase tracking-widest">
              Gratuit & sans engagement
            </span>
          </div>
          <h1 className="text-display mb-4">DÉCRIVEZ VOTRE PROJET</h1>
          <p className="text-[--color-ks-text-warm] text-lg font-light">Recevez jusqu'à 3 devis de pro·s vérifié·es sous 48h.</p>
        </div>

        <form onSubmit={handleSubmit} className="ks-card p-6 md:p-10 space-y-8">
          {/* Category selection */}
          <div>
            <label className="input-label mb-4">Catégorie de travaux</label>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, category: cat.id }))}
                  className={`px-5 py-2.5 text-sm transition-all duration-300 rounded-sm border ${
                    form.category === cat.id
                      ? 'bg-[--color-ks-kinpaku] text-[--color-ks-lacquer-deep] border-[--color-ks-kinpaku] font-medium'
                      : 'bg-[--color-ks-lacquer-black] text-[--color-ks-text-muted] border-[--color-ks-gold-hairline] hover:border-[--color-ks-champagne] hover:text-[--color-ks-champagne]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="input-label mb-3">Décrivez votre besoin</label>
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
              <label className="input-label mb-3">Code postal</label>
              <input
                type="text"
                value={form.budget} // Mapped for demo
                onChange={handleChange('budget')}
                className="input-field"
                placeholder="Ex: 75001"
              />
            </div>
            <div>
              <label className="input-label mb-3">Quand ?</label>
              <input
                type="text"
                value={form.date}
                onChange={handleChange('date')}
                className="input-field"
                placeholder="Ex: Cette semaine"
              />
            </div>
            <div>
              <label className="input-label mb-3">Prénom</label>
              <input
                type="text"
                value={form.title}
                onChange={handleChange('title')}
                className="input-field"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="input-label mb-3">Email</label>
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
          <div className="flex items-start gap-4 mt-6 bg-[--color-ks-lacquer-black] p-5 border border-[--color-ks-gold-hairline] rounded-sm">
            <input
              type="checkbox"
              id="charter"
              checked={form.charter_accepted}
              onChange={handleChange('charter_accepted')}
              className="mt-1 w-5 h-5 rounded-sm bg-transparent border border-[--color-ks-gold-hairline] accent-[--color-ks-kinpaku] cursor-pointer"
            />
            <label htmlFor="charter" className="text-sm font-light text-[--color-ks-champagne] leading-relaxed cursor-pointer">
              Je m'engage à respecter la charte de bienveillance et de non-discrimination de SafeTask.
            </label>
          </div>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="btn-primary w-full text-lg py-4 mt-8"
          >
            {submitting ? <div className="spinner w-6 h-6 spinner-white" /> : 'Envoyer ma demande'}
          </button>
        </form>
      </div>
      <BottomNav />
    </div>
  )
}
