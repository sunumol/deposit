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
    TouchableOpacity,
    Image
} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';

import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Entypo';
import Search from 'react-native-vector-icons/Feather';
import Media from '../../../assets/image/media.svg';
import Media1 from '../../../assets/image/Media2.svg'
const { height, width } = Dimensions.get('screen');
import OwnerModal from './OwnerModal';
import RelationModal from './RelationModal';
import ImagePicker from 'react-native-image-crop-picker';
import Image2 from '../../../assets/Images/cakes.svg'

const DetailChecks = ({ navigation, setState }) => {

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
    const [Purpose, setPurpose] = useState(null)
    const [Purposes, setPurposes] = useState(null)
    const [imageStatus, setImageStatus] = useState(false)
    const [Relation, setRelation] = useState('')
    const [Image1, setImage] = useState('')
    const [status,setStatus] =  useState(false)
    const [UploadStatus, setUploadStatus] = useState(false)
    const [NameStatus,setNamestatus] = useState(false)
    useEffect(() => {

        console.log("purpose print....", Purposes)
        setState(Purpose)
        setPurpose(Purpose)
        setPurposes(Purposes)
        setRelation(Relation)
        //setStatus(true)
    }, [Purpose,Relation])

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
        });
    }
    return (


        <View style={styles.mainContainer}>

            <ScrollView>
                <View>
                    <Text style={styles.proof}>Ownership proof type</Text>
                </View>

                <TouchableOpacity style={styles.SelectBox} onPress={() => setModalVisible(true)}>
                    {!Purpose ? <Text style={styles.textSelect}>Select</Text> :
                        <Text style={[styles.textSelect],{color:'#1A051D',marginLeft:8}}>{Purpose}</Text>}
                    <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.UploadCard}>


                    {!imageStatus ?
                        <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                            <TouchableOpacity >
                                <Media1 width={30} height={30} />
                            </TouchableOpacity>
                        </View> : UploadStatus ?
                            <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                                <TouchableOpacity onPress={() => UploadImage()}>
                                    <Media width={30} height={30} />
                                </TouchableOpacity>
                            </View> : <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 10 }}>
                                <Image source={{ uri: Image1 }} style={{ width: 55, height: 65, borderRadius: 6 }} /></View>}
                    <View style={styles.Line} />
                    <View style={{ flexDirection: 'column', left: -20 }}>
                        <Text style={[styles.UploadText, { color: NameStatus ? '#1A051D' : '#808080' }]}>Upload photo</Text>
                        <Text style={styles.Prooftext}>Proof of ownership</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Icon2 name="chevron-right" size={18} color={'#808080'} style={{ marginRight: 15 }} />
                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={styles.proof}>Relationship with Customer</Text>
                </View>
                <TouchableOpacity style={styles.SelectBox} onPress={() => setModalVisible1(true)} >
                {Purposes === null ? <Text style={styles.textSelect}>Select</Text> :
                        <Text style={[styles.textSelect],{color:'#1A051D',marginLeft:8}}>{Purposes}</Text>}
                    <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                </TouchableOpacity>


              {Purposes !== null ?
              <View style={styles.containerBox}>
                     <View style={{ flex: 1, flexDirection: 'row' }}>
                     <View style={styles.circleView}>
                            <Text style={styles.shortText}>AK</Text>
                        </View>

                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                            <Text style={styles.nameText}>Anil Kumar</Text>
                            <Text style={styles.underText}>Daily wage labourer</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                        <Image2 width={11} height={11} top={3}/>
                            <Text style={styles.dateText}>12/10/1972</Text>
                        </View>
                        </View>
              </View>:null}
                        
            </ScrollView>

            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>Purposes !== '' ? navigation.navigate('ContinuingGuarantor'):console.log("helo")}
                style={[styles.Button1, { backgroundColor:Purposes !== '' ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                >
                    <Text style={[styles.text1, { color:Purposes !== '' ? COLORS.colorBackground : '#979C9E' }]}>Continue</Text>
                </TouchableOpacity>
            </View>
            <OwnerModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                setUploadStatus={setUploadStatus}
                setModalVisible={setModalVisible}
                setImageStatus={setImageStatus}
                setNamestatus={setNamestatus}
                onPressOut={() => setModalVisible(!ModalVisible)}
            // navigation={navigation}

            />
            <RelationModal
                visible={ModalVisible1}
                setRelation={setRelation} setPurposes={setPurposes}
                setModalVisible={setModalVisible1}
                setStatus={setStatus}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
            // navigation={navigation}

            />
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
    UploadText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: '#1A051D',
    },
    Prooftext: {
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        marginLeft: 0
    },
    Line: {

        borderWidth: 0.3,
        height: 80,
        borderColor: '#F2F2F2',
        left: -38

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
    containerBox: {
        marginTop: 12,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 8,
        marginRight: 15,
        marginLeft: 2,
        alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.18
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: '#CE748F',
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


})