import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';

import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import CreatePassword from '../Screens/CreatePassword';

const Stack = createNativeStackNavigator();

export default function AuthenticationdNavigator() {
    return (
        <Stack.Navigator
            screenOptions=
            {{
                headerStyle:
                {
                    backgroundColor: 'black',
                },
                headerTitleStyle: {
                    color: 'white',
                    fontFamily: 'Monserrat-Bold',
                },
                contentStyle: {
                    backgroundColor: 'black',
                },
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreatePassword" component={CreatePassword} />
        </Stack.Navigator>
    );
}
