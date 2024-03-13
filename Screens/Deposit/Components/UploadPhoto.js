import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const UploadReceipt = () => {
    const [photo, setPhoto] = useState(null);

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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photo && <Image source={photo} style={{ width: 200, height: 200 }} />}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
        </View>
    );
};

export default UploadReceipt;
