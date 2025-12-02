import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Only initialize Firebase if we have the required environment variables
// This prevents build-time errors when env vars are missing
const hasFirebaseConfig = 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const firebaseConfig = hasFirebaseConfig ? {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
} : null;

// Initialize Firebase only if config is available and we're in browser or have valid config
let app: ReturnType<typeof getApp> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let googleAuthProvider: GoogleAuthProvider | null = null;

if (firebaseConfig) {
  try {
    // Initialize Firebase only once (singleton pattern)
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    googleAuthProvider = new GoogleAuthProvider();
  } catch (error) {
    // If initialization fails (e.g., during build with invalid config), 
    // we'll handle it gracefully - components should check for null
    console.warn('Firebase initialization failed:', error);
  }
}

export { app, db, auth, googleAuthProvider };
