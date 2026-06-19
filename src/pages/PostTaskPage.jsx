import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Euro, Calendar, AlignLeft, Tag, CheckCircle, Shield } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { TopNav } from '../components/TopNav'
import { BottomNav } from '../components/BottomNav'

const CATEGORIES = [
  { id: 'Ménage', icon: '🧹', label: 'Ménage' },
  { id: 'Repassage', icon: '👔', label: 'Repassage' },
  { id: 'Jardinage', icon: '🌿', label: 'Jardinage' },
  { id: 'Meubles', icon: '🪑', label: 'Meubles' },
  { id: 'Cuisine', icon: '🍳', label: 'Cuisine' },
  { id: 'Bricolage', icon: '🔨', label: 'Bricolage' },
  { id: 'Garde d\'animaux', icon: '🐾', label: 'Animaux' },
  { id: 'Peinture', icon: '🎨', label: 'Peinture' },
]

export default function PostTaskPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    budget: '',
    date: '',
    time: '',
  })

  const handleChange = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))

  const isValid = form.category && form.title.trim() && form.description.trim() && form.budget

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('tasks').insert([{
        client_id: user.id,
        category: form.category,
        title: form.title.trim(),
        description: form.description.trim(),
        budget: parseFloat(form.budget),
        status: 'open',
      }])
      if (!error) setSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={30} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Mission publiée</h2>
          <p className="text-slate-500 text-sm mb-8">
            Votre mission est maintenant visible par tous les prestataires vérifiés. Vous recevrez des offres très bientôt.
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/marketplace')} className="btn-primary w-full">
              Voir les offres
            </button>
            <button onClick={() => { setSuccess(false); setForm({ category: '', title: '', description: '', budget: '', date: '', time: '' }) }}
              className="btn-secondary w-full">
              Publier une autre mission
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <div className="page-container pt-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6">
          <ArrowLeft size={18} />
          Retour
        </button>

        <h1 className="text-xl font-bold text-slate-900 mb-2">Publier une mission</h1>
        <p className="text-slate-500 text-sm mb-6">Les prestataires vérifiés vous feront des offres.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category selection */}
          <div>
            <label className="input-label flex items-center gap-2">
              <Tag size={14} />
              Catégorie <span className="text-crimson-600">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, category: cat.id }))}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-colors duration-150 ${
                    form.category === cat.id
                      ? 'border-indigo-300 bg-indigo-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className={`text-xs font-medium ${form.category === cat.id ? 'text-indigo-700' : 'text-slate-500'}`}>
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="input-label flex items-center gap-2">
              <AlignLeft size={14} />
              Titre de la mission <span className="text-crimson-600">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange('title')}
              placeholder="Ex: Grand ménage appartement 3 pièces"
              maxLength={80}
              className="input-field"
            />
            <p className="text-slate-400 text-xs mt-1">{form.title.length}/80</p>
          </div>

          {/* Description */}
          <div>
            <label className="input-label">
              Description détaillée <span className="text-crimson-600">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Décrivez précisément la mission : surface, matériel disponible, contraintes particulières..."
              rows={4}
              className="input-field resize-none"
            />
          </div>

          {/* Budget + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="input-label flex items-center gap-2">
                <Euro size={14} />
                Budget (€) <span className="text-crimson-600">*</span>
              </label>
              <input
                type="number"
                value={form.budget}
                onChange={handleChange('budget')}
                placeholder="0"
                min="5"
                max="5000"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <Calendar size={14} />
                Date souhaitée
              </label>
              <input
                type="date"
                value={form.date}
                onChange={handleChange('date')}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Safety reminder */}
          <div className="card-flat border-indigo-100 p-4">
            <p className="text-indigo-700 text-xs leading-relaxed flex items-start gap-2">
              <Shield size={14} className="mt-0.5 flex-shrink-0" />
              <span><strong>Safe Space garanti</strong> — Seuls les prestataires ayant signé la Charte Safe Space et dont l'identité est vérifiée peuvent répondre à votre mission.</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {submitting ? <div className="spinner w-5 h-5" /> : (<><Send size={18} /> Publier la mission</>)}
          </button>
        </form>
      </div>
      <BottomNav />
    </div>
  )
}
