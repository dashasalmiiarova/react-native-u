import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useFonts } from 'expo-font';
import Spinner from './Spinner';

const ButtonMain = ({ onPress, title }) => {
    let [fontsLoaded] = useFonts({
        'Avenir_Black': require('../assets/fonts/Avenir/Avenir-Black-03.ttf'),
        'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
      });
    
      if (!fontsLoaded) {
        return <Spinner  />;
      } else {
        return (
            <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>{title}</Text>
            </TouchableOpacity>
        );
        }
}

export default ButtonMain;

const styles = StyleSheet.create({
    appButtonContainer:{
        marginTop: 20,
        marginBottom: 5,
        width: 170,
        height: 50,
        borderRadius: 4,
        backgroundColor: '#2CD889',
    },
    appButtonText:{
        paddingTop: 10,
        fontFamily: 'Avenir_Book',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    }
})
