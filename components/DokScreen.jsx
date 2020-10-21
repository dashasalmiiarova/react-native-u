import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import ButtonMain from './ButtonMain';
import CheckBox from './CheckBox';

import Spinner from './Spinner';
import {Picker} from '@react-native-community/picker';


let customFonts = {
    'Avenir_Medium': require('../assets/fonts/Avenir/Avenir-Medium-09.ttf'),
    'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
}

export default class DokScreen extends React.Component {
    state={
        fontsLoaded: false,
        date: new Date(),
        first: false,
        spotkanie: 'Stacjonarie',
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
                        <ScrollView style={styles.scrollView} >
                            <View style={styles.contentContainer}>
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
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                            
                            <TextInput style={styles.input} placeholder='Wiek' keyboardType='numeric' placeholderTextColor="#43425D" />
                            <TextInput style={styles.input} placeholder='Plec' keyboardType='default' placeholderTextColor="#43425D" />       
                            <TextInput style={styles.input} placeholder='Skąd pacjent?' keyboardType='default' placeholderTextColor="#43425D" />       
                            <CheckBox 
                                selected={this.state.first} 
                                onPress={() => { this.setState({ speed: !this.state.first })}}
                                text='Sierowano na hospitalizację?'
                            /> 
                            <CheckBox 
                                selected={this.state.first} 
                                onPress={() => { this.setState({ speed: !this.state.first })}}
                                text='Skierowano na badanie?'
                            /> 
                            <TextInput style={styles.input} placeholder='Jakie badanie?' keyboardType='default' placeholderTextColor="#43425D" />       
                            <TextInput style={styles.input} placeholder='Diagnoz' keyboardType='default' placeholderTextColor="#43425D" />       
                            <CheckBox 
                                selected={this.state.first} 
                                onPress={() => { this.setState({ speed: !this.state.first })}}
                                text='Czy to pierwsze spotkanie?'
                            />  
                            <Picker
                                selectedValue={this.state.spotkanie}
                                style={{ width: '80%', marginTop: -20}}
                                mode='dropdown'
                                onValueChange={(itemValue) =>
                                    this.setState({spotkanie: itemValue})
                                }>
                                <Picker.Item label="Stacjonarnie" value="Stacjonarnie" />
                                <Picker.Item label="Telefonicznie" value="Telefonicznie" />
                                <Picker.Item label="Zdalnie" value="Zdalnie" />
                            </Picker>
                            <View style={ styles.buttonSubmitView }>
                                <ButtonMain style={styles.buttonSubmit} title="Wyśli" onPress={() => navigation.navigate('Doktorze')  } />
                            </View>
                            </View>
                        </ScrollView>
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
    contentContainer: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    mainText: {
        fontFamily: 'Avenir_Medium',
        fontSize: 15,
    },
    input: {
        margin: 20,
        padding: 7,
        marginTop: 10,
        width: '80%',
        borderBottomColor: '#646D82',
        borderBottomWidth: 1,
    },
    checkBox: {
        padding: 5,
    },
    buttonSubmit: {
        width: '80%',
    },
    buttonSubmitView:{
        marginBottom: 40,
    }
})