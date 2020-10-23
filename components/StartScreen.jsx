import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import UserScreen from './User';
import Admin from './Admin';
import { auth } from '../firebase.js';

const StartScreen = () => {
  return (
      <View>
          { auth().currentUser.email === 'admin@gmail.com' ? (
            <Admin />
          ) : (
            <UserScreen />
          )
        }
      </View>
  );
}


export default StartScreen;
