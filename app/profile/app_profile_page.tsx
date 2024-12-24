'use client'

import { useState, useEffect } from 'react'
import { useFirebase } from '../components/FirebaseProvider'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

interface UserProfile {
  name: string
  email: string
  address: string
  phone: string
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({ name: '', email: '', address: '', phone: '' })
  const [isEditing, setIsEditing] = useState(false)
  const { user, db, auth } = useFirebase()
  const router = useRouter()

  useEffect(() => {
    if (user && db) {
      const fetchProfile = async () => {
        const profileRef = doc(db, 'users', user.uid)
        const profileSnap = await getDoc(profileRef)
        if (profileSnap.exists()) {
          setProfile(profileSnap.data() as UserProfile)
        }
      }
      fetchProfile()
    }
  }, [user, db])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user && db) {
      const profileRef = doc(db, 'users', user.uid)
      await updateDoc(profileRef, profile)
      setIsEditing(false)
    }
  }

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut()
      router.push('/auth')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <button onClick={() => setIsEditing(true)} className="w-full p-2 bg-blue-500 text-white rounded">
            Edit Profile
          </button>
        </div>
      )}
      <button onClick={handleLogout} className="w-full p-2 mt-4 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  )
}

