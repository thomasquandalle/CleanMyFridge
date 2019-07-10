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
import {writeLocation} from "../utils/dataRequests";

class LocationContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listIndex: 0,
			refreshing: false,
		}
	}

	changeItem(item){
		const {location} = this.props;
		const footerKeys = Object.keys(location.lists).filter(l => location.lists[l]);
		let data = location.data[footerKeys[this.state.listIndex]];
		const index = data.findIndex(it => (it.id === item.id));
		data[index] = item
		writeLocation(location).catch(e => console.error(e)).then(this.onRefresh.bind(this))
	}

	addItem(item){
		if(item.id){
			const {location} = this.props;
			const footerKeys = Object.keys(location.lists).filter(l => location.lists[l]);
			let data = location.data[footerKeys[this.state.listIndex]];
			data.push(item);
			writeLocation(location).catch(e => console.error(e)).then(this.onRefresh.bind(this))
		}
	}

	deleteItem(id){
		const {location} = this.props;
		const footerKeys = Object.keys(location.lists).filter(l => location.lists[l]);
		let data = location.data[footerKeys[this.state.listIndex]];
		const index = data.findIndex(it => (it.id === id));
		data = data.splice(index, 1);
		writeLocation(location).catch(e => console.error(e)).then(this.onRefresh.bind(this))
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
				<Header location={location.name} />
				<Body
					data = {location.data[footerKeys[this.state.listIndex]]}
					onRefresh = {this.onRefresh.bind(this)}
					changeItem = {this.changeItem.bind(this)}
					deleteItem = {this.deleteItem.bind(this)}
					addItem = {this.addItem.bind(this)}
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
