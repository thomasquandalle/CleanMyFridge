import React from "react";
import {Alert, View} from "react-native";
import MultipleSelectList from "./MultipleSelectList";
import ActionButtons from "./ActionButtons";
import {addItems, deleteItems} from "../../../api/dataFunctions";
import {displayNames} from "../../../utils/lists";
import moment from "moment";
import {bestBefore} from "../../../utils/bestbefore";


export default class ModifyBody extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			deleteList: []
		}
	}

	onDelete(){
		deleteItems(this.props.locationName,this.props.container, this.state.deleteList)
			.then(() => {
				this.props.onRefresh();
				this.setState({deleteList: []});
				this.props.onCancel();
			}).catch(e => console.warn(e.message))
	}

	transferItems(container){
		const items = this.state.deleteList.map(itemId => {
			let itemFound = this.props.data.find(item => item.id === itemId);
			itemFound.startdate = moment().toISOString();
			const bestBeforeDays = bestBefore[container] ? bestBefore[container][itemFound.category] || 1 : 1;
			itemFound.enddate = moment().add(bestBeforeDays, 'd').toISOString();
			return itemFound
		});
		addItems(this.props.locationName, container, items).then(
			() => this.onDelete()
		).catch(e => console.warn(e.message))
	}

	handleDelete(){
		if(this.props.container === "COURSES"){
			const buttons = [
				{
					text: 'Non',
					onPress: this.onDelete.bind(this),
					style: 'cancel',
				}
			];
			this.props.availableContainers.filter(c=> c !== "COURSES").forEach(container => {
				const button = {
					text: 'Dans le ' + displayNames[container].toLowerCase(),
					onPress: () => this.transferItems(container)
				};
				buttons.push(button);
			});
			Alert.alert(
				'Transférer les produits?',
				'Voulez-vous transférer les produits?',
				buttons,
				{cancelable: false},
			);
		}
		else{
			this.onDelete()
		}
	}

	render(){
		return(
			<View style={{
				flex:1,
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>
				<ActionButtons
					onCancel = {this.props.onCancel}
					onDelete = {this.handleDelete.bind(this)} />
				<MultipleSelectList
					data = {this.props.data}
					setList = {(l) => this.setState({deleteList: l})}
					deleteList = {this.state.deleteList}
				/>
			</View>
		)
	}
}