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
import React, { useCallback, useEffect, useState } from 'react'
//import Image1 from '../../../assets/image/BANK1.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Entypo'
import Image1 from '../../Collect/Images/IMG1.svg';
import Image2 from '../../Collect/Images/IMG3.svg';
import Image3 from '../../Collect/Images/c1.svg';
import Image4 from '../../Collect/Images/c2.svg';
import ActiveLoans from './activeLoans';
import { api } from '../../../Services/Api';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('screen');

const LoanTab = ({ navigation }) => {
    const [Activeloandetail,setActiveloandetail] = useState('')
    const LoancustomerID = useSelector(state => state.loancustomerID);




     // ------------------ get Customer List Api Call Start ------------------
     async function getActiveLoansdetails()  {
        console.log('loan customer id',LoancustomerID)
        const id = await  AsyncStorage.getItem("CustomerId")

        console.log('search------->>>>>123',id )


        const data = {
            customerId: id
        }

        await api.getActiveLoansdetails(data).then((res) => {
          console.log('------------------- Active loan res', res.data.body)
            setActiveloandetail(res?.data?.body)
         
         
        })
          .catch((err) => {
            console.log('-------------------Active loan err', err)
           
          })
      };



      useEffect(()=>{
        getActiveLoansdetails()
      },[])


    return (

        <>

            <View style={styles.mainContainer}>
                <View style={{ alignItems: 'center', }}>
                    <View style={styles.ViewCard}>
                        <View style={{ flexDirection: 'column', }}>
                            <View style={{ flexDirection: 'row', paddingLeft: width * 0.05, marginTop: width * 0.05 }}>
                                <View style={styles.Card1}>
                                    <Image1 width={20} height={20} />
                                </View>

                                <View style={{ flexDirection: 'column', paddingLeft: width * 0.03 }}>
                                    <Text style={styles.TextCust}>Loans Due</Text>
                                    <Text style={styles.NumText}>{Activeloandetail?.loansDue}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: width * 0.05, marginTop: width * 0.04 }}>
                                <View style={styles.Card1}>
                                    <Image2 width={20} height={20} />
                                </View>
                                <View style={{ flexDirection: 'column', paddingLeft: width * 0.03 }}>
                                    <Text style={styles.TextCust}>Amount Due</Text>
                                    <Text style={styles.AmtText}>{Activeloandetail?.amountDue}</Text>
                                </View>
                            </View>


                        </View>

                        <View style={{ flexDirection: 'column', }}>
                            <View style={{ flexDirection: 'row', paddingLeft: width * 0.07, marginTop: width * 0.05 }}>
                                <View style={[styles.Card1, { backgroundColor: 'rgba(39, 174, 96, 0.1)' }]}>
                                    <Image3 width={20} height={20} />
                                </View>
                                <View style={{ flexDirection: 'column', paddingLeft: width * 0.03 }}>
                                    <Text style={styles.TextCust}>Collected Loans</Text>
                                    <Text style={styles.NumText}>{Activeloandetail?.collectedLoans ? Activeloandetail?.collectedLoans : 0}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: width * 0.07, marginTop: width * 0.05 }}>
                                <View style={[styles.Card1, { backgroundColor: 'rgba(39, 174, 96, 0.1)' }]}>
                                    <Image4 width={20} height={20} />
                                </View>
                                <View style={{ flexDirection: 'column', paddingLeft: width * 0.03 }}>
                                    <Text style={styles.TextCust}>Collected Amount</Text>
                                    <Text style={styles.NumText}>{Activeloandetail?.collectedAmounts ? Activeloandetail?.collectedAmounts :0}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <ActiveLoans navigation={navigation} loandetails = {Activeloandetail?.loanDetailsDTOS}/>
            </View>

         
        </>
    )
}

export default LoanTab;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.colorBackground
    },
    ViewCard: {
        width: width * 0.92,
        height: width * 0.35,
        backgroundColor: COLORS.colorBackground,
        elevation: 2,
        // alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'center',
        borderRadius: 15,
        shadowColor: '#000000',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    Card1: {
        backgroundColor: 'rgba(242, 153, 74, 0.1)',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextCust: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        color: 'rgba(128, 128, 128, 1)'
    },
    NumText: {
        color: COLORS.colorDark,
        fontSize: 12,
        fontFamily: FONTS.FontMedium
    },
    AmtText: {
        color: 'rgba(234, 64, 71, 1)',
        fontSize: 11,
        fontFamily: FONTS.FontSemiB
    }

})