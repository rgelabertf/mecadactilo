import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth'
import { auth } from './config'
import { getUserStats, saveUserStats, FirestoreUserData, getAttempts as fsGetAttempts, saveAttempt as fsSaveAttempt } from './firestore'
import { Attempt } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  isTeacher: boolean
  firestoreUserData: FirestoreUserData | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName?: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  refreshUserData: () => Promise<void>
  syncAttempt: (attempt: Attempt) => Promise<void>
  getAttemptsForUser: (userId?: string) => Promise<Attempt[]>
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isTeacher, setIsTeacher] = useState(false)
  const [firestoreUserData, setFirestoreUserData] = useState<FirestoreUserData | null>(null)

  const refreshUserData = useCallback(async () => {
    if (!user) return
    const stats = await getUserStats(user.uid)
    if (stats) {
      setFirestoreUserData(prev => prev ? { ...prev, stats } : null)
    }
  }, [user])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const data = await getUserStats(u.uid)
        if (data) {
          setFirestoreUserData(prev => prev ? { ...prev, stats: data } : null)
        }
        try {
          const tokenResult = await u.getIdTokenResult()
          setIsTeacher(tokenResult.claims.role === 'teacher')
        } catch {
          setIsTeacher(false)
        }
      } else {
        setFirestoreUserData(null)
        setIsTeacher(false)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (email: string, password: string, displayName?: string) => {
    const name = displayName || 'Estudiante'
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    const initialStats = {
      currentLevel: 1,
      xp: 0,
      streak: 0,
      maxStreak: 0,
      totalKeystrokes: 0,
      correctKeystrokes: 0,
      wpm: 0,
      accuracy: 0,
      level: 1,
      unlockedLevels: [1],
    }
    await saveUserStats(cred.user.uid, initialStats, name, email)
    setFirestoreUserData({
      stats: initialStats,
      displayName: name,
      email: email || '',
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    })
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const cred = await signInWithPopup(auth, provider)
    const name = cred.user.displayName || 'Estudiante'
    const data = await getUserStats(cred.user.uid)
    if (!data) {
      const initialStats = {
        currentLevel: 1,
        xp: 0,
        streak: 0,
        maxStreak: 0,
        totalKeystrokes: 0,
        correctKeystrokes: 0,
        wpm: 0,
        accuracy: 0,
        level: 1,
        unlockedLevels: [1],
      }
      await saveUserStats(cred.user.uid, initialStats, name, cred.user.email || '')
      setFirestoreUserData({
        stats: initialStats,
        displayName: name,
        email: cred.user.email || '',
        createdAt: Date.now(),
        lastActiveAt: Date.now(),
      })
    } else {
      setFirestoreUserData(prev => prev ? { ...prev, stats: data } : null)
    }
  }

  const logout = async () => {
    await signOut(auth)
    setFirestoreUserData(null)
    setIsTeacher(false)
  }

  const syncAttempt = async (attempt: Attempt) => {
    if (!user) throw new Error('No authenticated user')
    await fsSaveAttempt(user.uid, attempt)
  }

  const getAttemptsForUser = async (userId?: string): Promise<Attempt[]> => {
    const uid = userId || user?.uid
    if (!uid) throw new Error('No user ID provided')
    return fsGetAttempts(uid)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isTeacher,
      firestoreUserData,
      login,
      register,
      signInWithGoogle,
      logout,
      refreshUserData,
      syncAttempt,
      getAttemptsForUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
