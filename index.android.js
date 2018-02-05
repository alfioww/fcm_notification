import React from 'react';
import App from './src/'
//import App from './srcs/App'
import { AppRegistry } from 'react-native';
import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyB5vwKJ6UH53cZP4DKfYemgMwPsyE9AQH8",
	authDomain: "fcmnotif-64070.firebaseapp.com",
	databaseURL: "https://fcmnotif-64070.firebaseio.com",
	projectId: "fcmnotif-64070",
	storageBucket: "fcmnotif-64070.appspot.com",
	messagingSenderId: "1058774326810"
};
firebase.initializeApp(config);

AppRegistry.registerComponent('fcm_notification', () => App);