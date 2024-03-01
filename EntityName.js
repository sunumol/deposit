import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import './common.css';

const EntityName = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) => {
        onSelect(option);
        toggleDropdown();
    };

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Entity Name</Text>
            {/* Dropdown header */}
            <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
                <Text style={styles.selectedOption}>{selectedOption || 'Select'}</Text>
            </TouchableOpacity>
            {/* Dropdown */}
            {isOpen && (
                <View style={styles.dropdown}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSelectOption(option)}
                            style={styles.option}
                        >
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 350,
        position: 'relative',
        zIndex: 1,
        marginLeft: 30,
    },
    title: {
        marginTop: 15,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center align vertically
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ECEBED',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedOption: {
        flex: 1, // Take up remaining space
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 2, // Adjust spacing from dropdown header
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default EntityName;
