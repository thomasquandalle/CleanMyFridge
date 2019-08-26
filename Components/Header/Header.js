import React from "react";
import { Button, Header } from "react-native-elements";

const styles = {
	container: {
		height: 50,
		paddingTop: -20
	}
};

const LocationHeader = props => {
	return (
		<Header
			containerStyle={styles.container}
			backgroundColor = '#0004a4'
			centerComponent={
				<Button
					titleStyle = {{
						color: 'white'
					}}
					title={props.location}
					onPress={props.onClick}
					type = 'clear'
				/>
			}
			statusBarProps={{ barStyle: "light-content" }}
		/>
	);
};

export default LocationHeader;
