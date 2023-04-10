import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, } from "react-native";
import Icon1 from 'react-native-vector-icons/Fontisto'
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import { CheckBox } from 'react-native-elements';
const { height, width } = Dimensions.get('screen');

const data = [
    {
        id: 1,
        Title: 'No road access',
        isChecked: false
    },
    {
        id: 2,
        Title: 'Two wheeler',
        isChecked: false
    },
    {
        id: 3,
        Title: 'Four wheeler',
        isChecked: false
    },
  
]
const RoadAccessModal = ({ModalVisible, onPressOut,setModalVisible,onPress1}) => {
    const { t } = useTranslation();

    const [Data, setData] = useState(data)
    const [type, setType] = useState('')
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [Checked,setChecked] = useState('')
    const [selectedItem1, setSelectedItem1] = useState()
    const [Id,setId] = useState('')

    const onCheck1 = (id) => {
        let reason = Data
        let index = reason.findIndex(o => o.id === id)
        reason[index].isChecked = !reason[index].isChecked;
        setTimeout(() => {
            let FilterArray1 = Data.filter(item => item.isChecked == true)
            let FilterId1 = FilterArray1.map((item) => (item.id))
            let Checked = FilterArray1.map((item)=>(item.isChecked))
            //let FilterId1 = FilterArray.slice(id)

            console.log("FilterId.",Checked)
            console.log("FilterArray.......", FilterArray1)
            setType(FilterArray1)
            setChecked(Checked)
            if(FilterId1.length == 0){
                setButtonStatus(false)
            }else{
                setButtonStatus(true)
            }
        }, 10)

     
    }
    const _choosen = (selectedItem1) => {
    console.log('selecting====>>',selectedItem1)
        setSelectedItem1(selectedItem1)
        setId(selectedItem1.id)
        setType(selectedItem1)
        if(selectedItem1.length == 0){
            setButtonStatus(false)
        }else{
            setButtonStatus(true)
        }
    }

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={()=>{onPressOut()
            setType(null)}}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
                <View style={styles.centeredView2}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextHead}>Access road type</Text>


                        {/* {Data.map((item, index) => {
                            return (
                                <View style={{flexDirection:'column',}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', 
                                paddingLeft: width * 0.06,paddingRight:width*0.06,alignItems:'center',marginBottom:width*0.05,marginTop:width*0.05 }}>
                                    <Text style={styles.TextTitle}>{item.Title}</Text>
                                    <Pressable onPress={() => onCheck1(item.id)} >
                                        <Icon1 name={item.isChecked ? 'radio-btn-active' : 'radio-btn-passive'} size={22} color={item.isChecked ? COLORS.colorB : '#DADADA'} />
                                    </Pressable>
                                    
                                </View>
                                {item.id !==5 &&
                                <View style={styles.lineView} />}
                                </View>
                            )
                        })} */}


                        {Data.map((item) => {
                        const isSelected1 = (selectedItem1 === item);
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', 
                                paddingLeft: width * 0.06,paddingRight:width*0.06,alignItems:'center',marginBottom:width*0.05,marginTop:width*0.05 }}>
                                  <Text style={styles.TextTitle}>{item.Title}</Text>
                                {isSelected1 ?
                                    <TouchableOpacity onPress={() => _choosen(item)}
                                    >
                                        <Icon1 name="radio-btn-active" size={22} color={COLORS.colorB} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => _choosen(item)}>
                                        <Icon1 name="radio-btn-passive" size={22} color={'rgba(229, 231, 250, 1)'} />
                                    </TouchableOpacity>}
                             
                            </View>
                        )
                    })}

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.Button1,
                            { backgroundColor: ButtonStatus ? COLORS.colorB : '#ECEBED' }]}
                            onPress={()=>ButtonStatus ? onPress1(type) : console.log("hello")}>

                                <Text style={[styles.text1, { color: ButtonStatus ?
                                     COLORS.colorBackground : '#979C9E', paddingLeft: width * 0.02 }]}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1
    },
    touchableStyle: {
        flex: 1,
        height: Dimensions.get('window').height,
    },
    centeredView2: {
        justifyContent: "flex-end",
    },
    lineView2: {
    //     borderBottomWidth: 0.7,
    //     borderBottomColor: COLORS.colorB,
   
    //     opacity: 0.5,
    //    marginLeft:100,
    //    marginRight:100
    },
    modalView: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 5,
        shadowRadius: 2,
        // borderTopStartRadius: 30,
        // borderTopEndRadius: 30,
        width: Dimensions.get('window').width,
        paddingBottom: 7
        // height:Dimensions.get('window').height*0.3
    },
    textTouch: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: COLORS.colorBlack,
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
        opacity: 0.7

    },
    modalTextHead: {
        color: '#3B3D43',
        textAlign: 'center',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        fontWeight: '700',
        //: 17,
        marginTop: 20,
        marginBottom: 10
    },
    lineView: {
        borderWidth: 0.5,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5,
    

    },
    TextTitle: {
        fontSize: 14,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop:15,
        flexDirection: 'row',
        // marginLeft: 12,
        // marginRight: 12,
        borderRadius: 40,
        marginBottom: 15
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
   

});

export default RoadAccessModal;