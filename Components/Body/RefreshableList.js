import React, {Component, Fragment} from 'react';
import {RefreshControl, ScrollView} from "react-native";
import {ListItem} from "react-native-elements";
import moment from "moment";
import Item from "./Item";

type Props = {};
export default class RefreshableList extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			item: {}
		};
	}


	_onRefresh = () => {
		this.props.fetchData()
	};

	render() {
		const {data} = this.props;
		return (
			<Fragment>
				<ScrollView
					style = {{width: '100%'}}
					refreshControl={
						<RefreshControl
							refreshing={this.props.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
						{
							data.map((l, i) => (
								<ListItem
									style = {{width: '100%'}}
									key={i}
									title={l.name}
									rightTitle = {moment(l.enddate).format("DD-MM-YYYY")}
									subtitle={l.qty}
									onPress={() => {this.setState({visible: true, item: l})}}
									bottomDivider
								/>
							))
						}
				</ScrollView>
				<Item
					isVisible = {this.state.visible}
					item = {this.state.item}
					onClose = {() => {this.setState({visible: false, item: {}})}}
				/>
			</Fragment>
		);
	}
}