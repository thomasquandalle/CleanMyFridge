import React from "react";
import {Button, Header, Icon} from "react-native-elements";
import {signOut} from "../../../api/networkRequests/authFunctions";

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
			rightComponent = {
				<Button
					icon={
						<Icon
							name="power-settings-new"
							type={"material"}
							color="white"
						/>
					}
					onPress = {signOut}
					type={"clear"}
				/>
			}
			statusBarProps={{ barStyle: "light-content" }}
		/>
	);
};

export default LocationHeader;
