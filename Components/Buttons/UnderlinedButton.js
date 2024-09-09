import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/Colors';
export default function UnderlinedButton({ children, onPress }) {
    return (
        <Pressable onPress={onPress}
            style={({ pressed }) => [
                pressed ? styles.pressed : null, // Apply pressed style if pressed
                
            ]}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: Colors.text,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: 'Poppins',
    },
});
