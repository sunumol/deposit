import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { api } from '../../../Services/Api';
import Money from '../assets/icons/Money.svg';
import { makeStyles } from 'react-native-elements';
import Ellipse from '../assets/icons/Ellipse.svg';

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
                //const id = await AsyncStorage.getItem("CustomerId");
                // console.log("sunu deposit=",AsyncStorage.getAllKeys());
                // const phone = await AsyncStorage.getItem('Mobile')
                // const lang = await AsyncStorage.getItem('user-language')
                // const customerId = await AsyncStorage.getItem('CustomerId')
                // const agentIdToShow = await AsyncStorage.getItem('agentIdToShow')
                // console.log("sunu phone=", phone);
                // console.log("sunu lang=", lang);
                // console.log("sunu customerId=", customerId);
                // console.log("sunu agentIdToShow=", agentIdToShow);

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
                <Ellipse style={styles.EllipseIcon} />
                <Money style={styles.moneyIcon} />

                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Amount to be Deposited: </Text>
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
        height: 84.12,
        top: 30,
        left: 20,
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
    /* EllipseIcon.css */

    EllipseIcon: {
        width: 27.83,
        height: 28,
        top:1,
        left: 22,
        backgroundColor: 'rgba(39, 174, 96, 0.1)', // Background color with opacity
        /* Add any additional styles or properties here */
    },

    container: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children vertically
},
    innerContainer: {
    paddingTop:20,
    marginLeft: 10, // Margin between Money SVG and text
},
    text: {
    fontSize: 15,
        fontFamily:'Inter',
        // fontWeight:400,
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
