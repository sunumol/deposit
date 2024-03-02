import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Remarks = ({ value }) => {
    return (
        <View style={styles.remarksContainer}>
            <Text style={styles.heading}>Remarks</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    editable={true} // Now editable
                // Add any other TextInput props as needed
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    remarksContainer: {
        marginTop: 0, // Adjust as needed to move it up
    },
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginLeft: 20,
        width: 370,
        height: 100,
    },
    heading: {
        paddingTop:30,
        marginLeft: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        backgroundColor: '#ECEBED',
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

export default Remarks;
