import React from "react";
import {Fragment} from "react";
import {View} from "react-native";
import {Button, Icon, Text} from "react-native-elements";
import RefreshableList from "./RefreshableList";

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
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 8
					}}>
						<Button
							icon={
								<Icon
									name="add"
									size={15}
									type={"material"}
									color="white"
								/>
							}
							title = "Ajouter"
							containerStyle = {{borderRadius: 50}}
						/>
						<Text>Bleh bleh filter</Text>
						<Button
							title = "Supprimer"
							containerStyle = {{borderRadius: 50}}
						/>
					</View>
					<RefreshableList
						data = {this.props.data}
						fetchData = {this.props.onRefresh}
						refreshing = {this.props.refreshing}
					/>
				</View>
		</Fragment>)
	}
}

export default Body;