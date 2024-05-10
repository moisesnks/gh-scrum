import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, DocumentReference, Timestamp, DocumentSnapshot } from "firebase/firestore";

import firebaseConfig from "../credentials.json";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, DocumentReference, Timestamp, DocumentSnapshot };