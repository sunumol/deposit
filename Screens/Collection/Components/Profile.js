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
import Image1 from '../../../assets/image/loc1.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather';

const { height, width } = Dimensions.get('screen');

const Profiles = ({ navigation }) => {


    return (

        <>
            <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:8 }}>
                <View style={styles.containerBox}>

                    <View style={{ flexDirection: 'row',marginTop:5 }}>

                        <Image source={require('../../../assets/image/Profile1.png')}
                            resizeMode={'contain'} style={{ borderRadius: 25, width: 50, height: 50 }} />
                        <View style={{ flexDirection: 'column', marginLeft: width * 0.035, marginTop: 3 }}>
                            <Text style={styles.nameText}>Aiswarya Thomas</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ paddingTop: 2, paddingRight: 1 }}>
                                    <Icon1 name="location-outline" color={"black"} />
                                </View>
                                <Text style={[styles.idText, { paddingTop: 0 }]}>Kakkanad</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: width * 0.06, marginTop: 3 }}>
                            <Icon2 name="phone-call" color={'rgba(0, 56, 116, 1)'} size={11} style={{ top: 4 }} />
                            <Text style={[styles.numText, { paddingLeft: 6 }]}>961XXXXX77</Text>
                        </View>
                    </View>

                    <View style={styles.Line} />


                    <View style={{ flexDirection: 'row' ,}}>
                        <View style={styles.HomeCard}>
                        <Image source={require('../../../assets/image/home.png')} resizeMode={"contain"}
                        style={{width:width*0.15,height:width*0.27}}/>
                        </View>

                        <View style={{ flexDirection: 'column', marginLeft:width*0.05,marginTop:width*0.05}}>
                            <Text style={[styles.nameText, { fontSize: 14, }]}>Address</Text>
                            <Text style={[styles.nameText, { fontFamily: FONTS.FontRegular, top: 2 }]}>Akshya Nagar 1st Block</Text>
                            <Text style={[styles.nameText, { fontFamily: FONTS.FontRegular }]}>Cross, Rammurthy nagar,</Text>
                            <Text style={[styles.nameText, { fontFamily: FONTS.FontRegular }]}>Kochi-560016</Text>
                        </View>

                        <View style={styles.LocCard}>
                         <Image1 /> 
                            {/* <Icon1 name="location-outline" color={COLORS.colorB} size={20} /> */}
                        </View>
                    </View>

                    <View style={styles.Line} />

                    <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                        <View style={{ flexDirection: 'column',marginTop:10 ,left:-55}}>
                            <Text style={[styles.nameText, { fontSize: 14 }]}>Aadhaar ID</Text>
                            <Text style={[styles.nameText, { fontFamily: FONTS.FontRegular }]}>45XXXXXX3177</Text>
                        </View>

                        <View style={styles.Line1}/>


                        <View style={{ flexDirection: 'column',marginTop:10,paddingLeft:width*0.05 }}>
                            <Text style={[styles.nameText, { fontSize: 14 }]}>Voter ID</Text>
                            <Text style={[styles.nameText, { fontFamily: FONTS.FontRegular }]}>TTUXXXX46</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Profiles;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 5,
        // alignItems: 'center',
        backgroundColor: COLORS.colorBackground
    },
    HomeCard:{
        width:width*0.18,
        height:width*0.16,
        backgroundColor:'white',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'rgba(224, 224, 224, 1)',
        marginTop:width*0.07
     
    },
    Line1:{
        width:0.1,
        height:width*0.18,
        backgroundColor:'rgba(242, 242, 242, 1)',
    },
    LocCard: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0, 56, 116, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width * 0.05,
        marginTop:width*0.1,
        marginRight:10
    },
    Line: {
        width: width * 0.91,
        height: 0.7,
        backgroundColor: 'rgba(242, 242, 242, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        left: -2,
        marginTop: width * 0.06

    },
    containerBox: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: width * 0.01,
        width: width * 0.90,
        // flexDirection: 'row',
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
        marginBottom: 10,
        height: width * 0.74,
        alignItems: 'center',
        
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
        fontSize: 12,
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
    },
    idText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
})