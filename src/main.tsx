import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

const firebaseConfig = {
	apiKey: "AIzaSyAWTaoEWrxjmTD68HOE31ez9bCeeHqGY7Q",

	authDomain: "odinwaldo-bf33b.firebaseapp.com",

	projectId: "odinwaldo-bf33b",

	storageBucket: "odinwaldo-bf33b.appspot.com",

	messagingSenderId: "1006576148950",

	appId: "1:1006576148950:web:c82d7d4af4f352edb08477",
};

const myFirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(myFirebaseApp);

const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };

export const firestoreDB = getFirestore(myFirebaseApp);