import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  projectId: "gen-lang-client-0839268711",
  appId: "1:21643875511:web:3d52b664ed5df30fb4a932",
  apiKey: "AIzaSyCcSnYm7Zs1xWIpiT402DPP1W5a48aUD8U",
  authDomain: "gen-lang-client-0839268711.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-modernmindsconsu-6c8498f5-62f9-48e6-837d-024d59c0509a",
  storageBucket: "gen-lang-client-0839268711.firebasestorage.app",
  messagingSenderId: "21643875511",
  measurementId: "",
  oAuthClientId: "21643875511-ql9heh603sorb3kh5s5hklkk7j1tf22c.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with the provisioned database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);

// Validate connection
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client offline, operating with resilient local cache.');
    }
    return false;
  }
}

// Test connection on boot
testFirebaseConnection();

export default firebaseConfig;
