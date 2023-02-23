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
import EnergyModal from './EnergyModal';

const { height, width } = Dimensions.get('screen');

const Energy = ({ navigation }) => {
    const [Amount, setAmount] = useState('1,500')
    const [ModalVisible, setModalVisible] = useState(false)
    const [Purpose, setPurpose] = useState('')
    const [days, setDays] = useState('')



    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View>
                        <Text style={styles.TextElect}>Electricity connection available</Text>
                    </View>
                    <TouchableOpacity style={[styles.SelectBox1, { backgroundColor: '#ECEBED' }]} >
                        <Text style={styles.textSelect}>Yes</Text>
                        {/* <Text style={[styles.textSelect],{color:'#1A051D',marginLeft:8}}>{Relation}</Text>} */}
                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.TextElect}>Average bill amount</Text>
                    </View>
                    <View style={styles.SelectBox}>
                        <Text style={[styles.RS, { color: Amount === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                        <TextInput
                            style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5 }]}
                            value={Amount}
                            keyboardType={'number-pad'}
                            onChangeText={(text) => setAmount(text)} />
                    </View>
                    <View>
                        <Text style={styles.TextElect}>Cooking fuel type</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox1} onPress={() => setModalVisible(true)} >
                        {!Purpose ?
                            <Text style={styles.textSelect}>Select</Text> :
                            <Text style={[styles.textSelect], { color: '#1A051D', marginLeft: 8 }}>{Purpose}</Text>}
                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>

                    {Purpose &&
                        <View>
                            <Text style={styles.TextElect}>Average days a cylinder will last</Text>
                        </View>}

                    {Purpose &&
                        <View style={styles.SelectBox}>
                            <TextInput
                                placeholder="Enter number of days"
                                placeholderTextColor={"#808080"}
                                style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5, width: width * 0.5 }]}
                                value={days}
                                keyboardType={'number-pad'}
                                onChangeText={(text) => setDays(text)} />
                        </View>}
                </ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorB }]}
                        onPress={() => navigation.navigate('IncomeDetails')}>
                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <EnergyModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                setModalVisible={setModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
            />


        </>
    )
}

export default Energy;

const styles = StyleSheet.create({

    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop: 10
    },
    RS: {
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        left: 5
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
        // justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    SelectBox1: {
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