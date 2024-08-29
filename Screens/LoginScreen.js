
import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import Screen from '../Components/Screen';
import { Heading1 } from '../typography';
import { TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { View } from 'react-native';


export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setLoading(false);
            // navigation.navigate('Home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            alert(errorMessage);
        });
    }

    return (
        <Screen>
            <Heading1>Login</Heading1>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button
                title="Login"
                onPress={handleLogin}
                loading={loading}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
    }
});