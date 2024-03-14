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
        
        marginTop: 20,
        position: 'absolute',
        width: 380,
        height: 78.76,
        top: 552.93,
        left: 16,
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    container: {
        
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        height: '100%',
    },
    heading: {
        marginBottom: 10,
        position: 'absolute',
        top: -20,
        left: 0,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    textInput: {
        
        flex: 1,
        height:57,
        backgroundColor: '#ECEBED',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Remarks;
