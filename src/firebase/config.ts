// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAppSelector } from "../hooks/useTypedSelectorAndDispatch";
// import { Timestamp} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqZuZT3wJSt6AvQndU2WzhFUx69FJuiA4",
  authDomain: "code-book-7ca65.firebaseapp.com",
  projectId: "code-book-7ca65",
  storageBucket: "code-book-7ca65.appspot.com",
  messagingSenderId: "874387873952",
  appId: "1:874387873952:web:b4981ce306e6c6988b29c5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//init services
export const db = getFirestore(app);
// project Auth
export const auth = getAuth(app)
// export const timestamp = Timestamp
export default db
//name of the key in session storage
export const collectionName = "codeBookData"
//firestore collection with code cells
export const  collectionCellData = "codeBook"
//firestore collection with user displayName
export const collectionDisplayName = "users"
