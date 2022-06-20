import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
<<<<<<< HEAD
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './../screens/HomePage';
import FavoritePage from '../screens/FavoritePage';
import StallPage from '../screens/StallPage';
import ProfilePage from '../screens/ProfilePage';

import { Root, Colors } from '../components/styles';

// colors
const {brand, darkLight, tertiary, primary} = Colors;

// icons
import { Octicons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

=======
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './../screens/HomePage';

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
>>>>>>> 71db95304129cfd5b84eb995b2fab07488885b6f
const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
<<<<<<< HEAD
            <HomeStack.Screen name='HomePage' component={HomePage}/>
            <HomeStack.Screen name='StallPage' component={StallPage}/>
        </HomeStack.Navigator>
    );
}

const FavoriteStack = createNativeStackNavigator();
const FavoriteStackScreen = () => {
    return (
        <FavoriteStack.Navigator screenOptions={{headerShown: false}}>
            <FavoriteStack.Screen name='FavoritePage' component={FavoritePage}/>
            <FavoriteStack.Screen name='StallPage' component={StallPage}/>
        </FavoriteStack.Navigator>
    );
}

const BottomTabNavigator = () => {
    return(
        <Tab.Navigator
            ScreenOptions = {{
            tabBarShowLabel: false,
            headerShown: false,
            style: {
                position: 'absolute',
                height: 75,
            }
        }}>
=======
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
>>>>>>> 71db95304129cfd5b84eb995b2fab07488885b6f
            <Tab.Screen name = "Home"
                component = {HomeStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
<<<<<<< HEAD
                        <HomeScreenIcon 
                            icon= {focused ? 'home-fill' : 'home'}
                        />
=======
                        <StyledIcon>
                            <MaterialCommunityIcons 
                            color={tertiary}
                            size={28} 
                            name={focused ? "home" : "home-outline"} 
                            />
                        </StyledIcon>
>>>>>>> 71db95304129cfd5b84eb995b2fab07488885b6f
                    )
                }}
            />

<<<<<<< HEAD
            <Tab.Screen name = "Favorites"
                component = {FavoriteStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <HomeScreenIcon 
                            icon= {focused ? 'heart-fill' : 'heart'}
                        />
=======
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
                component = {HomeStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <StyledIcon>
                            <FontAwesome 
                            color={tertiary}
                            size={20}
                            name={focused ? "user" : "user-o"} 
                            />
                        </StyledIcon>
>>>>>>> 71db95304129cfd5b84eb995b2fab07488885b6f
                    )
                }}
            />

        </Tab.Navigator>
    )
}

<<<<<<< HEAD
const HomeScreenIcon = ({icon}) => {
    return (
        <View>
        <Root>
            <Octicons name={icon} size={20} color={tertiary} />
        </Root>
        </View>
    );
};

=======
>>>>>>> 71db95304129cfd5b84eb995b2fab07488885b6f
export default BottomTabNavigator;