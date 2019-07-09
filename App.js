/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import LocationContainer from "./Components/LocationContainer";
import {getLocation, getLocationNames} from "./utils/dataRequests";
import {Text} from "react-native-elements";

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location: null,
            locationName: "",
            locations : null
        }
    }

    componentDidMount(){
        const self = this;
        //writeLocation(dummyLocation).then( setLocations(dummyLocation.name));
        getLocationNames().then(names => {
            self.setState({locations: names, locationName: names[0]});
        })
    }

    async refresh(){
        await getLocation(this.state.locationName).then(location => {
            this.setState({location})
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.locationName !== prevState.locationName){
            getLocation(this.state.locationName).then(location => {
                this.setState({location})
            })
        }
    }

    render(){
        if(this.state.location){
            return <LocationContainer
                location = {this.state.location}
                refresh = {this.refresh.bind(this)}
            />
        }
        else{
            return <Text>Waiting for location</Text>
        }
    }
}

