import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './../screens/HomePage';
import FavoritePage from './../screens/FavoritePage';
import ProfilePage from './../screens/ProfilePage';
import StallPage from './../screens/StallPage';
import StallCategoryPage from './../screens/StallCategoryPage';
import SearchPage from './../screens/SearchPage';

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
        <HomeStack.Navigator 
            screenOptions={{headerShown: false}}
            initialRouteName="HomePage">
            <HomeStack.Screen name="HomePage" component={HomePage} />
            <HomeStack.Screen name="StallPage" component={StallPage} />
            <HomeStack.Screen name="StallCategoryPage" component={StallCategoryPage} />
        </HomeStack.Navigator>
        );
}

// Favoritepage
const FavoriteScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="FavoritePage" component={FavoritePage} />
            <HomeStack.Screen name="StallPage" component={StallPage} />
        </HomeStack.Navigator>
        );
}

// Searchpage
const SearchScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="SearchPage" component={SearchPage} />
            <HomeStack.Screen name="StallPage" component={StallPage} />
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

            {/* Third Icon (Search) */}
            <Tab.Screen name = "Search"
                component = {SearchScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <StyledIcon>
                            <Octicons 
                            color= {tertiary}
                            size={ focused ? 23 : 20 } 
                            name={"search"} 
                            />
                        </StyledIcon>
                    )
                }}
            />            

            {/* Fourth Icon (Profile) */}
            <Tab.Screen name = "Profile"
                component = {ProfileScreen}
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