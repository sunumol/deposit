import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { api } from '../../../Services/Api';
import Money from '../assets/icons/Money.svg';
import { makeStyles } from 'react-native-elements';

const { height, width } = Dimensions.get('screen');
const DepositedAmount = () => {
    const [depositedAmount, setDepositedAmount] = useState({
        totalAmountCollected: 0,
        depositedSum: 0,
        depositPendingSum: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const id = await AsyncStorage.getItem("CustomerId");
                const id = 1;
                const data = {
                    agentId: id,
                };
                console.log("Sunu data = ", data);

                const response = await api.getcompletedCollections(data);
                console.log("------------------- getcompletedCollections res", response.data.body);

                // Destructure necessary values from the API response
                const { totalAmountCollected, depositedSum, depositPendingSum } = response.data.body;

                // Update the state with the fetched values
                setDepositedAmount({
                    totalAmountCollected,
                    depositedSum,
                    depositPendingSum
                });
            } catch (error) {
                console.log("-------------------getcompletedCollections  err", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once after the initial render

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Money style={styles.moneyIcon} />
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Amount to be Deposited: </Text>
                    <Text style={styles.amountTxt}>{depositedAmount.totalAmountCollected}</Text>
                </View>
            </View>
        </View>
    );
};

export default DepositedAmount;

const styles = StyleSheet.create({
    outerContainer: {
        width: width * 0.90,
        height: 84.12,
        marginTop: 20,
        marginLeft: 20,
        borderWidth: 1, // Border width
        borderColor: 'black', // Border color
        justifyContent: 'center', // Align vertically
        alignItems: 'center', // Align horizontally
        padding: 10, // Padding around inner container
        borderColor: '#ECEBED',
        borderWidth: 1,
        borderRadius: 15,
    },
    container: {
        flexDirection: 'row', // Arrange children horizontally
        alignItems: 'center', // Align children vertically
    },
    innerContainer: {
        marginLeft: 10, // Margin between Money SVG and text
    },
    text: {
       fontSize:15,
    },
    amountTxt: {
        fontSize: 16,
        color: '#27AE60',
    },
    moneyIcon: {
        // Style for the Money SVG
        width: 24, // Adjust according to your SVG
        height: 24, // Adjust according to your SVG
    },
});
