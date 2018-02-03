import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import {
  USER_FETCH_SUCCESS,
  CHAT_TABLE_SUCCESS,
  NAME_FETCH_SUCCESS
} from './types';

export const userContact = () => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users`)
      .once('value') .then(snapshot => {
        console.log(snapshot.val())
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const nameFetch = () => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users`).orderByChild("createdBy").equalTo(currentUser.uid)
      .once('value') .then(snapshot => {
        dispatch({ type: NAME_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const onLogOutRequest = () => {
  return dispatch => {
    firebase.auth().signOut()
    .then(() => dispatch({ type: 'LogOut' }))
  }
}
