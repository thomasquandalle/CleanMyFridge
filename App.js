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
import Loading from "./Components/Loading";
import {Fragment} from "react";
import LocationChoice from "./Components/LocationChoice/LocationChoice";

export default class App extends React.Component{
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
                        onChoose = {(name) => this.setState({locationName: name})}
                        names = {this.state.locations}
                        onAdd = {() => {
                            getLocationNames().then(names => {
                            this.setState({locations: names});
                        })}}
                    />
                </Fragment>)
        }
        else{
            return <Loading/>
        }
    }
}

