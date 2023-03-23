import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    TextInput,
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
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'react-native-vector-icons/Feather';
import ErrorModal from './ErrorModal';
import ReasonModal from './ReasonModal';
const { height, width } = Dimensions.get('screen');

const DetailChecks = ({navigation}) => {

    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [status,setStatus] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [checked, setChecked] = useState(false);
    const toggleCheckbox = () => setChecked(!checked);



    return (

   
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.searchBox}>
                        <View style={styles.boxStyle}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <View style={[styles.circleStyle, { backgroundColor: '#6979F8' }]}>
                                    <Text style={styles.circleText}>AA</Text>
                                </View>

                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                    <Text style={styles.nameText}>Athira Anil</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.idText, { paddingTop: 4 }]}>686677</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>961XXXXX77</Text>
                                </View>
                            </View>

                        </View>
                        <View style={styles.lineView} />
                        <View style={{ paddingHorizontal: 17, }}>
                            <Text style={styles.headTextTitle}>Address</Text>
                            <Text style={[styles.subText, { maxWidth: 200 }]}>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Kochi-560016</Text>
                        </View>
                        <View style={styles.lineView} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17, }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginRight: 10 }}>
                                <Text style={styles.headTextTitle}>District</Text>
                                <Text style={styles.subText}>Ernakulam</Text>
                            </View>
                            {/* <Success height={23} width={24} /> */}
                        </View>
                        <View style={styles.lineView} />
                        <View style={{ paddingHorizontal: 17, }}>
                            <Text style={styles.headTextTitle}>Village</Text>
                            <TouchableOpacity style={styles.borderVillage} onPress={()=>setStatus(true)}>
                                <Text style={[styles.searchText1,{color:!status ? '#808080':'#1A051D'}]}>{!status ? "Search village" : "Thrikkakara North"}</Text>
                                <Search name="search" size={17} style={{marginRight:15}} color={'#1A051D'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineView} />
                        <View style={{ paddingHorizontal: 17, paddingBottom: 16 }}>
                            <Text style={styles.headTextTitle}>Access road type</Text>

                            <TouchableOpacity style={styles.SelectBox} >
                   <Text style={[styles.textSelect,{color:!status ? '#808080':'#1A051D'}]}>{!status ? 'Select' : 'Four-wheeler'}</Text>
              
                    {/* <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} /> */}
                </TouchableOpacity>
                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', left: -15 }}>
                        <View style={{ marginTop: 5 }}>
                            <CheckBox
                                checked={checked}
                                onPress={toggleCheckbox}
                                // Use ThemeProvider to make change for all checkbox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor={COLORS.colorB}


                            />
                        </View>
                        <View style={{ flexDirection: 'column', left: -5 }}>
                            <Text style={[styles.TextCheck, { paddingTop: width * 0.05 }]}>The above address is checked and found to </Text>
                            <Text style={styles.TextCheck}>be correct</Text>
                        </View>

                    </View>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', marginTop: width * 0.05,
                        paddingLeft: 10, paddingRight: 10
                    }}>

                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: 'rgba(229, 231, 250, 1)' }]}
                            onPress={() => setModalReason(true)}>
                            <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>checked? navigation.navigate('CustomerDetails'):console.log('')}
                            style={[styles.buttonView, { backgroundColor:checked ? COLORS.colorB: 'rgba(236, 235, 237, 1)' }]}>
                            <Text style={[styles.continueText, { color: checked? COLORS.colorBackground: '#979C9E' }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <ErrorModal
                ModalVisible={ModalError}
                onPressOut={() => {
                    setModalError(!ModalError)
                    setModalReason(!ModalReason)
                    navigation.navigate('Profile')
                }}
                setModalVisible={setModalError}
            />

            <ReasonModal
                onPress1={() => {
                    // setModalVisible(false)
                    setModalError(true)
                }}
                ModalVisible={ModalReason}
                onPressOut={() => setModalReason(!ModalReason)}
                setModalVisible={setModalReason}
            />

            </View>




    
    )
}

export default DetailChecks;

const styles = StyleSheet.create({
    TextCheck: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: '#3B3D43'
    },
    searchText1: {
        color: '#808080',
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        marginLeft:15
    },
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.80,
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
        marginLeft: 15
    },
    borderVillage: {
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.80,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        marginTop: width * 0.02,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
       
    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    editView: {
        borderRadius: 48,
        backgroundColor: COLORS.colorLight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 6
    },
    contentView: {
        flexDirection: 'column',
    },
    boxView: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timeText: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorB,
    },
    dateText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorBlack,
    },
    changeText: {
        fontSize: 12,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorB,
        paddingLeft: 8
    },
    searchBox: {

        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        marginTop: 20,


    },

    lineView: {
        borderWidth: 0.9,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5,
        marginTop: 13,
        marginBottom: 16
    },
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
    },
    idText: {
        fontSize: 11,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '400',
    },
    buttonView: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 20,
        width: '48%'
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,

        letterSpacing: 0.64
    },
    boxStyle: {
        paddingHorizontal: 15,
        paddingTop: 12,
        flexDirection: 'row'
    },
    circleStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    headTextTitle: {
        fontSize: 13,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
    },
    subText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 31,
        flexDirection: 'row',
        // marginLeft: 12,
        // marginRight: 12,
        borderRadius: 40,
        marginBottom: 20
    },
    viewCard: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.92,
        borderRadius: 8,
        height: width * 0.22,
        marginBottom: width * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginTop: width * 0.045
    },
    NumTexts: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    buttonView: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 20,
        width: '48%'
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    }


})