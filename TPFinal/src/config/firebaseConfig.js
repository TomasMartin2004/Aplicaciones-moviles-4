import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU9Oz2yphrd_Z4c38bfJcgVPlOsV4XD4w",
  authDomain: "tpfinal-a323d.firebaseapp.com",
  projectId: "tpfinal-a323d",
  storageBucket: "tpfinal-a323d.appspot.com",
  messagingSenderId: "555736246531",
  appId: "1:123456789012:web:1234567890123456789012",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
