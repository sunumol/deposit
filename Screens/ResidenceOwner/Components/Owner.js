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
import React, { useCallback, useState,useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Entypo';
import Search from 'react-native-vector-icons/Feather';
import Media from '../../../assets/image/media.svg'
const { height, width } = Dimensions.get('screen');
import OwnerModal from './OwnerModal';
import RelationModal from './RelationModal';
import ImagePicker from 'react-native-image-crop-picker';


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
    const [Image1,setImage] = useState('')
    useEffect(() => {
   
        console.log("purpose print....",Purpose,Relation)
        setState(Purpose)
        setPurpose(Purpose)
        setRelation(Relation)
    }, [Purpose])

    const UploadImage = () => {

        //Choose Image from gallery
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true
        }).then(image => {
            console.log("IMAGE", image.path);
            setImage(image.path)
        });
    }
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

                    {!Image1 ?
                    <View style={{alignItems:'flex-start',flex:1,marginLeft:25}}>
                        <TouchableOpacity onPress={()=>UploadImage()}>
                    <Media width={30} height={30}  />
                    </TouchableOpacity>
                    </View>:<View style={{alignItems:'flex-start',flex:1,marginLeft:10}}>
                        <Image source={{ uri: Image1 }} style={{width:55,height:65,borderRadius:6}}/></View>}
                    <View style={styles.Line}/>
                    <View style={{flexDirection:'column',left:-20}}>
                        <Text style={styles.UploadText}>Upload photo</Text>
                        <Text style={styles.Prooftext}>Proof of ownership</Text>
                    </View>
                 
                    <View style={{flex:1,alignItems:'flex-end'}}>
                    <Icon2 name="chevron-right" size={18} color={'#808080'} style={{marginRight:15}}/>
                    </View>
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
            <OwnerModal
                visible={ModalVisible}
                setPurpose ={setPurpose}
                setModalVisible={setModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
               // navigation={navigation}
               
            />
                   <RelationModal
                visible={ModalVisible1}
                setRelaton ={setRelation}
                setModalVisible={setModalVisible1}
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
        marginLeft:2,
        marginRight:5,
         backgroundColor:'#FCFCFC',
        //backgroundColor: 'pink',
        elevation: 2,
        shadowColor: '#000000',
        alignItems: 'center',
        //justifyContent:'space-around',
        borderRadius: 6,
        flexDirection:'row',
        marginTop:width*0.02,
        marginBottom:width*0.05

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
        fontSize:12,
        marginLeft:0
    },
    Line:{

    borderWidth:0.3,
    height:80,
    borderColor:'#F2F2F2',
    left:-38

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