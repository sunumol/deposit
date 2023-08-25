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
import Image1 from '../../../assets/image/dig.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { api } from '../../../Services/Api';
import { useSelector } from 'react-redux';
import moment from 'moment'

const { height, width } = Dimensions.get('screen');

const History = ({ route,navigation }) => {
   
    const LoanId = useSelector(state => state.loanId);
    const [loanhistory,setLoanhistory] = useState()
    const [Data, setData] = useState([
        {
            Id: 1,
            Date: '31 Dec ‘22',
            cash: 'Cash',
            paid: 'Paid by Aiswarya Thomas',
            amount: '₹600',
            color: 'rgba(234, 64, 71, 1)'
        },
        {
            Id: 2,
            Date: '31 Nov ‘22',
            cash: 'Cash',
            paid: 'Paid by Anjana Thomas',
            amount: '₹1,000',
            color: 'rgba(234, 64, 71, 1)'
        },
        {
            Id: 3,
            Date: '31 Oct ‘22',
            cash: 'Digital',
            paid: '',
            amount: '₹1,000',
            color: 'rgba(0, 56, 116, 1)'
        },
        {
            Id: 4,
            Date: '31 Sep ‘22',
            cash: 'Cash',
            paid: 'Paid by Anjana Thomas',
            amount: '₹1,000',
            color: 'rgba(234, 64, 71, 1)'
        },
    ])

    useEffect(()=>{
        getloanPaymentHistory()
        console.log('detail tab [][][[][][][]]=====>>>',route?.params?.loanIDs)
    },[route?.params?.loanIDs])
 

    async function getloanPaymentHistory()  {
        console.log('search------->>>>>', )
        const data = {
            loanId:route?.params?.loanIDs,
        }

        await api.getloanPaymentHistory(data).then((res) => {
          console.log('------------------- get history loan res', res.data.body)
          if(res){
            setLoanhistory(res?.data?.body)
          }
            
         
         
        })
          .catch((err) => {
            console.log('-------------------get history loan err', err?.response?.data?.message)
           
           
          })
      };

    return (

        <>

            <View style={styles.mainContainer}>

                <View>
                    {console.log('---hhhhhhh--',loanhistory)}
               
                    {loanhistory?.loanPaymentHistoryDetailsDTOS?.map((item) => {
                        return (
                            <View>
                               
                             
                               <>
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:width*0.05,marginTop:width*0.05 }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.DateText}>{moment(item?.date).format('DD MMM')} '{moment(item?.date).format('YY')}</Text>
                                        </View>

                                        <Text style={[styles.AmtText, { color: item?.isDueAmount == true ?  '#003874' :'#EA4047' }]}>{item.amount}</Text>
                                        </View>
                                        <View style={styles.Line} />
                                </> 
                           
                            </View>
                        )
                    })}
                 
                </View>





            </View>
        </>
    )
}

export default History;

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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: width*0.05
    },
    Card1: {
        backgroundColor: '#F2F2F2',

        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextCust: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        color: 'rgba(128, 128, 128, 1)'
    },
    NumText: {
        color: '#3B3D43',
        fontSize: 11,
        fontFamily: FONTS.FontMedium,

    },
    AmtText: {

        fontSize: 14,
        fontFamily: FONTS.FontBold
    },
    DateText: {
        color: '#000000',
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        marginRight: 5,
        fontWeight:'400'
    },
    RsCard: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#4F4F4F',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:10
    },
    Line:{
       borderBottomWidth:0.6,
       borderColor:'#F2F2F2'

    }

})