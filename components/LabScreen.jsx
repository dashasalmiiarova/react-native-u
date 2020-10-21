import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import ButtonMain from './ButtonMain';
import Spinner from './Spinner';

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
        console.log(this.state.date);
        if(this.state.fontsLoaded){
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container} ref="scroller" keyboardShouldPersistTaps={true} >
                    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                    <View style={styles.inner}>
                    <Text style={styles.mainText}>Wypełni formularz</Text>
                    <DatePicker
                        style={{width: '80%', margin: 20}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate="2019-05-01"
                        maxDate={new Date()}
                        confirmBtnText="Potwierdź"
                        cancelBtnText="Anuluj"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <TextInput style={styles.input} placeholder='Wiek' keyboardType='numeric' placeholderTextColor="#43425D" />
                    <TextInput style={styles.input} placeholder='Plec' keyboardType='text' placeholderTextColor="#43425D" />       
                    <TextInput style={styles.input} placeholder='Oddział szpitalu z którego było skierowanie' keyboardType='text' placeholderTextColor="#43425D" />
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