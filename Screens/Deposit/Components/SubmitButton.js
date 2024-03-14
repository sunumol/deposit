import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ToastAndroid } from 'react-native';

const SubmitButton = ({ onPress, title }) => {
    const showToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'You have deposited ? amount',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const handlePress = () => {
        showToast();
        onPress(); // Call the provided onPress function
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#003874',
        width: 375,
        height: 48,
        position: 'absolute',
        top: 675,
        left: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 88, // Adjust the border radius as needed
        borderWidth: 1,
        borderColor: '#003874', // Match the button background color for seamless border
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SubmitButton;
