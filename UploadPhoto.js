import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const UploadPhoto = () => {
    const [photo, setPhoto] = useState(null);

    // Function to open image picker
    const handleChoosePhoto = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setPhoto(source);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
                <Image source={require('./assets/icons/15.png')} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.uploadText}>Upload</Text>
                    <Text style={styles.proofText}>Proof of Receipt</Text>
                </View>
            </TouchableOpacity>
            {photo && <Image source={photo} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        width: 350,
        height: 90,
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'center', // Center items horizontally
    },
    textContainer: {
        marginLeft: 10, // Add margin between icon and text
    },
    uploadText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    proofText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default UploadPhoto;
