import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem('guestMode') === 'true')

  // ─── Fetch or create user profile ──────────────────────────────────────────
  const fetchProfile = async (userId) => {
    if (isGuest) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code === 'PGRST116') {
      // Profile doesn't exist yet, create it
      const { data: newProfile } = await supabase
        .from('profiles')
        .insert([{ id: userId, verification_status: 'unsubmitted' }])
        .select()
        .single()
      setProfile(newProfile)
    } else {
      setProfile(data)
    }
  }

  useEffect(() => {
    if (isGuest) {
      setSession({ user: { id: 'guest' } })
      setProfile({
        id: 'guest',
        full_name: 'Visiteur (Invité)',
        email: 'invite@safetask.local',
        is_tasker: false,
        skills: [],
        hourly_rate: 20,
        charter_signed: true,
        identity_verified: true,
        verification_status: 'approved'
      })
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [isGuest])

  // ─── Auth methods ───────────────────────────────────────────────────────────
  const signInAsGuest = () => {
    localStorage.setItem('guestMode', 'true')
    setIsGuest(true)
  }

  const signUp = async ({ email, password, fullName }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
    if (error) throw error

    // Create profile immediately after signup
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        verification_status: 'unsubmitted',
        charter_signed: false,
      })
    }
    return data
  }

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    if (isGuest) {
      localStorage.removeItem('guestMode')
      setIsGuest(false)
      setProfile(null)
      setSession(null)
      return
    }
    await supabase.auth.signOut()
    setProfile(null)
    setSession(null)
  }

  const updateProfile = async (updates) => {
    if (isGuest) {
      const updated = { ...profile, ...updates }
      setProfile(updated)
      return updated
    }
    if (!session?.user) return
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id)
      .select()
      .single()
    if (error) throw error
    setProfile(data)
    return data
  }

  const refreshProfile = async () => {
    if (isGuest) return
    if (session?.user) await fetchProfile(session.user.id)
  }

  return (
    <AuthContext.Provider value={{
      session,
      profile,
      loading,
      user: session?.user,
      isGuest,
      signInAsGuest,
      signUp,
      signIn,
      signOut,
      updateProfile,
      refreshProfile,
      isAuthenticated: !!session || isGuest,
      charterSigned: profile?.charter_signed ?? false,
      identityVerified: profile?.identity_verified ?? false,
      verificationStatus: profile?.verification_status ?? 'unsubmitted',
    }}>
      {children}
    </AuthContext.Provider>
  )
}
