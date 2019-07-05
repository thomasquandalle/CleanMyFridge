import React, {Component, Fragment} from 'react';
import {RefreshControl, ScrollView} from "react-native";
import {ListItem} from "react-native-elements";
import Item from "./Item";


type Props = {};
export default class RefreshableList extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			data: [],
			itemVisible: false,
			itemSelected: {}
		};
	}

	componentDidMount(){
		this._onRefresh();
	}


	_onRefresh = () => {
		this.setState({refreshing: true});
		this.props.fetchData().then((value) => {
			this.setState({data: value, refreshing: false});
		});
	}

	render() {
		return (
			<Fragment>
				<ScrollView
					style = {{width: '100%'}}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
						{
							this.state.data.map((l) => (
								<ListItem
									style = {{width: '100%'}}
									key={l.name}
									title={l.name}
									rightTitle = {l.enddate.format("DD-MM-YYYY")}
									subtitle={l.qty}
									onPress = {() => {this.setState({itemVisible: true, itemSelected: l})}}
									bottomDivider
								/>
							))
						}
				</ScrollView>
				<Item
					isVisible = {this.state.itemVisible}
					item = {this.state.itemSelected}
					container = {this.props.container}
					onClose= {() => {
						this.setState({itemVisible: false, itemSelected: {}})
					}}
				/>
			</Fragment>
		);
	}
}