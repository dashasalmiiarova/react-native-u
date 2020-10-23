import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from './Spinner';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import ButtonMain from './ButtonMain';

const UserScreen = () => {
    const navigation = useNavigation();
    
    let [fontsLoaded] = useFonts({
      'Avenir_Black': require('../assets/fonts/Avenir/Avenir-Black-03.ttf'),
      'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
    });
    if (!fontsLoaded) {
      return <Spinner />;
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
  
  export default UserScreen;
  
  const styles = StyleSheet.create({
      container:{
        backgroundColor: '#F0FAF8',
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      mainText:{
          fontFamily: 'Avenir_Black',
          fontSize: 25,
      },
  });