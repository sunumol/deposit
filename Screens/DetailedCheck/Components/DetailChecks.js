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
import RoadAccessModal from './RoadAccessModal';
import { api } from '../../../Services/Api';

const { height, width } = Dimensions.get('screen');

const DetailChecks = ({ navigation, details }) => {
    console.log('????===>>123', details)

    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [roadstatus, setRoadStatus] = useState(details?.accessRoadType)
    const [poststatus, setPostStatus] = useState(false)
    const [landmarkname, setLandmarkname] = useState('')
    const [ModalReason, setModalReason] = useState(false)
    const [ModalReason1, setModalReason1] = useState(false)
    const [checked, setChecked] = useState(false);
    const [villagename, setVillagename] = useState(details?.village);
    const [BStatus, setBstatus] = useState(false);
    const [villagenamedata, setVillagenamedata] = useState('');
    const [postofficename, setPostofficename] = useState(details?.postOffice);
    const [PStatus, setPstatus] = useState(false);
    const [postofficenamedata, setPostofficenamedata] = useState('');
    const toggleCheckbox = () =>{
        if((villagename || details?.village) && (postofficename || details?.postOffice) && (landmarkname || details ?.landMark) && (roadstatus || details?.accessRoadType)){
        setChecked(!checked)
        }else{
        setChecked(false)  
        }
    }



    const  getRandomColor =()=> {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 3; i++) {
          color += letters[Math.floor(Math.random() * 8)];
        }
        return color;
      }
    
    
      const getInitials = (name) => {
      
        let initials;
        const nameSplit = name?.split(" ");
         const nameLength = nameSplit?.length;
        if (nameLength > 1) {
            initials =
                nameSplit[0].substring(0, 1) +
                nameSplit[nameLength - 1].substring(0, 1);
        } else if (nameLength === 1) {
            initials = nameSplit[0].substring(0, 1);
        } else return;
    
         return initials.toUpperCase();
    };

    const searchvillagename = (text) => {
        console.log('VILLAGE NAME ===>>>', text)
        // setVillagename(text)
        getVillage(text)
        if (text.length == '') {
            setVillagenamedata([])
            setBstatus(false)
            setChecked(false)
        } else {

            setVillagename(text)
        }
        setVillagename(text)
    }



    const searchpostofficename = (text) => {
        console.log('Post office NAME ===>>>', text)
        // setVillagename(text)
        getpostoffice(text)
        if (text.length == '') {
            setPostofficenamedata([])
            setPstatus(false)
            setChecked(false)
        } else {

            setPostofficename(text)
        }
        setPostofficename(text)
    }



    const searchlandmarkname = (text) => {
        console.log('landmark NAME ===>>>', text)
        if (text.length == '') {
            setLandmarkname([])
        
            setChecked(false)
        } else {

            setLandmarkname(text)
        }
        setLandmarkname(text)
    }



    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const getVillage = async (value) => {
        console.log('api called')
        const data = {
            // "pin": details?.pin,
            "pin": 688540,
            "villageName": value
        }
        await api.getVillage(data).then((res) => {
            console.log('-------------------res get Village', res?.data?.body)
            if (res?.status) {
                setVillagenamedata(res?.data?.body)
                setBstatus(true)
            }
        }).catch((err) => {
            console.log('-------------------err get Village', err?.response)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------



    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const getpostoffice = async (value) => {
        console.log('api called')
        const data = {
            // "pin": details?.pin,
            "pin": 688540,
            "postOfficeName": value
        }
        await api.getpostoffice(data).then((res) => {
            console.log('-------------------res get Post', res?.data?.body)
            if (res?.status) {
                setPostofficenamedata(res?.data?.body)
                setPstatus(true)
            }
        }).catch((err) => {
            console.log('-------------------err get Post', err?.response)
        })
    };


    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const onsubmit = async (value) => {
        
        console.log('api called')
        const data =  {
            "customerId": details?.customerId,
            "customerName": details?.customerName,
            "address": details?.address,
            "district": details?.district,
            "village": villagename ? villagename : details?.village ,
            "accessRoadType":roadstatus ? roadstatus : details?.accessRoadType,
            "postOffice": postofficename ? postofficename : details?.postOffice,
            "landMark": landmarkname ? landmarkname : details?.landMark,
            "pin": details?.pin
        }
        await api.savebasicdetail(data).then((res) => {
            console.log('-------------------res update', res?.data)
            if (res?.status) {
                navigation.navigate('CustomerDetails') 
            }
        }).catch((err) => {
            console.log('-------------------err update', err?.response)
        })
    };
    return (


        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.searchBox}>
                    <View style={styles.boxStyle}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={[styles.circleStyle, { backgroundColor: getRandomColor() }]}>
                                <Text style={styles.circleText}>{getInitials(details?.customerName)}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                <Text style={styles.nameText}>{details?.customerName}</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                        <Icon1 name="location-outline" color={"black"} />
                                    </View>
                                    <Text style={[styles.idText, { paddingTop: 4 }]}>{details?.village ? details?.village : details?.pin}</Text>
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
                    <View style={{ paddingHorizontal: 17, flexDirection: 'row' }}>

                        <View style={{ flex: 0.7 }}>
                            <Text style={styles.headTextTitle}>Address</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.subText, { maxWidth: 200 }]}>{details?.address ? details?.address : '-'}</Text>
                        </View>

                    </View>
                    <View style={styles.lineView} />





                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17, }}>


                        <View style={{ flex: 0.7 }}>
                            <Text style={styles.headTextTitle}>District</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.subText}>{details?.district ? details?.district : '-'}</Text>
                        </View>

                        {/* <Success height={23} width={24} /> */}
                    </View>




                    <View style={styles.lineView} />



                    <View style={{ paddingHorizontal: 17, flexDirection: 'row' }}>


                        <View style={{ flex: 0.7,marginTop:width* 0.04  }}>
                            <Text style={styles.headTextTitle}>Village</Text>
                        </View>
                        {/* <TouchableOpacity style={styles.borderVillage} onPress={()=>setStatus(true)}>
                                <Text style={[styles.searchText1,{color:!status ? '#808080':'#1A051D'}]}>{!status ? "Search village" : "Thrikkakara North"}</Text>
                                <Search name="search" size={17} style={{marginRight:15}} color={'#1A051D'} />
                            </TouchableOpacity> */}






                        <View style={{ flex: 2 }}>



                            <View style={[styles.textInput, { flexDirection: 'row' }]}>


                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        value={villagename ? villagename : details?.village}
                                        style={styles.TextInputBranch}
                                        onChangeText={(text) => searchvillagename(text)}
                                        onFocus={() => setBstatus(false)}
                                        onKeyPress={() => setBstatus(false)}

                                    />

                                </View>
                            </View>

                            {BStatus ?
                                (<View>
                                    {villagenamedata.length > 0
                                        ? <>
                                            {villagenamedata.map((item) => {
                                                console.log('pppp====>>>', item)
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        setBstatus(false)
                                                        // setBranchStatus(false)
                                                        // setSearchStatus(true)
                                                        setVillagename(item)
                                                        // setBankBranchNameId(item.id)
                                                        // setCloseBranch(true)
                                                        // setDetailsStatus(false)
                                                    }}>
                                                        <View style={styles.ViewBankMap}>

                                                            <Text style={styles.ItemNameBranch}>{item}</Text>
                                                            {/* {item.id == 1 &&
                                                        <View style={styles.Line} />} */}
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </> :
                                        <View style={styles.ViewBankMap}>
                                            <Text style={styles.BankText}>No matches found</Text>
                                        </View>}
                                </View>) : null


                            }
                        </View>












                    </View>



                    <View style={styles.lineView} />
                    <View style={{ paddingHorizontal: 17, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7 ,marginTop:width* 0.02 }}>
                            <Text style={styles.headTextTitle}>Access road type</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <TouchableOpacity style={styles.SelectBox} onPress={() => setModalReason1(true)}>
                                <Text style={[styles.textSelect, { color: !roadstatus ? '#808080' : '#1A051D' }]}>{roadstatus ? roadstatus :(details?.accessRoadType ? details?.accessRoadType :'Select') }</Text>

                                <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.lineView} />
                    <View style={{ paddingHorizontal: 17, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7,marginTop:width* 0.04  }}>
                            <Text style={styles.headTextTitle}>Post Office</Text>
                        </View>
                        <View style={{ flex: 2 }}>




                            <View style={[styles.textInput, { flexDirection: 'row' }]}>


                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        value={postofficename ? postofficename : details?.postOffice}
                                        style={styles.TextInputBranch}
                                        onChangeText={(text) => searchpostofficename(text)}
                                        onFocus={() => setPstatus(false)}
                                        onKeyPress={() => setPstatus(false)}

                                    />

                                </View>
                            </View>

                            {PStatus ?
                                (<View>
                                    {postofficenamedata.length > 0
                                        ? <>
                                            {postofficenamedata.map((item) => {
                                                console.log('pppp====>>>', item)
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        setPstatus(false)
                                                        // setBranchStatus(false)
                                                        // setSearchStatus(true)
                                                        setPostofficename(item)
                                                        // setBankBranchNameId(item.id)
                                                        // setCloseBranch(true)
                                                        // setDetailsStatus(false)
                                                    }}>
                                                        <View style={styles.ViewBankMap}>

                                                            <Text style={styles.ItemNameBranch}>{item}</Text>
                                                            {/* {item.id == 1 &&
                                                        <View style={styles.Line} />} */}
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </> :
                                        <View style={styles.ViewBankMap}>
                                            <Text style={styles.BankText}>No matches found</Text>
                                        </View>}
                                </View>) : null


                            }

                        </View>
                    </View>


                    <View style={styles.lineView} />
                    <View style={{ paddingHorizontal: 17, paddingBottom: 16, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7,marginTop:width* 0.04 }}>
                            <Text style={styles.headTextTitle}>Landmark</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={[styles.textInput, { flexDirection: 'row' }]}>


                                <View style={{ flexDirection: 'row' }}>
                                    {console.log('lan====',details?.landMark)}
                                    <TextInput
                                        value={landmarkname ? landmarkname : details?.landMark}
                                        style={styles.TextInputBranch}
                                        onChangeText={(text) => searchlandmarkname(text)}
                                       

                                    />

                                </View>
                            </View>
                        </View>
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
                    <TouchableOpacity onPress={() => checked ? onsubmit() : console.log('')}
                        style={[styles.buttonView, { backgroundColor: checked ? COLORS.colorB : 'rgba(236, 235, 237, 1)' }]}>
                        <Text style={[styles.continueText, { color: checked ? COLORS.colorBackground : '#979C9E' }]}>Confirm</Text>
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
            <RoadAccessModal
                onPress1={(value) => {
                    console.log('====>>Road', value.Title)
                    setRoadStatus(value.Title)
                    setModalReason1(false)
                    // setModalError(true)
                }}
                ModalVisible={ModalReason1}
                onPressOut={() => setModalReason1(!ModalReason)}
                setModalVisible={setModalReason1}
            />

        </View>





    )
}

export default DetailChecks;

const styles = StyleSheet.create({
    textInput: {
        width: width * 0.60,
        height: width * 0.12,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(236, 235, 237, 1)',
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
        fontSize: 15,
        paddingLeft: width * 0.025,
        alignItems: 'center'
    },
    TextCheck: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: '#3B3D43'
    },
    searchText1: {
        color: '#808080',
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        marginLeft: 15
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
        width: width * 0.60,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: width * 0.02,
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
        alignItems: 'center',

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
    },
    TextInputBranch: {
        color: "#1A051D",
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        paddingLeft: width * 0.02,
        width: width * 0.78,
        height: width * 0.08
    },
    ViewBankMap: {
        width: width * 0.6,
        height: width * 0.13,
        borderWidth: 1,
        alignItems: 'center',
        paddingLeft: width * 0.02,
        borderColor: 'rgba(236, 235, 237, 1)',
        borderRadius: 8,
        flexDirection: 'row'
    },

})