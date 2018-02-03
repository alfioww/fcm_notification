import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Form, Text, List, ListItem } from 'native-base';

export class ChatItem extends Component {
    handleNav() {
        //console.log('asdjbsd')
    }
    render() {
        const { name } = this.props.item;
        //console.log(name)
        return (
            <Form>
                <ListItem>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text> {name} </Text>
                </TouchableOpacity>
                </ListItem>
            </Form>
        )
    }
}
