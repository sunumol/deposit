import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../Services/Api';

const DepositedAmount = () => {
    const [depositedAmount, setDepositedAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const id = await AsyncStorage.getItem("CustomerId");
                const id = 'S00002';
                const data = {
                    agentId: id,
                };
                console.log("Sunu data = ", data);

                const response = await api.getcompletedCollections(data);
                console.log("------------------- getcompletedCollections res", response.data.body);

                // Assuming response.data.body contains depositedAmount
                setDepositedAmount(response.data.body);
            } catch (error) {
                console.log("-------------------getcompletedCollections  err", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once after the initial render

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                {/* <Image source={require('../assets/icons/coins.png')} style={styles.icon} /> */}
                <Text style={styles.text}>Amount to be deposited: {depositedAmount}</Text>
                {/* You had this line duplicated */}
            </View>
        </View>
    );
};

export default DepositedAmount;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
    },
});
