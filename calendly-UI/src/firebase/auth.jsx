import { auth } from './firebase';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

// Creating User Profile
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with Email 
export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    return result;
};

// Sign Out
export const doSignOut = () => {
    return auth.signOut();
};


/** 
 
import {sendEmailVerification, sendPasswordResetEmail }  from 'firebase/auth';

--> Additional Methods for Authentication

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    })
}

*/
