'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const FirebaseContext = createContext<{
  auth: ReturnType<typeof getAuth> | null
  db: ReturnType<typeof getFirestore> | null
  user: User | null
}>({
  auth: null,
  db: null,
  user: null,
})

export const useFirebase = () => useContext(FirebaseContext)

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<ReturnType<typeof getAuth> | null>(null)
  const [db, setDb] = useState<ReturnType<typeof getFirestore> | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)

    setAuth(auth)
    setDb(db)

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  return (
    <FirebaseContext.Provider value={{ auth, db, user }}>
      {children}
    </FirebaseContext.Provider>
  )
}

