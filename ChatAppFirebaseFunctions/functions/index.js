const functions = require('firebase-functions');
let admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp(functions.config().firebase);
exports.sendPush = functions.database.ref('/messages/{id}').onWrite(event => {
	let messagesStateChanged = false;
	let messagesCreated = false;
	let messagesData = event.data.val();
	if (!event.data.previous.exists()) {
			messagesCreated = true;
	}
	if (!messagesCreated && event.data.changed()) {
			messagesStateChanged = true;
	}

	let msg = 'A messages state was changed';

	if (messagesCreated) {
			msg = `The following new messages was added to the messages: ${messagesData.text}`;
	}

	return loadUsers().then(users => {
			let tokens = [];
			for (let user of users) {
					tokens.push(user.pushToken);
			}

			let payload = {
					notification: {
							title: 'Firebase Notification',
							body: msg,
							sound: 'default',
							badge: '1'
					}
			};
			
			return admin.messaging().sendToDevice(tokens, payload);
	});
});

function loadUsers() {
	let dbRef = admin.database().ref('users/');
	let defer = new Promise((resolve, reject) => {
			dbRef.once('value', (snap) => {
					let data = snap.val();
					let users = [];
					for (var property in data) {
							users.push(data[property]);
					}
					resolve(users);
			}, (err) => {
					reject(err);
			});
	});
	return defer;
}

exports.sendNewMessageNotification = functions.database.ref('/messages').onWrite(event => {
	const getValuePromise = admin.database()
		.ref('messages')
		.orderByKey()
		.limitToLast(1)
		.once('value');

	return getValuePromise.then(snapshot => {
		console.log(_.values(snapshot.val())[0]);
		const { text, author } = _.values(snapshot.val())[0];

		const payload = {
			notification: {
				title: 'New msg',
				body: text,
				icon: author.avatar
			}
		};

		return admin.messaging()
			.sendToTopic('secret-chatroom', payload);
	});
});