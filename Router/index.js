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
import Terms from '../Screens/Terms'
import NewLead from '../Screens/NewLead';
import ResePin from '../Screens/ResePin'
import ForgotPin from '../Screens/ForgotPin';
import PinScreen from '../Screens/PinScreen';
import ActivityScreens from '../Screens/ActivityScreens'

// import { useNetInfo } from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator();


export default function Router() {
//   const netInfo = useNetInfo();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreens} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Permission" component={Permission} />
        <Stack.Screen name="CreatePin" component={CreatePin} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Privacy" component={PrivacyPolicy} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="NewLead" component={NewLead} />
        <Stack.Screen name="ResetPin" component={ResePin} />
        <Stack.Screen name="ForgotPin" component={ForgotPin} />
        <Stack.Screen name="PinScreen" component={PinScreen} />
        <Stack.Screen name="ActivityScreens" component={ActivityScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}