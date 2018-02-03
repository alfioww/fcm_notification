import React, { Component } from 'react';
import { View, Text } from 'react-native';


class ChatScreenItem extends Component {
    render() {
       const { message, createdAt } = this.props.item;
       //console.log(message)
        return (
            <View
            style={Style.container}>
            <View
              style={Style.bubbleView}>
              <Text
                style={Style.userText} >
                {createdAt} and username
              </Text>
              <Text
                style={Style.messageText}>
                {message}
              </Text>
            </View>
          </View>
        )
    }
}

export default ChatScreenItem;

const Style = {
    container: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        borderRadius: 5,
        width: '70%'
      },
      bubbleView: {
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        padding:8
      },
      userText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
      },
      messageText: {
        color: 'white',
        fontSize: 16
      }
}