import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from "prop-types";


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    height: 50,
    width: 50,
    margin: 5,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
    color: "#000000",
  },
  textPin: {
    marginTop: 48,
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
    fontWeight: '400',
    textAlign: 'center'
  },
});

const getOTPTextChucks = (inputCount, inputCellLength, text) => {
  let otpText = text.match(new RegExp(".{1," + inputCellLength + "}", "g")) || [];

  otpText = otpText.slice(0, inputCount);

  return otpText;
};

class OTPTextView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 0,
      otpText: getOTPTextChucks(
        props.inputCount,
        props.inputCellLength,
        props.defaultValue
      ),
      lang:'',
      times: null,
    };
    this.inputs = [];
  }

componentDidMount(){
  this.getData()
}

getData = async () => {
    try {
        const lang = await AsyncStorage.getItem('user-language')
        this.setState({lang:lang})

    } catch (e) {
        console.log(e)
    }
}

  basicValidation = (text) => {
    const validText = /^[0-9]+$/;
    return text.match(validText);
  };

  onTextChange = (text, i) => {
    const { inputCellLength, inputCount, handleTextChange } = this.props;

    if (text && !this.basicValidation(text)) {
      return;
    }

    this.setState(
      (prevState) => {
        let { otpText } = prevState;

        otpText[i] = text;

        return {
          otpText,
        };
      },
      () => {
        handleTextChange(this.state.otpText.join(""));
        if (text.length === inputCellLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      }
    );
  };

  onInputFocus = (i) => {
    const { otpText } = this.state;

    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join("")) {
      this.inputs[0].focus();
      return;
    }

    this.setState({ focusedInput: i });
  };

  onKeyPress = (e, i) => {
    const val = this.state.otpText[i] || "";
   
    this.setState({ times: 1 })
    if (e.nativeEvent.key === "Backspace" && i !== 0) {
        
        if (this.state.times == 1) {
            this.inputs[i].focus();
            this.setState({ times: 2 })
        } else {
            this.inputs[i - 1].focus();

        }

    }
};


  clear = () => {
    this.setState(
      {
        otpText: [],
      },
      () => {
        this.inputs[0].focus();
        this.props.handleTextChange("");
      }
    );
  };

  setValue = (value) => {
    const { inputCount, inputCellLength } = this.props;

    const updatedFocusInput = value.length - 1;

    this.setState(
      {
        otpText: getOTPTextChucks(inputCount, inputCellLength, value),
      },
      () => {
        if (this.inputs[updatedFocusInput]) {
          this.inputs[updatedFocusInput].focus();
        }

        this.props.handleTextChange(value);
      }
    );
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      inputCellLength,
      containerStyle,
      textInputStyle,
      keyboardType,
      secureTextEntry,
      confirm,
      ...textInputProps
    } = this.props;

    const { focusedInput, otpText } = this.state;
  
    const TextInputs = [];
    const TextInputs2 = [];

    for (let i = 0; i < inputCount; i += 1) {
      const inputStyle = [
        styles.textInput,
        textInputStyle,
        { borderColor: offTintColor },
      ];

      if (focusedInput === i) {
        inputStyle.push({ borderColor: tintColor });
      }

      {
        i < 4
          ? (TextInputs.push(
            <TextInput
              ref={(e) => {
                this.inputs[i] = e;
              }}
              key={i}
              autoCorrect={false}
              keyboardType={keyboardType}
              autoFocus={i === 0}
              value={otpText[i] || ""}
              style={inputStyle}
              secureTextEntry={true}
              maxLength={this.props.inputCellLength}
              onFocus={() => this.onInputFocus(i)}
              onChangeText={(text) => this.onTextChange(text, i)}
              multiline={false}
              onKeyPress={(e) => this.onKeyPress(e, i)}
              {...textInputProps}
            />
          ))

          : (
            TextInputs2.push(
              <TextInput
                ref={(e) => {
                  this.inputs[i] = e;
                }}
                key={i}
                autoCorrect={false}
                keyboardType={keyboardType}
                autoFocus={i === 0}
                value={otpText[i] || ""}
                style={inputStyle}
                secureTextEntry={false}
                maxLength={this.props.inputCellLength}
                onFocus={() => this.onInputFocus(i)}
                onChangeText={(text) => this.onTextChange(text, i)}
                multiline={false}
                onKeyPress={(e) => this.onKeyPress(e, i)}
                {...textInputProps}
              />
            )
          )
      }
    }
    
    return (
      <View>
        <View style={[styles.container, containerStyle]}>{TextInputs}</View>
        <Text style={[styles.textPin, { marginTop: 41,fontFamily:FONTS.FontSemiB }]}>{confirm}</Text>
        <View style={[styles.container, containerStyle]}>{TextInputs2}</View>
      </View>
    );
  }
}

OTPTextView.propTypes = {
  defaultValue: PropTypes.string,
  inputCount: PropTypes.number,
  containerStyle: PropTypes.any,
  textInputStyle: PropTypes.any,
  inputCellLength: PropTypes.number,
  tintColor: PropTypes.string,
  offTintColor: PropTypes.string,
  handleTextChange: PropTypes.func,
  inputType: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.string,
};

OTPTextView.defaultProps = {
  defaultValue: "",
  inputCount: 4,
  tintColor: "#3CB371",
  offTintColor: "#DCDCDC",
  inputCellLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: () => { },
  keyboardType: "default",
  secureTextEntry: false
};

export default OTPTextView;
