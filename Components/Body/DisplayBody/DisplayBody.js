import React, {Fragment} from "react";
import {Picker, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import RefreshableList from "./RefreshableList";
import AddItem from "./AddItem";
import {capitalize} from "../../../utils/stringUtils";
import lodash from "lodash";

const orderByGen = container => (
	container === "COURSES" ?
		{
			"enddate": "Date de péremption",
			"startdate": "Date d'ajout",
			"name": "Nom",
			"category": "Catégorie"
		} :
		{
			"enddate": "Date de péremption",
			"startdate": "Date d'ajout",
			"name": "Nom",
			"category": "Catégorie"
		});
class DisplayBody extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addItem: false,
			orderBy: null
		}
	}

	render(){
		let data = this.props.data;
		const orderBy = orderByGen(this.props.container);
		if(orderBy){
			data = lodash.sortBy(data, d => d[this.state.orderBy])
		}
		return (
			<Fragment>
				<View style={{
					flex:1,
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}>
					<View style={{
						height: 50,
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 8,
						marginBottom: 8
					}}>
						<Button
							icon={
								<Icon
									name="add"
									size={15}
									type={"material"}
									color="white"
								/>
							}
							title = "Ajouter"
							containerStyle = {{borderRadius: 50}}
							onPress = {() => this.setState({addItem: true})}
						/>
						<Picker
							selectedValue={this.state.orderBy}
							style={{height: 50, width: "33%"}}
							prompt = {"Trier par"}
							onValueChange={orderBy => this.setState({orderBy})}>
							<Picker.Item label={"Trier par.."} value={null} key={"null"}/>
							{Object.keys(orderBy).map((key => <Picker.Item label={capitalize(orderBy[key])} value={key} key={key}/>))}
						</Picker>
					</View>
					<RefreshableList
						data = {data}
						onLongPress = {this.props.onModify}
						onRefresh = {this.props.onRefresh}
						refreshing = {this.props.refreshing}
						container = {this.props.container}
						locationName = {this.props.locationName}
					/>
				</View>
				<AddItem
					isVisible = {this.state.addItem}
					onClose = {() =>this.setState({addItem: false})}
					onRefresh = {this.props.onRefresh}
					locationName = {this.props.locationName}
					container = {this.props.container}
				/>
		</Fragment>)
	}
}

export default DisplayBody;