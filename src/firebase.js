// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// 🔹 Firebase Analytics – only if supported (browser only)
isSupported().then((yes) => {
  if (yes) getAnalytics(app);
});

// 🔹 Firebase App Check (reCAPTCHA v3)
let appCheck;

if (typeof window !== "undefined") {
  // Optional: enable debug token in local dev (see Firebase docs)
  // if (import.meta.env.DEV) {
  //   // eslint-disable-next-line no-undef
  //   self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  // }

  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY
    ),
    isTokenAutoRefreshEnabled: true, // auto-refresh App Check token
  });
}

export const db = getFirestore(app);
export const storage = getStorage(app);
export { appCheck };
