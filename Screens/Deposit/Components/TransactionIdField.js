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
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Transaction ID</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={transactionId}
                    onChangeText={handleTransactionIdChange}
                />
            </View>
            <View style={styles.inputContainer}>
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
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    inputContainer: {
        marginBottom: 10,
        width: '100%',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        backgroundColor: '#ECEBED',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
});

export default TransactionIdField;
