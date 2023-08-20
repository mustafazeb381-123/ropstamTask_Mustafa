import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';
import Dashboard from '../screen/Dashboard';
import SplashScreen from '../screen/SplashScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown:false}}>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignupScreen" component={SignupScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation