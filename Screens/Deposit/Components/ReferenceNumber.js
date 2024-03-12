import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ReferenceNumber = ({ value }) => {
    return (
        <View>
            <Text style={styles.heading}>Transaction ID</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    editable={true} // Now editable
                    secureTextEntry={true} // Display stars instead of characters
                // Add any other TextInput props as needed
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginLeft: 20,
        width: 370,
    },
    heading: {
        marginTop: 15,
        marginLeft: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#333', // Adjust text color as needed
        fontSize: 16, // Adjust font size as needed
        textAlign: 'center',
        // Add any other textInput styles as needed
    },
});

export default ReferenceNumber;
