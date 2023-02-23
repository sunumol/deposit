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
import Search from '../../../assets/image/search2.svg'
import Icon1 from 'react-native-vector-icons/Fontisto'
const { height, width } = Dimensions.get('screen');
import ImagePicker from 'react-native-image-crop-picker';
import Media from '../../../assets/image/media.svg';
import Media1 from '../../../assets/image/Media2.svg'
import Icon2 from 'react-native-vector-icons/Entypo';
import Images1 from '../../../assets/image/PIC.svg';
import Images2 from '../../../assets/image/imgs1.svg';
import Images3 from '../../../assets/image/imgs2.svg';
import Images4 from '../../../assets/image/fridge.svg';

const Goods = ({ navigation }) => {

    const [imageStatus, setImageStatus] = useState(false)

    const [Image1, setImage] = useState('')
    const [UploadStatus, setUploadStatus] = useState(false)
    const [NameStatus, setNamestatus] = useState(false)
    const [selectedItem1, setSelectedItem1] = useState()
    const [Id,setId] = useState('')


    const Data = [
        {
            id: 1,
            title: 'AC'
        },
        {
            id: 2,
            title: 'Washing Machine'
        },
        {
            id: 3,
            title: 'Refrigerator'
        },
        {
            id: 4,
            title: 'TV'
        },
        {
            id: 5,
            title: 'None of the above'
        },
    ]


    const UploadImage = () => {

        //Choose Image from gallery
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true
        }).then(image => {
            console.log("IMAGE", image.path);
            setImage(image.path)
            setUploadStatus(false)
            setId(null)
        });
    }

    const _choosen = (selectedItem1) => {
        setImage('')
        setSelectedItem1(selectedItem1)
        setId(selectedItem1)
        setImageStatus(true)
        setUploadStatus(true)
        setNamestatus(true)
    }
    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>

                    <View style={{marginTop:10}}>
                    {Data.map((item) => {
                        const isSelected1 = (selectedItem1 === item.id);
                        return (
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                {isSelected1 ?
                                    <TouchableOpacity onPress={() => _choosen(item.id, item.LoanAmount, item.Month)}
                                    >
                                        <Icon1 name="radio-btn-active" size={22} color={COLORS.colorB} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => _choosen(item.id, item.LoanAmount, item.Month)}>
                                        <Icon1 name="radio-btn-passive" size={22} color={'rgba(229, 231, 250, 1)'} />
                                    </TouchableOpacity>}
                                <Text style={styles.optionText}>{item.title}</Text>
                            </View>
                        )
                    })}
                    </View>
                    <TouchableOpacity style={styles.UploadCard}>
                        {!imageStatus ?
                            <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                                <TouchableOpacity >
                                    <Media1 width={30} height={30} />
                                </TouchableOpacity>
                            </View> : UploadStatus ? 
                                <View style={{ alignItems: 'center', flex: 1, marginLeft: 0 }}>
                                    <TouchableOpacity onPress={() => UploadImage()}>
                                     {Id ==1 ?   
                                     <Images2 width={30} height={30} /> : Id ==2 ?
                                     <Images1 width={30} height={30} /> : Id  ==3 ?
                                     <Images4 width={30} height={30} />:Id ==4 ?
                                     <Images3 width={30} height={30} />:
                                     <Media1 width={30} height={30} />}
                                    </TouchableOpacity>
                                </View> : <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 10 }}>
                                    <Image source={{ uri: Image1 }} style={{ width: 55, height: 65, borderRadius: 6 }} /></View>}
                        <View style={styles.Line} />
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={[styles.UploadText, { color: NameStatus ? '#1A051D' : '#808080' }]}>Upload photo</Text>
                            <Text style={styles.Prooftext}>Upload photo of item selected</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Icon2 name="chevron-right" size={18} color={'#808080'} style={{ marginRight: 15 }} />
                        </View>
                    </TouchableOpacity>



                </ScrollView>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor:Image1 == ''? 'rgba(224, 224, 224, 1)':COLORS.colorB }]} 
                    onPress={()=>!Image1 ?  navigation.navigate('EnergyUtility'):console.log('helo')}>
                        <Text style={[styles.continueText, { color: Image1 == ''? 'rgba(151, 156, 158, 1)': COLORS.colorBackground }]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>




        </>
    )
}

export default Goods;

const styles = StyleSheet.create({


    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    optionText: {
        color: '#1A051D',
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },
    touchOnpress: {
        backgroundColor: COLORS.colorB,
        width: 15,
        height: 15,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: COLORS.colorB
    },
    touchOnpress1: {
        backgroundColor: "white",
        width: 22,
        height: 22,
        borderRadius: 11,
        borderColor: "#E0E0E0",
        borderWidth: 2
    },
    vehText: {
        fontFamily: FONTS.FontSemiB,
        color: '#000000',
        fontSize: 14
    },
    Num: {
        color: '#1A051D',
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        left: 6,
        // backgroundColor:'red',
        width: width * 0.6
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },

    buttonView1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 20,
        width: width * 0.35,

    },
    buttonView: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 5,
        width: width * 0.90,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,

        letterSpacing: 0.64
    },
    UploadCard: {
        width: width * 0.88,
        height: width * 0.22,
        marginLeft: 2,
        marginRight: 5,
        backgroundColor: '#FCFCFC',
        //backgroundColor: 'pink',
        elevation: 1,
        shadowColor: '#000000',
        alignItems: 'center',
        //justifyContent:'space-around',
        borderRadius: 6,
        flexDirection: 'row',
        marginTop: width * 0.02,
        marginBottom: width * 0.05

    },
    UploadText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(128, 128, 128, 1)',
        right:-15
    },
    Prooftext: {
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        right:-15
    },
    Line: {

        borderWidth: 0.3,
        height: 80,
        borderColor: '#F2F2F2',
        //left: -8

    },
    TextOwner: {
        fontFamily: FONTS.FontSemiB,
        color: '#1A051D',
        fontSize: 12
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
    skip: {
        fontSize: 14,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB
    },
    SearhView: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBox: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 2,
        alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.20
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: '#9EC894',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
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
        marginRight: 12,
        marginLeft: 5
    },
    containerBox1: {
        marginTop: 6,
        //flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 2,
        //alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.20
    },
    owner: {
        color: '#808080',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    NameStyle: {
        color: '#1A051D',
        fontSize: 12,
        fontFamily: FONTS.FontSemiB
    }

})