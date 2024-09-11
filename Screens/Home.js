import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Heading1, Heading2, Heading3, Body1, Body2 } from '../typography';
import { auth } from '../FirebaseConfig';
import Login from '../Screens/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Screen from '../Components/Screen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import Camera from '../Components/Camera';
import { usePictures } from '../src/context/PicturesContext';
import PhotoGallery from '../Components/PhotoGallery';
import { Alert } from 'react-native';
import { updateProfile } from 'firebase/auth';




export default function Home() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const { pictures } = usePictures();

    function toggleCamera() {
        setShowCamera(!showCamera);
    }

    function updateDisplayName(input) {
        updateProfile(auth.currentUser, {
            displayName: input,
          }).then(() => {
            console.log('User profile updated')
            
            // ...
          }).catch((error) => {
            // An error occurred
            console.log(error)
            // ...
          });
          
        console.log(input)
        // return
    }

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

        // prompt user to enter password if they haven't set their display name
        // this goes here because it only needs to run once and user is guaranteed to be logged in
        if (auth.currentUser.displayName === null) {

            Alert.prompt(
                "Update Username",
                "Pick a display",
                [
                    {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: input => updateDisplayName(input)
                    }
                ],
                
            )
        }

    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        // console.log(location)
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

            < SafeAreaProvider >
                {showCamera ? <Camera toggleCamera={toggleCamera} /> : null}


                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={toggleCamera}>
                        <MaterialIcons name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <PhotoGallery photos={pictures} />
                    <TouchableOpacity style={styles.button} onPress={toggleCamera}>
                        <MaterialIcons name="camera" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </SafeAreaProvider >


        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    fontTest: {
        fontFamily: 'Monserrat-SemiBold',
        fontSize: 20,

    },
    button: {
        position: 'absolute',
        bottom: 55,  // Adjust this value for vertical positioning
        alignSelf: 'center',  // This will center the button horizontally
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',  // Optional: Add background color to the button
        padding: 10,  // Optional: Add padding for the button
        borderRadius: 50,  // Optional: Make the button circular
    },
});
