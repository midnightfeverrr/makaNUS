import React from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './../screens/HomePage';
import LandingScreen from './../screens/LandingScreen';

const Stack = createNativeStackNavigator();

const LoggedInNavigator = () => {
    return (

        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "HomeWithBottomTab"
                component={HomePage}
            />
        </Stack.Navigator>

    )
}

export default LoggedInNavigator;