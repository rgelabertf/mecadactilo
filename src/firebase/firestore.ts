import { db } from './config'
import { doc, collection, setDoc, getDoc, getDocs, query, where, orderBy, limit, Timestamp, writeBatch } from 'firebase/firestore'
import { Attempt, UserStats } from '../types'

const USERS_COL = 'users'
const ATTEMPTS_COL = 'attempts'

export interface FirestoreUserData {
  stats: UserStats
  displayName: string
  email: string
  createdAt: number
  lastActiveAt: number
}

export async function getUserStats(userId: string): Promise<UserStats | null> {
  const ref = doc(db, USERS_COL, userId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return (snap.data() as FirestoreUserData).stats
}

export async function saveUserStats(userId: string, stats: UserStats, displayName?: string, email?: string): Promise<void> {
  const ref = doc(db, USERS_COL, userId)
  const snap = await getDoc(ref)
  const now = Date.now()
  if (!snap.exists()) {
    const data: FirestoreUserData = {
      stats,
      displayName: displayName || 'Estudiante',
      email: email || '',
      createdAt: now,
      lastActiveAt: now,
    }
    await setDoc(ref, data)
  } else {
    await setDoc(ref, { stats, lastActiveAt: now }, { merge: true })
  }
}

export async function getAttempts(userId: string, maxResults = 500): Promise<Attempt[]> {
  const ref = collection(db, USERS_COL, userId, ATTEMPTS_COL)
  const q = query(ref, orderBy('timestamp', 'desc'), limit(maxResults))
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as Attempt)
}

export async function saveAttempt(userId: string, attempt: Attempt): Promise<void> {
  const ref = doc(db, USERS_COL, userId, ATTEMPTS_COL, attempt.id)
  await setDoc(ref, attempt)
}

export async function saveAttemptsBatch(userId: string, attempts: Attempt[]): Promise<void> {
  const batch = writeBatch(db)
  for (const a of attempts) {
    const ref = doc(db, USERS_COL, userId, ATTEMPTS_COL, a.id)
    batch.set(ref, a)
  }
  await batch.commit()
}

export async function getAllStudentsData(): Promise<{ userId: string; data: FirestoreUserData }[]> {
  const ref = collection(db, USERS_COL)
  const snap = await getDocs(ref)
  const results: { userId: string; data: FirestoreUserData }[] = []
  snap.forEach(doc => {
    results.push({ userId: doc.id, data: doc.data() as FirestoreUserData })
  })
  return results
}

export async function getStudentAttempts(userId: string): Promise<Attempt[]> {
  return getAttempts(userId)
}
