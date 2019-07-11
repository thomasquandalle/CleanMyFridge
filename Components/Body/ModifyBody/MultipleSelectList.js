import React from "react";
import {ScrollView} from "react-native";
import {ListItem} from "react-native-elements";
import lodash from "lodash";
import moment from "moment";

const MultipleSelectList = (props) => {
	const {data} = props;
	return (
		<ScrollView
			style={{width: '100%'}}
		>
			{
				data.map(l => (
					<ListItem
						style={{width: '100%'}}
						key={l.id}
						title={l.name}
						rightTitle={moment(l.enddate).format("DD-MM-YYYY")}
						subtitle={l.qty}
						bottomDivider
						checkmark={props.deleteList.findIndex(j => l.id === j) > -1}
						onPress={() => {
							const checked = lodash.clone(props.deleteList);
							const index = props.deleteList.findIndex(j => l.id === j);
							if (index === -1)
								checked.push(l.id);
							else
								checked.splice(index, 1);
							props.setList(checked)
						}}
					/>
				))
			}
		</ScrollView>
	)
};

export default MultipleSelectList