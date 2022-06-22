import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './../screens/HomePage';
import ProfilePage from './../screens/ProfilePage';

// Icons
import { Octicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

// Style
import {
    StyledIcon,
    Colors
} from './../components/styles';

// Colors
const {tertiary, primary} = Colors;

const Tab = createBottomTabNavigator();

// Homepage
const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="HomePage" component={HomePage} />
        </HomeStack.Navigator>
        );
}

// BottomTabNavigators
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions = {{
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: "#FAF2E9",
                tabBarInactiveBackgroundColor: "#FAF2E9",
                headerShown: false,
                style: {
                    position: 'absolute',
                    height: 75,
                }
            }}
        >
            {/* First Icon (Home) */}
            <Tab.Screen name = "Home"
                component = {HomeStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <StyledIcon>
                            <MaterialCommunityIcons 
                            color={tertiary}
                            size={28} 
                            name={focused ? "home" : "home-outline"} 
                            />
                        </StyledIcon>
                    )
                }}
            />

            {/* Second Icon (Favourites) */}
            <Tab.Screen name = "Favourites"
                component = {HomeStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <StyledIcon>
                            <Octicons 
                            color= { focused ? "#FF5757" :  "#3E3E3E"}
                            size={20} 
                            name={focused ? "heart-fill" : "heart"} 
                            />
                        </StyledIcon>
                    )
                }}
            />

            {/* Third Icon (Profile) */}
            <Tab.Screen name = "Profile"
                component = {ProfilePage}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <StyledIcon>
                            <FontAwesome 
                            color={tertiary}
                            size={20}
                            name={focused ? "user" : "user-o"} 
                            />
                        </StyledIcon>
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTabNavigator;