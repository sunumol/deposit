import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import IntroScreens from '../Screens/IntroScreens';
import LoginScreen from '../Screens/LoginScreen';
import  Permission from '../Screens/Permission';
import CreatePin from '../Screens/CreatePin';
import Profile from '../Screens/Profile'
import PrivacyPolicy from '../Screens/PrivacyPolicy'
import Terms from '../Screens/Terms';
import ActivityScreens from '../Screens/ActivityScreens';
import NewLead from '../Screens/NewLead';
import ResetPin from '../Screens/ResePin';
import ForgotPin from '../Screens/ForgotPin';
import PinScreen from '../Screens/PinScreen';
import NetWorkError from '../Screens/NetWorkError';

import { useNetInfo } from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator();


export default function Router() {
  const netInfo = useNetInfo();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="IntroScreen" component={netInfo.isConnected ? IntroScreens:NetWorkError} />
        <Stack.Screen name="LoginScreen" component={netInfo.isConnected ?LoginScreen:NetWorkError} />
        <Stack.Screen name="Permission" component={netInfo.isConnected ?Permission:NetWorkError} />
        <Stack.Screen name="CreatePin" component={netInfo.isConnected ?CreatePin:NetWorkError} />
        <Stack.Screen name="Profile" component={netInfo.isConnected ?Profile:NetWorkError} />
        <Stack.Screen name="Privacy" component={netInfo.isConnected ?PrivacyPolicy:NetWorkError} />
        <Stack.Screen name="Terms" component={netInfo.isConnected ?Terms:NetWorkError} />
        <Stack.Screen name="ActivityScreens" component={netInfo.isConnected ?ActivityScreens:NetWorkError} />
        <Stack.Screen name="NewLead" component={netInfo.isConnected ?NewLead:NetWorkError} />
        <Stack.Screen name="ResetPin" component={netInfo.isConnected ?ResetPin:NetWorkError} />
        <Stack.Screen name="ForgotPin" component={netInfo.isConnected ?ForgotPin:NetWorkError} />
        <Stack.Screen name="PinScreen" component={netInfo.isConnected ?PinScreen:NetWorkError} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}