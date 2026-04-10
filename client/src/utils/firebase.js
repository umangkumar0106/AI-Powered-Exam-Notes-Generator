import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-8aeb6.firebaseapp.com",
  projectId: "authexamnotes-8aeb6",
  storageBucket: "authexamnotes-8aeb6.firebasestorage.app",
  messagingSenderId: "818407163834",
  appId: "1:818407163834:web:8f3b23f200af5e72373f83",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
