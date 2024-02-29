import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const DepositedAmount = () => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image source={require('./assets/icons/coins.png')} style={styles.icon} />
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
        paddingBottom: 50, // Adjust the padding to move the text up
    },
    box: {
        flexDirection: 'row', // Arrange icon and text horizontally
        alignItems: 'center', // Center align items vertically
        backgroundColor: '#f0f0f0',
        width: 350,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center', // Center align text vertically
    },
    icon: {
        width: 24, // Adjust icon width as needed
        height: 24, // Adjust icon height as needed
        marginLeft:-50,
        paddingLeft:10, // Add margin to separate the icon from text
    },
});

export default DepositedAmount;
