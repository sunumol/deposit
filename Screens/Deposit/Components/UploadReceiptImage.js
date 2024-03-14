import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Dimensions, Image, Alert, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'; // Required import for image picker
import { FONTS, COLORS } from '../../../Constants/Constants';
import AddRecipt from '../assets/icons/AddRecipt.svg';

const { height, width } = Dimensions.get('screen');

const UploadReceiptImage = ({ navigation, setState, proofType1, imageUrl1, relation1, relative1, isCheck, Correction, activityIds }) => {
    const [thumbnailUri, setThumbnailUri] = useState(null);

    const handleUploadImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: width * 1.2,
                height: height * 0.7,
                cropping: true,
                multiple: false,
                mediaType: 'photo',
                // Add other options as needed
            });

            console.log('Selected image:', image);
            setThumbnailUri(image.path); // Save the URI of the selected image
        } catch (error) {
            console.log('Image picker error:', error);
            if (error.code !== 'E_PICKER_CANCELLED') {
                Alert.alert('Error', 'Failed to pick an image. Please try again later.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.uploadCard} onPress={handleUploadImage}>
                {thumbnailUri ? (
                    <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
                ) : (
                    <>
                        <AddRecipt />
                        <Text>Upload Receipt</Text>
                    </>
                )}
            </Pressable>
        </View>
    );
};

export default UploadReceiptImage;

const styles = StyleSheet.create({
    container: {
        width: 370,
        height: 71,
        position: 'absolute',
        top: 461.41,
        left: 15.5,
        right:15.5,
    },
    uploadCard: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: '#ECEBED',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        elevation: 1,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
});
