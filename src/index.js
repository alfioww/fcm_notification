import React, { Component } from "react";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import firebase from 'firebase';

import AppReducer from "./reducers";
import AppNavigator from './navigations/AppNavigator';

const loggerMiddleware = createLogger();

export default class App extends Component {
  render() {
    const { navigation } = this.props;
    store = createStore(AppReducer, applyMiddleware(thunkMiddleware));
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
