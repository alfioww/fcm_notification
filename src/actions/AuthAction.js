import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import {
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_FAIL,
  SPINNER_LOGIN,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  SIGNUP_USER_FAIL,
  SPINNER_SIGNUP
} from './types';

// ============onChangeInput SignIn===//
export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};

export const passwordChanged = (text) => {
  return {
      type: PASSWORD_CHANGED,
      payload: text
  };
};

// ============onChangeInput SignUp==========//
export const nameChanged = (text) => {
  return {
      type: NAME_CHANGED,
      payload: text
  };
};

export const enterEmail = (text) => {
  return {
      type: ENTER_EMAIL,
      payload: text
  };
};

export const enterPassword = (text) => {
  return {
      type: ENTER_PASSWORD,
      payload: text
  };
};

// ========== INITIALITATION ======//
export const authentication = () => {
      return {
        type: 'Otomatis'
      }
  }

// ==== User Login ====//

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
      dispatch({ type: SPINNER_LOGIN });

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => dispatch(authentication))
        .catch(user => loginUserFail(dispatch, user));
    };
};

const loginUserFail = (dispatch, user) => {
  console.log(user)
  dispatch({ type: LOGIN_USER_FAIL });
};

//======= User SignUp ======//

export const signUp = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch({ type: SPINNER_SIGNUP });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signupUserSuccess(dispatch, user, name, email))
      .catch(user => signupUserFail(dispatch,user))
  };
};


const signupUserSuccess = (dispatch, user, name, email) => {
  const { currentUser } = firebase.auth();
  dispatch(authentication);
  firebase.database().ref(`users/${currentUser.uid}`)
  .set({ name, email, uid: currentUser.uid })

};

const signupUserFail = (dispatch) => {
  dispatch({ type: SIGNUP_USER_FAIL })
}


// ====== Fetch Contact User ============//
//
// export const FetchDataUser = () => {
//   const { currentUser } = firebase.auth();
//   return dispatch => {
//     firebase.database().ref(`users`)
//     .once('value', snapshot => {
//       dispatch({ type: 'Fetch_Data', payload: snapshot.val() })
//     })
//   }
// }

// ================ User LogOut =============== //
