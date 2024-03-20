import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { api } from '../../../Services/Api';
import Money from '../assets/icons/Money.svg';
import Ellipse from '../assets/icons/Ellipse.svg';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const { width } = Dimensions.get('screen');

const DepositedAmount = ({ setParentDepositedAmount }) => {
    const [depositedAmount, setDepositedAmount] = useState({
        totalAmountCollected: 0,
        depositedSum: 0,
        depositPendingSum: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const agentId = await AsyncStorage.getItem('AgentId'); // Retrieve agentId from AsyncStorage
                const data = {
                    agentId: JSON.parse(agentId), // Parse agentId if needed
                    
                };
                console.log("Sunu printing ......", data);
                const response = await api.getcompletedCollections(data);
                const { totalAmountCollected, depositedSum, depositPendingSum } = response.data.body;
                setDepositedAmount({
                    totalAmountCollected,
                    depositedSum,
                    depositPendingSum
                });
                setParentDepositedAmount(totalAmountCollected); // Setting parent state
            } catch (error) {
                console.log("-------------------getcompletedCollections  err", error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Ellipse style={styles.EllipseIcon} />
                <Money style={styles.moneyIcon} />

                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Amount to be Deposited </Text>
                    <Text style={styles.amountTxt}>₹{depositedAmount.totalAmountCollected}</Text>
                </View>
            </View>
        </View>
    );
};

export default DepositedAmount;

const styles = StyleSheet.create({
    outerContainer: {
        width: width * 0.90,
        height: 85.12,
        top: 20,
        left: 19,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#ECEBED',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.14,
        shadowRadius: 14,
        elevation: 4, // Android shadow
    },
    EllipseIcon: {
        width: 27.83,
        height: 28,
        top: 10,
        left: 22,
        backgroundColor: 'rgba(39, 174, 96, 0.1)', // Background color with opacity
        borderRadius: 10,
        /* Add any additional styles or properties here */
    },
    container: {
        flexDirection: 'row', // Arrange children horizontally
        alignItems: 'center', // Align children vertically
    },
    innerContainer: {
        paddingTop: 20,
        marginLeft: 10, // Margin between Money SVG and text
    },
    text: {
        fontSize: 17,
        fontFamily: 'Inter',
        // fontWeight:400,
        marginLeft: 10,
    },
    amountTxt: {
        fontSize: 18,
        color: '#27AE60',
        marginLeft: 10,
    },
    moneyIcon: {
        // Style for the Money SVG
        width: 24, // Adjust according to your SVG
        height: 24, // Adjust according to your SVG
        top: 10,
    },
});
