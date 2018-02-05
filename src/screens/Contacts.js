import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Text, List, ListItem, Button } from 'native-base';
import { userContact, chatTable } from '../actions';
import { Header } from '../components/FormHeader';
import { ContactsList } from './ContactsList';

class Contacts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    this.props.userContact();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(NextProps) {
    this.createDataSource(NextProps);
  }

  createDataSource({ contact }) {

    this.setState({ data: contact })
  }


  renderRow(item) {
    //console.log(item)
    return <ContactsList
      item={item}
      onPress={() => this.props.chatTable(item, chatuser = this.props.chat)} {...item} {...this.props}
    />
  }

  render() {
    return (
      <Form style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={item => item.email}
        />
      </Form>
    );
  }

}

const mapStateToProps = state => {
  //console.log(state.contact)
  const contact = _.map(state.contact, (val, uid) => {
    return { ...val, uid };
  })

  const chat = _.map(state.chat, (val, uid) => {
    return { ...val, uid };
  })
  return { contact, chat };
}

export default connect(mapStateToProps, {
  userContact,
  chatTable

})(Contacts);
