import { AnyAction } from 'redux';
import { USER_ACTION_TYPES } from './user.types';
import { UserData } from '../../utils/firebase/firebase.utils';
import { signInFailed, signInSuccess, signOutFailure, signOutSuccess, signUpFailed } from './user.action';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload }
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null }
  }

  if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailure.match(action)) {
    return { ...state, error: action.payload }
  }

  return state;
  // switch (type) {
  //   case USER_ACTION_TYPES.SET_CURRENT_USER:
  //     return { ...state, currentUser: payload };
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return { ...state, currentUser: payload };
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return { ...state, currentUser: null };
  //   case USER_ACTION_TYPES.SIGN_IN_FAILURE:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILURE:
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
  //     return { ...state, error: payload };
  //   default:
  //     return state;
  // }
};
