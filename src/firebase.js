import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4zy4gQ1fAMhC9T2VnBnYm9KliN__rxxA",
  authDomain: "badycode-7df3e.firebaseapp.com",
  projectId: "badycode-7df3e",
  storageBucket: "badycode-7df3e.firebasestorage.app",
  messagingSenderId: "215664682930",
  appId: "1:215664682930:web:b91ce53dbd45ce59e7e6ab",
  measurementId: "G-9NVN30NXB6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };


