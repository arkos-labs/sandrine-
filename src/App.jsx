import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

// Pages
import AuthPage from './pages/AuthPage'
import CharterPage from './pages/onboarding/CharterPage'
import VerificationPage from './pages/onboarding/VerificationPage'
import HomePage from './pages/HomePage'
import MarketplacePage from './pages/MarketplacePage'
import PostTaskPage from './pages/PostTaskPage'
import ChatPage from './pages/ChatPage'
import ProfilePage from './pages/ProfilePage'

// Notification Toast
import { useApp } from './context/AppContext'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

function Toast() {
  const { notification } = useApp()
  if (!notification) return null

  const icons = { success: CheckCircle, error: AlertCircle, info: Info }
  const Icon = icons[notification.type] || Info
  const colors = {
    success: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    error: 'border-crimson-100 bg-crimson-50 text-crimson-700',
    info: 'border-indigo-100 bg-indigo-50 text-indigo-700',
  }

  return (
    <div className={`fixed top-4 right-4 z-[200] flex items-center gap-2 px-4 py-3 rounded-lg border ${colors[notification.type] || colors.info} animate-fade-in max-w-sm shadow-popover bg-white`}>
      <Icon size={16} className="flex-shrink-0" />
      <p className="text-sm font-medium">{notification.message}</p>
    </div>
  )
}

// ─── Protected route wrapper ──────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, profile } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
            <div className="spinner-dark" />
          </div>
          <p className="text-slate-500 text-sm">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/auth" replace />

  // Onboarding gate
  if (profile && !profile.charter_signed) return <Navigate to="/onboarding/charter" replace />

  return children
}

// ─── Onboarding route (accessible only when authenticated) ───────────────────
function OnboardingRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/auth" replace />
  return children
}

function AppRoutes() {
  return (
    <>
      <Toast />
      <Routes>
        {/* Public */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Onboarding */}
        <Route path="/onboarding/charter" element={
          <OnboardingRoute><CharterPage /></OnboardingRoute>
        } />
        <Route path="/onboarding/verification" element={
          <OnboardingRoute><VerificationPage /></OnboardingRoute>
        } />

        {/* Protected App Routes */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
        <Route path="/post-task" element={<ProtectedRoute><PostTaskPage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/chat/:chatId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
