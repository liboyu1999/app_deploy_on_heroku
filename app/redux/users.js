import get from 'lodash.get' 

//  import { removeTokens, verifyToken, setToken } from 'utils/token' 
//  import { history } from 'store' 
   /* 
 * Actions 
 */ 
 const reducerName = 'user' 
 export const LOGIN = `${reducerName}/LOGIN` 
//  export const LOGOUT = `${reducerName}/LOGOUT` 
//  export const ERROR = `${reducerName}/ERROR` 
 export const SET_USER_DATA = `${reducerName}/USER_DATA` 
   /* 
 * Reducer 
 */ 
 const initialState = { 
 user: null, 
//  loggedIn: false, 
//  requesting: false, 
//  error: null, 
 } 
   export default function reducer(state = initialState, action) { 
 switch (action.type) { 
 case LOGIN: 
 return { 
 ...state, 
 loggedIn: true, 
 requesting: false, 
 } 
 case SET_USER_DATA: 
 return { 
 ...state, 
 user: action.user, 
 } 
//  case LOGOUT: 
//  return { 
//  ...state, 
//  user: null, 
//  loggedIn: false, 
//  requesting: false, 
//  } 
//  case ERROR: 
//  return { 
//  ...state, 
//  error: action.error, 
//  requesting: false, 
//  } 
 default: 
 return state 
 } 
 } 
   /* 
 * Action Creators 
 */ 
   export const login = (userProfile) => (dispatch) => { 

    console.log("saveUserProf", userProfile);
 dispatch({ 
 type: LOGIN, 
 }) 
 dispatch({ 
 type: SET_USER_DATA, 
 user: userProfile,  
 }) 

 } 
//  } 
//    export const logout = () => (dispatch) => { 
//  removeTokens() 
//  dispatch({ 
//  type: LOGOUT, 
//  }) 
//  } 
   /* 
 * Selectors 
 */ 
 export const getUser = (state) => get(state[reducerName], 'user') 
//  export const getLoggedIn = (state) => get(state[reducerName], 'loggedIn') 
//  export const getRequesting = (state) => get(state[reducerName], 'requesting') 
//  export const getError = (state) => get(state[reducerName], 'error') 
   /* 
 * Register 
 */ 
