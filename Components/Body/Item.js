import React, {Component} from 'react';
import {View} from "react-native";
import {Overlay, Text} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import moment from "moment";

const dateFormat = "DD-MM-YYYY";
type Props = {};
export default class Item extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			item: {}
		};
	}

	componentDidUpdate(prevProps){
		if(this.props.isVisible && !prevProps.isVisible){ //Open the overlay
			this.setState({item: this.props.item})
		}
		if(!this.props.isVisible && prevProps.isVisible){ //Close the overlay
			this.setState({item: {}})
		}
	}

	modifyDate(key){
		const self = this;
		return function(date){
			const newItem = Object.assign(item, {[key] : date})
			self.setState({item: newItem})
		}
	}

	render() {
		const {isVisible, onClose} = this.props;
		const {item} = this.state;
		return (
			<Overlay onBackdropPress={onClose} isVisible={isVisible}>
				<View>
				<Text h2 >{item.name}</Text>
				<DatePicker
					style={{width: 200}}
					date={moment(this.state.item.startdate).format(dateFormat)}
					mode="date"
					placeholder="select date"
					format={dateFormat}
					confirmBtnText="Confirmer"
					cancelBtnText="Annuler"
					customStyles={{
						dateIcon: {
							position: 'absolute',
							left: 0,
							top: 4,
							marginLeft: 0
						},
						dateInput: {
							marginLeft: 36
						}
					}}
					onDateChange={this.modifyDate("startdate")}
				/>
				<DatePicker
					style={{width: 200}}
					date={moment(this.state.item.enddate).format(dateFormat)}
					mode="date"
					placeholder="select date"
					format={dateFormat}
					confirmBtnText="Confirmer"
					cancelBtnText="Annuler"
					customStyles={{
						dateIcon: {
							position: 'absolute',
							left: 0,
							top: 4,
							marginLeft: 0
						},
						dateInput: {
							marginLeft: 36
						}
					}}
					onDateChange={this.modifyDate("enddate")}
				/>
				</View>
			</Overlay>
		);
	}
}