import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Button, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const UploadPhoto = () => {
    const [imageUri, setImageUri] = useState(null);

    const handleFileUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleFileUpload} style={styles.imageContainer}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.thumbnail} />
                ) : (
                    <Image source={require('./assets/icons/Group 9525.png')} style={styles.icon} />
                )}
            </TouchableOpacity>
            {/* <Button title="Upload Image" onPress={handleFileUpload} /> */}
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        marginTop:-40,
        marginTop:30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageContainer: {
        width: 350,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default UploadPhoto;
