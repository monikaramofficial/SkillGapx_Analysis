import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Check if Firebase credentials have been configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== "your_api_key_here"
);

// Initialize Firebase safely (avoiding duplicate initialization during SSR/HMR)
let app;
let auth = null;
let db = null;

try {
  if (!getApps().length) {
    if (isFirebaseConfigured) {
      app = initializeApp(firebaseConfig);
    } else {
      // Fallback initialization to allow UI preview without crashing before keys are added
      app = initializeApp(
        {
          apiKey: "AIzaSyDummyKeyForPreviewModeOnly12345",
          authDomain: "skillgapx-preview.firebaseapp.com",
          projectId: "skillgapx-preview",
          storageBucket: "skillgapx-preview.appspot.com",
          messagingSenderId: "123456789012",
          appId: "1:123456789012:web:abcdef1234567890",
        },
        "preview-app"
      );
    }
  } else {
    app = getApp();
  }

  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization warning (credentials pending in .env.local):", error.message);
}

export { auth, db };
export default app;
