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
import React, { useCallback, useState,useEffect } from 'react'

import { FONTS, COLORS } from '../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get('screen');


const DetailChecks = ({navigation,setState}) => {

    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [checked, setChecked] = useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    const [Purpose,setPurpose] = useState(null)
    const [Relation,setRelation] = useState(null)
    useEffect(() => {
   
        console.log("purpose print....",Purpose,Relation)
        setState(Purpose)
        setPurpose(Purpose)
        setRelation(Relation)
    }, [Purpose])

    return (


        <View style={styles.mainContainer}>

            <ScrollView>
                <View>
                    <Text style={styles.proof}>Ownership proof type</Text>
                </View>

                <TouchableOpacity style={styles.SelectBox} onPress={()=>setModalVisible(true)}>
                  {!Purpose ?   <Text style={styles.textSelect}>Select</Text>:
                  <Text style={styles.textSelect}>{Purpose}</Text>}
                    <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.UploadCard}>

                    <View style={{alignItems:'center'}}>
                    </View>
                    <View style={styles.Line}/>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <Text style={styles.UploadText}>Upload photo</Text>
                        <Text style={styles.Prooftext}>Proof of ownership</Text>
                    </View>
                 

                    <Icon2 name="chevron-right" size={18}  style={{marginRight:15}}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.proof}>Relationship with Customer</Text>
                </View>
                <TouchableOpacity style={styles.SelectBox} onPress={()=>setModalVisible1(true)} >
                    <Text style={styles.textSelect}>{!Relation ? 'Select' : Relation}</Text>
                    <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                </TouchableOpacity>

                <View style={styles.cardView2}>
                        <View style={[styles.circleStyle, { backgroundColor: 'rgba(206, 116, 143, 1)', marginLeft: width * 0.05 }]}>
                            <Text style={styles.circleText}>AK</Text>
                        </View>

                        <View>
                            <Text style={styles.NAMEFont}>Anil Kumar</Text>
                            <Text style={styles.subText}>Daily wage labourer</Text>
                        </View>

                        <View>
                            <Text style={styles.subText}>12/10/1972</Text>
                        </View>
                    </View>
            </ScrollView>

            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={[styles.Button1, { backgroundColor:Relation ?  COLORS.colorB :'rgba(224, 224, 224, 1)' }]}
                >
                    <Text style={[styles.text1, { color:Relation ?  COLORS.colorBackground :'#979C9E' }]}>Continue</Text>
                </TouchableOpacity>
            </View>
           
        </View>




    )
}

export default DetailChecks;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
        // justifyContent:'center',
        //  alignItems:'center'
    },
    proof: {
        color: 'rgba(59, 61, 67, 1)',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.90,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 31,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 40,
        marginBottom: 0
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
    UploadCard: {
        width: width * 0.90,
        height: width * 0.2,
        // backgroundColor:'#FCFCFC',
        backgroundColor: 'pink',
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        alignItems: 'center',
        justifyContent:'space-around',
        borderRadius: 6,
        flexDirection:'row'
    },
    NAMEFont: {
        color: 'rgba(26, 5, 29, 1)',
        fontSize: 14,
        fontFamily: FONTS.FontSemiB
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
    subText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3
    },
    UploadText:{
        fontSize:14,
        fontFamily:FONTS.FontSemiB,
        color:'#1A051D',
    },
    Prooftext:{
        color:'rgba(128, 128, 128, 1)',
        fontFamily:FONTS.FontRegular,
        fontSize:12
    },
    Line:{
        height:width*0.5,

    },
    cardView2: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.90,
        height: width * 0.2,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: width * 0.03,
        borderColor: 'rgba(236, 235, 237, 1)',
        flexDirection: 'row'
    },

})