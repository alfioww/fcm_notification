import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SPINNER_LOGIN,
  NAME_FETCH_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  names: []
 };

export default (state= INITIAL_STATE, action) => {
  //console.log(action)
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SPINNER_LOGIN:
      return { ...state, loading: true, error: '' };
    case 'Otomatis':
      return INITIAL_STATE;
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', email: '', loading: false };
    case NAME_FETCH_SUCCESS:
      return {names: action.payload};
    default:
      return state;
  }
};
