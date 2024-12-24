import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FirebaseContext = createContext<{
  auth: typeof auth | null;
  firestore: typeof firestore | null;
  user: any | null;
}>({
  auth: null,
  firestore: null,
  user: null,
});

export const useFirebase = () => useContext(FirebaseContext);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber;
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, firestore, user }}>
      {children}
    </FirebaseContext.Provider>
  );
}

