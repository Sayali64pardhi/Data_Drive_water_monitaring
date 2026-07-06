import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, isSupported, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCeGr6_0kC1Q6o5DDZw6Quus3frkdJPVMQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "data-drive-water-monitoring.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "data-drive-water-monitoring",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||  "data-drive-water-monitoring.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "146209823621",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:146209823621:web:768c39aca0cd6eff5242ec",

    databaseURL:
   "https://data-drive-water-monitoring-default-rtdb.asia-southeast1.firebasedatabase.app",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services and Export them
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Cloud Messaging conditionally (Next.js SSR safety)
let messaging: Messaging | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

export { messaging };
export default app;