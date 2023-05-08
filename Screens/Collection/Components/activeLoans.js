import {
    StyleSheet,
    Text,
    View,
    Switch,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
//import Image1 from '../../../assets/image/BANK1.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Ionicons'
import CollectModal from './CollectModal';
import Image1 from '../../../assets/image/b2.svg';
import Image2 from '../../../assets/image/b1.svg';
import ConfirmModal from './ConfirmModal';
import { api } from '../../../Services/Api';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';
import TCMModal from './TCMModal';


const { height, width } = Dimensions.get('screen');

const ActiveLoans = ({ navigation, loandetails }) => {
    console.log('[=][=][=][=][=]', loandetails)

    const LoancustomerID = useSelector(state => state.loancustomerID);

    const dispatch = useDispatch()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => { setIsEnabled(previousState => !previousState), setTCM('') };
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalVisible4, setModalVisible4] = useState(false)
    const [TCMstatus, setTCMstatus] = useState(false)
    const [TCMlist, setTCMlist] = useState(false)


    const [collectAmount, setCollectAmount] = useState([])
    const [collectAmount1, setCollectAmount1] = useState([])


    const [Activeloandetail, setActiveloandetail] = useState('')

    const [TCM, setTCM] = useState('')



    // const RenderItem = ({ content, index, collectAmount }) => {

    //     const onCollect = (text) => {
    //         setInput(text)
    //         collectAmount(text)
    //     }

    //     const [input, setInput] = useState('');
    //     return (
    //         <TouchableOpacity style={styles.loanContainer} onPress={() => {
    //             navigation.navigate('LoanDetailsCollect', { loan: content }),

    //                 dispatch({
    //                     type: 'SET_SELECTED_LOANID',
    //                     payload: content?.loanId,
    //                 });
    //         }}>

    //             <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
    //                 <View style={{ flex: 1 }}>
    //                     <View style={{ marginTop: 15 }}>
    //                         <Text style={[styles.headText, { paddingBottom: 5 }]}>Lender</Text>
    //                         <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 0, flexWrap: 'wrap' }}>
    //                             <Image style={{ width: 15, height: 15 }}
    //                                 source={{ uri: content?.lenderLogo }}
    //                             />
    //                             <Text style={[styles.valueText, { paddingLeft: 7, paddingTop: 0 }]}>{content?.lenderName}</Text>
    //                         </View>
    //                     </View>
    //                     <View style={{ marginVertical: 15 }}>
    //                         <Text style={styles.headText}>Loan Outstanding</Text>
    //                         <Text style={styles.valueText}>{content?.loanOutstanding}</Text>
    //                     </View>
    //                 </View>
    //                 <View style={{ flexDirection: 'column', marginTop: 17 }}>
    //                     <View style={{ flex: 1 }}>
    //                         <View style={styles.verticleLine} />
    //                     </View>
    //                     <View style={{ flex: 1 }}>
    //                         <View style={styles.verticleLine} />
    //                     </View>
    //                 </View>

    //                 <View style={{ flex: 1 }}>
    //                     <View style={{ marginTop: 18 }}>


    //                         <Text style={styles.headText}>Payment Due</Text>
    //                         <Text style={[styles.valueText, { color: content?.dueDatePassed === true ? 'rgba(234, 64, 71, 1)' : '#000' }]}>₹{content?.paymentDue}</Text>

    //                     </View>

    //                     <View style={{ marginVertical: 15, }}>
    //                         <Text style={styles.headText}>Collected Amount</Text>

    //                         <TextInput
    //                             style={styles.CardAmt}
    //                             onChangeText={(text) => {
    //                                 onCollect(text)

    //                             }
    //                             }
    //                             value={input}
    //                             maxLength={5}
    //                             keyboardType="numeric"
    //                         />

    //                     </View>
    //                 </View>
    //             </View>

    //         </TouchableOpacity>
    //     )
    // };




    const onCollect = (text) => {
        setCollectAmount([])
        console.log('collection value', text)
        var temp = collectAmount;
        temp = temp.concat(text)
        setCollectAmount(([...temp]))
    }




    const getTrustcircledetails = async () => {
        console.log('search------->>>>>',)
        const data = {
            customerId: LoancustomerID,

        };
        await api.getTrustcircledetails(data).then((res) => {
            console.log('------------------- getTrustcircledetails res', res)

            if (res?.data?.body) {
                setModalVisible4(!ModalVisible4)
                setTCMlist(res?.data?.body)
            }

        })
            .catch((err) => {
                console.log('------------------- getTrustcircledetails error', err?.response)

            })
    };



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


                    {isEnabled &&
                        <View style={{ paddingTop: width * 0.01, paddingBottom: width * 0.02, }}>


                            <View style={{ marginHorizontal: 5 }}>
                                <TouchableOpacity style={styles.SelectBox} onPress={() => {



                                    getTrustcircledetails()
                                }} >
                                    <Text style={[styles.textSelect, { color: TCMstatus ? '#808080' : '#1A051D' }]}>{TCM ? TCM : "Select TC Member"}</Text>
                                    {TCMstatus ?
                                        <Icon1 name="chevron-up" size={18} color={'#808080'} style={{ marginRight: 10 }} /> :
                                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />}
                                </TouchableOpacity>
                                {TCMstatus &&
                                    <View>
                                        {TCMlist?.length > 0
                                            ? <View style={{ alignItems: 'center' }}>
                                                <View style={styles.ViewMapBranch1}>
                                                    {TCMlist?.map((item) => {
                                                        return (

                                                            <TouchableOpacity onPress={() => {
                                                                setTCM(item?.name)
                                                                setTCMstatus(false)

                                                            }}>
                                                                <View style={{ paddingTop: 8 }}>

                                                                    <Text style={styles.ItemNameBranch}>{item?.name}</Text>

                                                                    <View style={styles.Line} />
                                                                </View>
                                                            </TouchableOpacity>

                                                        )
                                                    })}
                                                </View>
                                            </View>
                                            : null}
                                    </View>}
                                {/* {TCMstatus &&
                            <View>
                            {TCMlist?.length == 0 && TCMstatus  ? <View style={[styles.ViewMapBranch, { height: width * 0.15, }]}>
                                <View style={{ paddingTop: width * 0.05 }}>

                                    <Text style={styles.ItemNameBranch}>No results found</Text>

                                </View>
                            </View> : null}
                            </View>} */}
                            </View>
                        </View>}
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.actLoans}>Active Loan Accounts ({loandetails?.length})</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>


                        {/* <FlatList

                            data={loandetails || []}
                            keyExtractor={({ item, index }) => index}
                            renderItem={({ item, index }) =>

                                <RenderItem content={item} index={index} collectAmount={setCollectAmount} />

                            }
                        /> */}
                        {loandetails?.map((item) => {

                            return (
                                <TouchableOpacity style={styles.loanContainer} onPress={() => {
                                    navigation.navigate('LoanDetailsCollect', { loan: item }),
                                        console.log('{8888888*******}', item)
                                    dispatch({
                                        type: 'SET_SELECTED_LOANID',
                                        payload: item?.loanId,
                                    });
                                }}>

                                    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ marginTop: 18 }}>
                                                <Text style={[styles.headText, { paddingBottom: 5 }]}>Lender</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 0 }}>
                                                    <Image style={{ width: 15, height: 15 }}
                                                        source={{ uri: item?.lenderLogo }}
                                                    />
                                                    <Text style={[styles.valueText, { paddingLeft: 7, paddingTop: 0 }]}>{item?.lenderName}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginVertical: 15 }}>
                                                <Text style={styles.headText}>Loan Outstanding</Text>
                                                <Text style={styles.valueText}>{item?.loanOutstanding}</Text>
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
                                                <Text style={[styles.valueText, { color: item?.dueDatePassed === true ? 'rgba(234, 64, 71, 1)' : '#000' }]}>₹{item?.paymentDue}</Text>

                                            </View>

                                            <View style={{ marginVertical: 15, }}>
                                                <Text style={styles.headText}>Collected Amount</Text>

                                                <TextInput
                                                    style={styles.CardAmt}
                                                    onChangeText={(text) => onCollect(text)}
                                                    value={collectAmount}
                                                    keyboardType="numeric"

                                                />

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

            {console.log('{}{}{}{}{}{}{}{}', collectAmount)}

            <CollectModal
                ModalVisible={ModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible}
                ModalVisible2={() => {
                    setModalVisible1(true)
                    setModalVisible(false)
                }}
                ModalVisible3={() => {
                    setModalVisible1(false)
                    navigation.navigate('Collect')
                }}

            />


            <TCMModal
                press1={(value) => setTCM(value)}
                TCMlist={TCMlist}
                ModalVisible={ModalVisible4}
                onPressOut={() => setModalVisible4(false)}
                setModalVisible={setModalVisible4}



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

        width: 100,
        // height: 25,
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
    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.92,
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
    ViewMapBranch1: {
        width: width * 0.9,
        // height: height * 0.16,
        borderWidth: 1,
        paddingLeft: width * 0.02,
        borderColor: 'rgba(236, 235, 237, 1)',
        borderRadius: 8,
        marginTop: width * 0.025,
        backgroundColor: '#FCFCFC',
        alignSelf: 'flex-start'
    },
    ItemNameBranch: {
        paddingLeft: width * 0.02,
        color: "#1A051D",
        fontSize: 12,
        fontFamily: FONTS.FontRegular
    },
    Line: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(242, 242, 242, 1)',
        width: width * 0.85,
        paddingTop: width * 0.035
    },

})