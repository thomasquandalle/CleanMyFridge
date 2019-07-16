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
import Body from "./Body/BodyContainer";
import {writeLocation} from "../api/dataRequests";

class LocationContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listIndex: 0,
			refreshing: false,
		}
	}

	onRefresh(){
		this.setState({refreshing:true});
		this.props.refresh().then(() => {
			this.setState({refreshing: false})
		})
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
				<Header
					location={location.name}
					onClick = {this.props.onHeaderClick}
				/>
				<Body
					locationName = {location.name}
					data = {location.data[footerKeys[this.state.listIndex]]}
					onRefresh = {this.onRefresh.bind(this)}
					availableContainers = {footerKeys}
					refreshing = {this.state.refreshing}
					container = {footerKeys[this.state.listIndex]}
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
