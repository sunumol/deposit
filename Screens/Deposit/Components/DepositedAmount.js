import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { api } from '../../../Services/Api';

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
            <View style={styles.innerContainer}>
                {/* <Image source={require('./assets/icons/coins.png')} style={styles.icon} /> */}
                <Text style={styles.text}>Amount to be Deposited: {depositedAmount.totalAmountCollected}</Text>
                {/* <Text style={styles.text}>Deposited Sum: {depositedAmount.depositedSum}</Text>
                <Text style={styles.text}>Deposit Pending Sum: {depositedAmount.depositPendingSum}</Text> */}
            </View>
        </View>
    );
};

export default DepositedAmount;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'white', // Background color changed to white
    },
    box: {
        flexDirection: 'column', // Changed to column to stack the text vertically
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 10, // Added margin bottom to separate from text
    },
    // text: {
    //     fontSize: 16,
    //     marginBottom: 5, // Added margin bottom to separate text elements
    // },
    outerContainer: {
        width: 330,
        height: 84.12,
        position: 'absolute',
        top: 87,
        left: 15,
        borderColor: '#ECEBED',
        borderWidth: 1,
        borderRadius: 15,
        overflow: 'hidden',
        borderStyle: 'solid', // Border style added
    },
    innerContainer: {
        backgroundColor: 'white', // Background color changed to #ECEBED
        padding: 20,
        borderRadius: 15,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});
