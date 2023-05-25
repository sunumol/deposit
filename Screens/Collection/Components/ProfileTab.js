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
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Feather';
import Profiles from './Profile';
import { api } from '../../../Services/Api';
import { useSelector,useDispatch } from 'react-redux';



const { height, width } = Dimensions.get('screen');

const ProfileTab = ({ navigation }) => {
    const [Amount, setAmount] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [Purpose, setPurpose] = useState('')
    const [EMI, setEMI] = useState('')
    const [Frequency, setFrequency] = useState('')
    const [Avg, setAvg] = useState('')
    const [Buttons, setButtons] = useState(false)
    const [ButtonSP, setButtonSP] = useState(false)
    const [MonthsCustom, setMonthCustom] = useState('')
    const [Credit, setCredit] = useState('')
    const [Salary, setSalary] = useState('')
    const [StateChange, setStateChange] = useState(false)
    const LoancustID = useSelector(state => state.loancustomerID);
    const [custData,setCustData] = useState('')
    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
      }
useEffect(()=>{
    getCustomerProfile()
},[])

          // ------------------ get Customer List Api Call Start ------------------
  const getCustomerProfile = async () => {
    console.log('search------->>>>>', )
    const data = {
    "customerId": 1,
  
    };
    await api.getCustomerProfile(data).then((res) => {
      console.log('------------------- getCustomerProfile res', res.data.body)
      setCustData(res?.data?.body)
     
     
    })
      .catch((err) => {
        console.log('------------------- getCustomerProfile error', err?.response)
       
      })
  };

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



    useEffect(() => {
        if (Salary === '' || Purpose === '') {
            setButtons(false)
        } else {
            setButtons(true)
        }
    }, [Salary, Purpose])


    useEffect(() => {
        if (EMI === '' || Frequency === '') {
            setButtonSP(false)
        } else {
            setButtonSP(true)
        }
    }, [EMI, Frequency])

    const Data = [
        {
            id: 1,
            label: '|'
        },
        {
            id: 2,
            label: '|'
        },
        {
            id: 3,
            label: '|'
        },
        {
            id: 4,
            label: '|'
        },
        {
            id: 5,
            label: '|'
        }
    ]

    return (

        <>
            <View style={styles.mainContainer}>
                <Profiles customerdata={custData} />
                <View style={{ alignItems: 'flex-start', padding: 10 }}>
                    <Text style={styles.GText}>Co-Applicant</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <View style={styles.containerBox}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={[styles.circleView, { backgroundColor: 'rgba(206, 116, 143, 1)' }]}>
                                <Text style={styles.shortText}>{getInitials(custData?.continuingGuarantorDTO?.name)}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                <Text style={styles.nameText}>{custData?.continuingGuarantorDTO?.name}</Text>
                                <Text style={styles.underText}>{custData?.continuingGuarantorDTO?.relation}</Text>
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon2 name="phone-call" color={'rgba(0, 56, 116, 1)'} size={11} style={{ top: 4 }} />
                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{custData?.continuingGuarantorDTO?.phoneNumber?.replace(/^.{0}/g, '').replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                </View>
                                <Text style={[styles.numText, { paddingLeft: width * 0.05, color: COLORS.colorDark }]}>{custData?.continuingGuarantorDTO?.voterId?.replace(/^.{0}/g, '').replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </>
    )
}

export default ProfileTab;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 5,
        // alignItems: 'center',
        backgroundColor: COLORS.colorBackground
    },
    containerBox: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: width * 0.01,
        width: width * 0.92,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 10,
        shadowRadius: 7,
        borderRadius: 8,
        paddingRight: 12,
        paddingLeft: 15,
        paddingTop: 12,
        paddingBottom: 14,
        marginBottom: 10
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(158, 200, 148, 1)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shortText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,

    },
    nameText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
    },
    underText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
    },
    dateText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        marginLeft: 5
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: 'rgba(0, 56, 116, 1)',
        fontWeight: '400',
    },
    GText: {
        color: 'rgba(128, 128, 128, 1)',
        fontSize: 14,
        fontFamily: FONTS.FontSemiB
    }
})