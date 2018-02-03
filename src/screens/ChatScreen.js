import React, { Component } from 'react';
import { TextInput, View, FlatList } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Text, Card, Content, Item, Body, Right, Left, Label, Input, Footer } from 'native-base';
import { FormHeader } from '../components';
import { onChangeInput, onSendRequest, MessageFetch } from '../actions/ChatAction';
import ChatScreenItem from './ChatScreenItem';

class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: []
        }
    }
    componentWillMount() {
        const chatId = this.props.navigation.state.params.uid;
        console.log(chatId)
        this.props.MessageFetch(chatId)

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(NextProps) {
        this.createDataSource(NextProps);
    }

    createDataSource({ MessageData }) {

        this.setState({ message: MessageData })
    }

    onChange(text) {
        this.props.onChangeInput(text)
    }

    onSend() {
        const chatId = this.props.navigation.state.params.uid;
        //console.log(chatId)
        const { input } = this.props;
        this.props.onSendRequest(input, chatId)
    }

    renderRow(item) {
        return <ChatScreenItem item={item} />
    }
    render() {
        //console.log(this.state.message);
        return (
            <Container>
                    <FlatList 
                        data={this.state.message}
                        renderItem={({ item }) => this.renderRow(item)}
                        keyExtractor={item => item.uid}
                    />
                    <Footer>
                        <TextInput
                            style={Style.Input}
                            underlineColorAndroid='transparent'
                            placeholder='Pesan'
                            multiline
                            numberOfLines={4}
                            value={this.props.input}
                            onChangeText={this.onChange.bind(this)}
                        />
                        <Right style={{ flex: 1, marginRight: 15 }}>
                            <Icon
                            name='send'
                            size={20}
                            color='black'
                            onPress={this.onSend.bind(this)}
                            />
                        </Right>
                        </Footer>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const { input } = state.input;
    const MessageData = _.map(state.message, (val, uid) => {
        return { ...val, uid }
    })
    return { input, MessageData }
}

export default connect(mapStateToProps, {
    onChangeInput, onSendRequest, MessageFetch})(ChatScreen);

const Style = {
    Input: {
        height: 50,
        paddingRight: 10,
        paddingLeft: 20,
        flex: 5
    }
}
