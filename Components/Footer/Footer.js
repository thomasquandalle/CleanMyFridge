import React from "react";
import {ButtonGroup} from "react-native-elements";

const Footer = props => {
	const {buttons, selected, onPress} = props;
	return (
		<ButtonGroup
			containerStyle = {{
				marginLeft: 0,
				marginBottom: 0,
				width: '100%',
				height: 50,
			}}
			onPress={onPress}
			selectedIndex={selected}
			buttons={buttons}
		/>
	)
};

export default Footer;