import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const imgDir = RNFS.DocumentDirectoryPath + '/images/';

const UploadReceiptImage = () => {
    const [uploading, setUploading] = useState(false);
    const [imageUri, setImageUri] = useState < string | null > (null);

    useEffect(() => {
        loadImage();
    }, []);

    const ensureDirExists = async () => {
        const dirExists = await RNFS.exists(imgDir);
        if (!dirExists) {
            await RNFS.mkdir(imgDir);
        }
    };

    const loadImage = async () => {
        await ensureDirExists();
        const files = await RNFS.readDir(imgDir);
        if (files.length > 0) {
            setImageUri(files[0].path);
        }
    };

    const selectImage = () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 0.75,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                saveImage(response.uri);
            }
        });
    };

    const saveImage = async (uri: string) => {
        await ensureDirExists();
        const filename = new Date().getTime() + '.jpeg';
        const dest = imgDir + filename;
        await RNFS.copyFile(uri, dest);
        setImageUri(dest);
    };

    const uploadImage = async (uri: string) => {
        setUploading(true);

        // Implement your upload logic here

        setUploading(false);
    };

    const deleteImage = async (uri: string) => {
        await RNFS.unlink(uri);
        setImageUri(null);
    };

    return (
        <SafeAreaView style={{ flex: 1, gap: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
                <Button title="Select Image" onPress={selectImage} />
            </View>

            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>My Image</Text>
            {imageUri && (
                <View style={{ alignItems: 'center' }}>
                    <Image style={{ width: 200, height: 200, marginVertical: 10 }} source={{ uri: imageUri }} />
                    <Ionicons.Button name="cloud-upload" onPress={() => uploadImage(imageUri)} />
                    <Ionicons.Button name="trash" onPress={() => deleteImage(imageUri)} />
                </View>
            )}

            {uploading && (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    ]}
                >
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            )}
        </SafeAreaView>
    );
};

export default UploadReceiptImage;
