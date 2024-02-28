import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const DepositedAmount = () => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text}>Amount to be deposited</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Center align the content horizontally
        marginTop: 20, // Adjust the margin as needed
    },
    text: {
        fontSize: 18, // Adjust font size as needed
        fontWeight: 'bold', // Add bold font weight if desired
        color: 'black', // Set text color
        textAlign: 'center', // Center align text
        paddingBottom:50 , // Adjust the padding to move the text up
    },
    box: {
        backgroundColor: '#f0f0f0',
        width: 390,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center', // Center align text vertically
    },
});

export default DepositedAmount;
