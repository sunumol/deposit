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

import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
//import ReasonModal from './ReasonModal';
import Icon from 'react-native-vector-icons/AntDesign';
//import ErrorModal from './ErrorModal';
const { height, width } = Dimensions.get('screen');

const SelectTab = (props) => {
    console.log("selectTAB",props.item.name)
    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)




    return (

       <>
 

      
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false} >


                    {ButtonStatus ?
                        <View style={[styles.viewCard, { flex: 1, flexDirection: 'row', }]}>

                            <View style={[styles.circleStyle, { backgroundColor: '#4B9760', marginLeft: width * 0.05 }]}>
                                <Text style={styles.circleText}>AC</Text>
                            </View>


                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>

                                <Text style={styles.nameText}>Aparna CS</Text>


                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                        <Icon1 name="location-outline" color={"black"} />
                                    </View>
                                    <Text style={[styles.idText, { paddingTop: 4 }]}>682555</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', top: -8, alignItems: 'flex-end', marginLeft: width * 0.12 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>789XXXXX33</Text>
                                </View>
                            </View>
                        </View> :
                        <View style={styles.searchBox}>
                            <View style={styles.boxStyle}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                    <View style={[styles.circleStyle, { backgroundColor: '#4B9760' }]}>
                                        <Text style={styles.circleText}>{props.item.short}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                        <Text style={styles.nameText}>{props.item.name}</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                <Icon1 name="location-outline" color={"black"} />
                                            </View>
                                            <Text style={[styles.idText, { paddingTop: 4 }]}>{props.item.text}</Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                        <Text style={[styles.numText, { paddingLeft: 6 }]}>{props.item.number}</Text>
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
                                    <Text style={styles.headTextTitle}>Aadhaar ID</Text>
                                    <Text style={styles.subText}>4447XXXXXX22</Text>
                                </View>
                                {/* <Success height={23} width={24} /> */}
                            </View>
                            <View style={styles.lineView} />
                            <View style={{ paddingHorizontal: 17, }}>
                                <Text style={styles.headTextTitle}>Voter ID</Text>
                                <Text style={styles.subText}>TTUXXXXX66</Text>
                            </View>
                            <View style={styles.lineView} />
                            <View style={{ paddingHorizontal: 17, paddingBottom: 16 }}>
                                <Text style={styles.headTextTitle}>Spouse Voter ID</Text>
                                <Text style={styles.subText}>TTUXXXXX55</Text>
                            </View>

                        </View>}



                </ScrollView>

                {/* {!ButtonStatus ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorLight }]}
                            onPress={() => setModalReason(true)}>
                            <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CreateTrustCircle')}
                            style={[styles.buttonView, { backgroundColor: COLORS.colorB }]}>
                            <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View> :
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <TouchableOpacity style={[styles.Button1, { backgroundColor: COLORS.colorB }]}
                            onPress={() => alert("heloo")}
                        >
                            <Icon name="pluscircleo" size={15} color={"#FFFFFF"} />
                            <Text style={[styles.text1, { color: COLORS.colorBackground, paddingLeft: width * 0.02 }]}>Add Trust Circle Member</Text>
                        </TouchableOpacity>
                    </View>} */}
            </View>


          

    </>
    )
}

export default SelectTab;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
        marginTop:20,
    
    
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
    }

})