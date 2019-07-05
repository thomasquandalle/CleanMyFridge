/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';


import Header from "./Header/Header";
import {View} from "react-native";
import Footer from "./Footer/Footer";
import {displayNames} from "../utils/lists";
import Body from "./Body/Body";

class LocationContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listIndex: 0,
			refreshing: false,
		}
	}

	render(){
		const {location} = this.props;
		const footerKeys = Object.keys(location.lists).filter(l => location.lists[l]);
		const footerButtons = footerKeys.map(l => displayNames[l] || l);
		return (
			<View style={{
				flex:1,
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>
				<Header location={location.name} />
				<Body
					data = {location.data[footerKeys[this.state.listIndex]]}
					onRefresh = {() => {
						this.setState({refreshing:true});
						console.warn("Refresh")
						setTimeout(() => {this.setState({refreshing: false})}, 1000)
					}}
					refreshing = {this.state.refreshing}
				/>
				<Footer
					buttons = {footerButtons}
					selected = {this.state.listIndex}
					onPress = {(index)=> this.setState({listIndex: index})}
				/>
			</View>
		);
	}
}

export default LocationContainer;
