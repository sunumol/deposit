// SubmitButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SubmitButton = ({ onPress, title, disabled }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, disabled ? styles.disabledButton : null]}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        zIndex: -1,
        backgroundColor: '#003874',
        width: 370,
        height: 48,
        position: 'absolute',
        top: 690,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 88, // Adjust the border radius as needed
        borderWidth: 1,
        borderColor: '#003874', // Match the button background color for seamless border
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#CCCCCC', // Adjust the color for disabled state
        borderColor: '#CCCCCC', // Adjust the color for disabled state
    },
});

export default SubmitButton;
