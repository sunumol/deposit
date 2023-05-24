
import React, { useState } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import AnsModal from './AnsModal';
import Icon from 'react-native-vector-icons/Entypo'
import GeneratePin from '..';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');

const Generate = (navigation) => {
        const [dob,setDob] = useState('')
        const [MitraID,setSMitraID] = useState('')
        
    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.TextElect}>Your date of birth?</Text>
            </View>
            <View style={styles.SelectBox}>

                <TextInput
                    style={[{ fontSize: 12, color: '#000', fontFamily: FONTS.FontRegular, left: 10, width: width * 0.84, }]}
                    value={dob}
                    placeholder={"DD/MM/YYYY"}
                    placeholderTextColor={"#808080"}
                    
                    maxLength={10}
                    // contextMenuHidden={true}
                    onChangeText={(text) => {
                        setDob(text)
                    }
                    } />
            </View>

            <View>
                <Text style={styles.TextElect}>Svadhan Mitra ID?</Text>
            </View>
            <View style={styles.SelectBox}>

                <TextInput
                    style={[{ fontSize: 12, color: '#000', fontFamily: FONTS.FontRegular, left: 10, width: width * 0.84, }]}
                    value={MitraID}
                    keyboardType={'number-pad'}
                    maxLength={6}
                    placeholder={"SXXXXX"}
                    placeholderTextColor={"#808080"}
                    // contextMenuHidden={true}
                    onChangeText={(text) => {
                        setSMitraID(text)
                    }
                    } />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:width*0.09 }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: dob && MitraID ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                        onPress={() => dob && MitraID ? navigation.navigate('ForgotPin') :console.log("hello")}>
                        <Text style={[styles.continueText, { color: dob && MitraID ? COLORS.colorBackground : 'rgba(151, 156, 158, 1)' }]}>Submit</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default Generate;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        paddingHorizontal: 20,
        paddingTop:width*0.07

    },
    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop: 10
    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.89,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 0,
        width: width * 0.84,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
})