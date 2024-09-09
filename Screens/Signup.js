import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import LabelButton from '../Components/Buttons/LabelButton';
import { Heading1 } from '../typography';
import LabelEntry from '../Components/UserInput/LabelEntry';
import { useState } from 'react';
import UnderlinedButton from '../Components/Buttons/UnderlinedButton';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as Crypto from 'expo-crypto';
import { GoogleAuthProvider, OAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
// import * as Google from 'expo-auth-session/providers/google';
// import OAuthButtons from '../../components/UserInput/Buttons/OAuthButtons';
// import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import Screen from '../Components/Screen';



export default function SignUpScreen({ navigation }) {

    
    // const auth = FIREBASE_AUTH;
    // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    //     clientId: '929613836189-j6hef13jql92vebda21tdjhm75hi0p7c.apps.googleusercontent.com',
    //     scopes: ['profile', 'email'],
    // });



    // useEffect(() => {
    //     if (response?.type === 'success') {
    //         const { id_token } = response.params;
    //         const credential = GoogleAuthProvider.credential(id_token);
    //         signInWithCredential(auth, credential)
    //             .then((result) => {
    //                 console.log(result)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             });
    //     }
    // }, [response]);


    const [emailValid, setEmailValid] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        display_name: '',
    });
    const signUpWithApple = () => {
        const nonce = Math.random().toString(36).substring(2, 10);

        return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
            .then((hashedNonce) =>
                AppleAuthentication.signInAsync({
                    requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                    nonce: hashedNonce,
                })
            )
            .then((appleCredential) => {
                const { identityToken } = appleCredential;
                console.log(identityToken.audience);
                const provider = new OAuthProvider('apple.com');
                const credential = provider.credential({
                    idToken: identityToken,
                    rawNonce: nonce,
                });
                return signInWithCredential(auth, credential);
            }).catch((error) => {
                if (error.code === 'ERR_CANCELED') {
                    console.log('User cancelled login');
                }
                console.log(error);
            });
    }

    const googleSignUpHandler = async () => {
        try {
            await promptAsync();
        } catch (error) {
            console.log(error)
        }
    }




    function inputChangedHandler(inputIdentifier, inputValue) {
        if (inputIdentifier === 'email') {
            setEmailValid(validateEmail(inputValue));
        }

        setUserData((prevState) => ({
            ...prevState,
            [inputIdentifier]: inputValue,
        }));
    }


    function emailHandler(text) {
        setEmail(text)
    }

    function continueHandler() {
        navigation.navigate('CreatePassword', { userData: userData })
    }

    function validateEmail(email) {
        // 1. ^ asserts position at start of the string
        // 2. [^\s@]+ matches any character that is not a whitespace character or @
        // 3. @ matches the character @ literally
        // 4. [^\s@]+ matches any character that is not a whitespace character or @
        // 5. \. matches the character . literally
        // 6. [^\s@]+ matches any character that is not a whitespace character or @
        // 7. $ asserts position at the end of the string

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }



    return (
        <Screen style={{ gap: 20 }}>
            <Heading1> Create Account</Heading1>
            {/* <View style={styles.loginContainer}> */}
            <LabelEntry onChangeText={inputChangedHandler.bind(this, 'email')} value={userData.email} label="Email" placeholder="Enter your email"
                inputConfig={{
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                    autoCompleteType: 'email',
                    textContentType: 'emailAddress',
                    autoCorrect: false,
                }} />


            <LabelButton
                color={Colors.action2}
                onPress={continueHandler}
                disabled={!emailValid}
            >Continue</LabelButton>

            {/* 
            <GoogleButton onPress={googleSignUpHandler} />
            <AppleButton onPress={signUpWithApple} /> */}
            {/* <OAuthButtons text={'Continue with'} appleHandler={signUpWithApple} googleHandler={googleSignUpHandler} /> */}

            <View style={styles.loginContainer}>
                <UnderlinedButton onPress={() => navigation.navigate("Login")}>Already Have an Aaccount? Log in</UnderlinedButton>
            </View>

        </Screen>
    );

}

const styles = StyleSheet.create({

    loginContainer: {
        // flex: 1,
        marginTop: 20,

        width: '100%',
        justifyContent: 'center',
        // alignSelf: 'center',
        alignItems: 'center',
    },
    buttonOuterContainer: {
        borderRadius: 26,
        overflow: 'hidden',
        borderColor: Colors.text,
        borderWidth: 1,
    },
    buttonInnerContainer: {

        justifyContent: 'center',
        height: 52,
        elevation: 2,
        alignItems: 'stretch',
    },
    buttonText: {
        color: Colors.text,
        textAlign: 'center',
        fontFamily: 'NeulisAlt-med',
        fontSize: 18,
    },
    pressed: {
        opacity: 0.75,
    },
    disabled: {
        opacity: 0.3, // Lower opacity for disabled state
    },
});