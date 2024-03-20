import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { api } from '../../../Services/Api';
import Search from '../assets/icons/Search.svg';

const { height, width } = Dimensions.get('screen');
const BankList = ({ setSelectedBank }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const requestData = {
                    bankName: query,
                };
                const response = await api.getBankName(requestData);
                setSuggestions(response.data);
                setShowSuggestions(true); // Show suggestions when input changes
            } catch (error) {
                console.error('Error fetching bank names:', error);
            }
        };

        if (query.length > 0) {
            fetchSuggestions();
        } else {
            setSuggestions([]);
            setShowSuggestions(false); // Hide suggestions when input is empty
        }
    }, [query]);

    const handleInputChange = (text) => {
        setQuery(text);
    };

    const handleItemPress = (item) => {
        setQuery(item.bankName); // Select the chosen item
        setSelectedBank(item.bankName); // Set the selected bank in parent state
        setShowSuggestions(false); // Hide suggestions after selecting a bank
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deposit Entity Name</Text>
            <View style={styles.searchBoxContainer}>
                <TextInput
                    style={styles.searchBox}
                    value={query}
                    keyboardType="alphanumeric" // Restrict to alphanumeric characters
                    onChangeText={handleInputChange}
                />
                <Search style={styles.searchIcon} />
            </View>
            {showSuggestions && (
                <View>
                    <FlatList
                        
                        data={suggestions}
                        renderItem={({ item }) => (

                            <TouchableOpacity onPress={() => handleItemPress(item)}>

                                <Text>{item.bankName}</Text>
                            </TouchableOpacity>
                        )}

                        keyExtractor={(item) => item.id.toString()}
                        style={[styles.suggestion]}
                    />
                </View>
            )}
        </View>
    );
};

export default BankList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 5,
        borderRadius: 8,
        width: width * 0.90,
        position: 'absolute',
        top:110,
        height:49,
        marginLeft: 20,
    },
    searchIcon: {
        // position: 'absolute', // Adjusted position to absolute
        right: 10,
        top:13, // Adjusted top position
        transform: [{ translateY: -12 }], // Adjusted to vertically center the icon
    },
    title: {
        top:20,
        fontWeight: 'inter',
        paddingLeft: 5,
        paddingBottom: 1,
        position: 'absolute',
    },
    searchBoxContainer: {
        height: 45,
        width:width*0.90,
        top:50,
        flexDirection: 'row', // Added to allow positioning of icon and text input
        alignItems: 'center', // Added to vertically center the icon and text input
        backgroundColor: '#FCFCFC',
        padding: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ECEBED',
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
        position: 'absolute',
    },
    searchBox: {
        // flex: 1, // Added to allow the text input to take remaining space
        height: '100%', // Adjusted height to fill the container
        height: 45,
        // position: 'absolute',
        width:340,
    },
    suggestion: {
        backgroundColor: 'white',
        color: 'red',
        left:2,
        paddingLeft:5,
        position: 'absolute',
        top: 80,
        zIndex: 99,
        elevation:10,
    },
   

});
