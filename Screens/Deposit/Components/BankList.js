import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { api } from '../../../Services/Api';

const BankList = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const fetchBankSuggestions = async (text) => {
        try {
            const requestData = {
                bankName: text,
            };
            const response = await api.getBankName(requestData);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching bank names:', error);
        }
    };

    const handleInputChange = (text) => {
        setQuery(text);
        if (text.length > 0) {
            fetchBankSuggestions(text);
            setShowSuggestions(true); // Show suggestions when input changes
        } else {
            setSuggestions([]);
            setShowSuggestions(false); // Hide suggestions when input is empty
        }
    };

    const handleItemPress = (item) => {
        setQuery(item.bankName); // Select the chosen item
        setShowSuggestions(!showSuggestions); // Toggle the visibility of suggestions
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entity Name</Text>
            <View style={styles.searchBoxContainer}>
                <TextInput
                    style={styles.searchBox}
                    placeholder="Type here..."
                    value={query}
                    onChangeText={handleInputChange}
                />
            </View>
            {showSuggestions && (
                <FlatList
                    data={suggestions}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleItemPress(item)}>
                            <Text>{item.bankName}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

export default BankList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginLeft: 20,
        width: 370,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchBoxContainer: {
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#333', // Adjust text color as needed
        fontSize: 16, // Adjust font size as needed
        textAlign: 'center',
    },
    searchBox: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});
