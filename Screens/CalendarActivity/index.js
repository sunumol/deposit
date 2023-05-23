import React, { useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    SafeAreaView,
    StatusBar,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

// ------------------- Components Imports -------------------------
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { api } from '../../Services/Api'
import ModalError from './Components/ModalError'
import SuccessModal from './Components/ModalSuccess'

const { height, width } = Dimensions.get('screen');

const Activities = ({ navigation, route }) => {

    const isDarkMode = true

    const [selectedData, setSelectedData] = useState([])
    const [activitySelected, setActivitySelected] = useState()
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)

    const [getTimeData, setTimeData] = useState(route?.params?.data)
    const [errorMessage, setErrorMessage] = useState('')

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * 8)];
        }
        return color;
    }
      String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
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

    // ------------------ get Slot Api Call Start ------------------
    const rescheduleAPi = async () => {
        if (activitySelected) {
            if (activitySelected === 'Conduct CGT') {
                navigation.navigate('SelectCalendar', { title: 'New CGT', selectedData: selectedData })
            } else {
                navigation.navigate('SelectCalendar', { title: 'Schedule Meeting', selectedData: selectedData })
            }
        } else {
            const data = {
                "activityId": selectedData?.length <= 1 ? selectedData[0] : '',
                "activityIdList": selectedData?.length > 1 ? selectedData : [],
                "dateTime": '',
            };
            await api.setReshedule(data).then((res) => {
                console.log('----------------->>>>', res)
                if (res?.status) {
                    setModalVisible2(true)
                }
            }).catch((err) => {
                console.log('-------------------err slot', err?.response)
            })
        }
    };

    const handleGoBack = () => {
        if(selectedData?.length > 0){
            setSelectedData([])
        }else{
            navigation.goBack()
        }
        return true; // Returning true from onBackPress denotes that we have handled the event
    }

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
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header name="Activities" navigation={navigation} onPress={() => navigation.goBack()} />

            <View style={styles.ViewContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.headBox}>
                                <Text style={styles.headText}>Date</Text>
                                <Text style={styles.headText2}>{moment(route?.params?.date).utc().format("DD ddd ‘YY")}</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            {route?.params?.time
                                ? <View style={{ backgroundColor: COLORS.colorBackground, borderColor: '#E5E7FA', borderWidth: 1, borderRadius: 8, marginLeft: 7, paddingLeft: 17, paddingVertical: 11 }}>
                                    <Text style={styles.headText}>Time Slot</Text>
                                    <Text style={styles.headText2}>{route?.params?.time}</Text>
                                </View>
                                : null}
                        </View>
                    </View>

                    {route?.params?.time
                        ? <Text style={styles.headTextActivity}>Activities</Text>
                        :
                        <>
                            <Text style={styles.headTextActivity}>Unscheduled Activities</Text>
                            <Text style={styles.headTextActivity2}>Can complete these activities anytime of the day</Text>
                        </>
                    }

                    <View style={{ paddingTop: width * 0.03 }}>

                        {getTimeData?.map((item, index) => {
                            if (item.activityType == 'CALL') {
                                return (
                                    <View Key={index}>
                                        {index === 0 &&
                                            <Text style={[styles.textActive, { paddingBottom: width * 0.03 }]}>CALL</Text>}
                                        <TouchableOpacity
                                            style={[styles.viewCard, selectedData?.includes(item.activityId)
                                                ? { borderColor: COLORS.colorB, borderWidth: 1 } : {}]}
                                                onLongPress={() => {
                                                    const selecteItem = [...selectedData]
                                                    console.log(selecteItem?.length, '-----------------length of selected ||Item')
                                                    if (selectedData?.includes(item.activityId)) {
                                                        var index = selecteItem.indexOf(item.activityId);
                                                        if (index !== -1) {
                                                            selecteItem.splice(index, 1)
                                                            setSelectedData(selecteItem)
                                                            setActivitySelected()
                                                        }
                                                    } else {
                                                        if (item.purpose === 'Conduct DLE' || item.purpose === 'Conduct CGT') {
                                                            if (selecteItem?.length < 1) {
                                                                selecteItem.push(item.activityId)
                                                                setSelectedData(selecteItem)
                                                                setActivitySelected(item.purpose)
                                                            } else {
                                                                setModalVisible1(true)
                                                                setErrorMessage('Schedule this activity seperately')
                                                            }
                                                        } else {
                                                            selecteItem.push(item.activityId)
                                                            setSelectedData(selecteItem)
                                                        }
    
                                                    }
                                                }}
                                                onPress={() => {
                                                    const selecteItem = [...selectedData]
                                                    console.log(selecteItem?.length, '-----------------length of selected ||Item')
                                                    if (selectedData?.includes(item.activityId)) {
                                                        var index = selecteItem.indexOf(item.activityId);
                                                        if (index !== -1) {
                                                            selecteItem.splice(index, 1)
                                                            setSelectedData(selecteItem)
                                                            setActivitySelected()
                                                        }
                                                    } else {
                                                        if (item.purpose === 'Conduct DLE' || item.purpose === 'Conduct CGT') {
                                                            if (selecteItem?.length < 1) {
                                                                selecteItem.push(item.activityId)
                                                                setSelectedData(selecteItem)
                                                                setActivitySelected(item.purpose)
                                                            } else {
                                                                setModalVisible1(true)
                                                                setErrorMessage('Schedule this activity seperately')
                                                            }
                                                        } else {
                                                            selecteItem.push(item.activityId)
                                                            setSelectedData(selecteItem)
                                                        }
    
                                                    }
                                                }}
                                            >

                                            {selectedData?.includes(item.activityId)
                                                ?
                                                <View style={[styles.circleStyle, { backgroundColor: COLORS.colorB, marginLeft: width * 0.03 }]}>
                                                    <Icon2 name="check" color={COLORS.colorBackground} size={20} />
                                                </View>
                                                :
                                                <View style={[styles.circleStyle, { backgroundColor: getRandomColor(), marginLeft: width * 0.03 }]}>
                                                    <Text style={styles.circleText}>{getInitials(item.customerName ? item.customerName : item.mobileNumber)}</Text>
                                                </View>
                                            }

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <View style={{ flexDirection: 'column', paddingLeft: 12 }}>

                                                    <Text style={styles.nameText}>{item.customerName ? item.customerName : item.mobileNumber}</Text>

                                                    <View style={{ flexDirection: 'row', }}>
                                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                            <Icon1 name="location-outline" color={"black"} />
                                                        </View>
                                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{item.pin}</Text>
                                                    </View>

                                                </View>

                                                <View style={{ flexDirection: 'column', top: 0, alignItems: 'flex-end', flex: 1, paddingRight: width * 0.04 }}>
                                                    <Text style={[styles.numText, {}]}>{item.mobileNumber?.replace(/^.{0}/g, ''," ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                                    {item.purpose === 'Explain Trust Circle' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkPurple, backgroundColor: COLORS.LightPurple }]}>Welcome Call</Text>
                                                    }
                                                    {item.purpose === 'Conduct DLE' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkPurple, backgroundColor: COLORS.LightPurple }]}>{item.purpose} </Text>
                                                    }
                                                    {item.purpose === 'Conduct CGT' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkBlue, backgroundColor: COLORS.LightBlue }]}>{item.purpose} </Text>
                                                    }
                                                    {item.purpose === 'Collection followup' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkGreen, backgroundColor: COLORS.LightGreen }]}>{item.purpose} </Text>
                                                    }
                                                    {item.purpose === 'Leads Follow Up' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkYellow, backgroundColor: COLORS.LightYellow }]}>{item.purpose} </Text>
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        })}

                        {getTimeData?.map((item, index) => {
                            if (item.activityType == 'MEET') {
                                return (
                                    <View Key={index}>
                                        {index === 0 &&
                                            <Text style={[styles.textActive, { paddingBottom: width * 0.03 }]}>MEET</Text>}
                                        <TouchableOpacity
                                            style={[styles.viewCard, selectedData?.includes(item.activityId)
                                                ? { borderColor: COLORS.colorB, borderWidth: 1 } : {}]}
                                                
                                                onLongPress={() => {
                                                    const selecteItem = [...selectedData]
                                                    console.log(selecteItem?.length, '-----------------length of selected ||Item')
                                                    if (selectedData?.includes(item.activityId)) {
                                                        var index = selecteItem.indexOf(item.activityId);
                                                        if (index !== -1) {
                                                            selecteItem.splice(index, 1)
                                                            setSelectedData(selecteItem)
                                                            setActivitySelected()
                                                        }
                                                    } else {
                                                        if (item.purpose === 'Conduct DLE' || item.purpose === 'Conduct CGT') {
                                                            if (selecteItem?.length < 1) {
                                                                selecteItem.push(item.activityId)
                                                                setSelectedData(selecteItem)
                                                                setActivitySelected(item.purpose)
                                                            } else {
                                                                setModalVisible1(true)
                                                                setErrorMessage('Schedule this activity seperately')
                                                            }
                                                        } else {
                                                            selecteItem.push(item.activityId)
                                                            setSelectedData(selecteItem)
                                                        }
                                                    }
                                                }}
                                            onPress={() => {
                                                const selecteItem = [...selectedData]
                                                console.log(selecteItem?.length, '-----------------length of selected ||Item')
                                                if (selectedData?.includes(item.activityId)) {
                                                    var index = selecteItem.indexOf(item.activityId);
                                                    if (index !== -1) {
                                                        selecteItem.splice(index, 1)
                                                        setSelectedData(selecteItem)
                                                        setActivitySelected()
                                                    }
                                                } else {
                                                    if (item.purpose === 'Conduct DLE' || item.purpose === 'Conduct CGT') {
                                                        if (selecteItem?.length < 1) {
                                                            selecteItem.push(item.activityId)
                                                            setSelectedData(selecteItem)
                                                            setActivitySelected(item.purpose)
                                                        } else {
                                                            setModalVisible1(true)
                                                            setErrorMessage('Schedule this activity seperately')
                                                        }
                                                    } else {
                                                        selecteItem.push(item.activityId)
                                                        setSelectedData(selecteItem)
                                                    }
                                                }
                                            }}>

                                            {selectedData?.includes(item.activityId)
                                                ?
                                                <View style={[styles.circleStyle, { backgroundColor: COLORS.colorB, marginLeft: width * 0.03 }]}>
                                                    <Icon2 name="check" color={COLORS.colorBackground} size={20} />
                                                </View>
                                                :
                                                <View style={[styles.circleStyle, { backgroundColor: getRandomColor(), marginLeft: width * 0.03 }]}>
                                                    <Text style={styles.circleText}>{getInitials(item.customerName ? item.customerName : item.mobileNumber)}</Text>
                                                </View>
                                            }

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <View style={{ flexDirection: 'column', paddingLeft: 12 }}>

                                                    <Text style={styles.nameText}>{item.customerName ? item.customerName :item?.mobileNumber?.replace(/^.{0}/g, ''," ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>

                                                    <View style={{ flexDirection: 'row', }}>
                                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                            <Icon1 name="location-outline" color={"black"} />
                                                        </View>
                                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{item.pin}</Text>
                                                    </View>

                                                </View>

                                                <View style={{ flexDirection: 'column', top: 0, alignItems: 'flex-end', flex: 1, paddingRight: width * 0.04 }}>
                                                    <Text style={[styles.numText, {}]}>{item?.mobileNumber?.replace(/^.{0}/g, ''," ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                                    {item.purpose === 'Explain Trust Circle' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkPurple, backgroundColor: COLORS.LightPurple }]}>Welcome Call</Text>
                                                    }
                                                    {item.purpose === 'Conduct DLE' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkPurple, backgroundColor: COLORS.LightPurple }]}>{item.purpose} </Text>
                                                    }
                                                    {item.purpose === 'Conduct CGT' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkBlue, backgroundColor: COLORS.LightBlue }]}>{item.purpose} </Text>
                                                    }
                                                    {item.purpose === 'Collection followup' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkGreen, backgroundColor: COLORS.LightGreen }]}>{item.purpose} </Text>
                                                    }
                                                    {item.purpose === 'Leads Follow Up' &&
                                                        <Text style={[styles.explainText, { color: COLORS.DarkYellow, backgroundColor: COLORS.LightYellow }]}>{item.purpose} </Text>
                                                    }

                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        })}
                    </View>

                </ScrollView>

                {selectedData?.length > 0 ?
                    <View style={{ flex: 0.2, justifyContent: 'flex-end' }} >
                        <TouchableOpacity style={styles.buttonView} onPress={rescheduleAPi}>
                            <Text style={styles.buttonText}>Reschedule</Text>
                        </TouchableOpacity>
                    </View>
                    : null}

            </View>
            <ModalError
                ModalVisible={ModalVisible1}
                onPress1={() => {
                    setModalVisible1(false)
                }}
                onPressOut={() => {
                    setModalVisible1(!ModalVisible1)
                }}
                setModalVisible={setModalVisible1}
                errorMessage={errorMessage}
            />
            <SuccessModal
                ModalVisible={ModalVisible2}
                setModalVisible2={setModalVisible2}
                navigation={navigation}
            />
        </SafeAreaProvider>
    )
}

export default Activities;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        padding: 20
    },
    textActive: {
        fontSize: 12,
        color: COLORS.colorDSText,
        fontFamily: FONTS.FontSemiB,
        paddingBottom: width * 0.05
    },
    viewCard: {
        backgroundColor: COLORS.colorBackground,
        borderRadius: 8,
        marginBottom: width * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginLeft: 5,
        marginRight: 5,
        paddingVertical: 15
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
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
        width: width * 0.3
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
    explainText: {
        fontSize: 11,
        fontFamily: FONTS.FontSemiB,
        alignSelf: 'flex-end',
        borderRadius: 3,
        paddingHorizontal: 3,
        marginTop: 3
    },
    headBox: {
        backgroundColor: COLORS.colorBackground,
        borderColor: '#E5E7FA',
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 7,
        paddingLeft: 17,
        paddingVertical: 11
    },
    headText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: COLORS.Black
    },
    headText2: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorB,
        paddingTop: 2
    },
    headTextActivity: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: '#1E293B',
        paddingTop: 25
    },
    headTextActivity2: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDSText,
        paddingTop: 3
    },
    buttonView: {
        height: 48,
        backgroundColor: COLORS.colorB,
        borderRadius: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
    }
})