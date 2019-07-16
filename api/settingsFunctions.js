import {getSettings, writeSettings} from "./dataRequests";

export async function changeSettings(key, newValue){
	let settings = await getSettings();
	settings[key] = newValue;
	await writeSettings(settings);
	return true
}