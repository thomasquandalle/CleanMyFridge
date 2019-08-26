import React from "react";
import {ButtonGroup} from "react-native-elements";

const Footer = props => {
	const {buttons, selected, onPress} = props;
	return (
		<ButtonGroup
			buttonStyle = {{backgroundColor: '#0004a4'}}
			selectedButtonStyle = {{backgroundColor: '#101fff'}}
			textStyle = {{color: "white"}}
			selectedButton
			containerStyle = {{
				marginLeft: 0,
				marginBottom: 0,
				width: '100%',
				height: 50,
				backgroundColor: '#0004a4'
			}}
			onPress={onPress}
			selectedIndex={selected}
			buttons={buttons}
		/>
	)
};

export default Footer;