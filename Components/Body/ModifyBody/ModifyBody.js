import React from "react";
import {ScrollView, View} from "react-native";
import {Button, Icon, ListItem} from "react-native-elements";
import moment from "moment";
import MultipleSelectList from "./MultipleSelectList";
import ActionButtons from "./ActionButtons";

export default class ModifyBody extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			deleteList: []
		}
	}

	render(){
		return(
			<View style={{
				flex:1,
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>
				<ActionButtons onCancel = {this.props.onCancel} onDelete = {() => console.warn(this.state.deleteList)} />
				<MultipleSelectList
					data = {this.props.data}
					setList = {(l) => this.setState({deleteList: l})}
					deleteList = {this.state.deleteList}
				/>
			</View>
		)
	}
}