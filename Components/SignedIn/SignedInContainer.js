/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import LocationContainer from "./LocationContainer";
import {getLocation, getLocationNames, getSettings, writeSettings} from "../../api/dataRequests";
import Loading from "./Loading";
import LocationChoice from "./LocationChoice/LocationChoice";
import {changeSettings,} from "../../api/settingsFunctions";
import {addLocation} from "../../api/dataFunctions";


export default class SignedInContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			location: null,
			locationName: "",
			locations : null,
			locationChoiceOpened: false,
		}
	}

	componentDidMount(){
		const self = this;
		getLocationNames().then(locations => {
			if(!locations.length){
				const name = "Maison";
				//Create first location ==> todo
				addLocation(name,{
					CONGELATEUR :true,
					FRIGO: true,
					COURSES: true,
				}).then(id => {
					self.setState({locations: [{id, name}], locationName: id})
				})
			}
			else{
				getSettings().then(value => {
					if(value.location && false){
						self.setState({locations: locations, locationName: value.location});
					}
					else{
						self.setState({locations: locations, locationName: locations[0].locationId});
					}
				})
			}
		})
	}

	changeLocation(id){
		this.setState({locationName: id});
		changeSettings('location', id).catch(e => console.error(e));

	}

	async refresh(){
		await getLocation(this.state.locationName).then(location => {
			this.setState({location})
		});
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.locationName !== prevState.locationName){
			this.setState({location: null});
			getLocation(this.state.locationName).then(location => {
				this.setState({location})
			})
		}
	}

	render(){
		if(this.state.location){
			return (
				<Fragment>
					<LocationContainer
						location = {this.state.location}
						refresh = {this.refresh.bind(this)}
						onHeaderClick = {() => this.setState({locationChoiceOpened: true})}
					/>
					<LocationChoice
						open = {this.state.locationChoiceOpened}
						onClose = {() => this.setState({locationChoiceOpened: false})}
						onChoose = {name => this.changeLocation(name)}
						locations = {this.state.locations}
						refreshLocations = {() => {
							getLocationNames().then(locations => {
								this.setState({locations: locations});
							})}}
					/>
				</Fragment>)
		}
		else{
			return <Loading/>
		}
	}
}

