import firebase from '../firebase';
import DeviceInfo from 'react-native-device-info';
import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult, RemoteNotificationResult } from 'react-native-fcm';
import { Platform } from 'react-native';

export const addMessage = (msg) => ({
	type: 'ADD_MESSAGE',
	...msg
});

export const sendMessage = (text, user) => {
	return function (dispatch) {
		let msg = {
			text: text,
			time: Date.now(),
			author: {
				name: user.name,
				avatar: user.avatar
			}
		};

		const newMsgRef = firebase.database()
			.ref('messages')
			.push();
		msg.id = newMsgRef.key;
		newMsgRef.set(msg);

		dispatch(addMessage(msg));
	};
};

export const startFetchingMessages = () => ({
	type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
	type: 'RECEIVED_MESSAGES',
	receivedAt: Date.now()
});

export const fetchMessages = () => {
	return function (dispatch) {
		dispatch(startFetchingMessages());

		firebase.database()
			.ref('messages')
			.orderByKey()
			.limitToLast(20)
			.on('value', (snapshot) => {
				// gets around Redux panicking about actions in reducers
				setTimeout(() => {
					const messages = snapshot.val() || [];

					dispatch(receiveMessages(messages))
				}, 0);
			});
	}
}

export const receiveMessages = (messages) => {
	return function (dispatch) {
		Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

		dispatch(receivedMessages());
	}
}

export const updateMessagesHeight = (event) => {
	const layout = event.nativeEvent.layout;

	return {
		type: 'UPDATE_MESSAGES_HEIGHT',
		height: layout.height
	}
}



//
// User actions
//

export const setUserName = (name) => ({
	type: 'SET_USER_NAME',
	name
});

export const setUserAvatar = (avatar) => ({
	type: 'SET_USER_AVATAR',
	avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
});

export const login = () => {
	return function (dispatch, getState) {
		dispatch(startAuthorizing());

		firebase.auth()
			.signInAnonymously()
			.then(() => {
				const { name, avatar } = getState().user;

				firebase.database()
					.ref(`users/${DeviceInfo.getUniqueID()}`)
					.set({
						name,
						avatar,
						uid: `${DeviceInfo.getUniqueID()}`
					});

				startChatting(dispatch);
			});
	}
}

export const checkUserExists = () => {
	return function (dispatch) {
		dispatch(startAuthorizing());

		firebase.auth()
			.signInAnonymously()
			.then(() => firebase.database()
				.ref(`users/${DeviceInfo.getUniqueID()}`)
				.once('value', (snapshot) => {
					const val = snapshot.val();

					if (val === null) {
						dispatch(userNoExist());
					} else {
						dispatch(setUserName(val.name));
						dispatch(setUserAvatar(val.avatar));
						startChatting(dispatch);
					}
				}))
			.catch(err => console.log(err))
	}
}

const startChatting = function (dispatch) {
	dispatch(userAuthorized());
	dispatch(fetchMessages());

	FCM.requestPermissions();
	FCM.getInitialNotification()
		.then((notif) => { console.log('INITIAL NOTIFICATION', notif) })

	FCM.getFCMToken()
		.then(token => {
			console.log(token)
			firebase.database()
					.ref(`users/${DeviceInfo.getUniqueID()}`)
					.update({
						pushToken: token
					});
		});
	FCM.subscribeToTopic('secret-chatroom');

	FCM.on(FCMEvent.Notification, async (notif) => {
		//console.log(notif);

		if (notif && notif.local_notification) {
			return
		}

		if (Platform.OS == 'android') {
			console.log('isi notif', notif)
			FCM.presentLocalNotification({
				title: notif.fcm.title,
				body: notif.fcm.body,
				sound: 'default',
				priority: 'high',
				click_action: notif.fcm.click_action,
				number: 10,                                         // Android only
				ticker: "My Notification Ticker",                   // Android only                                 // Android only (default true)
				//large_icon: "ic_launcher",                           // Android only
				icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
				big_text: "Show when notification is expanded",     // Android only
				sub_text: "This is a subText",                      // Android only
				color: "red",                                       // Android only
				//vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
				//wake_screen: true,                                  // Android only, wake up screen when notification arrives
				//group: "group",                                     // Android only
				//picture: "https://google.png",                      // Android only bigPicture style
				//ongoing: true,                                      // Android only
				//my_custom_data:'my_custom_field_value',             // extra data you want to throw
				lights: true,                                       // Android only, LED blinking (default false)
				show_in_foreground: true
			})
		}

		if (Platform.OS === 'ios') {
			switch (notif._notificationType) {
				case NotificationType.Remote:
					notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
					break;
				case NotificationType.NotificationResponse:
					notif.finish();
					break;
				case NotificationType.WillPresent:
					notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
					break;
			}
		}
	});

	FCM.on(FCMEvent.RefreshToken, token => {
		console.log(token);
	});
}

export const startAuthorizing = () => ({
	type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
	type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
	type: 'USER_NO_EXIST'
});