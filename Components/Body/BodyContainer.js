import React from "react";
import {Text} from "react-native-elements";
import DisplayBody from "./DisplayBody/DisplayBody";
import ModifyBody from "./ModifyBody/ModifyBody";

export default class BodyContainer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			modifying: false,
		}
	}

	render(){
		if(!this.state.modifying)
			return <DisplayBody {...this.props} onModify = {() => this.setState({modifying: true})}/>;
		else
			return <ModifyBody {...this.props} onCancel = {() => this.setState({modifying: false})}/>

	}
}