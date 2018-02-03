import {
  USER_FETCH_SUCCESS,
  CHAT_TABLE_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  //console.log(action)
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return action.payload;
    case CHAT_TABLE_SUCCESS:
      return action.payload;
    default:
      return state;

  }
};
