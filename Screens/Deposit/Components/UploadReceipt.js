import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const UploadReceipt = () => {
    const [image, setImage] = useState(null);

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setImage(response.uri);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Upload Receipt123</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
    },
});

export default UploadReceipt;
