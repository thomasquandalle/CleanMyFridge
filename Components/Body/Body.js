import React from "react";
import {Fragment} from "react";
import {View} from "react-native";
import {Button, Icon, Text} from "react-native-elements";
import RefreshableList from "./RefreshableList";
import AddItem from "./AddItem";

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
						padding: 8,
						marginBottom: 8
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
							onPress = {() => this.setState({addItem: true})}
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
						changeItem = {this.props.changeItem}
						deleteItem = {this.props.deleteItem}
					/>
				</View>
				<AddItem
					isVisible = {this.state.addItem}
					onClose = {() =>this.setState({addItem: false})}
					addItem = {this.props.addItem}
					container = {this.props.container}
				/>
		</Fragment>)
	}
}

export default Body;