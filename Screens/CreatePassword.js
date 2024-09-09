import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import {  useState } from 'react';
import {  StyleSheet, Text, View } from 'react-native';

import Screen from '../Components/Screen';
import { Heading1 } from '../typography';
import { Body1 } from '../typography';
import LabelButton from '../Components/Buttons/LabelButton';
import LabelEntry from '../Components/UserInput/LabelEntry';
import { Colors } from '../constants/Colors';
import { db } from '../FirebaseConfig';
import { auth } from '../FirebaseConfig';
// import { getCalendars } from 'expo-localization';
const DEFAULT_PHOTO_URL = 'https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png';


export default function CreatePassword({ navigation, route }) {


  
    const userData = route.params.userData;
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
 
    const [suggestions, setSuggestions] = useState([]);
    


    const validatePassword = (input) => {
        let newSuggestions = [];
        if (input.length < 8) {
            newSuggestions.push('Password should be at least 6 characters long')
        }
        if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
            newSuggestions.push('Include both upper and lower case letters')
        }
        if (!/[^A-Za-z0-9]/.test(input)) {
            newSuggestions.push('Include at least one special character')
        }
        setSuggestions(newSuggestions);
    }

    const passwordHandler = (text) => {
        setPassword(text)
        validatePassword(text);
    }

    const repeatPasswordHandler = (text) => {
        setRepeatPassword(text)
    }

    const canContinue = () => {
        return password.length > 0 && repeatPassword.length > 0;
    }

    const signUp = async () => {
        try {
            if (password !== repeatPassword) {
                alert('Passwords do not match');
                setPassword('');
                setRepeatPassword('');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
            const user = userCredential.user;
            

            // await updateProfile(auth.currentUser, {
            //     displayName: userData.firstname,
            //     photoURL: DEFAULT_PHOTO_URL,
            // });
            console.log(user.uid);

            await setDoc(doc(db, "users", user.uid), {
                firstName: userData.firstname,
                lastName: userData.lastname,
                events: [],
                email: userData.email,
                dob: userData.dob,
                timeZone: userTimeZone,
            });

        } catch (error) {
            console.log(error);
            alert('Registration Failed: ' + error.message);
        }
    };





    return (
        <Screen style={{gap:20}}>
            <Heading1> Create Password</Heading1>
            <Body1> Create a password for your account </Body1>
            {suggestions.map((suggestion, index) => {
                return (
                    <View key={index}>
                        <Body1 color={Colors.action1}>{suggestion}</Body1>
                    </View>
                )
            })}

            {/* password entry */}
            <LabelEntry
                value={password}
                label="Password"
                placeholder="Enter your password"
                inputConfig={{
                    secureTextEntry: true,
                    autoCapitalize: 'none',
                    autoCompleteType: 'password',
                    textContentType: 'password',
                    autoCorrect: false,
                    onChangeText: passwordHandler,
                }} />

            {/* repeat password */}
            <LabelEntry
                value={repeatPassword}
                label="Repeat Password"
                placeholder="Enter your password"
                inputConfig={{
                    secureTextEntry: true,
                    autoCapitalize: 'none',
                    autoCompleteType: 'password',
                    textContentType: 'newPassword',
                    autoCorrect: false,
                    onChangeText: repeatPasswordHandler,
                }} />
            {/* continue button */}
            <LabelButton
                color={Colors.action2}
                onPress={signUp}
                disabled={!canContinue()}
            >Continue</LabelButton>
        </Screen>
    );
}
const styles = StyleSheet.create({

});