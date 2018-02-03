import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Form, Text, List, ListItem } from 'native-base';

export class ChattingItem extends Component {
    
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