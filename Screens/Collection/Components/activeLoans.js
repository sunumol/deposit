import {
    StyleSheet,
    Text,
    View,
    Switch,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
//import Image1 from '../../../assets/image/BANK1.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Entypo'
import CollectModal from './CollectModal';
import Image1 from '../../../assets/image/b2.svg';
import Image2 from '../../../assets/image/b1.svg';
import ConfirmModal from './ConfirmModal';

const { height, width } = Dimensions.get('screen');

const ActiveLoans = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const Data = [
        {
            id: 1,
            bankName: 'IDFC Bank LTD',
            LoanId: '34543523',
            LoanOut: '₹ 1,25,000.00',
            Date1: '15 Sep ‘22'
        },
        {
            id: 2,
            bankName: 'Indian Overseas...',
            LoanId: '34545566',
            LoanOut: '₹ 75,000.00',
            Date1: '15 Aug ‘22'
        },

    ]

    return (

        <>
            <ScrollView>
                <View style={{}}>

                    <View style={{ flexDirection: 'row', marginBottom: width * 0.04, marginTop: width * 0.01, justifyContent: 'space-between' }}>
                        <Text style={styles.actLoans}>Paid by</Text>

                        <View style={{ flexDirection: 'row', marginRight: 8 }}>
                            <Text style={[styles.actLoans, { color: COLORS.colorB, left: -10 }]}>Self</Text>

                            <Switch
                                trackColor={{ true: '#767577', false: 'rgba(165, 175, 251, 1)' }}
                                thumbColor={!isEnabled ? COLORS.colorB : '#f4f3f4'}
                                //ios_backgroundColor="#3e3e3e"
                                // style={{ transform: [{ scaleX: 1 }, { scaleY: -1.8 }] }}
                                style={{ transform: [{ scaleX: .83 }, { scaleY: .78 }], top: -3 }}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            <Text style={styles.actLoans}>TC Member</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.actLoans}>Active Loan Accounts (2)</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        {Data.map((item) => {
                            return (
                                <TouchableOpacity style={styles.loanContainer} onPress={() => props.navigation.navigate('LoanHistoryDetails')}>

                                    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ marginTop: 18 }}>
                                                <Text style={[styles.headText, { paddingBottom: 5 }]}>Lender</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 0 }}>
                                                    {item.id === 1 ?
                                                        <Image1 /> :
                                                        <Image2 />}
                                                    <Text style={[styles.valueText, { paddingLeft: 7, paddingTop: 0 }]}>{item.bankName}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginVertical: 15 }}>
                                                <Text style={styles.headText}>Loan Outstanding</Text>
                                                <Text style={styles.valueText}>{item.LoanOut}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', marginTop: 17 }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={styles.verticleLine} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <View style={styles.verticleLine} />
                                            </View>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <View style={{ marginTop: 18 }}>


                                                <Text style={styles.headText}>Payment Due</Text>
                                                <Text style={[styles.valueText, { color: 'rgba(234, 64, 71, 1)' }]}>₹7,793</Text>

                                            </View>

                                            <View style={{ marginVertical: 15, }}>
                                                <Text style={styles.headText}>Collected Amount</Text>
                                                <View style={styles.CardAmt}>
                                                    <Text style={[styles.valueText, { paddingLeft: 4, color: 'rgba(130, 130, 130, 1)' }]}>₹7,793</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </View>

                </View>
            </ScrollView>
            <View style={styles.viewsB}>
                <TouchableOpacity style={[styles.buttonView]} onPress={() => setModalVisible(true)}>
                    <Text style={[styles.continueText]}>Submit</Text>
                </TouchableOpacity>
            </View>

            <CollectModal
                ModalVisible={ModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible}
                ModalVisible2={()=>{setModalVisible1(true)
                setModalVisible(false)}}
                ModalVisible3={()=>{setModalVisible1(false)
                navigation.navigate('Collect')}}
               
            />

            <ConfirmModal
                ModalVisible={ModalVisible1}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
                setModalVisible={setModalVisible1}
              
            />
        </>
    )
}

export default ActiveLoans;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        backgroundColor: COLORS.colorBackground
    },
    CardAmt: {
        backgroundColor: '#FCFCFC',
        width: width * 0.17,
        marginTop: 4,
        //alignItems:'center',
        height: width * 0.075,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(236, 235, 237, 1)'

    },
    actLoans: {
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(128, 128, 128, 1)',
        fontSize: 14,
        paddingLeft: width * 0.02
    },
    loanContainer: {
        backgroundColor: COLORS.colorBackground,
        marginTop: 5,
        borderRadius: 20,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderWidth: 1,
        width: width * 0.92,
        borderColor: '#ECEBED',
        marginBottom: 10
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    verticleLine: {
        borderRightWidth: 1,
        borderColor: '#C4C4C4',
        marginRight: 20,
        borderStyle: 'dashed',
        height: '70%'
    },
    headText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDSText,
        fontWeight: '400',
    },
    valueText: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        fontWeight: '600',
        paddingTop: 4
    },
    buttonView: {
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 10,
        width: width * 0.90,
    },
    viewsB: {
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }

})