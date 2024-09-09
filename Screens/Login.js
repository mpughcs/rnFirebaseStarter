import { useState, useEffect, useCallback } from 'react';
import { View, Alert, ActivityIndicator, StyleSheet, Modal, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useUser } from '../../src/context/UserContext';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import * as Crypto from 'expo-crypto';
import Screen from '../Components/Screen';
import { Heading1 } from '../typography';
import { Body1 } from '../typography';
// import LabelEntry from '../Components/UserInput/LabelEntry';
import LabelButton from '../Components/Buttons/LabelButton';
import UnderlinedButton from '../Components/Buttons/UnderlinedButton';
import LabelEntry from '../Components/UserInput/LabelEntry';
// import OAuthButtons from '../../components/UserInput/Buttons/OAuthButtons';

// WebBrowser.maybeCompleteAuthSession();
import { Colors } from '../constants/Colors';

export default function LoginScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    // const { currentUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    // const { needsReauth } = route.params || false;
    // const [reauthenticated, setReauthenticated] = useState(false);

    const emailHandler = useCallback((text) => setEmail(text), []);
    const passwordHandler = useCallback((text) => setPassword(text), []);
    // const user = auth.currentUser;


    const signIn = async () => {
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // navigation.navigate('Home');
            // setReauthenticated(true);
        } catch (error) {
            if(error.code === 'auth/invalid-credential') {
                Alert.alert('Error', 'Invalid email or password');
            }
            console.log(error);
            // Alert.alert('Error', 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

 

    useEffect(() => {
        if (validateEmail(email) && password) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [email, password]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
        <Screen>
            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={styles.modalBackground}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            </Modal>
            <View style={styles.container}>
                <Heading1>Login</Heading1>
                <LabelEntry
                    onChangeText={emailHandler}
                    value={email}
                    label="Email"
                    placeholder="Enter your email"
                    inputConfig={{
                        keyboardType: 'email-address',
                        autoCapitalize: 'none',
                        autoCompleteType: 'email',
                        textContentType: 'emailAddress',
                        autoCorrect: false,
                    }}
                />
                <LabelEntry
                    value={password}
                    label="Password"
                    placeholder="Enter your password"
                    inputConfig={{
                        secureTextEntry: true,
                        autoCapitalize: 'none',
                        autoCompleteType: 'password',
                        autoCorrect: false,
                        onChangeText: passwordHandler,
                        textContentType: 'password',
                    }}
                />
                <LabelButton onPress={signIn} disabled={!canSubmit}>
                    Login
                </LabelButton>
                {/* <View style={styles.OAuthButtons}>
                    <OAuthButtons text="Sign in with" appleHandler={signInWithApple} googleHandler={googleSignInHandler} />
                </View> */}
                <View style={styles.loginButtonContainer}>
                    <UnderlinedButton onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign up</UnderlinedButton>
                    <UnderlinedButton onPress={() => navigation.navigate('GuestTabNavigator')}>Continue as guest?</UnderlinedButton>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    loginButtonContainer: {
        gap: 20,
        marginTop: 20,
        justifyContent: 'center',
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
    OAuthButtons: {
        marginBottom: 20,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
