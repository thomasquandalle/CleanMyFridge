export const dummyLocation = {
	name: "Maison",
	lists: {
		CONGELATEUR :true,
		FRIGO: false,
		COURSES: true,
	},
	data: {
		CONGELATEUR: [{
			name: "Jambon",
			qty: "2 personnes",
			category: "VIANDE",
			startdate: new Date().toISOString(),
			enddate: new Date(new Date().getTime() + 1000 * 3600 * 4800).toISOString()
		},
			{
				name: "Carottes",
				qty: "3 personnes",
				category: "LEGUME",
				startdate: new Date().toISOString(),
				enddate: new Date(new Date().getTime() + 1000 * 3600 * 1200).toISOString()
			}],
		COURSES: [{
				name: "Jambon",
				qty: "2 personnes",
				category: "VIANDE",
				startdate: new Date().toISOString(),
				enddate: new Date(new Date().getTime() + 1000 * 3600 * 48).toISOString()
			},
			{
				name: "Carottes",
				qty: "3 personnes",
				category: "LEGUME",
				startdate: new Date().toISOString(),
				enddate: new Date(new Date().getTime() + 1000 * 3600 * 12).toISOString()
			}],
	}
};