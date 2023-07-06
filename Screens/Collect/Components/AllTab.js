import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDetails from './components/CustomDetails';
import Image1 from '../Images/IMG2.svg';
import Image2 from '../Images/IMG3.svg';
import Image3 from '../Images/IMG4.svg';
import { Import } from 'react-native-unicons';
import SortModal from './components/SortModal';
import { api } from '../../../Services/Api';

const ItemTabs = ({ navigation }) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [dropStatus, setDropStatus] = useState(false)
    const [Relation,setRelation] = useState()
    const [Purposes,setPurposes] = useState()
    const [ModalVisible,setModalVisible] =useState(false)
    const [pendingdata,setPendingdata] = useState('')
    const [listData, setListData] = useState({
        
            customersDue: 2,
            loansDue: 2,
            amountsDue: 1000.0,
            pendingCustomerCollectionResponses: [
              {
                name: "John",
                village: "abcd",
                mobileNumber: "9654312299",
                dueAmount: 1000.0,
                postOffice: "sdadff",
                dpd: 4
              },
              {
                name: "raju",
                village: "ddfdsfsf",
                mobileNumber: "7766554433",
                dueAmount: 3333.0,
                postOffice: "sdadff",
                dpd: 3
              }
            ]
          
        })
    const [meetData, setMeetData] = useState([
        {
            id: '1',
            short: 'KA',
            name: 'Kripa Anil',
            text: '682025',
            phoneNumber: '677XXXXX00',
            color: '#94BCC8',
            status: 'Conduct',
        },

    ])

    useEffect(() => {

        console.log("purpose print....", Purposes)
 
        setPurposes(Purposes)
        setRelation(Relation)
        getPendingCollection()

        //setStatus(true)
    }, [Purposes, Relation])

useEffect(()=>{
getPendingCollection()
},[])

  // ------------------ get Slot Api Call Start ------------------
  const getPendingCollection = async () => {
    console.log('api called')
    const id = await  AsyncStorage.getItem("CustomerId")
    const data = {
        "agentId": id,
        "sortOrder": Purposes ? Purposes : 'DPD_LOWEST_TO_HIGHEST'
    };
    await api.getCollection(data).then((res) => {

        console.log('------------------- Pending Collection res', res)
      setPendingdata(res?.data?.body)
    })
        .catch((err) => {
            console.log('-------------------Pending collection err', err?.response)
        })
};



    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
           // setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.colorBackground, alignItems: 'center', justifyContent: 'center', }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.ViewCard}>
                    <View style={{ flexDirection: 'column', }}>
                        <View style={{ flexDirection: 'row',paddingLeft:width*0.05,marginTop:width*0.05 }}>
                            <View style={styles.Card1}>
                                <Image1 width={20} height={20}/>
                            </View>

                            <View style={{ flexDirection: 'column',paddingLeft:width*0.03 }}>
                                <Text style={styles.TextCust}>Customer's Due</Text>
                                <Text style={styles.NumText}>{pendingdata?.customersDue ? pendingdata?.customersDue : 0}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' ,paddingLeft:width*0.05,marginTop:width*0.04 }}>
                            <View style={styles.Card1}>
                                <Image2  width={20} height={20} />
                            </View>
                            <View style={{ flexDirection: 'column',paddingLeft:width*0.03  }}>
                                <Text style={styles.TextCust}>Amount Due</Text>
                                <Text style={styles.AmtText}>₹{pendingdata?.amountsDue ? pendingdata?.amountsDue : 0}</Text>
                            </View>
                        </View>
                        </View>

                        <View style={{ flexDirection: 'row' ,paddingLeft:width*0.09,marginTop:width*0.05  }}>
                        <View style={styles.Card1}>
                            <Image3  width={20} height={20}/>
                        </View>
                        <View style={{ flexDirection: 'column' ,paddingLeft:width*0.03 }}>
                            <Text style={styles.TextCust}>Loans Due</Text>
                            <Text style={styles.NumText}>{pendingdata?.loansDue ? pendingdata?.loansDue : 0}</Text>
                        </View>
                    </View>
                    </View>

                    <View style={{flex:1,marginRight:20,alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>setModalVisible(true)} style={{padding:5,marginTop:10,backgroundColor:'rgba(229, 231, 250, 1)',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'rgba(0, 56, 116, 1)',marginHorizontal:10,fontSize:12,fontFamily:FONTS.FontBold}}>Sort</Text>
                        </TouchableOpacity>

                    </View>
            
            <CustomDetails navigation={navigation} details={pendingdata?.pendingCustomerCollectionResponses} />


            <SortModal
                visible={ModalVisible}
                setRelation={setRelation}
                setPurposes={setPurposes}
                setModalVisible={setModalVisible}
          
                onPressOut={() => setModalVisible(!ModalVisible)}
            // navigation={navigation}

            />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ViewCard: {
        width: width * 0.90,
        height: width * 0.35,
        backgroundColor: COLORS.colorBackground,
        elevation: 2,
        // alignItems: 'center',
        flexDirection: 'row',
       // justifyContent: 'center',
        borderRadius: 15,
        shadowColor: '#000000',
        marginTop: 20,
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
export default ItemTabs;