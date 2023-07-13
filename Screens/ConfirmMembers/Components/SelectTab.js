import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Verified from '../../../assets/Verified.svg'
import EditAddModal from './EditAddressModal';
import { FONTS, COLORS } from '../../../Constants/Constants';
import { useSelector } from 'react-redux';
const { height, width } = Dimensions.get('screen');

const SelectTab = (props) => {
    console.log("props tc details",props?.custID)
    const TC_Customer_id = useSelector(state => state.TC_Customer_id);
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [EditAddsModal, setEditsModal] = useState(false)
    const [Address, setAddress] = useState(props?.item?.address)
    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
{console.log("getTCDetails",TC_Customer_id)}
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

    { console.log("initial", props?.item) }

    return (

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

                    </View>

                    :

                    <View style={styles.searchBox}>

                        <View style={styles.boxStyle}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <View style={[styles.circleStyle, { backgroundColor: '#4B9760' }]}>
                                    <Text style={styles.circleText}>{getInitials(props?.item.customerName)}</Text>
                                </View>

                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.nameText, { paddingRight: 5 }]}>{props?.item?.customerName}</Text>

                                        {props?.item?.varificationStatus
                                            ? <Verified width={18} height={18} />
                                            : null}
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>

                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>

                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{props?.item?.pin}</Text>

                                    </View>

                                </View>

                            </View>

                            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end', }}>

                                <View style={{ flexDirection: 'row', }}>
                                    <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{props?.item?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                </View>

                            </View>

                        </View>

                        <View style={styles.lineView} />


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ paddingHorizontal: 17, marginBottom: 5 }}>
                                <Text style={styles.headTextTitle}>Address</Text>

                            </View>
                            <TouchableOpacity style={styles.EditTouch} onPress={() => setEditsModal(true)} >
                                <Text style={[styles.changeText, { paddingLeft: 0 }]}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.subText, { width: 260, paddingLeft: width * 0.04, textAlign: 'left', marginBottom: 10 }]}>{props?.item?.address}</Text>
                        <View style={styles.lineView} />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17, }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginRight: 10, paddingBottom: 15 }}>
                                <Text style={styles.headTextTitle}>Aadhaar ID</Text>
                                <Text style={styles.subText}>{props?.item?.aadharNumber}</Text>
                            </View>
                        </View>

                        <View style={styles.lineView} />

                        <View style={{ paddingHorizontal: 17, marginBottom: 15 }}>
                            <Text style={styles.headTextTitle}>Voter ID</Text>
                            <Text style={styles.subText}>{props?.item?.voterId}</Text>
                        </View>
                        {props?.item?.spouseVoterId &&
                            <>
                                <View style={styles.lineView} />

                                <View style={{ paddingHorizontal: 17, paddingBottom: 16 }}>
                                    <Text style={styles.headTextTitle}>Spouse Voter ID</Text>
                                    <Text style={styles.subText}>{props?.item?.spouseVoterId}</Text>
                                </View>
                            </>}
                    </View>
                }

            </ScrollView>
            <EditAddModal

                ModalVisible={EditAddsModal}
                onPressOut={() => { props.getTCDetails, setEditsModal(!EditAddsModal) }}
                setModalVisible={setEditsModal}
                navigation={props.navigation}
                Address={Address}
                custID={props?.custID}

                getTCDetails={props.getTCDetails}
                setAddress={setAddress}
            />
        </View>
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
    EditTouch: {
        backgroundColor: COLORS.colorLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 24,
        marginBottom: 0,
        width: '20%',
        marginRight: 10
    },
    searchBox: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        marginTop: 20,
    },
    lineView: {
        borderWidth: 0.6,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5,
        //marginTop: 13,
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