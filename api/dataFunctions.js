import {deleteLocation, getLocationNames, writeLocation, writeLocationNames} from "./dataRequests";

export async function addLocation(name, lists) {
	let locations = await getLocationNames();
	let location = {
		name: name,
		lists: lists,
		data: {}
	};
	//Check if good and fill location
	let verifContainer = true;
	for (let list of Object.keys(lists)) {
		if (lists[list]) { //Check if there is this container in the location
			location.data[list] = [];
			verifContainer = false;
		}
	}
	if (verifContainer) {
		throw new Error("Un emplacement doit être sélectionné")
	}
	const verifName = name && !(locations.findIndex(n => n === name) > -1);
	if (!verifName) {
		throw new Error('Nom invalide')
	}
	locations.push(name);
	await writeLocationNames(locations);
	writeLocation(location).catch(e => console.error(e));
	return true
}

export async function deleteLocations(locationIndexes) {
	let locations = await getLocationNames();
	if (locationIndexes.length === locations.length) {
		throw new Error("Merci de laisser un endroit")
	}
	for (let index of locationIndexes) {
		const name = locations[index];
		locations.splice(index, 1);
		await deleteLocation(name)
	}
	await writeLocationNames(locations);
	return true;
}