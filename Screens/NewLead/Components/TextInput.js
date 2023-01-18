import React from "react";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { FONTS } from "../../../Constants/Constants";

const { height, width } = Dimensions.get('screen');

const TextInputBox = ({ name, value, onChangeText, onFocus, onBlur,
    secureTextEntry, backgroundColor1, keyboardType1, color, edit,maxLength }) => {

    return (
        <SafeAreaView>

            <View style={{ paddingTop: width * 0.05, justifyContent: 'center' }}>
                <Text style={styles.TextName}>{name}</Text>

                <TextInput
                    style={[styles.textInput, {
                        backgroundColor: backgroundColor1,
                        color: color, borderColor: edit ? 'red' : 'rgba(236, 235, 237, 1)'
                    }]}
                    maxLength={maxLength}
                    value={value}
                    placeholder={''}
                    placeholderTextColor="#808080"
                    returnKeyType="done"
                    //maxLength={10}
                    //autoFocus={true}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType1}
                    onChangeText={onChangeText} />

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: width * 0.9,
        height: width * 0.15,
        backgroundColor:'#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(236, 235, 237, 1)',
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        paddingLeft: width * 0.025
    },
    TextName: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        color: 'rgba(59, 61, 67, 1)',
        paddingBottom: width * 0.02
    }

});

export default TextInputBox;