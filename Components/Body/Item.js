import React, {Component} from 'react';
import {View, ScrollView, Picker} from "react-native";
import {Overlay, Text, Input, Button, Divider} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {categories} from "../../utils/categories";
import {capitalize} from "../../utils/stringUtils";
import lodash from "lodash";

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
export default class Item extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			item: {},
			isModifying: false,
		};
	}

	componentDidUpdate(prevProps){
		if(this.props.isVisible && !prevProps.isVisible){ //Open the overlay
			this.setState({item: lodash.cloneDeep(this.props.item), isModifying: false})
		}
		if(!this.props.isVisible && prevProps.isVisible){ //Close the overlay
			this.setState({item: {}, isModifying: false})
		}
	}

	modifyDate(key){
		const self = this;
		return function(date){
			const newItem = Object.assign(self.state.item, {[key] : moment(date, dateFormat).toISOString()});
			self.setState({item: newItem})
		}
	}

	modifyField(key){
		const self = this;
		return function(value){
			const newItem = Object.assign(self.state.item, {[key] : value});
			self.setState({item: newItem})
		}
	}

	confirmChanges(){
		this.props.onClose();
		this.props.changeItem(this.state.item)
	}

	render() {
		const {isVisible, onClose} = this.props;
		const {item, isModifying} = this.state;
		return (
			<Overlay onBackdropPress={onClose} isVisible={isVisible}>
				<View style ={{flex:1, padding: 8}}>
					<View><Text h2>{item.name}</Text></View>
					<ScrollView style = {styles.container}>
						<Input
							editable = {isModifying}
							value = {item.name}
							containerStyle = {{display: "flex", marginTop: 8}}
							label = {"Nom"}
						/>


						<View style = {{display: "flex", marginTop: 8}}>
							<Text>Catégorie</Text>
							<Picker
								enabled={isModifying}
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
							editable = {isModifying}
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
						{isModifying ?
							<Button
								title = {"Confirmer"}
								containerStyle ={{width: "33%"}}
								onPress = {this.confirmChanges.bind(this)}
							/>
							:
							<Button
							title = {"Modifier"}
							containerStyle ={{width: "33%"}}
							onPress = {() => {this.setState({isModifying: true})}}
						/>}
					</View>
					<View
						style = {{
							display: "flex",
							flexDirection: "row",
							justifyContent: 'space-between',
							width: "100%",
						paddingTop: 8}}>
						<Button
							title = {"Supprimer"}
							containerStyle ={{width: "100%"}}
							buttonStyle = {{backgroundColor: "red"}}
							onPress = {() => {
								this.props.onClose()
								this.props.deleteItem(item.id)
							}}
						/>
					</View>
				</View>
			</Overlay>
		);
	}
}