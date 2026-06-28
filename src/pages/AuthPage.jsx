import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

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
    <div className="min-h-screen flex flex-col md:flex-row bg-[--color-tx-bg-alt]">
      {/* Left panel — branding */}
      <div className="hidden md:flex md:w-5/12 flex-col justify-between p-12 lg:p-20 bg-[--color-tx-navy] relative text-white">

        {/* Logo */}
        <div className="flex items-center gap-2.5 relative z-10 mb-20">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-[--color-tx-navy] font-bold text-sm">Q</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">Queer Service</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-white/10 rounded-md w-max text-sm font-medium">
            <ShieldCheck size={14} />
            <span>Espace vérifié & de confiance</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight mb-5 tracking-tight">
            Fait pour nous, par nous.
          </h1>
          <p className="text-base opacity-70 leading-relaxed mb-10 max-w-md">
            Une plateforme d'entraide pour la communauté LGBT+. Connecter les talents et les besoins, dans un esprit d'Ubuntu.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Espace safe', 'Inclusivité', 'Entraide'].map(item => (
              <span key={item} className="bg-white/10 px-3 py-1.5 text-xs font-medium rounded-md">
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs font-medium opacity-40 relative z-10 mt-12">
          © {new Date().getFullYear()} Queer Service — Tous droits réservés
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto bg-[--color-tx-bg-alt]">
        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8 md:hidden">
            <div className="w-8 h-8 bg-[--color-tx-navy] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="font-semibold text-xl tracking-tight text-[--color-tx-navy]">Queer Service</span>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 bg-white p-1 rounded-xl shadow-sm border border-[--color-tx-border]">
            <button
              id="tab-signin"
              onClick={() => setTab('signin')}
              className={`flex-1 py-3 text-sm font-bold transition-all duration-200 rounded-lg ${
                tab === 'signin' ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary] hover:bg-[--color-tx-bg-alt]'
              }`}
            >
              Connexion
            </button>
            <button
              id="tab-signup"
              onClick={() => setTab('signup')}
              className={`flex-1 py-3 text-sm font-bold transition-all duration-200 rounded-lg ${
                tab === 'signup' ? 'bg-[--color-tx-primary-light] text-[--color-tx-primary]' : 'text-[--color-tx-text-secondary] hover:bg-[--color-tx-bg-alt]'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-[--color-tx-danger-light] border border-[--color-tx-danger] rounded-xl px-4 py-3 mb-6 shadow-sm">
              <AlertCircle size={20} className="text-[--color-tx-danger] flex-shrink-0" />
              <p className="text-[--color-tx-danger] text-sm font-semibold">{error}</p>
            </div>
          )}

          <div className="tx-card p-6 md:p-8 bg-white">
            {tab === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-6" key="signin">
                <h2 className="text-2xl font-bold text-[--color-tx-navy] mb-6">Ravi de vous revoir</h2>

                <div>
                  <label className="input-label">Adresse email</label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted]" />
                    <input
                      id="signin-email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="exemple@email.com"
                      className="input-field pl-12"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Mot de passe</label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted]" />
                    <input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange('password')}
                      placeholder="••••••••"
                      className="input-field pl-12 pr-12"
                      autoComplete="current-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted] hover:text-[--color-tx-primary] transition-colors">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button id="signin-submit" type="submit" disabled={loading} className="btn-primary w-full py-3 mt-4 text-base">
                  {loading ? <div className="spinner" /> : 'Se connecter'}
                </button>

                <div className="pt-6 mt-6 border-t border-[--color-tx-border] text-center">
                  <button
                    type="button"
                    onClick={handleGuestSignIn}
                    className="text-[--color-tx-text-secondary] hover:text-[--color-tx-primary] text-sm font-semibold transition-colors flex items-center justify-center gap-2 mx-auto group"
                  >
                    Continuer en tant qu'invité <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-6" key="signup">
                <h2 className="text-2xl font-bold text-[--color-tx-navy] mb-6">Créer un compte</h2>

                <div>
                  <label className="input-label">Nom complet</label>
                  <div className="relative">
                    <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted]" />
                    <input
                      id="signup-name"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange('fullName')}
                      placeholder="Votre prénom et nom"
                      className="input-field pl-12"
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Adresse email</label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted]" />
                    <input
                      id="signup-email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="exemple@email.com"
                      className="input-field pl-12"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Mot de passe</label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted]" />
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange('password')}
                      placeholder="Au moins 8 caractères"
                      className="input-field pl-12 pr-12"
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted] hover:text-[--color-tx-primary] transition-colors">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="input-label">Confirmer mot de passe</label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-tx-text-muted]" />
                    <input
                      id="signup-confirm"
                      type={showPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      placeholder="••••••••"
                      className="input-field pl-12"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <button id="signup-submit" type="submit" disabled={loading} className="btn-primary w-full py-3 mt-4 text-base">
                  {loading ? <div className="spinner" /> : "S'inscrire"}
                </button>

                <p className="text-[--color-tx-text-secondary] text-xs text-center mt-6">
                  En vous inscrivant, vous acceptez nos <span className="text-[--color-tx-primary] font-semibold cursor-pointer hover:underline">Conditions d'utilisation</span>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
