import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
const AuthContext = createContext({ user: null, loading: true })
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u ?? null); setLoading(false) })
    return () => unsub()
  }, [])
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
