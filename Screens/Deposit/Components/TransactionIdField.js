import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const TransactionIdField = () => {
    const [transactionId, setTransactionId] = useState('');
    const [confirmTransactionId, setConfirmTransactionId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (confirmTransactionId !== '' && confirmTransactionId !== transactionId) {
            setError('Transaction IDs do not match');
        } else {
            setError('');
        }
    }, [confirmTransactionId, transactionId]);

    const handleTransactionIdChange = (text) => {
        setTransactionId(text);
    };

    const handleConfirmTransactionIdChange = (text) => {
        setConfirmTransactionId(text);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer1]}>
                <Text style={styles.label}>Transaction ID</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={transactionId}
                    onChangeText={handleTransactionIdChange}
                    
                />
            </View>
            <View style={styles.inputContainer2}>
                <Text style={styles.label}>Confirm Transaction ID</Text>
                <TextInput
                    style={styles.input}
                    // secureTextEntry={true}
                    value={confirmTransactionId}
                    onChangeText={handleConfirmTransactionIdChange}
                    
                />
            </View>
            {error !== '' && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 160,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    inputContainer1: {
        width: 370,
        height: 45,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ECEBED',
        backgroundColor: '#FCFCFC',
        // paddingHorizontal: 10,
        justifyContent: 'center',
    },
    inputContainer2: {
        width: 370,
        height: 45,
        borderRadius: 8,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ECEBED',
        marginTop: 50, // Adjust as needed
    },
    label: {
        fontFamily:'Inter',
        fontSize:14,
        marginBottom:20,
        
        
    },
    input: {
        width: 327,
        height: 66,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
});

export default TransactionIdField;
