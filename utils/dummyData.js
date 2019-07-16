import uuid from "uuid";

export const dummyLocation = {
	name: "Maison",
	lists: {
		CONGELATEUR :true,
		FRIGO: false,
		COURSES: true,
	},
	data: {
		CONGELATEUR: [
			{
				id: 1,
				name: "Jambon",
				qty: "2 personnes",
				category: "VIANDE",
				startdate: new Date().toISOString(),
				enddate: new Date(new Date().getTime() + 1000 * 3600 * 4800).toISOString()
			},
			{
				id: 2,
				name: "Carottes",
				qty: "3 personnes",
				category: "LÉGUME",
				startdate: new Date().toISOString(),
				enddate: new Date(new Date().getTime() + 1000 * 3600 * 1200).toISOString()
			}],
		COURSES: [
			{
				id: 3,
				name: "Jambon",
				qty: "2 personnes",
				category: "VIANDE",
				startdate: new Date().toISOString(),
				enddate: new Date(new Date().getTime() + 1000 * 3600 * 48).toISOString()
			},
			{
				id: 4,
				name: "Riz",
				qty: "3 personnes",
				category: "FÉCULENT",
				startdate: new Date().toISOString(),
				enddate: new Date(new Date().getTime() + 1000 * 3600 * 12).toISOString()
			}],
	}
};

export const dummySettings = {
	currentLocation: "Maison"
};