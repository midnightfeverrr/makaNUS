import React from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import EditProfilePage from './../screens/EditProfilePage';
import ChangePasswordPage from './../screens/ChangePasswordPage';
import MakeReviewPage from './../screens/MakeReviewPage';

const Stack = createNativeStackNavigator();

const LoggedInNavigator = () => {
    return (

        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "HomeWithBottomTab"
                component={BottomTabNavigator}
            />
            <Stack.Screen name = "EditProfilePage" 
                component={EditProfilePage}
            />
            <Stack.Screen name = "ChangePasswordPage" 
                component={ChangePasswordPage}
            />
            <Stack.Screen name = "MakeReviewPage"
                component={MakeReviewPage}
            />
        </Stack.Navigator>

    )
}

export default LoggedInNavigator;