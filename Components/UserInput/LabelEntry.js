import React, { memo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import {Colors} from '../../constants/Colors';

const LabelEntry = memo(({ inputConfig, label, value, onChangeText, style, multiline, numberOfLines, nextInputRef }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.textInput, { top: value ? 4 : 0 }, style]}
                placeholder={label}
                onChangeText={onChangeText}
                value={value}
                {...inputConfig}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onSubmitEditing={() => {
                    if (nextInputRef && nextInputRef.current) {
                        nextInputRef.current.focus();
                    }
                }}
            />
            {value !== '' && <Text style={styles.inputLabel}>{label}</Text>}
        </View>
    );
});

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 26,
        width: '100%',
        backgroundColor: Colors.background,
        height: 52,
    },
    textInput: {
        padding: 16,
        fontFamily: 'Poppins',
        color: Colors.text,
        fontSize: 16,
        position: 'relative',
    },
    inputLabel: {
        position: 'absolute',
        fontFamily: 'Poppins',
        color: Colors.text,
        fontSize: 12,
        top: 4,
        left: 16,
    },
});

export default LabelEntry;