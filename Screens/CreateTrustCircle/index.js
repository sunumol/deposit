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
import Statusbar from '../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../Components/RepayHeader';
import { FONTS, COLORS } from '../../Constants/Constants';
import Date from '../CGTCustomer/Images/Date.svg';
import Success from '../CGTCustomer/Images/Success2.svg';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Plus from '../../assets/image/Plus.svg';
const { height, width } = Dimensions.get('screen');
import TrustModal from './Components/TrustModal';
const CreateTrustCircle = ({ navigation }) => {
    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()

    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const handleGoBack = useCallback(() => {
        navigation.navigate('CGT')
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header navigation={navigation} name="CGT" />

            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.boxView}>
                        <View style={styles.contentView}>
                            <Text style={styles.timeText}>12:30 PM</Text>
                            <Text style={styles.dateText}>Wed, 12 Oct</Text>
                        </View>
                        <TouchableOpacity style={styles.editView}>
                            <Date />
                            <Text style={styles.changeText}>Reschedule CGT</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.viewCard, { flex: 1, flexDirection: 'row', }]}>

                        <View style={[styles.circleStyle, { backgroundColor: '#6979F8', marginLeft: width * 0.05 }]}>
                            <Text style={styles.circleText}>AA</Text>
                        </View>


                        <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>

                            <Text style={styles.nameText}>Athira Anil</Text>


                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                    <Icon1 name="location-outline" color={"black"} />
                                </View>
                                <Text style={[styles.idText, { paddingTop: 4 }]}>682555</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', top: -8, alignItems: 'flex-end', marginLeft: width * 0.05 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                <Text style={[styles.numText, { paddingLeft: 6 }]}>961XXXXX77</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.Trust}>Trust Circle Members (1)</Text>
                    </View>

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
                        <View style={{ flexDirection: 'column', top: -8, alignItems: 'flex-end', marginLeft: width * 0.04 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                <Text style={[styles.numText, { paddingLeft: 6 }]}>789XXXXX33</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.viewCard} onPress={()=>navigation.navigate('ConfirmMembers')}>

                        <View style={{ marginLeft: width * 0.05 }}>
                            <Plus />
                        </View>
                        <Text style={styles.AddText}>Add new member</Text>
                    </TouchableOpacity>

                </ScrollView>


                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.Button1,
                    { backgroundColor: !ButtonStatus ? COLORS.colorB : '#ECEBED' }]} onPress={()=>setModalVisible(true)}>

                        <Text style={[styles.text1, { color: !ButtonStatus ? COLORS.colorBackground : '#979C9E', paddingLeft: width * 0.02 }]}>Create Trust Circle</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TrustModal
                ModalVisible={ModalVisible}
                onPressOut={() =>{ setModalVisible(!ModalVisible)
                navigation.navigate('Activities')}}
                setModalVisible={setModalVisible}
                onPress1={()=>{
                    setModalVisible(false)
                    navigation.navigate('Activities')
                }
                }
            />
        </SafeAreaProvider>
    )
}

export default CreateTrustCircle;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
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
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
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
        justifyContent: 'space-between',
        marginBottom:5
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
        marginTop: 23
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
        width: width * 0.88,
        borderRadius: 6,
        height: width * 0.18,
        marginBottom: width * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginLeft:2,
        marginTop:10
     },
    NumTexts: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    Trust: {
        fontSize: 14,
        color: '#1E293B',
        fontFamily: FONTS.FontSemiB,
        paddingTop: width * 0.05,

    },
    AddText: {
        fontSize: 12,
        color: '#1A051D',
        fontFamily: FONTS.FontSemiB,
        paddingLeft: 12
    }

})