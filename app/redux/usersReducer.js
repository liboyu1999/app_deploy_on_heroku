import { combineReducers } from 'redux';

import get from 'lodash.get'

const INITIAL_STATE = {
    user:null,
    userid:null
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
          // Pulls current and possible out of previous state
          // We do not want to alter state directly in case
          // another action is altering it at the same time
          return {...state, user: action.payload}
        case 'SET_USER_ID':
          return {...state, userid: action.payload}
    default:
      return state
  }
};

export const getUser = (state) => state.users.user;

export default combineReducers({
  users: usersReducer
});