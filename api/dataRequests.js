import AsyncStorage from "@react-native-community/async-storage";

export async function writeLocation(location){
	try {
		await AsyncStorage.setItem(location.name, JSON.stringify(location))
	} catch (e) {
		console.error(e)
	}
}


export async function getLocation(name){
	try {
		const value = await AsyncStorage.getItem(name);
		if(value !== null) {
			return JSON.parse(value)
		}
	} catch(e) {
	}
}

export async function getLocationNames(locationNames) {
	try {
		const value = await AsyncStorage.getItem('locationList');
		if (value !== null) {
			return JSON.parse(value)
		}
	} catch (e) {
		// error reading value
	}
}

export async function writeLocationNames(locations){
	try {
		await AsyncStorage.setItem("locationList", JSON.stringify(locations))
	} catch (e) {
		console.error(e)
	}
}

export async function deleteLocation(name){
	try {
		await AsyncStorage.removeItem(name);
	} catch (e) {
		console.error(e)
	}
}