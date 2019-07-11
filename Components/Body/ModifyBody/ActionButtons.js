import React from "react";
import {Button, Icon} from "react-native-elements";
import {View} from "react-native";

const ActionButtons = (props) => {
	return(<View style={{
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 8,
		marginBottom: 8
	}}>
		<Button
			icon={
				<Icon
					name="cancel"
					size={15}
					type={"material"}
					color="white"
				/>
			}
			title = "Annuler"
			containerStyle = {{borderRadius: 50}}
			onPress = {props.onCancel}
		/>
		<Button
			icon={
				<Icon
					name="delete"
					size={15}
					type={"material"}
					color="white"
				/>
			}
			title = "Supprimer"
			buttonStyle = {{backgroundColor:"red"}}
			containerStyle = {{borderRadius: 50}}
			onPress = {props.onDelete}
		/>
	</View>)
};

export default ActionButtons;