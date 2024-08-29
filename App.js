import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Heading1, Heading2, Heading3, Body1, Body2 } from './typography';
import { auth } from './FirebaseConfig';
import LoginScreen from './Screens/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const [fontsLoaded] = useFonts({
    'Monserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Monserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Monserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    'Monserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'Monserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Monserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  });
  console.log(auth)

  if (!fontsLoaded) {
    return (
      <Text>Loading</Text>
    )
  }

  if (!auth.currentUser) {
    return (
      <SafeAreaProvider>

        <LoginScreen />
      </SafeAreaProvider>
    )

  } else {


    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Text style={styles.fontTest}>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
          <Heading1>Heading 1</Heading1>
          <Heading2>Heading 2</Heading2>
          <Heading3>Heading 3</Heading3>
          <Body1>Body 1</Body1>
          <Body2>Body 2</Body2>
        </View>
      </SafeAreaProvider>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontTest: {
    fontFamily: 'Monserrat-SemiBold',
    fontSize: 20,

  },
});
