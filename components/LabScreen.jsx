import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import ButtonMain from './ButtonMain';
import Spinner from './Spinner';
import { DatePicker } from 'native-base';
import CheckBox from './CheckBox';
// import DateTimePicker from '@react-native-community/datetimepicker';

let customFonts = {
    'Avenir_Medium': require('../assets/fonts/Avenir/Avenir-Medium-09.ttf'),
    'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
}

export default class LabScreen extends React.Component {
    state={
        fontsLoaded: false,
        date: new Date(),
        speed: false,
    };
    async _loadFontsAsync(){
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    componentDidMount(){
        this._loadFontsAsync();
    }
    render(){
        if(this.state.fontsLoaded){
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container} ref="scroller" keyboardShouldPersistTaps={true} >
                    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                    <View style={styles.inner}>
                    <Text style={styles.mainText}>Wypełni formularz</Text>
                    <DatePicker
                        defaultDate={ this.state.date }
                        minimumDate={new Date(2020, 1, 1)}
                        maximumDate={new Date()}
                        locale={"pl"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        // placeHolderText="Wybierz datę"
                        textStyle={{ color: "#2CD889" }}
                        placeHolderTextStyle={{ color: "#2CD889" }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                        disabled={false}
                    />
                    <TextInput style={styles.input} placeholder='Wiek' keyboardType='numeric' placeholderTextColor="#43425D" />
                    <TextInput style={styles.input} placeholder='Plec' keyboardType='default' placeholderTextColor="#43425D" />       
                    <TextInput style={styles.input} placeholder='Oddział szpitalu z którego było skierowanie' keyboardType='default' placeholderTextColor="#43425D" />
                    <CheckBox 
                        selected={this.state.speed} 
                        onPress={() => { this.setState({ speed: !this.state.speed })}}
                        text='Czy to było szybkie badanie?'
                    />  
                    <ButtonMain style={styles.buttonSubmit} title="Wyśli" onPress={() => navigation.navigate('Doktorze')  } />
                    </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>  
            );
        } else{
            return <Spinner />
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FAF8',
    },
    inner: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    mainText: {
        fontFamily: 'Avenir_Medium',
        fontSize: 25,
    },
    input: {
        margin: 20,
        padding: 7,
        marginTop: 10,
        width: '80%',
        borderBottomColor: '#646D82',
        borderBottomWidth: 1,
    },
    buttonSubmit: {
        width: '80%',
    }
})