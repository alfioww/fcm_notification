import { NavigationActions } from 'react-navigation';
import { Root } from '../navigations/AppNavigator';

// initial router to login screen
const firstAction = Root.router.getActionForPathAndParams('SignIn');
const initialNavState = Root.router.getStateForAction(firstAction);

export default (state, action) => {
  //console.log(action)
  let nextState;
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      nextState = Root.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'ChatList' })]
        }),
        state
      );
      break;
    case 'Selected' :
    nextState = Root.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Chat', params: action.payload }),
      state
    );
    break;
    case 'Otomatis':
      nextState = Root.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'ChatList' })]
        }),
        state
      );
      break;
    case 'LogOut' :
    nextState = Root.router.getStateForAction(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
      }),
      state
    );
    break;
    default:
      nextState = Root.router.getStateForAction(action, state);
    break;
  }
  return nextState || state;
};
