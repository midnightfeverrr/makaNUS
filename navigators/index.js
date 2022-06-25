import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './RootStack';
import LoggedInNavigator from './LoggedInStack';
import LandingScreen from './../screens/LandingScreen';


// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


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

      if (initializing) return <LandingScreen />;

      return (
      <NavigationContainer>
        { user ? <LoggedInNavigator/> : <RootStack/> }
      </NavigationContainer>
      );
}

export default Navigation;