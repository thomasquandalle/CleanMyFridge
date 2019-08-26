import React from "react";
import {ScrollView, View} from "react-native";
import {Button, CheckBox, Input, Overlay, Text} from "react-native-elements";
import {displayNames} from "../../utils/lists";
import lodash from "lodash";


export default class AddLocation extends React.Component{

	constructor(props){
		super(props);
		let checked = {};
		for(let container of Object.keys(displayNames)){
			checked[container] = false
		}
		this.state = {
			name: "",
			checked
		}
	}

	handleChange(container){
		return () => {
			const newChecked = lodash.cloneDeep(this.state.checked);
			newChecked[container] = !this.state.checked[container]
			this.setState({checked: newChecked})
		}
	}

	render(){
		return (
			<Overlay isVisible = {this.props.open} onBackdropPress={this.props.onClose}>
				<View style = {{flex:1, padding:8, flexDirection: "column", justifyContent: "space-between"}}>
					<Text h2>Ajout d'endroit</Text>
					<ScrollView
						style = {{ width: '100%'}}
					>
						<Input
							value = {this.state.name}
							containerStyle = {{display: "flex", marginTop: 8}}
							label = {"Nom"}
							onChangeText = {(name) => this.setState({name})}
						/>
						{Object.keys(this.state.checked).map(container => (
							<CheckBox
								key = {container}
								title={displayNames[container]}
								checked={this.state.checked[container]}
								onPress = {this.handleChange(container)}
							/>
						))}
					</ScrollView>
					<Button
						title = {"Ajouter"}
						containerStyle ={{width: "100%"}}
						buttonStyle = {{backgroundColor: "#0004A4"}}
						onPress = {() => this.props.onAdd(this.state.name, this.state.checked)}
					/>
				</View>
			</Overlay>
		)
	}
}