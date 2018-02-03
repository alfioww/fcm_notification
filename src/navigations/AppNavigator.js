import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";

import NavSignin from './NavSignin';
import NavSignup from './NavSignup';
import NavChat from './NavChat';
import NavContact from './NavContact';
import NavChatList from './NavChatList';

export const Root = StackNavigator ({
  SignIn: NavSignin,
  SignUp: NavSignup,
  ChatList: NavChatList,
  Contact: NavContact,
  Chat: NavChat,
});

const AppNavigator = ({ dispatch, nav }) => {
  console.log(nav);
  return <Root navigation={addNavigationHelpers({ dispatch, state: nav })} />;
};


const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppNavigator);
