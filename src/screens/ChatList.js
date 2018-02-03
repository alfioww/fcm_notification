import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { UserChat, onLogOutRequest } from '../actions';
import { Header } from '../components/FormHeader';
import { ChatItem } from './ChatItem';

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        this.props.UserChat();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(NextProps) {
        this.createDataSource(NextProps);
    }

    createDataSource({ chat }) {

        this.setState({ data: chat })
    }

    // onLogOut() {
    //    this.props.onLogOutRequest();
    // }

    renderRow(item) {
        //console.log(item)
        return <ChatItem
            item={item}
            onPress={() => this.props.navigation.navigate('Chat', { ...item, uid: item.uid })}
        />
    }

    render() {
        return (
            <View style={Styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => this.renderRow(item)}
                />
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
                        style={Styles.getOut}
                        onPress={() => this.props.onLogOutRequest()}
                    >
                        <Icon
                            name='power-settings-new'
                            size={27}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => {
    //console.log(state.chat)
    const chat = _.map(state.chat, (val, uid) => {
        return { ...val, uid };
    })
    return { chat };
}

export default connect(mapStateToProps, { UserChat, onLogOutRequest })(Contacts);

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
        right: 0
    },
    footerLeft: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 20
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
    },
    getOut: {
        backgroundColor: 'red',
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