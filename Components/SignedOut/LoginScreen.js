import React, {Component} from 'react';
import {View} from "react-native";
import {Button, Input} from "react-native-elements";

const styles = {
	divider: {
		marginTop: 4,
		marginBottom: 4,
	},
	container: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		padding: 16,
	}
};

type Props = {};
export default class LoginScreen extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			confirmPassword: "",
			isCreating: false
		};
	}

	modifyField(key){
		const self = this;
		return function(value){
			self.setState({[key]: value})
		}
	}

	render() {
		const canCreate = this.state.username && this.state.password && (this.state.password === this.state.confirmPassword);
		return (
				<View style ={{flex:1, padding: 8, alignContent: 'center'}}>
					<View style = {styles.container}>
						<Input
							autoCapitalize = "none"
							autoCompleteType = "email"
							value = {this.state.username}
							containerStyle = {{display: "flex", marginTop: 8}}
							label = {"Mail"}
							password
							onChangeText = {this.modifyField("username")}
						/>


						<Input
							autoCompleteType = "password"
							secureTextEntry
							value = {this.state.password}
							containerStyle = {{display: "flex", marginTop: 8}}
							label = {"Mot de passe"}
							onChangeText = {this.modifyField("password")}
						/>

						{this.state.isCreating &&
							<Input
								autoCompleteType = "password"
								secureTextEntry
								errorMessage = {this.state.password === this.state.confirmPassword ? null : "Les mots de passe ne sont pas les mêmes"}
								value = {this.state.confirmPassword}
								containerStyle = {{display: "flex", marginTop: 8}}
								label = {"Confirmer le mot de passe"}
								onChangeText = {this.modifyField("confirmPassword")}
							/>
						}
					</View>
					<View
						style = {{
							display: "flex",
							flexDirection: "row",
							justifyContent: 'space-between',
							width: "100%"}}>
						{this.state.isCreating ?
							<Button
							buttonStyle = {{backgroundColor: "#0004A4"}}
							title = {"Se connecter"}
							onPress = {() => this.setState({isCreating: false})}
							containerStyle ={{width: "33%"}}
							/> :
							<Button
								buttonStyle = {{backgroundColor: "#0004A4"}}
								title = {"Créer un compte"}
								onPress = {() => this.setState({isCreating: true})}
								containerStyle ={{width: "33%"}}
							/>
						}
						{this.state.isCreating ?
							<Button
								buttonStyle = {{backgroundColor: "#0004A4"}}
								title = {"Créer le compte"}
								disabled = {!canCreate}
								onPress = {() => this.props.onCreate(this.state.username, this.state.password)}
								containerStyle ={{width: "33%"}}
							/> :
							<Button
								buttonStyle = {{backgroundColor: "#0004A4"}}
								title = {"Login"}
								onPress = {() => this.props.onSignIn(this.state.username, this.state.password)}
								containerStyle ={{width: "33%"}}
							/>
						}
					</View>
				</View>
		);
	}
}