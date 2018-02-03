import firebase from 'firebase';
import { CHAT_FETCH_SUCCESS } from './types';

// ======== Change Input chat =============//
export const onChangeInput = (text) => {
    return {
        type: 'InputChange',
        payload: text
    }
}

// ============ Fetch Data chats ==============//
export const UserChat = () => {
  const {uid} = firebase.auth().currentUser;
  console.log(firebase.auth().currentUser);
  return (dispatch) => {
    //pakai on, biar ketika ada data nambah otomatis reducer chat bertambah
    firebase.database().ref(`/chats`).orderByChild(`/members/${uid}`).equalTo(true)
      .on('value', snapshot => {
        dispatch({ type: CHAT_FETCH_SUCCESS, payload: snapshot.val() });
      })
  };
};

// ========= Push data when User Click contact person =======//
export const chatTable = (item, chatuser) => {
  const { currentUser } = firebase.auth();
  // Filter data members in child chats
  chatuser = chatuser.filter(chat => chat.members[item.uid] == true); // return filter selalu bertipe array
  const chat = chatuser[0]
  return (dispatch) => {
  // if uid is exist in child members
    if (chat) {
      dispatch({ type: 'Selected', payload: chat })
    // if not exist data will be push
    } else {
      firebase.database().ref(`/chats`)
        .push({name:item.name, members: {[item.uid]: true, [currentUser.uid]: true} , createdAt: firebase.database.ServerValue.TIMESTAMP })
        .then ((result => {
          firebase.database().ref(`/chats/${result.key}`)
            .once('value', snapshot => {
              const chat = {...snapshot.val(), uid: snapshot.key} // for take a value and Id key from push
              dispatch({ type: 'Selected', payload: chat }) //keperluannya cuman buat toMessageScreen aja , cba di log snapshot .valnya
            }) //yang didalam snapshot di comment semua diganti console.log
        }))
        .catch(err => {
          console.log(err);
        })
    }
  }
};

// Reset Input
const resetData = () => {
    return {
        type: 'Reset'
    }
}

// ========== Send Request data Input and Id Key from Push ======//
export const onSendRequest = (input, chatId) => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        firebase.database().ref('message')
        .push({ 
            message: input, 
            createdAt: firebase.database.ServerValue.TIMESTAMP, 
            source: chatId })
        .then(() => dispatch(resetData()))
    }
}

// ======= Fetch Message ======= //
export const MessageFetch = (chatId) => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        firebase.database().ref('message').orderByChild('source').equalTo(chatId)
        .on('value', snap => {
            dispatch({ type: 'MessageFetch', payload: snap.val() })
        })
    }
}
