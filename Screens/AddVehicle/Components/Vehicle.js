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
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Search from '../../../assets/image/search2.svg'
import Icon1 from 'react-native-vector-icons/Entypo'
import Purpose from '../../SelectCustomCall/Components/Purpose';
const { height, width } = Dimensions.get('screen');
import OwnerModal from './OwnerModal';
const Vehicle = ({ navigation }) => {

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', () => {
            setPurpose('')
            setSearchStatus2(false)
            setSearchStatus(false)
            setNumbers('')
            console.log("search status.....",SearchStatus)

        });
        return willFocusSubscription;
    }, []);

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
    const [Purpose, setPurpose] = useState('')
    const [SearchStatus, setSearchStatus] = useState(false)
    const [SearchStatus2, setSearchStatus2] = useState(false)
    const [Status, setStatus] = useState(false)
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

    const StatusChange1 = () => {

        if (numbers.length > 0) {
            setSearchStatus(true)
            setStatus(true)
            console.log("search.....", SearchStatus)
        } else {
            setSearchStatus(false)
            setStatus(true)
            console.log("search rt.....", SearchStatus)
        }

    }
    const StatusChange2 = () => {

        if (numbers.length > 0) {
            setSearchStatus2(true)
            setStatus(true)
            console.log("search.....", SearchStatus)
        } else {
            setSearchStatus2(false)
            setStatus(true)
            console.log("search rt.....", SearchStatus)
        }

    }

    const OnchangeNumbers = (num) => {
        if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
            setNumbers(num)

        } else {

            // ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
        }
    }

    const GetStateChange = () => {
        setModalReason(true)
        setPurpose('')
        setNumbers('')
        setStatus(false)
        setSearchStatus(false)
        setSearchStatus2(false)
    }
    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View>
                        <Text style={styles.TextOwner}>Vehicle owner</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox} onPress={() => {
                        setModalReason(true)
                        setPurpose('')
                        setNumbers('')
                        setStatus(false)
                        setSearchStatus(false)
                        setSearchStatus2(false)
                    }} >
                        {!Purpose ? <Text style={styles.textSelect}>Select</Text> :
                            <Text style={[styles.textSelect], { color: '#1A051D', marginLeft: 8 }}>{Purpose}</Text>}

                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.TextOwner, { marginTop: 10 }]}>Enter the vehicle number</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox}>

                        <TextInput

                            placeholder='KL34E3278'
                            placeholderTextColor='#808080'
                            value={numbers}
                            //maxLength={10}
                            style={styles.Num}
                            placeholderTextColor="#808080"

                            onChangeText={(text) => {
                                OnchangeNumbers(text)


                            }

                            }

                        // keyboardType="numeric"
                        />
                        {Purpose === 'Self' || Purpose === 'Children' ?
                            <TouchableOpacity style={styles.SearhView} onPress={() => numbers?.length > 0 ? StatusChange1() : console.log("null")}>
                                <Search />
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.SearhView} onPress={() => numbers?.length > 0 ? StatusChange2() : console.log("null")}>
                                <Search />
                            </TouchableOpacity>}
                    </TouchableOpacity>

                    {SearchStatus2 ?

                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.circleView}>
                                    <Text style={styles.shortText}>AA</Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.nameText}>Athira Anil</Text>
                                    <Text style={styles.underText}>Daily wage labourer</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>

                                    <Text style={styles.dateText}>Customer</Text>
                                </View>
                            </View>
                        </View> : SearchStatus &&
                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={[styles.circleView, { backgroundColor: 'rgba(206, 116, 143, 1)' }]}>
                                    <Text style={styles.shortText}>AK</Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.nameText}>Anil Kumar</Text>
                                    <Text style={styles.underText}>Daily wage labourer</Text>
                                </View>


                                <View style={{ flexDirection: 'row', }}>
                                    <Image source={require('../../../assets/image/cake.png')} resizeMode={'contain'} />
                                    <Text style={styles.dateText}>12/10/1972</Text>
                                </View>

                            </View>
                        </View>}

                    {SearchStatus2 ?


                        <View>
                            <View style={styles.containerBox1}>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-around',
                                    paddingTop: width * 0.05, marginLeft: width * 0.05
                                }}>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-start' }}>
                                        <Text style={styles.owner}>Owner name</Text>
                                        <Text style={styles.NameStyle}>Athira Anil</Text>
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
                                        <Text style={styles.owner}>Vehicle Number</Text>
                                        <Text style={styles.NameStyle}>KL34E3278</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: width * 0.05 }}>
                                    <View style={{ flexDirection: 'column', marginLeft: width * 0.055 }}>
                                        <Text style={styles.owner}>Model</Text>
                                        <Text style={styles.NameStyle}>Maruti Suzuki Alto</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1, left: -15 }}>
                                        {Data.map((item) => {
                                            return (
                                                <View style={{ flexDirection: 'column', }}>
                                                    <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item.label}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, left: -28 }}>
                                        <Text style={styles.owner}>Year</Text>
                                        <Text style={styles.NameStyle}>2017</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-between', marginTop: width * 0.05,
                                    paddingLeft: 20, paddingRight: 20
                                }}>

                                    <TouchableOpacity style={[styles.buttonView1, { backgroundColor: 'rgba(229, 231, 250, 1)' }]}
                                    >
                                        <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('VehicleOwn')}
                                        style={[styles.buttonView1, { backgroundColor: COLORS.colorB }]}>
                                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> : SearchStatus && <View>
                            <View style={styles.containerBox1}>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-around',
                                    paddingTop: width * 0.05, marginLeft: width * 0.05
                                }}>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-start' }}>
                                        <Text style={styles.owner}>Owner name</Text>
                                        <Text style={styles.NameStyle}>Anil Kumar</Text>
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
                                        <Text style={styles.owner}>Vehicle Number</Text>
                                        <Text style={styles.NameStyle}>KL34E3278</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: width * 0.05 }}>
                                    <View style={{ flexDirection: 'column', marginLeft: width * 0.055 }}>
                                        <Text style={styles.owner}>Model</Text>
                                        <Text style={styles.NameStyle}>Maruti Suzuki Alto</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1, left: -15 }}>
                                        {Data.map((item) => {
                                            return (
                                                <View style={{ flexDirection: 'column', }}>
                                                    <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item.label}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, left: -28 }}>
                                        <Text style={styles.owner}>Year</Text>
                                        <Text style={styles.NameStyle}>2017</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-between', marginTop: width * 0.05,
                                    paddingLeft: 20, paddingRight: 20
                                }}>

                                    <TouchableOpacity style={[styles.buttonView1, { backgroundColor: 'rgba(229, 231, 250, 1)' }]}
                                    >
                                        <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {navigation.navigate('VehicleOwn')
                                     setSearchStatus2(false)}}
                                        style={[styles.buttonView1, { backgroundColor: COLORS.colorB }]}>
                                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>}

                </ScrollView>

                {!Status &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <Text style={styles.skip}>Skip</Text>
                    </View>}
                {!Status &&
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: number ? COLORS.colorB : '#E0E0E0' }]}>
                        <Text style={[styles.continueText, { color: number ? COLORS.colorBackground : COLORS.colorWhite3 }]}>Continue</Text>
                    </TouchableOpacity>}
            </View>

            <OwnerModal
                onPress1={() => {
                    // setModalVisible(false)
                    //setModalError(true)
                }}
                ModalVisible={ModalReason}
                setPurpose={setPurpose}
                onPressOut={() => setModalReason(!ModalReason)}
                setModalVisible={setModalReason}
            />


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

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 20,
        width: width * 0.37,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,

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
        borderRadius: 8,
        marginRight: 15,
        marginLeft: 2,
        alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.18
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
        borderRadius: 8,
        marginRight: 15,
        marginLeft: 2,
        //alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.57
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