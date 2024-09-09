import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import PressableContainer from '../PressableContainer';
import Colors from '../../constants/Colors';

export function FilterButton({ Type, selected, onSelect, disabled }) {
    return (
        <View style={styles.outerContainer}>
            <PressableContainer onPress={() => onSelect(Type)}>
                <View style={[styles.filterButton, selected ? styles.enabled : styles.disabled, disabled && styles.disabled]}>
                    <Text style={[styles.filterButtonText, selected ? { color: Colors.action1 } : { color: Colors.text }]}>{Type}</Text>
                </View>
            </PressableContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 26,
        overflow: 'hidden',
    },
    filterButton: {
        // overflow:'hidden',
        padding: 8,
        borderRadius: 26,
        margin: 4,

    },
    filterButtonText: {
        fontFamily: 'Poppins',
    },
    enabled: {
        backgroundColor: 'rgba(75, 165, 180, .2)',

    },
    disabled: {
        backgroundColor: Colors.background,
    },
});
