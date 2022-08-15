import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2Fi3AYJre1xoyRFRVz1zzZZF_9CMKd-c",
  authDomain: "qitter-db2d7.firebaseapp.com",
  projectId: "qitter-db2d7",
  storageBucket: "qitter-db2d7.appspot.com",
  messagingSenderId: "790294090127",
  appId: "1:790294090127:web:b364ad48b9dd7f6c17bbfa",
  measurementId: "G-NTEZ1P1DGH",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
