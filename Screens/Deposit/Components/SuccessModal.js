import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Success from '../assets/icons/Success.svg';

const SuccessModal = ({ visible, onClose }) => {
    const [showMessage, setShowMessage] = useState(true);

    // Automatically close the success message after 2 seconds
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setShowMessage(false);
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <View style={styles.successWrapper}>
                        <Success style={styles.successIcon} />
                        <Text style={styles.successText}>Submitted Successfully</Text>
                    </View>
                    {/* <TouchableOpacity onPress={onClose} style={styles.okayButton}>
                        <Text style={styles.okayButtonText}>Okay</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
        width: 250,
        height: 165, // if there is no Okay button then use this 
        //  height: 220,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 25, // Adjusted padding to match provided values
        alignItems: 'center',
    },
    successWrapper: {
        // width: 164,
        height: 110.8,
        top: 25,
        // left: 43,
        alignItems: 'center',
    },
    successIcon: {
        width: 72.59,
        height: 70,
    },
    successText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    okayButton: {
        width: 138,
        height: 50,
        top: 30,
        //  left: 19,
        paddingVertical: 10,
        paddingHorizontal: 43,
        borderRadius: 48,
        backgroundColor: '#003874',
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 20, // Adjusted margin top for spacing
    },
    okayButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter',
        textAlign: 'center',
    },
});

export default SuccessModal;
