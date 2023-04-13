import React, { useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';

const RelationModal = ({ visible, onPressOut,setModalVisible,setRelation,setPurposes,setStatus}) => {
    const { t } = useTranslation();
   // console.log("setRelation....",setRelation)


    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onPressOut}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
                <View style={styles.centeredView2}>
                    <View style={styles.modalView}>
                    <View style={styles.modalView1}>
                        <Text style={styles.modalTextHead}>Select Relation</Text>
                        </View>
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch}
                            onPress={() => {
                               // setRelation("Self")
                              // setStatus(true)
                                setPurposes('Son')
                                setModalVisible(!visible)
                            }
                            }>
                            <Text style={styles.modalText}>Son</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                        </TouchableOpacity >
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setPurposes("Daughter")
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Daughter</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setPurposes("Son-in-law")
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Son-in-law</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>
                  
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Daughter-in-law')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Daughter-in-law</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>


                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Father-in-law')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Father-in-law</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>
            

                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Mother-in-law')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Mother-in-law</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>
            


                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Father')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Father</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>
            


                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Mother')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Mother</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>


                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Uncle')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Uncle</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>

                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Aunt')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Aunt</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>


                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Nephew')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Nephew</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>


                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Niece')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Niece</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>

                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Male Cousin')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Male Cousin</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>

                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                             setPurposes('Female Cousin')
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Female Cousin</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                            
                        </TouchableOpacity>
            
            

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
    modalView: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 5,
        shadowRadius: 2,
        // borderBottomStartRadius: 30,
        // borderBottomEndRadius: 30,
        width: Dimensions.get('window').width,
        paddingBottom: 7
        // height:Dimensions.get('window').height*0.3
    },
    modalView1: {
        backgroundColor: "white",
        shadowColor: "#000",
        justifyContent:'center',
        alignItems:'center',
        paddingBottom: 7
        
    },
    textTouch: {
        paddingVertical: 15,
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
        textAlign: 'left',
        fontFamily: FONTS.FontSemiB,
        fontSize: 15,
       // marginLeft: 25,
        marginTop: 22,
        marginBottom: 15,
   
     
    },
    lineView: {
        borderWidth: 0.5,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5
    },

});

export default RelationModal;