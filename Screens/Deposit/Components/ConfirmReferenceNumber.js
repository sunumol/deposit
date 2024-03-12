import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ConfirmReferenceNumber = ({ referenceNumber }) => {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (text) => {
        setInputValue(text);

        if (text.length <= referenceNumber.length) {
            let mismatch = false;
            for (let i = 0; i < text.length; i++) {
                if (text[i] !== referenceNumber[i]) {
                    mismatch = true;
                    break;
                }
            }
            setErrorMessage(mismatch ? 'Reference numbers do not match' : '');
        } else {
            setErrorMessage('Reference number length exceeded');
        }
    };

    return (
        <View>
            <Text style={styles.heading}>Confirm Transaction ID</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={inputValue}
                    onChangeText={handleChange}
                />
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
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
        marginTop: 7,
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
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        marginLeft: 20,
        marginTop: 5,
    },
});

export default ConfirmReferenceNumber;
