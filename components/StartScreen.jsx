import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import ButtonMain from './ButtonMain';

const StartScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    'Avenir_Black': require('../assets/fonts/Avenir/Avenir-Black-03.ttf'),
    'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Wybierz oddział</Text>
            <ButtonMain title="Laboratorium" onPress={() => navigation.navigate('Laboratorium')  } />
            <ButtonMain title="Doktorze" onPress={() => navigation.navigate('Doktorze')  } />
        </View>
    );
  }
};

export default StartScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F0FAF8',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainText:{
        fontFamily: 'Avenir_Black',
        fontSize: 25,
    },
});