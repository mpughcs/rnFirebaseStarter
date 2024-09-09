import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import AppleLogo from '../../../assets/images/appleLogo.svg';
import GoogleLogo from '../../../assets/images/googleLogo.svg';
import PressableContainer from '../PressableContainer';
import { Body1 } from '../../Typography/Heading';

export default function OAuthButtons({appleHandler, googleHandler, text}) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <Body1>{text}</Body1>
                <PressableContainer style={styles.button} onPress={appleHandler}>
                    <View style={styles.buttonOuterContainer}>
                        <AppleLogo />
                    </View>
                </PressableContainer>
                <PressableContainer style={styles.button} onPress={googleHandler}>
                    <View style={styles.googleButton}>
                        <GoogleLogo/>
                    </View>
                </PressableContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        // backgroundColor: 'white',
        // borderRadius: 20,
        // padding: 10,
        
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    buttonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10, 
        // gap: 20,
        // justifyContent: 'center',
        
    },
   
    
    googleButton: {
        // margin:4,
        width: 58,
        height: 56,
    }

});
