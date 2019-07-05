import React, {Component} from 'react';
import {RefreshControl, ScrollView} from "react-native";
import {ListItem} from "react-native-elements";
import moment from "moment";

type Props = {};
export default class RefreshableList extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
		};
	}


	_onRefresh = () => {
		this.props.fetchData()
	}

	render() {
		const {data} = this.props;
		return (
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
									bottomDivider
								/>
							))
						}
				</ScrollView>
		);
	}
}