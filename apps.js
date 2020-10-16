/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
	View,
	Platform
} from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm';

export default class notification extends Component {
	componentDidMount() {
    FCM.requestPermissions()
    FCM.getInitialNotification()
      .then((notif) => { console.log('INITIAL NOTIFICATION', notif) })

    this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
      if (notif && notif.local_notification) {
        return
      }
      if (Platform.OS == 'android') {
				console.log('isi notif', notif)
				FCM.presentLocalNotification({
					title: notif.fcm.title,
					body: notif.fcm.body,
					priority: 'high',
					click_action: notif.fcm.click_action,
					show_in_foreground: true,
					local:true
				})
      }
    })
  }

  componentWillMount() {
    this.notificationListener
  }

  // displayNotificationAndroid(notif) {
  //   console.log('isi notif', notif)
  //   FCM.presentLocalNotification({
  //     title: notif.fcm.title,
  //     body: notif.fcm.body,
  //     priority: 'high',
  //     click_action: notif.fcm.click_action,
  //     show_in_foreground: true,
  //     local:true
  //   })
  // }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu hore
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('notification', () => notification);
