import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

function readEnvString(key: keyof ImportMetaEnv): string | undefined {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

const firebaseConfig = {
  apiKey: readEnvString("VITE_FIREBASE_API_KEY"),
  authDomain: readEnvString("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: readEnvString("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: readEnvString("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: readEnvString("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: readEnvString("VITE_FIREBASE_APP_ID"),
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

let db: Firestore | null = null;

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp({
    apiKey: firebaseConfig.apiKey!,
    authDomain: firebaseConfig.authDomain!,
    projectId: firebaseConfig.projectId!,
    storageBucket: firebaseConfig.storageBucket!,
    messagingSenderId: firebaseConfig.messagingSenderId!,
    appId: firebaseConfig.appId!,
  });
}

export function getFirestoreDb(): Firestore | null {
  if (!isFirebaseConfigured) return null;

  if (!db) {
    db = getFirestore(getFirebaseApp());
  }

  return db;
}
