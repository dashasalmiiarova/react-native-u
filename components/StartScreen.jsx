import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';

const StartScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Z którego działy jesteś?</Text>
            <Button title="Laboratorium" onPress={() => navigation.navigate('Laboratorium')  } />
            <Button title="Doktorze" onPress={() => navigation.navigate('Doktorze')  } />
        </View>
    )
}

export default StartScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})