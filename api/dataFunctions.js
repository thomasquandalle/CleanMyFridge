import {deleteLocation, getLocation, getLocationNames, writeLocation, writeLocationNames} from "./dataRequests";
import lodash from "lodash";

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

export async function addItem(locationName, containerId, item){
	const location = await getLocation(locationName);
	location.data[containerId].push(item);
	await writeLocation(location);
	return true;
}

export async function changeItem(locationName, containerId, item){
	const location = await getLocation(locationName)
	const data = lodash.clone(location.data[containerId]);
	const index = data.findIndex(it => (it.id === item.id));
	data[index] = item;
	location.data[containerId] = data;
	await writeLocation(location)
	return true
}

export async function deleteItem(locationName, containerId, itemId){
	await deleteItems(locationName, containerId, [itemId])
}

export async function deleteItems(locationName, containerId, itemIds){
	const location = await getLocation(locationName);
	const data = lodash.clone(location.data[containerId]);
	for(let itemId of itemIds){
		const index = data.findIndex(it => (it.id === itemId));
		if(index >  -1){
			data.splice(index, 1);
		}
	}
	location.data[containerId] = data;
	await writeLocation(location);
	return true
}