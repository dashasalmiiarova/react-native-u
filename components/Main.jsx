import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';

import LabScreen from './components/LabScreen';
import DokScreen from './components/DokScreen';
import StartScreen from './components/StartScreen';
import SignIn from './components/SignIn';

const Stack = createStackNavigator()

export default class Main extends React.Component {

  componentWillUnmount() {
    this.listener();
  }
  render(){
    console.log('new');
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Ekran logowanie">
          <Stack.Screen name="Ekran początkowy" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Ekran logowanie" component={SignIn} />
          <Stack.Screen name="Laboratorium" component={LabScreen} />
          <Stack.Screen name="Doktorze" component={DokScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}

