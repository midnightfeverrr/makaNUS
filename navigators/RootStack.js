import react from 'react';

import { Colors } from './../components/styles'
const { primary, tertiary } = Colors;

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Forgot from './../screens/Forgot';
import ForgotSent from './../screens/ForgotSent';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Forgot" component={Forgot} />
                <Stack.Screen name="ForgotSent" component={ForgotSent} />
            </Stack.Navigator>
    )
}

export default RootStack;