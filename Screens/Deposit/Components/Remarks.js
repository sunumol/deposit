// Remarks.js

import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');

const Remarks = ({ value, setValue }) => {
    return (
        <View style={styles.remarksContainer}>
            <Text style={styles.heading}>Remarks</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    keyboardType="default"
                    onChangeText={setValue}
                    editable={true}
                    multiline={true} // Set to true to allow multiline input
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    remarksContainer: {
        marginTop: 20,
        position: 'absolute',
        width: width * 0.93,
        height: 90,
        top: 570,
        left: 13,
        borderRadius: 8,
        backgroundColor: 'transparent',
        zIndex: -1,
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
        top: -25,
        left: 0,
        marginLeft: 10,
        fontWeight: 'inter',
        zIndex: -1,
    },
    textInput: {
        height: 57,
        backgroundColor: '#FCFCFC',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ECEBED',
        color: '#333',
        fontSize: 16,
    },
});

export default Remarks;
