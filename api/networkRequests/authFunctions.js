const firebase = require("firebase");
require("firebase/firestore");
import AsyncStorage from "@react-native-community/async-storage";

export function createAccount(email, password){
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error(errorCode, errorMessage);
	});
}


export function signIn(email, password, callback){
	firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}
			console.error(error);
		});
}

export function onAuthChanged(user){
	if(user){ //LoggedIn
		if(!user.emailVerified){
			user.sendEmailVerification().catch(e => console.error(e.code, e.message))
		}
		AsyncStorage.setItem("user", user.uid);
		return user.uid
	}
	else{
		AsyncStorage.removeItem("user");
		return null
	}
}

export function signOut(){
	firebase.auth().signOut().catch(e => console.error(e.code, e.message))
}