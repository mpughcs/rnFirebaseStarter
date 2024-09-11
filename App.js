import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { auth } from './FirebaseConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthenticationdNavigator from './Navigation/AuthenticationNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedNavigator from './Navigation/AuthenticatedNavigator';
import { LocationProvider } from './src/context/LocationContext';
import { PicturesProvider } from './src/context/PicturesContext';

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
  // console.log(user)

  return (
    <SafeAreaProvider>

      <NavigationContainer>

        {user ?
          <LocationProvider>
            <PicturesProvider>

              <AuthenticatedNavigator />
            </PicturesProvider>
          </LocationProvider>

          : <AuthenticationdNavigator />}
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
