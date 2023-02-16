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
import React, { useCallback, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Entypo'

const { height, width } = Dimensions.get('screen');

const Energy = ({ navigation }) => {
  const [Amount,setAmount] =  useState('₹1,500')





    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View>
                        <Text style={styles.TextElect}>Electricity connection available</Text>
                    </View>
                    <TouchableOpacity style={[styles.SelectBox, { backgroundColor: '#ECEBED' }]} onPress={() => setModalVisible1(true)} >
                        <Text style={styles.textSelect}>Yes</Text>
                        {/* <Text style={[styles.textSelect],{color:'#1A051D',marginLeft:8}}>{Relation}</Text>} */}
                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.TextElect}>Average bill amount</Text>
                    </View>
                    <View style={styles.SelectBox}>
                        <TextInput 
                        style={[{fontSize:15,color:'#1A051D',fontFamily:FONTS.FontRegular,left:5}]}
                        value={Amount} 
                        onChangeText={(text)=>setAmount(text)}/>
                    </View>
                    <View>
                        <Text style={styles.TextElect}>Cooking fuel type</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox} onPress={() => setModalVisible1(true)} >
                        <Text style={styles.textSelect}>Select</Text>
                        {/* <Text style={[styles.textSelect],{color:'#1A051D',marginLeft:8}}>{Relation}</Text>} */}
                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                </ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorB }]}>
                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>




        </>
    )
}

export default Energy;

const styles = StyleSheet.create({

    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop:10
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 0,
        width: width * 0.88,

    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.89,
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



})