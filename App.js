import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import { store, persistor } from './app/redux/user';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import Map from './app/screens/Map';
import route from './app/navigation/routes';
import {f, auth, database} from './app/config/config.js';
import usersReducer from './app/redux/usersReducer';

     const store = createStore(usersReducer);
export default function App(){
  return(
    
     <Provider store={store}>
     <NavigationContainer>
       <AuthNavigator/>
    </NavigationContainer>  
     </Provider>
  );
}
