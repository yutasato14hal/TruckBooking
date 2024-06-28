import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBaGzVkRQ-61cU-rzbio0dOfztgULkbrwc",
    authDomain: "sangaku2024-e211a.firebaseapp.com",
    projectId: "sangaku2024-e211a",
    storageBucket: "sangaku2024-e211a.appspot.com",
    messagingSenderId: "727846651361",
    appId: "1:727846651361:web:9c9b6b07b5aa7c88f13ea0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };