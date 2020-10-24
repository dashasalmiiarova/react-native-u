import React from 'react';
import 'localstorage-polyfill'; 
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';

import LabScreen from './components/LabScreen';
import DokScreen from './components/DokScreen';
import StartScreen from './components/StartScreen';
import SignIn from './components/SignIn';


const Stack = createStackNavigator()

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem('authUser')),
    };
  }
  // componentDidUpdate(){
  //   auth().onAuthStateChanged(authUser => {
  //     authUser
  //       ? global.localStorage.setItem('authUser', JSON.stringify(authUser))
  //       : global.localStorage.removeItem('authUser')
  //   });
  // }
  
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Ekran logowanie">
          <Stack.Screen name="Ekran logowanie" component={SignIn} />
          <Stack.Screen name="Ekran początkowy" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Laboratorium" component={LabScreen} />
          <Stack.Screen name="Doktorze" component={DokScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}
