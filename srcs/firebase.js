import * as firebase from 'firebase';

// should go in a secret file
const config = {
	apiKey: "AIzaSyB5vwKJ6UH53cZP4DKfYemgMwPsyE9AQH8",
	authDomain: "fcmnotif-64070.firebaseapp.com",
	databaseURL: "https://fcmnotif-64070.firebaseio.com",
	projectId: "fcmnotif-64070",
	storageBucket: "fcmnotif-64070.appspot.com",
	messagingSenderId: "1058774326810"
};
firebase.initializeApp(config);


export default firebase;