import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RootStack from './RootStack';
import LoggedInNavigator from './LoggedInStack';
import Login from '../screens/Login';


// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import auth from './../firebase'


const Navigation = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

      // Handle user state changes
      function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

      if (initializing) return <Login />;

      return (
      <NavigationContainer>
        { user ? <LoggedInNavigator/> : <RootStack/> }
      </NavigationContainer>
      );
}

export default Navigation;