import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { api } from '../../../Services/Api';
// import Search from '../assets/icons/Search.svg';
const { height, width } = Dimensions.get('screen');
const BankList = () => {
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
            } catch (error) {
                console.error('Error fetching bank names:', error);
            }
        };

        if (query.length > 0) {
            fetchSuggestions();
            setShowSuggestions(true); // Show suggestions when input changes
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
        setShowSuggestions(!showSuggestions); // Toggle the visibility of suggestions
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deposit Entity Name</Text>
            <View style={styles.searchBoxContainer}>
                <TextInput
                    style={styles.searchBox}
                    value={query}
                    onChangeText={handleInputChange}
                    
                />
                {/* <Search style={styles.searchIcon} /> */}
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
        paddingTop: 10,
        borderRadius: 8,
        marginLeft: 16,
        width: width*.9,
        position: 'absolute',
        marginTop:125,
        marginLeft:20,
        height:height*.05
    },
    searchIcon:{
        
        paddingLeft:700,
        paddingRight:5,
    },
    title: {
        fontWeight: 'inter',
        paddingLeft:5,
        marginBottom: 10,   
        paddingBottom:1,
    },
    searchBoxContainer: {
        height:45,
        backgroundColor: '#FCFCFC',
        padding: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ECEBED',
        color: '#333', // Adjust text color as needed
        fontSize: 16, // Adjust font size as needed
        textAlign: 'center',
    },
    searchBox: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 66,
    },
});
