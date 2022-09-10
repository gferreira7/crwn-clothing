import firebase from 'firebase/compat/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {

    apiKey: "AIzaSyA_EYocCb0lFsN0SuI6zO1S3lx31OwzL8E",
  
    authDomain: "crwn-clothing-db-44025.firebaseapp.com",
  
    projectId: "crwn-clothing-db-44025",
  
    storageBucket: "crwn-clothing-db-44025.appspot.com",
  
    messagingSenderId: "628317949154",
  
    appId: "1:628317949154:web:be57ab285ab5718dcd22bb"
  
  };
  
    
//   const app = initializeApp(firebaseConfig);
  const app = firebase.initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt: "select_account"
  })



  export const auth = getAuth(app)
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
  

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            })
        } catch (error) {
            console.log('error creating the user', error.message );
        }
    }
    
    return userDocRef
  }
