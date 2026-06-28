import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, Shield, Wrench, Leaf, Truck, SprayCan, Baby, PawPrint, Laptop, Home as HomeIcon, BookOpen, Clock, Plus, Minus, ChevronLeft, ChevronRight, Check, MapPin, Building, Phone, X, Edit2, Camera, Star } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { TopNav } from '../components/TopNav'

const CATEGORIES = [
  { id: 'bricolage', label: 'Bricolage', icon: Wrench, suggestions: ['Montage de meubles IKEA', 'Fixation au mur', 'Petits travaux', 'Peinture'] },
  { id: 'jardinage', label: 'Jardinage', icon: Leaf, suggestions: ['Tonte de pelouse', 'Taille de haies', 'Débroussaillage', 'Entretien de jardin'] },
  { id: 'demenagement', label: 'Déménagement', icon: Truck, suggestions: ['Aide au déménagement', 'Transport de meubles', 'Montage/Démontage'] },
  { id: 'menage', label: 'Ménage', icon: SprayCan, suggestions: ['Ménage régulier', 'Grand nettoyage', 'Nettoyage électroménager'] },
  { id: 'enfants', label: 'Enfants', icon: Baby, suggestions: ['Garde d\'enfants', 'Baby-sitting', 'Sortie d\'école'] },
  { id: 'animaux', label: 'Animaux', icon: PawPrint, suggestions: ['Garde de chien', 'Garde de chat', 'Promenade de chien'] },
  { id: 'informatique', label: 'Informatique', icon: Laptop, suggestions: ['Dépannage PC/Mac', 'Installation réseau/box', 'Réparation smartphone'] },
  { id: 'aide', label: 'Aide à domicile', icon: HomeIcon, suggestions: ['Courses et livraison', 'Préparation de repas', 'Aide administrative'] },
  { id: 'cours', label: 'Cours particuliers', icon: BookOpen, suggestions: ['Soutien scolaire', 'Cours de langues', 'Cours de musique'] },
]

export default function PostTaskPage() {
  const { user, signInAsGuest, updateProfile } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const hasInitialState = location.state?.category && location.state?.title
  const [step, setStep] = useState(hasInitialState ? 2 : 1)
  
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [showAddressDropdown, setShowAddressDropdown] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isSearchingProviders, setIsSearchingProviders] = useState(false)

  const [form, setForm] = useState({
    category: location.state?.category || '',
    title: location.state?.title || '',
    hours: 4,
    providers: 1,
    date: '',
    time: '',
    address: '',
    forWhom: 'Chez moi',
    placeType: 'Maison',
    phone: '',
    addressName: 'Domicile',
    arrivalInstructions: '',
    description: '',
    photos: [],
    firstName: '',
    email: '',
    charter_accepted: false
  })

  const [calendarDate, setCalendarDate] = useState(new Date())

  useEffect(() => {
    if (user && user.email) {
      setForm(p => ({ ...p, email: user.email, firstName: user.user_metadata?.first_name || '' }))
    }
  }, [user])

  const handleNext = () => setStep(s => s + 1)
  const handlePrev = () => setStep(s => Math.max(1, s - 1))

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      
      // Simulate auth/submission
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (!user || user.id === 'guest') {
        signInAsGuest()
        const firstName = form.email ? form.email.split('@')[0].split('.')[0].replace(/^\w/, c => c.toUpperCase()) : 'Nico'
        setTimeout(() => updateProfile({ full_name: firstName }), 100)
      }
      
      setShowAuthModal(false)
      setIsSearchingProviders(true)
      
      // Simulate searching providers animation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setIsSearchingProviders(false)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddressChange = async (e) => {
    const val = e.target.value
    setForm(p => ({ ...p, address: val }))
    
    if (val.length > 3) {
      try {
        const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(val)}&limit=5`)
        const data = await res.json()
        if (data.features) {
          setAddressSuggestions(data.features)
          setShowAddressDropdown(true)
        }
      } catch (err) {
        console.error("Erreur autocomplete adresse:", err)
      }
    } else {
      setShowAddressDropdown(false)
      setAddressSuggestions([])
    }
  }

  const selectAddress = (feature) => {
    setForm(p => ({ ...p, address: feature.properties.label }))
    setShowAddressDropdown(false)
    setShowAddressModal(true)
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        const selectedCatData = CATEGORIES.find(c => c.id === form.category)
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">De quel service avez-vous besoin ?</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const isSelected = form.category === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setForm(p => ({ ...p, category: cat.id, title: '' }))}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected ? 'border-[#0078FA] bg-[#F0F7FF] text-[#0078FA]' : 'border-slate-200 bg-white text-slate-600 hover:border-[#0078FA]/50'
                    }`}
                  >
                    <Icon size={28} className={isSelected ? 'text-[#0078FA] mb-3' : 'text-slate-400 mb-3'} strokeWidth={1.5} />
                    <span className="font-semibold text-sm text-center">{cat.label}</span>
                  </button>
                )
              })}
            </div>
            {form.category && (
              <div className="animate-in fade-in duration-300">
                <label className="font-bold text-slate-800 block mb-4">Que souhaitez-vous faire exactement ?</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCatData?.suggestions.map(sug => (
                    <button
                      key={sug}
                      onClick={() => setForm(p => ({ ...p, title: sug }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        form.title === sug ? 'bg-[#0078FA] text-white border-[#0078FA]' : 'bg-white text-slate-600 border-slate-200 hover:border-[#0078FA] hover:text-[#0078FA]'
                      }`}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(p => ({...p, title: e.target.value}))}
                  placeholder="Ou tapez votre propre besoin..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#0078FA] focus:ring-1 focus:ring-[#0078FA] transition-all"
                />
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-sm font-bold text-slate-800 mb-2">{form.title || form.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-8">
              De combien d'heures de service avez-vous besoin ?
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[{h: 2, label: 'Court', desc: 'Exemple : 2 à 4 chaises, fauteuils...'}, 
                {h: 4, label: 'Classique', desc: 'Exemple : Une commode et un lit...', pop: true}, 
                {h: 6, label: 'Long', desc: 'Exemple : Une grande armoire ou plusieurs meubles...'}].map(opt => {
                const isSelected = form.hours === opt.h
                return (
                  <button 
                    key={opt.h}
                    onClick={() => setForm(p => ({ ...p, hours: opt.h }))}
                    className={`relative p-6 rounded-2xl border-2 flex flex-col items-center justify-center transition-all bg-white text-left h-full ${
                      isSelected ? 'border-[#0078FA] shadow-sm' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#0078FA] rounded-full flex items-center justify-center text-white shadow-md">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    )}
                    <Clock size={32} className={`mb-3 ${isSelected ? 'text-[#0F172A]' : 'text-slate-800'}`} strokeWidth={2} />
                    <div className="text-2xl font-bold text-[#0F172A] mb-4">{opt.h}h00</div>
                    {opt.pop && (
                      <div className="absolute -bottom-3 bg-[#F5B445] text-slate-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        ★ Populaire
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-sm font-bold text-slate-800 mb-2">{form.title || form.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-16">
              Combien de prestataires vous faut-il ?
            </h1>
            <div className="flex items-center justify-center gap-8 mb-12">
              <button 
                onClick={() => setForm(p => ({ ...p, providers: Math.max(1, p.providers - 1) }))}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors ${form.providers > 1 ? 'bg-[#7EBAFF] hover:bg-[#0078FA]' : 'bg-[#7EBAFF] opacity-50 cursor-not-allowed'}`}
                disabled={form.providers <= 1}
              >
                <Minus size={32} />
              </button>
              <div className="text-6xl font-bold text-[#0F172A] w-16 text-center">
                {form.providers}
              </div>
              <button 
                onClick={() => setForm(p => ({ ...p, providers: p.providers + 1 }))}
                className="w-16 h-16 rounded-full bg-[#0078FA] flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
              >
                <Plus size={32} />
              </button>
            </div>
          </div>
        )

      case 4:
        const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate()
        let firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay()
        firstDay = firstDay === 0 ? 6 : firstDay - 1 // Make Monday = 0
        
        const days = []
        for (let i = 0; i < firstDay; i++) days.push(null)
        for (let i = 1; i <= daysInMonth; i++) days.push(i)

        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        const monthLabel = `${monthNames[calendarDate.getMonth()]} ${calendarDate.getFullYear()}`

        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-sm font-bold text-slate-800 mb-2">{form.title || form.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-8">
              Quel jour vous convient le mieux ?
            </h1>
            
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#0078FA] hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="text-lg font-medium text-slate-700">{monthLabel}</div>
                <button 
                  onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#0078FA] hover:bg-slate-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-y-4 mb-4">
                {['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'].map(d => (
                  <div key={d} className="text-center text-slate-500 font-medium text-sm">{d}</div>
                ))}
                
                {days.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} />
                  
                  const currentDateStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                  const isSelected = form.date === currentDateStr
                  
                  return (
                    <div key={day} className="flex justify-center">
                      <button
                        onClick={() => setForm(p => ({ ...p, date: currentDateStr }))}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-colors ${
                          isSelected ? 'bg-[#0078FA] text-white font-bold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        {day}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case 5:
        const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-sm font-bold text-slate-800 mb-2">{form.title || form.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-8">
              Quelle heure vous convient le mieux ?
            </h1>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {times.map(t => (
                <button
                  key={t}
                  onClick={() => setForm(p => ({ ...p, time: t }))}
                  className={`py-3 rounded-full text-lg font-medium transition-colors w-full ${
                    form.time === t ? 'bg-[#0078FA] text-white' : 'bg-slate-100 text-[#0F172A] hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-sm font-bold text-slate-800 mb-2">{form.title || form.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-8">
              Quelle est l'adresse de la prestation ?
            </h1>
            
            {!isAddressConfirmed ? (
              <div className="relative mb-6">
                <input
                  type="text"
                  value={form.address}
                  onChange={handleAddressChange}
                  placeholder="Ex: 12 Rue de la Paix, Paris"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 pl-4 text-lg focus:outline-none focus:border-[#0078FA] transition-all"
                />
                {showAddressDropdown && addressSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-slate-200 shadow-xl rounded-xl mt-2 max-h-60 overflow-y-auto overflow-hidden divide-y divide-slate-100">
                    {addressSuggestions.map(s => (
                      <li 
                        key={s.properties.id}
                        onClick={() => selectAddress(s)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-slate-700 font-medium transition-colors"
                      >
                        {s.properties.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div className="mb-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="relative border-2 border-[#0078FA] rounded-xl p-4 flex items-center justify-between mb-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowAddressModal(true)}>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#0078FA] rounded-full flex items-center justify-center text-white shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <HomeIcon size={28} className="text-orange-500 fill-current" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#0F172A] leading-tight">{form.addressName || 'Domicile'}</div>
                      <div className="text-slate-500 text-sm mt-0.5">{form.address}</div>
                      {form.phone && (
                        <div className="inline-flex items-center gap-1.5 mt-2 bg-slate-50 px-2.5 py-1 rounded-full text-xs font-medium text-slate-600 border border-slate-200">
                          <Phone size={12} />
                          {form.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0">
                    <Edit2 size={18} />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsAddressConfirmed(false)
                    setForm(p => ({...p, address: ''}))
                  }}
                  className="w-full py-4 border border-slate-200 rounded-xl text-[#0F172A] font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 bg-white"
                >
                  <Plus size={20} /> Ajouter une adresse
                </button>
              </div>
            )}
          </div>
        )

      case 7:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-8">Avez-vous des précisions à apporter ?</h1>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700">Titre de la demande</label>
                <span className="text-sm font-medium text-slate-500">{form.title.length} / 80</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(p => ({...p, title: e.target.value}))}
                  maxLength={80}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-4 text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all pr-12 font-medium"
                />
                {form.title && (
                  <button onClick={() => setForm(p => ({...p, title: ''}))} className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors">
                    <X size={14} strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">Détails supplémentaires (optionnel)</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(p => ({...p, description: e.target.value}))}
                placeholder="Aa..."
                rows={5}
                className="w-full bg-slate-100 border-none rounded-xl p-4 text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all resize-none font-medium"
              />
            </div>
          </div>
        )

      case 8:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-2">Avez-vous des photos ?</h1>
            <p className="text-slate-500 mb-8">Ajoutez des photos pour aider les prestataires à mieux évaluer le travail (facultatif).</p>
            
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files)
                  const newPhotos = files.map(file => URL.createObjectURL(file))
                  setForm(p => ({ ...p, photos: [...(p.photos || []), ...newPhotos] }))
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-[#0078FA] mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Camera size={32} />
              </div>
              <p className="text-[#0F172A] font-bold text-lg mb-2">Ajouter des photos</p>
              <p className="text-slate-500 text-sm">Formats acceptés : JPG, PNG (Max 5Mo)</p>
            </div>

            {form.photos && form.photos.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 animate-in fade-in">
                {form.photos.map((photoUrl, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                    <img src={photoUrl} alt={`Photo ${idx}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setForm(p => ({ ...p, photos: p.photos.filter((_, i) => i !== idx) }))}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      default: return null
    }
  }

  const canGoNext = () => {
    if (step === 1) return form.category && form.title.trim().length > 2
    if (step === 2) return form.hours > 0
    if (step === 3) return form.providers > 0
    if (step === 4) return form.date
    if (step === 5) return form.time
    if (step === 6) return form.address.trim().length > 3 && isAddressConfirmed
    return true
  }

  if (isSearchingProviders) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-[#0078FA] animate-spin mb-8"></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2 animate-pulse">Recherche des meilleurs prestataires...</h2>
        <p className="text-slate-500 font-medium">Analyse de vos besoins en cours</p>
      </div>
    )
  }

  if (success) {
    const firstName = form.email ? form.email.split('@')[0].split('.')[0].replace(/^\w/, c => c.toUpperCase()) : 'Nico'
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col pb-6">
        <TopNav />
        <div className="flex-1 max-w-2xl w-full mx-auto mt-6 px-4 animate-in zoom-in-95 duration-500">
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-200">
            <div className="h-[280px] relative bg-[#E5E7EB] overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #cbd5e1 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
              <div className="absolute top-1/2 left-[-20%] right-[-20%] h-3 bg-white/60 -rotate-12 transform origin-left"></div>
              <div className="absolute top-[-20%] bottom-[-20%] left-1/3 w-3 bg-white/60 rotate-12 transform origin-top"></div>
              <div className="absolute top-[-10%] bottom-[-10%] left-2/3 w-2 bg-white/50 -rotate-12 transform origin-top"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#0078FA] rounded-full flex items-center justify-center text-white shadow-xl z-10 border-[5px] border-white">
                <Check size={28} strokeWidth={3} />
              </div>

              <div className="absolute top-10 left-12 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '3s' }}>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover" alt="Tasker" />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md text-xs font-bold flex items-center gap-1 text-[#0F172A]"><Star size={10} className="text-[#F59E0B] fill-current" /> 4,95</div>
                </div>
              </div>
              
              <div className="absolute bottom-16 left-8 animate-bounce" style={{ animationDelay: '500ms', animationDuration: '3.5s' }}>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" className="w-14 h-14 rounded-full border-4 border-white shadow-lg object-cover" alt="Tasker" />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md text-xs font-bold flex items-center gap-1 text-[#0F172A]"><Star size={10} className="text-[#F59E0B] fill-current" /> 5,0</div>
                </div>
              </div>
              
              <div className="absolute top-16 right-16 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '3.2s' }}>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" className="w-14 h-14 rounded-full border-4 border-white shadow-lg object-cover" alt="Tasker" />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md text-xs font-bold flex items-center gap-1 text-[#0F172A]"><Star size={10} className="text-[#F59E0B] fill-current" /> 4,98</div>
                </div>
              </div>
              
              <div className="absolute bottom-8 right-24 animate-bounce" style={{ animationDelay: '700ms', animationDuration: '3.8s' }}>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover" alt="Tasker" />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md text-xs font-bold flex items-center gap-1 text-[#0F172A]"><Star size={10} className="text-[#F59E0B] fill-current" /> 4,97</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-[26px] leading-tight font-bold text-[#0F172A] mb-4">
                Félicitations {firstName}, votre demande est en ligne !
              </h1>
              <p className="text-[#0F172A] text-[17px] mb-8 leading-relaxed font-medium">
                Vous recevrez les premières offres de nos meilleurs prestataires dans environ 🎉
              </p>
              
              <button 
                onClick={() => navigate('/task-details')} 
                className="w-full bg-[#0078FA] text-white font-bold text-[19px] rounded-xl py-4 hover:bg-blue-600 transition-colors"
              >
                Voir ma demande
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <TopNav />
      <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-4 pt-10 pb-32">
        {renderStepContent()}
      </div>

      {showAddressModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4 sticky top-0 bg-white z-10">
              <button onClick={() => setShowAddressModal(false)} className="text-slate-700 hover:text-slate-900"><ChevronLeft size={24} /></button>
              <div className="flex-1 font-semibold text-slate-800 truncate">{form.address}</div>
              <button onClick={() => setShowAddressModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <div className="px-6 py-6 overflow-y-auto">
              <div className="bg-slate-100 p-1 rounded-full flex items-center mb-8">
                {['Chez moi', 'Chez un proche'].map(opt => (
                  <button key={opt} onClick={() => setForm(p => ({ ...p, forWhom: opt }))} className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${form.forWhom === opt ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>{opt}</button>
                ))}
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Détails de l'adresse</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[{id: 'Maison', icon: HomeIcon}, {id: 'Appartement', icon: Building}, {id: 'Autre', icon: MapPin}].map(type => (
                    <button key={type.id} onClick={() => setForm(p => ({ ...p, placeType: type.id }))} className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-colors ${form.placeType === type.id ? 'border-[#0078FA] bg-blue-50 text-[#0078FA]' : 'border-slate-200 bg-slate-50'}`}>
                      <type.icon size={24} className="mb-2" /><span className="text-sm font-semibold">{type.id}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Vos coordonnées</h3>
                <label className="text-sm font-medium text-slate-700 block mb-2">Numéro de téléphone</label>
                <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-3">
                  <div className="flex items-center gap-1 px-2 border-r border-slate-300 text-lg">
                    🇫🇷 <ChevronRight size={16} className="text-slate-400 rotate-90" />
                  </div>
                  <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="06 12 34 56 78" className="bg-transparent border-none focus:outline-none flex-1 text-lg font-medium text-slate-700" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Les prestataires que vous réserverez pourront vous contacter sur ce numéro.</p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Nom de l'adresse</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center relative flex-shrink-0">
                    <HomeIcon size={24} className="text-orange-500 fill-current" />
                  </div>
                  <input type="text" value={form.addressName} onChange={(e) => setForm(p => ({ ...p, addressName: e.target.value }))} className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-lg font-medium text-slate-700 focus:outline-none" />
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Instruction d'arrivée</h3>
                <textarea placeholder="Bonjour, garez vous dans la rue..." value={form.arrivalInstructions} onChange={(e) => setForm(p => ({ ...p, arrivalInstructions: e.target.value }))} rows={3} className="w-full bg-slate-100 border-none rounded-xl p-4 text-slate-700 focus:outline-none" />
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-white">
              <button onClick={() => {
                setShowAddressModal(false)
                setIsAddressConfirmed(true)
              }} className="w-full bg-[#0078FA] text-white font-bold text-lg rounded-xl py-4 hover:bg-blue-600">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[2rem] w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col p-6 relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-5 right-5 text-slate-800 hover:text-black">
              <X size={20} strokeWidth={3} />
            </button>
            
            <div className="text-center font-bold text-slate-800 mb-6 mt-1 text-[15px]">Connexion ou inscription</div>
            
            <h2 className="text-[28px] font-bold text-[#0F172A] mb-8">Bienvenue sur Yoojo</h2>
            
            <div className="mb-6">
              <label className="text-[13px] font-semibold text-[#0F172A] block mb-2">Adresse e-mail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="jean.dupond@mail.com"
                className="w-full bg-[#F3F4F6] border-none rounded-xl px-4 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0078FA] transition-all font-medium text-slate-800"
              />
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={submitting || !form.email}
              className="w-full bg-[#0078FA] text-white font-bold text-[17px] rounded-xl py-3.5 hover:bg-blue-600 transition-colors disabled:opacity-50 mb-6"
            >
              {submitting ? 'Connexion...' : 'Continuer'}
            </button>

            <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-[13px] font-semibold">OU</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-[#F3F4F6] border-none rounded-xl py-3.5 font-semibold text-[#0F172A] text-[15px] hover:bg-[#E5E7EB] transition-colors flex items-center justify-center gap-3">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-[18px] h-[18px]" />
                Continuer avec Google
              </button>
              <button className="w-full bg-[#F3F4F6] border-none rounded-xl py-3.5 font-semibold text-[#0F172A] text-[15px] hover:bg-[#E5E7EB] transition-colors flex items-center justify-center gap-3">
                <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-[18px] h-[18px]" />
                Continuer avec Apple
              </button>
              <button className="w-full bg-[#F3F4F6] border-none rounded-xl py-3.5 font-semibold text-[#0F172A] text-[15px] hover:bg-[#E5E7EB] transition-colors flex items-center justify-center gap-3">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-[18px] h-[18px]" />
                Continuer avec Facebook
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <div className="max-w-3xl mx-auto px-4 h-20 flex items-center justify-between">
          <button onClick={() => step > 1 ? handlePrev() : navigate(-1)} className="text-[#0078FA] font-bold text-[17px] px-2">Retour</button>
          {step < 8 ? (
            <button onClick={handleNext} disabled={!canGoNext()} className="bg-[#0078FA] text-white font-bold text-[17px] rounded-xl py-3.5 px-8 disabled:opacity-50">Suivant</button>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="bg-[#0078FA] text-white font-bold text-[17px] rounded-xl py-3.5 px-8">Voir les prestataires</button>
          )}
        </div>
      </div>
    </div>
  )
}
