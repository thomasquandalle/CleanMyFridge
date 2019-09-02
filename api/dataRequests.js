import AsyncStorage from "@react-native-community/async-storage";

const firebase = require("firebase");
require("firebase/firestore");


export async function writeLocation(location){
	firebase.firestore().collection("locations").doc(location.id).set(location);
	// try {
	// 	await AsyncStorage.setItem(location.name, JSON.stringify(location))
	// } catch (e) {
	// 	console.error(e)
	// }
}


export async function getLocation(id){
	try{
		return await new Promise(function (resolve) {
			firebase.firestore().collection("locations").doc(id).get().then(doc => {
				if (!doc.exists) {
					resolve({})
				} else {
					resolve(doc.data())
				}
			})
				.catch(err => {
					console.error('Error getting document', err);
				})
		})
	}catch (e) {
		console.error(e)
	}

	//Offline
	// try {
	// 	const value = await AsyncStorage.getItem(name);
	// 	if(value !== null) {
	// 		return JSON.parse(value)
	// 	}
	// } catch(e) {
	// }
}

export async function getLocationNames() {

	//Online
	try{
		const userId = firebase.auth().currentUser.uid;
		const locations = await new Promise(function(resolve){
			firebase.firestore().collection("locationRights").doc(userId).get().then(doc => {
				if (!doc.exists) {
					resolve([])
				} else {
					resolve(doc.data().locations)
				}
			})
			.catch(err => {
				console.log('Error getting document', err);
			});
		});
		return locations;
	}catch(e){
		console.error(e.message)
		return []
	}

	//Offline
/*	try {
		const value = await AsyncStorage.getItem('locationList');
		if (value !== null) {
			return JSON.parse(value)
		}
		else{
			await AsyncStorage.setItem('locationList', JSON.stringify([]));
			return []
		}
	} catch (e) {
	}*/
}

export async function writeLocationNames(locations){
	const userId = firebase.auth().currentUser.uid;
	firebase.firestore().collection("locationRights").doc(userId).set({userId, locations});
	// try {
	// 	await AsyncStorage.setItem("locationList", JSON.stringify(locations))
	// } catch (e) {
	// 	console.error(e)
	// }
}

export async function deleteLocation(id){
	firebase.firestore().collection("locations").doc(id).delete()
	// try {
	// 	await AsyncStorage.removeItem(name);
	// } catch (e) {
	// 	console.error(e)
	// }
}

export async function getSettings(){
	try {
		const value = await AsyncStorage.getItem("settings");
		if(value !== null) {
			return JSON.parse(value)
		}
		else{
			await AsyncStorage.setItem("settings", JSON.stringify({}));
			return {}
		}
	} catch(e) {
	}
}

export async function writeSettings(settingsObj){
	try {
		await AsyncStorage.setItem("settings", JSON.stringify(settingsObj))
	} catch (e) {
		console.error(e)
	}
}