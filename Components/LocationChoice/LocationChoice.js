import React, {Fragment} from "react";
import {ScrollView, View} from "react-native";
import {Button, ListItem, Overlay, Text} from "react-native-elements";
import {addLocation} from "../../utils/dataRequests";
import AddLocation from "./AddLocation";

export default class LocationChoice extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addOpen: false,
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
										onPress = {() => {
											this.props.onChoose(l);
											this.props.onClose();
										}}
									/>
								))
							}
						</ScrollView>
						<Button
							title = {"Ajouter"}
							containerStyle ={{width: "100%"}}
							onPress = {() => this.setState({addOpen: true})}
						/>
					</View>
				</Overlay>
				<AddLocation
					open = {this.state.addOpen}
					onClose = {() => this.setState({addOpen: false})}
					onAdd = {(name, checked) => {
						addLocation(name,checked).then((value) => {
							if(value) {
								this.setState({addOpen: false})
								this.props.onAdd();
							}
						}).catch(e => console.warn(e.message))

					}}
				/>
			</Fragment>
		)
	}
};