/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import firebase from "firebase";
import {createAccount, onAuthChanged, signIn} from "./api/networkRequests/authFunctions";
import SignedInContainer from "./Components/SignedIn/SignedInContainer";
import {Button} from "react-native-elements";
import LoginScreen from "./Components/SignedOut/LoginScreen";

const settings = require('./settings');
const firebaseConfig = settings.firebase;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: null
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            const uid = onAuthChanged(user);
            this.setState({userId: uid})

        });
    }

    render(){
        if(this.state.userId){
            return <SignedInContainer/>
        }
        else{
            return <LoginScreen
                onSignIn = {(username, password) => {
                    signIn(username, password);
                }}
                onCreate = {(username, password) =>{
                    createAccount(username, password)
                }}
            />
        }
    }
}

