import React from "react";
import {View, Fragment} from "react-native";

class Body extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addItem: false,
		}
	}

	render(){
		return (
			<Fragment>
				<View style={{
					flex:1,
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}>
					<View style={{
						height: 50,
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}>
						<Text>Hello</Text>
					</View>
				</View>
			</Fragment>)
	}
}