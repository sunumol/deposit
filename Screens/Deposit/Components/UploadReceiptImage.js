import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Dimensions, Image, Alert, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'; // Required import for image picker
import { FONTS, COLORS } from '../../../Constants/Constants';
import AddRecipt from '../assets/icons/AddRecipt.svg';
import Arrow from '../assets/icons/Arrow.svg';
import { api } from '../../../Services/Api';

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

            // Upload the image to your API
            const formData = new FormData();
            formData.append('image', {
                uri: image.path,
                type: 'image/jpeg', // Change the type as per your requirement
                name: 'receipt_image.jpg', // Change the name as per your requirement
            });

            await api.uploadFileDeposit(formData).then((res) => {
                console.log('-------------------res file upload', res)
                if (res?.status) {
                    // setImage(res?.data[0]?.body)
                    // imageUrl1(res?.data[0]?.body)
                }
            }).catch((err) => {
                console.log('-------------------err file upload', err)
                //  uploadFileRetry(Imagefile)
            })

            // const formData = new FormData();
            // formData.append('image', {
            //     uri: image.path,
            //     type: 'image/jpeg', // Change the type as per your requirement
            //     name: 'receipt_image.jpg', // Change the name as per your requirement
            // });

            // const response = await fetch('YOUR_API_ENDPOINT', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         // Add any other headers if required
            //     },
            // });

            // // Handle the response from the API as per your requirement
            // const responseData = await response.json();
            // console.log('API Response:', responseData);
        } catch (error) {
            console.log('Image picker error:', error);
            if (error.code !== 'E_PICKER_CANCELLED') {
                Alert.alert('Error', 'Failed to pick an image. Please try again later.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={[styles.UploadCard,]} onPress={() => { UploadFileDeposit() }} >

                {!thumbnailUri ?
                    <View style={{ alignItems: 'flex-start', flex: 0.45, marginLeft: 25 }}>
                        <View >
                            <AddRecipt />
                        </View>
                    </View>
                    :
                    <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 10 }}>
                        <Image source={{ uri: thumbnailUri }}
                            style={{ width: 55, height: 65, borderRadius: 6 }}
                        />
                    </View>
                }
                <View style={[styles.Line, { borderColor: "grey" }]} />
                <View style={{ flexDirection: 'column', left: -20 }}>
                    <Text style={[styles.UploadText, { color: thumbnailUri ? '#1A051D' : '#808080' }]}>Upload</Text>
                    <Text style={[styles.Prooftext]}>Proof of Receipt</Text>
                    <Arrow/>
                </View>


            </Pressable>
            {/* <Pressable style={styles.uploadCard} onPress={handleUploadImage}>
                {thumbnailUri ? (
                    <>
                       
                        <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
                        
                    </>
                ) : (
                    <>
                        <AddRecipt />
                        <Text>Upload Receipt</Text>
                    </>
                )}
            </Pressable> */}
        </View>
    );
};

export default UploadReceiptImage;

const styles = StyleSheet.create({
    container: {
        width: 370,
        height: 71,
        position: 'absolute',
        top: 410,
        left: 20,
        right: 15.5,
    },
    UploadCard: {
        width: width * 0.88,
        height: width * 0.22,
        marginLeft: 2,
        marginRight: 5,
        backgroundColor: '#FCFCFC',
        elevation: 1,
        shadowColor: '#000000',
        alignItems: 'center',
        borderRadius: 6,
        flexDirection: 'row',
        marginTop: width * 0.02,
        marginBottom: width * 0.05,
    },
    thumbnail: {
        width: 50, // Set width as needed
        height: 50, // Set height as needed
        borderRadius: 6,
       
    },
    Line: {
        borderWidth: 0.3,
        height: 78,
        left: -38
    },
   
});
