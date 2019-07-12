import React, {Fragment} from "react";
import {ScrollView, View} from "react-native";
import {Button, ListItem, Overlay, Text} from "react-native-elements";
import AddLocation from "./AddLocation";
import lodash from "lodash";
import {addLocation, deleteLocations} from "../../api/dataFunctions";

export default class LocationChoice extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addOpen: false,
			multiSelect: false,
			checked : []
		}
	}

	render(){
		const {names} = this.props;
		return (
			<Fragment>
				<Overlay isVisible = {this.props.open} onBackdropPress={this.props.onClose}>
					<View style = {{flex:1, padding:8, flexDirection: "column", justifyContent: "space-between"}}>
						<Text h2>Choix d'endroit</Text>
						<ScrollView
							style = {{ width: '100%'}}
						>
							{
								names.map((l, i) => (
									<ListItem
										style = {{width: '100%'}}
										key={i}
										title={l}
										bottomDivider
										checkmark = {this.state.multiSelect  && this.state.checked.findIndex(j => i===j) > -1}
										onLongPress = {() => {
											if(this.state.multiSelect === false){
												this.setState({multiSelect: true, checked: [i]})
											}
											else{
												const checked = lodash.clone(this.state.checked)
												const index = this.state.checked.findIndex(j => i===j)
												if(index === -1)
													checked.push(i);
												else
													checked.splice(index,1);
												this.setState({checked})
											}


										}}
										onPress = {() => {
											if(this.state.multiSelect === false){
												this.props.onChoose(l);
												this.props.onClose();
											}
											else{
												const checked = lodash.clone(this.state.checked)
												const index = this.state.checked.findIndex(j => i===j)
												if(index === -1)
													checked.push(i);
												else
													checked.splice(index,1);
												this.setState({checked})
											}
										}}
									/>
								))
							}
						</ScrollView>
						{this.state.multiSelect ?
							<View
								style = {{
									display: "flex",
									flexDirection: "row",
									justifyContent: 'space-between',
									width: "100%",
									paddingTop: 8}}>
								<Button
									title = {"Annuler"}
									containerStyle ={{width: "40%"}}
									onPress = {() => {
										this.setState({multiSelect: false})
									}}
								/>
								<Button
									title = {"Supprimer"}
									containerStyle ={{width: "40%"}}
									buttonStyle = {{backgroundColor: "red"}}
									onPress = {() => {
										deleteLocations(this.state.checked).catch(e => console.warn(e.message)).then(value => {
											if(value){
												this.setState({multiSelect: false})
												this.props.refreshLocations()
											}
										})
									}}
								/>
							</View>
							:
								<Button
									title = {"Ajouter"}
									containerStyle ={{width: "100%"}}
									onPress = {() => this.setState({addOpen: true})}
								/>
							}
					</View>
				</Overlay>
				<AddLocation
					open = {this.state.addOpen}
					onClose = {() => this.setState({addOpen: false})}
					onAdd = {(name, checked) => {
						addLocation(name,checked).then((value) => {
							if(value) {
								this.setState({addOpen: false})
								this.props.refreshLocations();
							}
						}).catch(e => console.warn(e.message))

					}}
				/>
			</Fragment>
		)
	}
};