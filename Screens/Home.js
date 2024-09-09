import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Heading1, Heading2, Heading3, Body1, Body2 } from '../typography';
import { auth } from '../FirebaseConfig';
import Login from '../Screens/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as Location from 'expo-location';



export default function Home() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        console.log(location)
    }

    const handleSignOut = () => {
        auth.signOut();
    }





    if (!auth.currentUser) {
        return (
            <SafeAreaProvider>

                <Login />
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
                    <Button title="Sign Out" onPress={handleSignOut} />
                </View>
            </SafeAreaProvider>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.a,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontTest: {
        fontFamily: 'Monserrat-SemiBold',
        fontSize: 20,

    },
});
