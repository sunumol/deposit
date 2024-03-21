import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const TransactionIdField = ({ transactionId, setTransactionId, confirmTransactionId, setConfirmTransactionId }) => {
    const [transactionIdError, setTransactionIdError] = useState('');

    useEffect(() => {
        if (confirmTransactionId !== '' && confirmTransactionId !== transactionId) {
            setTransactionIdError('Transaction IDs do not match');
        } else {
            setTransactionIdError('');
        }
    }, [confirmTransactionId, transactionId]);

    const handleTransactionIdChange = (text) => {
        setTransactionId(text);
    };

    const handleConfirmTransactionIdChange = (text) => {
        setConfirmTransactionId(text);
    };

    return (
        <View style={[styles.container, styles.box2]}>
            <View style={styles.inputContainer1}>
                <Text style={styles.label1}>Transaction ID</Text>
                <TextInput
                    style={styles.input1}
                    keyboardType="alphanumeric" // Restrict to alphanumeric characters
                    secureTextEntry={true}
                    value={transactionId}
                    onChangeText={handleTransactionIdChange}
                />
            </View>
            <View style={[styles.inputContainer2, { marginTop: 5 }]}>
                <Text style={styles.label2}>Confirm Transaction ID</Text>
                <TextInput
                    style={styles.input2}
                    keyboardType="alphanumeric" // Restrict to alphanumeric characters
                    value={confirmTransactionId}
                    onChangeText={handleConfirmTransactionIdChange}
                />
            </View>
            {transactionIdError !== '' && <Text style={styles.error}>{transactionIdError}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 140,
        paddingTop:0,
        paddingLeft: 20,
        paddingRight: 30,
        zIndex: -1,
        
    },
    // inputContainer1: {
    //     marginBottom: 15,
    // },
    label1: {
        fontFamily: 'Inter',
        fontSize: 14,
        marginBottom: 5,
        zIndex: -1,
        position: 'absolute',
        top:5,
    },
    label2: {
        fontFamily: 'Inter',
        fontSize: 14,
        marginBottom: 5,
        zIndex: -1,
        position: 'absolute',
        top: 106,
    },
    input1: {
        width:370,
        height: 49,
        top:40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ECEBED',
        backgroundColor: '#FCFCFC',
        paddingLeft: 10,
        zIndex: -1,
        position: 'absolute',
        
    },
    input2: {
        width: 370,
        height: 49,
        top:140,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ECEBED',
        backgroundColor: '#FCFCFC',
        paddingLeft: 10,
        zIndex: -1,
        position: 'absolute',

    },
    error: {
        color: 'red',
        textAlign: 'center',
        top:190,
    },
    box2: {

        // backgroundColor: 'red',
       

    },
});


export default TransactionIdField;
