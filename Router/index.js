import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import IntroScreens from '../Screens/IntroScreens';
import LoginScreen from '../Screens/LoginScreen';
import  Permission from '../Screens/Permission';
import CreatePin from '../Screens/CreatePin'
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}