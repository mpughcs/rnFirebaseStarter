import { useFonts } from 'expo-font';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/Colors';
export default function LabelButton(props) {
    const { disabled, onPress, color } = props;

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.buttonInnerContainer,
                    pressed ? styles.pressed : null, // Apply pressed style if pressed
                    disabled ? styles.disabled : null, // Apply disabled style if disabled
                    color ? { backgroundColor: color } : null,
                    props.style,
                ]}
                onPress={onPress}
                android_ripple={{ color: '#9abdc3' }}
                disabled={disabled} // Set disabled prop for Pressable
            >
                <Text style={styles.buttonText}>{props.children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 26,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.action1,
        justifyContent: 'center',
        height: 52,
        elevation: 2,
        alignItems: 'stretch',
    },
    buttonText: {
        color: 'white',
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
