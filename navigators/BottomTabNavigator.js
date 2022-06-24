import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './../screens/HomePage';
<<<<<<< HEAD
import FavoritePage from '../screens/FavoritePage';
=======
>>>>>>> 9e77c5e0e54c529d02730f02b72248c35579b1b2
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

// Favoritepage
const FavoriteScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="FavoritePage" component={FavoritePage} />
        </HomeStack.Navigator>
        );
}

// Profilepage
const ProfileScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="ProfilePage" component={ProfilePage} />
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
                component = {FavoriteScreen}
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
<<<<<<< HEAD
                component = {ProfileScreen}
=======
                component = {ProfilePage}
>>>>>>> 9e77c5e0e54c529d02730f02b72248c35579b1b2
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