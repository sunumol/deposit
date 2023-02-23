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
import Icon1 from 'react-native-vector-icons/Entypo'; import ImagePicker from 'react-native-image-crop-picker';
const { height, width } = Dimensions.get('screen');

const Vehicles = ({ navigation }) => {

    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState('')
    const [number, setNumber] = useState(false)
    const [SearchStatus, setSearchStatus] = useState(false)
    const toggleCheckbox = () => setChecked(!checked);

    const Data = [
        {
            id: 1,
            label: '|'
        },
        {
            id: 2,
            label: '|'
        },
        {
            id: 3,
            label: '|'
        },
        {
            id: 4,
            label: '|'
        },
        {
            id: 5,
            label: '|'
        }
    ]

    const Owner = [
        {
            id: 1,
            name: 'Anil Kumar',
            vehicle: 'Maruti Suzuki Alto',
            number: 'KL34E3278',
            year: '2017'
        },
        {
            id: 2,
            name: 'Anil Kumar',
            vehicle: 'Maruti Suzuki Swift',
            number: 'KL24H779',
            year: '2013'
        }
    ]
    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>

                    <View>
                        <Text style={styles.vehText}>Vehicles owned (2)</Text>
                    </View>
                    <View>
                        {Owner.map((item) => {
                            return (
                                <View style={styles.containerBox1}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-around',
                                        paddingTop: width * 0.04, marginLeft: width * 0.05
                                    }}>
                                        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-start' }}>
                                            <Text style={styles.TextOwner}>{item.name}</Text>
                                            <Text style={[styles.TextOwner, { paddingTop: 5, width: width * 0.35 }]}>{item.vehicle}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', left: -9 }}>
                                            {Data.map((item) => {
                                                return (
                                                    <View style={{ flexDirection: 'column', }}>
                                                        <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item.label}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 1, left: -25 }}>
                                            <Text style={styles.TextOwner}>{item.number}</Text>
                                            <Text style={[styles.TextOwner, { paddingTop: 5 }]}>{item.year}</Text>
                                        </View>
                                    </View>

                                </View>
                            )
                        })}

                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity style={[styles.buttonView1, { backgroundColor: 'rgba(0, 56, 116, 0.1)' }]}
                       onPress={()=>navigation.navigate('AddVehicle')} >
                            <Icon1 name="plus" size={18} color={COLORS.colorB} />
                            <Text style={[styles.continueText, { color: COLORS.colorB, marginLeft: 5 }]}>Add New</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorB }]} onPress={()=>navigation.navigate('WhiteGoodsOwner')}>
                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>




        </>
    )
}

export default Vehicles;

const styles = StyleSheet.create({


    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    vehText: {
        fontFamily: FONTS.FontSemiB,
        color: '#000000',
        fontSize: 14
    },
    Num: {
        color: '#1A051D',
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        left: 6,
        // backgroundColor:'red',
        width: width * 0.6
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },

    buttonView1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 20,
        width: width * 0.35,

    },
    buttonView: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 5,
        width: width * 0.90,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,

        letterSpacing: 0.64
    },
    TextOwner: {
        fontFamily: FONTS.FontSemiB,
        color: '#1A051D',
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
    },
    containerBox: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 2,
        alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.20
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: '#9EC894',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    shortText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,

    },
    nameText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
    },
    underText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
    },
    dateText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        marginRight: 12,
        marginLeft: 5
    },
    containerBox1: {
        marginTop: 6,
        //flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 2,
        //alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.20
    },
    owner: {
        color: '#808080',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    NameStyle: {
        color: '#1A051D',
        fontSize: 12,
        fontFamily: FONTS.FontSemiB
    }







})