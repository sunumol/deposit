import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    TextInput,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Search from '../../../assets/image/search2.svg'
import Icon1 from 'react-native-vector-icons/Entypo'
const { height, width } = Dimensions.get('screen');

const Vehicle = ({ navigation }) => {

    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [checked, setChecked] = useState(false);
    const [number, setNumber] = useState(false)
    const toggleCheckbox = () => setChecked(!checked);



    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View>
                        <Text style={styles.TextOwner}>Vehicle owner</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox} onPress={() => setModalVisible(true)}>
                        <Text style={styles.textSelect}>Select</Text>
                        {/* <Text style={[styles.textSelect],{color:'#1A051D',marginLeft:8}}>{Purpose}</Text>} */}
                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.TextOwner,{marginTop:10}]}>Enter the vehicle number</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox}>
                        
                            <TextInput

                                placeholder='KL34E3278'
                           placeholderTextColor='#808080'
                                value={number}
                                maxLength={10}
                                placeholderTextColor="#808080"
                                style={{left:6}}
                                // onChangeText={(text) => {
                                //     onChangeNumber(text)
                                // }

                               // }
                              //  placeholderTextColor={COLORS.colorDark}
                                keyboardType="numeric"
                            />
                            <View style={styles.SearhView}>
                            <Search />
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Text style={styles.skip}>Skip</Text>
                </View>
                <TouchableOpacity style={[styles.buttonView, { backgroundColor: number ? COLORS.colorB : '#E0E0E0' }]}>
                    <Text style={[styles.continueText, { color: number ? COLORS.colorBackground : COLORS.colorWhite3 }]}>Continue</Text>
                </TouchableOpacity>
            </View>




        </>
    )
}

export default Vehicle;

const styles = StyleSheet.create({


    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    buttonView: {
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 0,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    TextOwner: {
        fontFamily: FONTS.FontRegular,
        color: '#3B3D43',
        fontSize: 12
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
        justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },
    skip: {
        fontSize: 14,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB
    },
    SearhView: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center'
    }







})