import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { MemberFetch } from '../actions/ChatAction';
import { ChattingItem } from './ChattingItem';

class Chatting extends Component {
    constructor(props) {
        super(props)
        this.renderRow = this.renderRow.bind(this)
        this.state = {
            member: []
        }
    }

    componentWillMount() {
        this.props.MemberFetch();
        
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(NextProps) {
        this.createDataSource(NextProps);
    }

    createDataSource({ DataMember }) {

        this.setState({ member: DataMember })
    }

    renderRow(item) {
        const { navigate } = this.props.navigation;
        //console.log(item)
        return <ChattingItem 
                    item={item}
                    onPress={() => navigate('ChatNav', {name: item.name, uid:item.uid})}
                />
    }

    render() {
        //console.log(this.state.member)
        return (
            <FlatList 
                data={this.state.member}
                renderItem={({ item }) => this.renderRow.bind(this, item)}
                keyExtractor={item => item.members}
            />
        )
    }
}

const mapStateToProps = state => {
    console.log(state.members)
    const DataMember = _.map(state.members, (val, uid) => {
        return { ...val, uid};
    })
    return { DataMember };
}

export default connect(mapStateToProps, {MemberFetch})(Chatting);