import React, {Component} from 'react';
import {View, ScrollView, Picker} from "react-native";
import {Overlay, Text, Input, Button, Divider} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {categories} from "../../../utils/categories";
import {capitalize} from "../../../utils/stringUtils";
import {bestBefore} from "../../../utils/bestbefore";
import lodash from "lodash";
import uuid from "uuid"

const dateFormat = "DD-MM-YYYY";
const styles = {
	divider: {
		marginTop: 4,
		marginBottom: 4,
	},
	container: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		padding: 16,
	}
};

type Props = {};
export default class AddItem extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			item: {},
		};
	}

	componentDidUpdate(prevProps, prevState){
		const {item} = this.state;
		const {container} = this.props;
		const prevItem = prevState.item;
		const bestBeforeDays = bestBefore[container] ? bestBefore[container][item.category] || 1 : 1;
		if(this.props.isVisible && !prevProps.isVisible){ //Open the overlay
			this.setState({item: {
					id: uuid(),
					startdate: moment().toISOString(),
				}})
		}
		if(item.category !== prevItem.category || item.startdate !== prevItem.startdate){
			const enddate = moment(item.startdate).add(bestBeforeDays, "d").format(dateFormat)
			this.modifyDate("enddate")(enddate)
		}
	}

	modifyDate(key){
		const self = this;
		return function(date){
			const newItem = Object.assign(lodash.clone(self.state.item), {[key] : moment(date, dateFormat).toISOString()});
			self.setState({item: newItem})
		}
	}

	modifyField(key){
		const self = this;
		return function(value){
			const newItem = Object.assign(lodash.clone(self.state.item), {[key] : value});
			self.setState({item: newItem})
		}
	}

	confirmChanges(){
		this.props.onClose();
		this.props.addItem(this.state.item)
	}

	render() {
		const {isVisible, onClose} = this.props;
		const {item} = this.state;
		return (
			<Overlay onBackdropPress={onClose} isVisible={isVisible}>
				<View style ={{flex:1, padding: 8}}>
					<View><Text h2>Nouvel item</Text></View>
					<ScrollView style = {styles.container}>
						<Input
							value = {item.name}
							containerStyle = {{display: "flex", marginTop: 8}}
							label = {"Nom"}
							onChangeText = {this.modifyField("name")}
						/>


						<View style = {{display: "flex", marginTop: 8}}>
							<Text>Catégorie</Text>
							<Picker
								selectedValue={item.category}
								style={{height: 50, width: "100%"}}
								prompt = {"Catégorie"}
								onValueChange={this.modifyField("category")}>
								<Picker.Item label={"Catégorie..."} value={null} key={"null"}/>
								{Object.keys(categories).map((key => <Picker.Item label={capitalize(categories[key])} value={key} key={key}/>))}
							</Picker>
						</View>

						<Divider style = {styles.divider}/>

						<Input
							value = {item.qty}
							containerStyle = {{display: "flex", marginTop: 8}}
							label = {"Quantité"}
							onChangeText = {this.modifyField("qty")}
						/>

						<View style = {{display: "flex", marginTop: 8}}>
							<Text>Date d'ajout</Text>
							<DatePicker
								style={{width: 200}}
								date={moment(this.state.item.startdate).format(dateFormat)}
								mode="date"
								placeholder="select date"
								format={dateFormat}
								confirmBtnText="Confirmer"
								cancelBtnText="Annuler"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36
									}
								}}
								onDateChange={this.modifyDate("startdate")}
							/>
						</View>

						<View style = {{display: "flex", marginTop: 8}}>
							<Text>Date de péremption</Text>
							<DatePicker
								style={{width: 200}}
								date={moment(this.state.item.enddate).format(dateFormat)}
								mode="date"
								placeholder="select date"
								format={dateFormat}
								confirmBtnText="Confirmer"
								cancelBtnText="Annuler"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36
									}
								}}
								onDateChange={this.modifyDate("enddate")}
							/>
						</View>
					</ScrollView>
					<View
						style = {{
							display: "flex",
							flexDirection: "row",
							justifyContent: 'space-between',
							width: "100%"}}>
						<Button
							title = {"Annuler"}
							onPress = {this.props.onClose}
							containerStyle ={{width: "33%"}}
						/>
						<Button
							title = {"Ajouter"}
							onPress = {this.confirmChanges.bind(this)}
							containerStyle ={{width: "33%"}}
						/>
					</View>
				</View>
			</Overlay>
		);
	}
}