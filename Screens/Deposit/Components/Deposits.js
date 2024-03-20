// Deposit.js

import React, { useState } from 'react';
import { View, Modal, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import SubmitButton from './SubmitButton';
import DepositedAmount from './DepositedAmount';
import BankList from './BankList';
import TransactionIdField from './TransactionIdField';
import Remarks from './Remarks';
import UploadReceiptImage from './UploadReceiptImage';
import SuccessModal from './SuccessModal';
import { api } from '../../../Services/Api';

const Deposits = () => {
    const [depositedAmount, setDepositedAmount] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [confirmTransactionId, setConfirmTransactionId] = useState('');
    const [remarks, setRemarks] = useState('');
    const [thumbnailUri, setThumbnailUri] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Function to check if all required fields are filled
    const areAllFieldsFilled = () => {
        return (
            // depositedAmount !== null &&
            selectedBank !== null &&
            remarks.trim() !== '' &&
            transactionId.trim() !== '' &&
            confirmTransactionId.trim() !== '' &&
            transactionId.trim() === confirmTransactionId.trim() &&
            thumbnailUri !== '' &&
            thumbnailUri !== null
        );
    };


    // Function to handle submission
    const handleSubmit = () => {
        // Display confirmation modal only if depositedAmount is not null
        if (areAllFieldsFilled) {
            setShowConfirmationModal(true);
        }
    };

    // Function to handle modal dismissal
    const handleCancel = () => {
        // Close the confirmation modal
        setShowConfirmationModal(false);
    };

    // Function to handle Confirm button press
    // Function to handle Confirm button press
    const handleConfirm = async () => {
        try {
            // Prepare deposit request data
            const depositRequest = {
                bankName: selectedBank,
                referenceId: transactionId,
                screenshotFile: thumbnailUri,
                remarks: remarks,
                // Add other relevant data as needed
            };
            console.log('DepositRequest =', depositRequest);
            // Call the API to save deposit data
            const response = await api.saveDeposit(depositRequest);

            // Handle the API response
            console.log('API Response:', response);

            // Check if the deposit is successfully saved
            if (response.status === 'success') {
                // Close the confirmation modal
                setShowConfirmationModal(false);
                // Show the success modal
                setShowSuccessModal(true);
                // Optionally, you can perform additional actions such as updating UI state or navigating to another screen
            } else {
                // Handle unsuccessful deposit saving
                console.error('Failed to save deposit:', response.error);
                // Optionally, you can show an error message or take appropriate action
            }
        } catch (error) {
            console.error('Error saving deposit:', error);
            // Handle the error gracefully, e.g., show an error message
        }
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
    };


    return (
        <View>
            <DepositedAmount setParentDepositedAmount={setDepositedAmount} />
            <BankList setSelectedBank={setSelectedBank} />
            <TransactionIdField
                transactionId={transactionId}
                setTransactionId={setTransactionId}
                confirmTransactionId={confirmTransactionId}
                setConfirmTransactionId={setConfirmTransactionId}
            />
            <Remarks value={remarks} setValue={setRemarks} />
            <UploadReceiptImage thumbnailUri={thumbnailUri} setThumbnailUri={setThumbnailUri} />
            <SubmitButton title="Submit" disabled={!areAllFieldsFilled()} onPress={handleSubmit} />

            {/* Confirmation Modal */}
            <Modal visible={showConfirmationModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.confirmText}>
                            Confirm deposit of <Text style={styles.boldText}>₹ {depositedAmount}</Text> at {'\n'}<Text style={styles.boldText}>{selectedBank}</Text>
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Success Modal */}
            <SuccessModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 330,
        height: 142,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    confirmText: {
        fontFamily: 'Inter',
        fontSize: 14,
        lineHeight:20,
        fontWeight: '400',
        lineHeight: 20,
        color:'black',
        letterSpacing: 1,
        textAlign: 'center',
        marginBottom: 20,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#3B3D43',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        width: 138,
        height: 46,
        backgroundColor: '#E5E7FA',
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#003874',
    },
    confirmButton: {
        width: 138,
        height: 46,
        backgroundColor: '#003874',
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#FFFFFF',
    },
});

export default Deposits;
