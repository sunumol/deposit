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
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 140,
        marginTop: 10,
        width: 150,
        height: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SubmitButton;
