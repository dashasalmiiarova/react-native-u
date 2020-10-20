import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LabScreen from './components/LabScreen';
import DokScreen from './components/DokScreen';
import StartScreen from './components/StartScreen';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Ekran początkowy">
        <Stack.Screen name="Ekran początkowy" component={StartScreen} />
        <Stack.Screen name="Laboratorium" component={LabScreen} />
        <Stack.Screen name="Doktorze" component={DokScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
