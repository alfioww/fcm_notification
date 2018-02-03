import React, { Component } from 'react';
import { View, Text,Button, TouchableOpacity } from 'react-native';
import { Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ChatList extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text> Ini Screen List </Text>
        <View style={Styles.footerRight}>
          <TouchableOpacity
            style={Styles.NewMessage}
            onPress={() => this.props.navigation.navigate('Contact')}
          >
              <Icon
                name='message'
                size={27}
                color='white'
              />
          </TouchableOpacity>
        </View>

        <View style={Styles.footerLeft}>
        <TouchableOpacity
            style={Styles.NewMessage}
            onPress={() => this.props.navigation.navigate('Contact')}
          >
              <Icon
                name='power_settings_new'
                size={27}
                color='white'
              />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  footerRight: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    // left: 0,
    right: 1
  },

  footerLeft: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0
  },
  NewMessage: {
    backgroundColor: '#57e100',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    marginBottom: 45,
    zIndex: 10,
    marginRight: 30,

  }
}

export default ChatList;
