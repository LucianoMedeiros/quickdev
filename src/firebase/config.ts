import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBV2SHP9FqC_IyPZkStbrlYbd8KCZoHiak',
  authDomain: 'quikdev-d21f1.firebaseapp.com',
  projectId: 'quikdev-d21f1',
  storageBucket: 'quikdev-d21f1.appspot.com',
  messagingSenderId: '576708673341',
  appId: '1:576708673341:web:e3533d28b58ad53d7c0f54',
}

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig)
export const fbStorage = getStorage(fbApp)
export const fbFirestoreDB = getFirestore(fbApp)
