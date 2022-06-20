import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
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
            <Tab.Screen name = "Home"
                component = {HomeStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <HomeScreenIcon 
                            icon= {focused ? 'home-fill' : 'home'}
                        />
                    )
                }}
            />

            <Tab.Screen name = "Favorites"
                component = {FavoriteStackScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <HomeScreenIcon 
                            icon= {focused ? 'heart-fill' : 'heart'}
                        />
                    )
                }}
            />

        </Tab.Navigator>
    )
}

const HomeScreenIcon = ({icon}) => {
    return (
        <View>
        <Root>
            <Octicons name={icon} size={20} color={tertiary} />
        </Root>
        </View>
    );
};

export default BottomTabNavigator;