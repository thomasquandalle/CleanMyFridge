/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';


import Header from "./Header/Header";
import {View, ScrollView} from "react-native";
import Footer from "./Footer/Footer";
import {displayNames} from "../utils/lists";
import {Text} from "react-native-elements";

class LocationContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listIndex: 0,
		}
	}

	render(){
		const {location} = this.props;
		const footerButtons = Object.keys(location.lists).filter(l => location.lists[l]).map(l => displayNames[l] || l);
		return (
			<View style={{
				flex:1,
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>
				<Header location={location.name} />

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
