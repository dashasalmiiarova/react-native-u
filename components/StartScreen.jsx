import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import UserScreen from './User';
import Admin from './Admin';
import { auth } from '../firebase.js';

const StartScreen = () => (
  auth().currentUser.email === 'admin@gmail.com' ? (
    <Admin  /> 
  ) : (
    <UserScreen />
  )
)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })


export default StartScreen;
