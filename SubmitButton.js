import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SubmitButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#003874', // Adjust color as needed
        paddingVertical: 8, // Reduced padding
        paddingHorizontal: 12, // Reduced padding
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:140,
        marginTop: 20,
        width: 150, // Adjusted width
        height: 50, // Adjusted height
    },
    buttonText: {
        color: 'white',
        fontSize: 14, // Reduced font size
        fontWeight: 'bold',
    },
});

export default SubmitButton;
