import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyA_Cn_V-mZwGIrGXLpepN27sm1kyy2Y6aY",
    authDomain: "merch-db.firebaseapp.com",
    databaseURL: "https://merch-db.firebaseio.com",
    projectId: "merch-db",
    storageBucket: "",
    messagingSenderId: "331271880189",
    appId: "1:331271880189:web:7dd3ccdd8e8bdf61"
};

export const createUserProfileDocument = async (userAuth, additionalData ) => {
	if (!userAuth) return;


	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if(!snapShot.exists){
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email, 
				createdAt,
				...additionalData
			})

		} catch (error){
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () =>auth.signInWithPopup(provider);

export default firebase;
