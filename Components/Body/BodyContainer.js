import React from "react";
import DisplayBody from "./DisplayBody/DisplayBody";
import ModifyBody from "./ModifyBody/ModifyBody";

export default class BodyContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modifying: false,
		}
	}

	componentDidUpdate(prevProps){
		if(this.props.container !== prevProps.container || this.props.locationName !== prevProps.locationName){
			this.setState({modifying: false})
		}
	}

	render(){
		if(!this.state.modifying)
			return <DisplayBody {...this.props} onModify = {() => this.setState({modifying: true})}/>;
		else
			return <ModifyBody {...this.props} onCancel = {() => this.setState({modifying: false})}/>

	}
}