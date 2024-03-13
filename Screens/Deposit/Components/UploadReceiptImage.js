import React, { useState } from 'react';
import { View, Image, Button, Alert,Text, Pressable } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import { ImageResizer } from '@bam.tech/react-native-image-resizer';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker'; // Assuming you're using a library like this for image picking
import api from './api'; // Import your API module
import Icon2 from 'react-native-vector-icons/Entypo';
import Media from '../../../assets/image/media.svg';
import Media1 from '../../../assets/image/Media2.svg';


const UploadReceiptImage = () => {
    const [imageUri, setImageUri] = useState(null);

    const takePhoto = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.7,
            allowsEditing: false,
            storageOptions: {
                skipBackup: true,
       
        const { height, width } = Dimensions.get('screen');

        const UploadReceiptImage = () => {
            const [imageStatus, setImageStatus] = useState(false);
            const [uploadStatus, setUploadStatus] = useState(false);
            const [imageFile, setImageFile] = useState(null);

            const uploadFile = async (imageValue) => {
                try {
                    const data = new FormData();
                    data.append('multipartFile', {
                        name: './assets/icons/coins.png',
                        type: './assets/icons/coins.png',
                        uri: imageValue
                    });

                    const res = await api.uploadFile(data);
                    console.log('-------------------res file upload', res);

                    if (res?.status) {
                        setImageFile(res?.data[0]?.body);
                    }
                } catch (err) {
                    console.log('-------------------err file upload', err);
                    uploadFileRetry(imageValue);
                }
            };

            const uploadFileRetry = async (imageValue) => {
                console.log('retry api called,', imageValue);
                try {
                    const data = new FormData();
                    data.append('multipartFile', {
                        name: 'aaa.jpg',
                        type: 'image/jpeg',
                        uri: imageValue
                    });

                    const res = await api.uploadFile(data);
                    console.log('-------------------res file upload', res);

                    if (res?.status) {
                        setImageFile(res?.data[0]?.body);
                    }
                } catch (err) {
                    console.log('-------------------err file upload', err);
                    // Handle error
                }
            };

            const handleUploadImage = () => {
                ImagePicker.openCamera({
                    width: width * 1.2,
                    height: height * 0.7,
                    hideBottomControls: true,
                    cropping: true
                }).then(image => {
                    console.log("IMAGE", image.path);
                    setImageFile(image.path);
                    setUploadStatus(false);
                    setImageStatus(true);
                    uploadFile(image.path);
                }).catch(error => {
                    console.log('Error selecting image:', error);
                });
            };

            return (
                <Pressable style={[styles.UploadCard, { opacity: Purpose ? 4 : 0.3 }]} onPress={handleUploadImage}>
                    {!imageStatus ?
                        <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                            <View>
                                <Media1 width={30} height={30} />
                            </View>
                        </View>
                        : uploadStatus ?
                            <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                                <View>
                                    <Media width={30} height={30} />
                                </View>
                            </View>
                            :
                            <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 10 }}>
                                <Image source={{ uri: imageFile }}
                                    style={{ width: 55, height: 65, borderRadius: 6 }}
                                />
                            </View>
                    }
                    <View style={[styles.Line, { borderColor: Purpose ? "#F2F2F2" : "grey" }]} />
                    <View style={{ flexDirection: 'column', left: -20 }}>
                        <Text style={[styles.UploadText, { color: NameStatus || Purpose ? '#1A051D' : '#808080' }]}>Take Photo</Text>
                        <Text style={[styles.Prooftext]}>Proof of ownership</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Icon2 name="chevron-right" size={18} color={'#808080'} style={{ marginRight: 15 }} />
                    </View>
                </Pressable>
            );
        };

        export default UploadReceiptImage;
        const styles = StyleSheet.create({
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
            Line: {
                borderWidth: 0.3,
                height: 78,
                left: -38
            },
        })
                path: 'images',
            },
        };

        ImagePicker.launchCamera(options, async response => {
            if (response.didCancel) {
                console.log('User cancelled taking photo');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // Validate file type
                if (
                    response.type !== 'image/jpeg' &&
                    response.type !== 'image/jpg' &&
                    response.type !== 'image/png'
                ) {
                    Alert.alert('Invalid File Type', 'Please take a JPEG, JPG, or PNG photo.');
                    return;
                }

                try {
                    const resizedImage = await ImageResizer.createResizedImage(
                        response.uri,
                        500, // width
                        500, // height
                        'JPEG', // format
                        70 // quality
                    );

                    setImageUri(resizedImage.uri);
                } catch (error) {
                    console.error('Error resizing image:', error);
                }
            }
        });
    };

    const uploadImage = () => {
        // Implement logic to upload image to server using axios or any other library
        if (imageUri) {
            // Example upload code with axios
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                name: 'image.jpg',
                type: 'image/jpeg',
            });

            // axios.post('YOUR_UPLOAD_ENDPOINT', formData)
            //     .then(response => {
            //         // Handle success
            //         console.log('Image uploaded successfully:', response.data);
            //     })
            //     .catch(error => {
            //         // Handle error
            //         console.error('Error uploading image:', error);
            //     });
        }
    };

    return (
        <View>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
            <Button title="Take Photo" onPress={takePhoto} />
            <Button title="Upload Photo" onPress={uploadImage} />
        </View>
    );
};

export default UploadReceiptImage;
