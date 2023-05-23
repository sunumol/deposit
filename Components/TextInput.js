import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, FONTS } from '../Constants/Constants';

const TextInputBox = ({ name, value, address, edit, multi, onChangeNumber, label, maxLength, keyboardType, date, NameStatus }) => {
    console.log("NameStatus....", NameStatus)
    return (
        <SafeAreaView>
            {/* <View style={styles.inputView}>
                <Text style={styles.textStyle}>{name}</Text>
                <TextInput
                    style={[edit ? styles.input2 : styles.input, { height: address ? 63 : 46 }]}
                    onChangeText={onChangeNumber}
                    value={value}
                    placeholder={''}
                    placeholderTextColor={COLORS.colorDSText}
                    keyboardType="numeric"
                    editable={edit}
                    multiline={multi}
                />
            </View> */}
            <View style={[styles.inputView]}>
                <Text style={[{ paddingBottom: edit ? 7 : Dimensions.get('window').height * 0.007 }, styles.textStyle, { color: date && !NameStatus ? 'red' : COLORS.colorBlack, }]}>{name}</Text>
                {date ?
                    <View style={[styles.input3, { height: address ? 63 : 46, borderColor: NameStatus ? 'white' : 'red' }]}>
                        {label &&
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={[styles.textCurrency, { color: value ? COLORS.colorDark : COLORS.colorDSText }]}>₹</Text>
                            </View>}

                        <TextInput
                            style={[edit ? styles.inputStyle : styles.inputStyle2]}
                            onChangeText={onChangeNumber}
                            value={value}
                            placeholder={''}
                            placeholderTextColor={COLORS.colorDSText}
                            keyboardType={keyboardType}
                            editable={date ? date : edit}
                            contextMenuHidden={true}
                            multiline={multi}
                            maxLength={maxLength} />
                    </View> :
                    <View style={[edit ? styles.input2 : styles.input, { height: address ? 63 : 46 }]}>
                        {label &&
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={[styles.textCurrency, { color: value ? COLORS.colorDark : COLORS.colorDSText }]}>₹</Text>
                            </View>}

                        <TextInput
                            style={[edit ? styles.inputStyle : styles.inputStyle2]}
                            onChangeText={onChangeNumber}
                            value={value}
                            placeholder={''}
                            contextMenuHidden={true}
                            placeholderTextColor={COLORS.colorDSText}
                            keyboardType={keyboardType}
                            editable={date ? date : edit}
                            multiline={multi}
                            maxLength={maxLength} />
                    </View>}

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    inputView: {
        alignItems: 'flex-start'
    },
    textStyle: {
        // color: COLORS.colorBlack,
        textAlign: 'center',
        fontFamily: FONTS.FontRegular,
        fontSize: 10,
        fontWeight: '400',

    },
    input: {
        backgroundColor: '#ECEBED',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ECEBED',
        width: '100%',
        paddingLeft: 13,
    },
    input2: {
        flexDirection: 'row',
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        width: '100%',
        paddingLeft: 13,
    },
    textCurrency: {
        textAlign: 'center',
        fontFamily: FONTS.FontRegular,
        fontSize: 15, fontWeight: '400',

    },
    inputStyle: {
        fontSize: 15,
        fontWeight: FONTS.FontRegular,
        fontWeight: '400',
        color: COLORS.colorDark,
        width: '90%',
        padding: 0,
    },
    inputStyle2: {
        fontSize: 15,
        fontWeight: FONTS.FontRegular,
        fontWeight: '400',
        color: '#808080',
        height: '100%',
        width: '90%',
    },
    input3: {
        backgroundColor: COLORS.colorBackground,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'red',
        width: '90%',
        paddingLeft: 13,
    }
});

export default TextInputBox;