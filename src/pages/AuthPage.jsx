import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[--color-ks-lacquer-black] text-[--color-ks-text-warm] font-sans">
      {/* Left panel — branding */}
      <div className="hidden md:flex md:w-5/12 flex-col justify-between p-12 lg:p-20 bg-[--color-ks-lacquer-deep] border-r border-[--color-ks-gold-hairline] relative overflow-hidden">
        
        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10 mb-20">
          <span className="text-[--color-ks-kinpaku] font-display font-light text-3xl tracking-wide uppercase">SafeTask</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-[--color-ks-gold-hairline] rounded-sm w-max">
            <span className="w-1.5 h-1.5 rounded-full bg-[--color-ks-patina] animate-pulse"></span>
            <span className="text-[--color-ks-text-muted] text-[0.65rem] font-mono uppercase tracking-widest">
              Espace vérifié & bienveillant
            </span>
          </div>
          <h1 className="text-display text-5xl lg:text-7xl leading-[1.1] mb-8 text-[--color-ks-champagne]">
            VOS TRAVAUX,<br />SANS JUGEMENT.
          </h1>
          <p className="text-[--color-ks-text-warm] text-lg font-light leading-relaxed mb-12 max-w-md">
            Trouvez des artisan·es et prestataires de confiance. Une communauté qui rénove en toute sécurité.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Identité vérifiée', 'Charte signée', 'Inclusif'].map(item => (
              <span key={item} className="border border-[--color-ks-gold-hairline] text-[--color-ks-champagne] bg-[--color-ks-lacquer-black] px-4 py-2 text-[0.65rem] font-mono uppercase tracking-widest rounded-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[--color-ks-text-faint] text-[0.65rem] font-mono uppercase tracking-widest relative z-10 mt-12">
          © {new Date().getFullYear()} SAFETASK — TOUS DROITS RÉSERVÉS
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto bg-[--color-ks-lacquer-black]">
        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="flex items-center justify-center mb-10 md:hidden">
            <span className="text-[--color-ks-kinpaku] font-display font-light text-3xl tracking-wide uppercase">SafeTask</span>
          </div>

          {/* Tabs */}
          <div className="flex mb-10 border border-[--color-ks-gold-hairline] rounded-sm bg-[--color-ks-lacquer-deep] p-1">
            <button
              id="tab-signin"
              onClick={() => setTab('signin')}
              className={`flex-1 py-3 text-sm font-medium transition-colors duration-300 rounded-sm ${
                tab === 'signin' ? 'bg-[--color-ks-graphite] text-[--color-ks-kinpaku]' : 'text-[--color-ks-text-muted] hover:text-[--color-ks-champagne]'
              }`}
            >
              Connexion
            </button>
            <button
              id="tab-signup"
              onClick={() => setTab('signup')}
              className={`flex-1 py-3 text-sm font-medium transition-colors duration-300 rounded-sm ${
                tab === 'signup' ? 'bg-[--color-ks-graphite] text-[--color-ks-kinpaku]' : 'text-[--color-ks-text-muted] hover:text-[--color-ks-champagne]'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-[--color-ks-lacquer-deep] border border-[--color-ks-vermilion] rounded-md px-4 py-3 mb-8">
              <AlertCircle size={18} className="text-[--color-ks-vermilion] flex-shrink-0" />
              <p className="text-[--color-ks-vermilion] text-sm tracking-wide">{error}</p>
            </div>
          )}

          {tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-6" key="signin">
              <h2 className="text-headline text-3xl mb-8">Ravi de vous revoir</h2>

              <div>
                <label className="input-label mb-2">Adresse email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted]" />
                  <input
                    id="signin-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="exemple@email.com"
                    className="input-field pl-11 py-3"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="input-label mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted]" />
                  <input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange('password')}
                    placeholder="••••••••"
                    className="input-field pl-11 pr-11 py-3"
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button id="signin-submit" type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-8 text-sm">
                {loading ? <div className="spinner w-5 h-5 spinner-white" /> : 'ME CONNECTER'}
              </button>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={handleGuestSignIn}
                  className="text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto group"
                >
                  Continuer en invité <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-6" key="signup">
              <h2 className="text-headline text-3xl mb-8">Créer un compte</h2>

              <div>
                <label className="input-label mb-2">Nom complet</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted]" />
                  <input
                    id="signup-name"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    placeholder="Votre prénom et nom"
                    className="input-field pl-11 py-3"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label className="input-label mb-2">Adresse email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted]" />
                  <input
                    id="signup-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="exemple@email.com"
                    className="input-field pl-11 py-3"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="input-label mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted]" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange('password')}
                    placeholder="Au moins 8 caractères"
                    className="input-field pl-11 pr-11 py-3"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted] hover:text-[--color-ks-champagne] transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="input-label mb-2">Confirmer mot de passe</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--color-ks-text-muted]" />
                  <input
                    id="signup-confirm"
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    placeholder="••••••••"
                    className="input-field pl-11 py-3"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button id="signup-submit" type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-8 text-sm">
                {loading ? <div className="spinner w-5 h-5 spinner-white" /> : "S'INSCRIRE"}
              </button>

              <p className="text-[--color-ks-text-faint] text-xs text-center mt-6 tracking-wide leading-relaxed max-w-xs mx-auto">
                En vous inscrivant, vous acceptez notre <span className="text-[--color-ks-champagne] underline cursor-pointer hover:text-[--color-ks-kinpaku] transition-colors">Charte de bienveillance</span>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
