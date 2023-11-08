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
import Image1 from '../../../assets/image/BANK1.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { api } from '../../../Services/Api';

const { height, width } = Dimensions.get('screen');

const TCMemberTab = ({ navigation }) => {
    const [TCdetail,setTCdetail] = useState('')
    const LoancustID = useSelector(state => state.loancustomerID);
    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }


              // ------------------ get Customer List Api Call Start ------------------
  const getTrustcircledetails = async () => {
    console.log('search------->>>>>', )
    const data = {
    customerId: LoancustID,
  
    };
    await api.getTrustcircledetails(data).then((res) => {
      console.log('------------------- getTrustcircledetails ab111 res', res)
      setTCdetail(res?.data?.body)
     
     
    })
      .catch((err) => {
        console.log('------------------- getTrustcircledetails error', err?.response)
       
      })
  };


  useEffect(()=>{
    getTrustcircledetails()
  },[])

  const getRandomColor = (value) => {
    // console.log('Random',value)
     let mobilenum = value?.charAt(value.length-1)
     if (mobilenum == '0'){
       var color = '#94BCC8'
     }else if (mobilenum == '1'){
       var color ='#9EC894'
     }else if (mobilenum == '2'){
         var color ='#8CACCE'
       }else if (mobilenum == '3'){
         var color ='#CE748F'
       }else if (mobilenum == '4'){
         var color ='#8CA785'
       }else if (mobilenum == '5'){
         var color = '#6979F8'
       }else if (mobilenum == '6'){
         var color ='#9EC894'
       }else if (mobilenum == '7'){
         var color ='#8CACCE'
       }else if (mobilenum == '8'){
         var color ='#CE748F'
       }else if (mobilenum == '9'){
         var color ='#8CA785'
       }else if(value == null || '' ){
         var color = '#C8BD94'
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


    return (

        <>
            <View style={styles.mainContainer}>
                {TCdetail &&  TCdetail?.map((item)=>{
                    return(
             
                <TouchableOpacity
                 onPress={()=> navigation.navigate('TCProfile',{customerid: item?.customerId})}
                    style={styles.boxStyle} >
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={[styles.circleStyle, { backgroundColor: getRandomColor(item?.phoneNumber)}]}>
                            <Text style={styles.circleText}>{getInitials(item?.name)}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                            <Text style={styles.nameText}>{item?.name}</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                    <Icon1 name="location-outline" color={"black"} />
                                </View>
                                <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.village}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon2 name="phone-call" color={'rgba(0, 56, 116, 1)'} size={11} style={{ top: 4 }} />
                            <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.phoneNumber?.replace(/^.{0}/g, '').replaceAt(2, "X").replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                        </View>


                        <Text style={[styles.leadText, { color: item?.dueDatePassed == true ?'rgba(234, 64, 71, 1)' : '#000' }]}>{item?.paymentDue}</Text>


                    </View>

                </TouchableOpacity>
                           
                           )
                        })}
            </View>

        </>
    )
}

export default TCMemberTab;

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: COLORS.colorBackground,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        padding: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        flexDirection: 'row',
        width: width * 0.90,
        //alignItems:'center',
        //justifyContent:'center'
    },
    circleStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
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
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
    },
    idText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: 'rgba(0, 56, 116, 1)',
        fontWeight: '400',
    },
    approveContainer: {
        width: 98,
        height: 35,
        borderRadius: 54,
        shadowColor: 'rgba(0, 0, 0, 0.12',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB
    },   
     leadText: {
        fontSize: 11,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',

    },
    mainContainer: {
        flex: 1,
        //padding: 5,
        alignItems:'center',
        backgroundColor: COLORS.colorBackground
      },
})