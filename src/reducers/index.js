import { combineReducers } from "redux";

import SignReducer from "./SignReducer";
import SignUpReducer from "./SignUpReducer";
import Navigation from "./Navigation";
import UserReducer from './UserReducer';
import ChatReducer from './ChatReducer';
import InputReducers from './InputReducers';
import MessageFetch from './MessageFetch';

const AppReducer = combineReducers({
  authsign: SignReducer,
  authsignup: SignUpReducer,
  nav: Navigation,
  contact: UserReducer,
  chat: ChatReducer,
  input: InputReducers,
  message: MessageFetch
});

export default AppReducer;

// import ChatReducers from './ChatReducers';
// import ContactReducers from './ContactReducers';
// import ChatMembers from './ChatMembers';
//
// chat: ChatReducers,
// contact: ContactReducers,
// members: ChatMembers
