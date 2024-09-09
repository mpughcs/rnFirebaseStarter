import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Heading1, Heading2, Heading3, Body1, Body2 } from './typography';
import { auth } from './FirebaseConfig';
import Login from './Screens/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import AuthenticationdNavigator from './Navigation/AuthenticationNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from './constants/Colors';
import AuthenticatedNavigator from './Navigation/AuthenticatedNavigator';


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }
    , []);


  const [fontsLoaded] = useFonts({
    'Monserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Monserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Monserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    'Monserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'Monserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Monserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  });
  // console.log(auth)

  if (!fontsLoaded) {
    return (
      <Text>Loading</Text>
    )
  }
  console.log(user)

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? <AuthenticatedNavigator /> : <AuthenticationdNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
