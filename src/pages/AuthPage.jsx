import { useState } from 'react'
import { Shield, Eye, EyeOff, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const PRIDE_COLORS = ['#E53E3E', '#FF9F43', '#F4D03F', '#27AE60', '#3B82F6', '#8E44AD']

export default function AuthPage() {
  const [tab, setTab] = useState('signin') // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signUp, signInAsGuest } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  })

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    setError('')
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return setError('Veuillez remplir tous les champs.')
    setLoading(true)
    try {
      await signIn({ email: form.email, password: form.password })
      navigate('/')
    } catch (err) {
      setError(err.message === 'Invalid login credentials'
        ? 'Email ou mot de passe incorrect.'
        : err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password || !form.fullName) return setError('Veuillez remplir tous les champs.')
    if (form.password !== form.confirmPassword) return setError('Les mots de passe ne correspondent pas.')
    if (form.password.length < 8) return setError('Le mot de passe doit contenir au moins 8 caractères.')
    setLoading(true)
    try {
      await signUp({ email: form.email, password: form.password, fullName: form.fullName })
      navigate('/onboarding/charter')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGuestSignIn = () => {
    signInAsGuest()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left panel — branding */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 bg-slate-900">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-2xl">SafeTask</span>
        </div>

        {/* Hero text */}
        <div>
          {/* Pride flag strip */}
          <div className="pride-strip mb-8 w-28">
            {PRIDE_COLORS.map((c, i) => (
              <div key={i} className="flex-1" style={{ background: c }} />
            ))}
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-5">
            Services à domicile,<br />en toute confiance
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md">
            La marketplace dédiée à la communauté LGBTQIA+ et ses allié·e·s. Tolérance zéro pour la discrimination.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {['Identité vérifiée', 'Charte Safe Space', 'Signalement instantané'].map(item => (
              <span key={item} className="bg-slate-800 px-3 py-1.5 rounded-lg text-sm text-slate-300 border border-slate-700">
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="text-slate-500 text-sm">
          © 2026 SafeTask — Tous droits réservés
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-slate-50 md:bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-slate-900 font-bold text-xl">SafeTask</span>
          </div>

          {/* Tabs */}
          <div className="bg-slate-100 rounded-lg p-1 flex mb-8">
            <button
              id="tab-signin"
              onClick={() => setTab('signin')}
              className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-colors duration-150 ${
                tab === 'signin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Se connecter
            </button>
            <button
              id="tab-signup"
              onClick={() => setTab('signup')}
              className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-colors duration-150 ${
                tab === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              S'inscrire
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-crimson-50 border border-crimson-100 rounded-lg px-4 py-3 mb-5">
              <AlertCircle size={16} className="text-crimson-600 flex-shrink-0" />
              <p className="text-crimson-700 text-sm">{error}</p>
            </div>
          )}

          {tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4" key="signin">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Bon retour</h2>

              <div>
                <label className="input-label">Adresse email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="signin-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="exemple@email.com"
                    className="input-field pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange('password')}
                    placeholder="••••••••"
                    className="input-field pl-10 pr-10"
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button id="signin-submit" type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-6">
                {loading ? <div className="spinner w-5 h-5" /> : (<><ArrowRight size={18} /> Se connecter</>)}
              </button>

              <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                <button
                  type="button"
                  onClick={handleGuestSignIn}
                  className="text-slate-500 hover:text-slate-800 text-sm transition-colors"
                >
                  Continuer sans s'identifier (mode invité) →
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4" key="signup">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Rejoignez-nous</h2>

              <div>
                <label className="input-label">Nom complet</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="signup-name"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    placeholder="Votre prénom et nom"
                    className="input-field pl-10"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Adresse email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="signup-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="exemple@email.com"
                    className="input-field pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange('password')}
                    placeholder="Au moins 8 caractères"
                    className="input-field pl-10 pr-10"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="input-label">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="signup-confirm"
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    placeholder="••••••••"
                    className="input-field pl-10"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button id="signup-submit" type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-6">
                {loading ? <div className="spinner w-5 h-5" /> : (<><ArrowRight size={18} /> Créer mon compte</>)}
              </button>

              <p className="text-slate-500 text-xs text-center">
                En vous inscrivant, vous acceptez notre Charte Safe Space.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
