import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, View, Animated } from 'react-native';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { DatePicker } from 'native-base';
import ButtonMain from './ButtonMain';
import CheckBox from './CheckBox';

import Spinner from './Spinner';
import {Picker} from '@react-native-community/picker';
import { LogBox } from 'react-native';

import { db, auth } from '../firebase';

let customFonts = {
    'Avenir_Medium': require('../assets/fonts/Avenir/Avenir-Medium-09.ttf'),
    'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
}

export default class DokScreen extends React.Component {
    state={
        fontsLoaded: false,
        date: new Date(),
        age: 0,
        plec: '',
        place: '',
        hospital: false,
        badanie: false,
        diagnoz: '',
        first: false,
        spotkanie: 'Stacjonarie',
    };
    async _loadFontsAsync(){
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    componentDidMount(){
        this._loadFontsAsync();
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }

    getHandler = key => val => {
        this.setState({ [key]: val })
    }

    createData(){
        const { contant } = this.state;
        const data_id = `data-${auth().currentUser.user.uid}`
        db.ref(`dok/${data_id}`)
            .set({
                contant
            })
            .then(_ => {
                //modal
            });
    }

    render(){
        if(this.state.fontsLoaded){
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container} ref="scroller" keyboardShouldPersistTaps={true} >
                    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                        <Animated.ScrollView
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: this.state.animatedValue } } }],
                                { useNativeDriver: true }
                            )} 
                            style={styles.scrollView} >
                            <View style={styles.contentContainer}>
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
                                
                                <TextInput style={styles.input} placeholder='Wiek' value={this.state.age} onChangeText={ this.getHandler('age') } keyboardType='numeric' placeholderTextColor="#43425D" />
                                <TextInput style={styles.input} placeholder='Plec' value={this.state.plec} onChangeText={ this.getHandler('plec') } keyboardType='default' placeholderTextColor="#43425D" />       
                                <TextInput style={styles.input} placeholder='Skąd pacjent(miasto, wieś)?' value={this.state.place} onChangeText={ this.getHandler('place') } keyboardType='default' placeholderTextColor="#43425D" />       
                                <CheckBox 
                                    selected={this.state.hospital} 
                                    onPress={() => { this.setState({ hospital: !this.state.hospital })}}
                                    text='Sierowano na hospitalizację?'
                                /> 
                                <CheckBox 
                                    selected={this.state.badanie} 
                                    onPress={() => { this.setState({ badanie: !this.state.badanie })}}
                                    text='Skierowano na badanie?       '
                                    /> 
                                {
                                    this.state.badanie ? <TextInput style={styles.input} placeholder='Jakie badanie?' keyboardType='default' placeholderTextColor="#43425D" />   : null    
                                }
                                <TextInput style={styles.input} placeholder='Diagnoz' keyboardType='default' placeholderTextColor="#43425D" />       
                                <CheckBox 
                                    selected={this.state.first} 
                                    onPress={() => { this.setState({ first: !this.state.first })}}
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
                        </Animated.ScrollView>
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