import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/RepayHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Icon1 from 'react-native-vector-icons/Entypo'

const ContinuingGuarantor = ({ navigation }) => {
  const isDarkMode = true;
  const [number, onChangeNumber] = useState()
  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name={"Continuing Guarantor"} />
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>Relationship with Customer</Text>
          <View style={styles.dropDown}>
            <Text style={styles.spouseText}>Spouse</Text>
            <Icon1 name="chevron-down" size={18} color={'#808080'} />
          </View>
          <View style={styles.containerBox}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.circleView}>
                <Text style={styles.shortText}>AK</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                <Text style={styles.nameText}>Anil Kumar</Text>
                <Text style={styles.underText}>Daily wage labourer</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Text style={styles.dateText}>12/10/1972</Text>
              </View>
            </View>
          </View>
          <Text style={styles.mobileText}>Mobile Number</Text>
          <TextInput
            style={styles.inPutStyle}
            placeholder=''
            value={number}
            onChangeText={onChangeNumber}
            placeholderTextColor={COLORS.colorDark}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={[styles.buttonView, { backgroundColor: number ? COLORS.colorB : '#E0E0E0' }]}>
          <Text style={[styles.continueText, { color: number ? COLORS.colorBackground : COLORS.colorWhite3 }]}>Continue</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaProvider>
  )
}

export default ContinuingGuarantor

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.colorBackground,
    paddingHorizontal: 16
  },
  headerText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorBlack,
    paddingTop: 21
  },
  dropDown: {
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    borderRadius: 8,
    padding: 13,
    marginTop: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spouseText: {
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
  },
  inPutStyle: {
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    borderRadius: 8,
    paddingLeft: 15,
    paddingVertical: 12,
    marginTop: 9
  },
  mobileText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorBlack,
    marginTop: 22
  },
  containerBox: {
    marginTop: 20,
    flexDirection: 'row',
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
  },
  circleView: {
    width: 40,
    height: 40,
    backgroundColor: '#CE748F',
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
  },
  buttonView: {
    backgroundColor: COLORS.colorB,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
    height: 48,
    marginBottom: 25
  },
  continueText: {
    fontSize: 14,
    fontFamily: FONTS.FontBold,
    color: COLORS.colorBackground,
    letterSpacing: 0.64
  }


})