/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {Text} from "react-native-elements";


const Loading = (props) => {
	return(<View style={{
		flex:1,
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: "center"
	}}>
		<ActivityIndicator size={150} color="#000" />
		<Text h2 h2Style = {{textAlign: "center"}}> Loading data</Text>
	</View>)
};

export default Loading;
