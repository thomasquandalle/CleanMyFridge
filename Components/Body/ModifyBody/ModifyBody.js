import React from "react";
import {View} from "react-native";
import MultipleSelectList from "./MultipleSelectList";
import ActionButtons from "./ActionButtons";
import {deleteItems} from "../../../api/dataFunctions";

export default class ModifyBody extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			deleteList: []
		}
	}

	onDelete(){
		deleteItems(this.props.locationName,this.props.container, this.state.deleteList)
			.then(() => {
				this.props.onRefresh();
				this.setState({deleteList: []});
				this.props.onCancel();
			}).catch(e => console.warn(e.message))
	}

	render(){
		return(
			<View style={{
				flex:1,
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>
				<ActionButtons
					onCancel = {this.props.onCancel}
					onDelete = {this.onDelete.bind(this)} />
				<MultipleSelectList
					data = {this.props.data}
					setList = {(l) => this.setState({deleteList: l})}
					deleteList = {this.state.deleteList}
				/>
			</View>
		)
	}
}