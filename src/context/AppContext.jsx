import { createContext, useContext, useState } from 'react'

const AppContext = createContext({})

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}

export function AppProvider({ children }) {
  const [activeRole, setActiveRole] = useState('client') // 'client' | 'tasker'
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => setNotification(null), 4000)
  }

  return (
    <AppContext.Provider value={{
      activeRole,
      setActiveRole,
      isClient: activeRole === 'client',
      isTasker: activeRole === 'tasker',
      notification,
      showNotification,
    }}>
      {children}
    </AppContext.Provider>
  )
}
