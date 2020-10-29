import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, View, Alert, Modal, TouchableHighlight } from 'react-native';
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

let count = 0;
export default class DokScreen extends React.Component {
    state={
        fontsLoaded: false,
        modalVisible: false,
        date_u: new Date(),
        odzial: '',
        age: '',
        plec: '',
        place: '',
        hospital: false,
        badanie: false,
        badanieName: '',
        diagnoz: '',
        first: false,
        spotkanie: 'Stacjonarie',
    };
    async _loadFontsAsync(){
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    componentDidMount(){
        this._loadFontsAsync();
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
        // LogBox.ignoreAllLogs();//Ignore all log notifications
    }

    
    getHandler = key => val => {
        this.setState({ [key]: val })
    }

    createData(){
        const data_id = this.state.date_u.toLocaleDateString('en-GB').toString()
        const newDate = data_id.replace(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/g,'$1-$2-$3');
        count++;
        db.ref(`dok/${newDate}/${count}`)
            .set({
                date_u: this.state.date_u.toLocaleDateString('en-GB'),
                odzial: this.state.odzial,
                plec: this.state.plec,
                place: this.state.place,
                hospital: this.state.hospital,
                badanie: this.state.badanie,
                badanieName: this.state.badanieName,
                diagnoz: this.state.diagnoz,
                first: this.state.first,
                spotkanie: this.state.spotkanie,
                age: this.state.age,
            })
            .then(_ => {
                //modal
                this.setModalVisible(true);

                this.setState({
                    date_u: new Date(),
                    age: 0,
                    plec: '',
                    place: '',
                    hospital: false,
                    badanie: false,
                    badanieName: '',
                    diagnoz: '',
                    first: false,
                    spotkanie: 'Stacjonarie',
                    odzial: '',
                })
            });
    }

    render(){
        const { modalVisible } = this.state;
       
        if(this.state.fontsLoaded){
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container} ref="scroller" keyboardShouldPersistTaps={true} >
                    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                        <ScrollView
                            // animatedValueX={deltaX}
                            // animatedValueY={deltaY}
                            // scrollEventThrottle={1}
                            // onScroll={Animated.event(
                            //     [{ nativeEvent: { contentOffset: { y: this.state.animatedValue } } }],
                            //     { useNativeDriver: true }
                            // )} 
                            style={styles.scrollView} >
                            <View style={styles.contentContainer}>
                                <Text style={styles.mainText}>Wypełni formularz</Text>
                                <DatePicker
                                    defaultDate={ this.state.date_u }
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
                                    onDateChange={(date) => { this.setState({ date_u: date }) }}
                                    disabled={false}
                                />
                                <TextInput style={styles.input} placeholder='Oddział w szpitalu' value={this.state.odzial} onChangeText={ this.getHandler('odzial') } keyboardType='default' placeholderTextColor="#43425D" />
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
                                    this.state.badanie ? <TextInput style={styles.input} value={ this.state.badanieName } onChangeText={ this.getHandler('badanieName') } placeholder='Jakie badanie?' keyboardType='default' placeholderTextColor="#43425D" />   : null    
                                }
                                <TextInput style={styles.input} placeholder='Diagnoz' keyboardType='default' value={ this.state.diagnoz } onChangeText={ this.getHandler('diagnoz') } placeholderTextColor="#43425D" />       
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
                                    <ButtonMain style={styles.buttonSubmit} title="Wyśli" onPress={this.createData.bind(this)} />
                                </View>
                                <View style={styles.centeredView}>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={modalVisible}
                                        onRequestClose={() => {
                                            Alert.alert("Modal has been closed.");
                                        }}
                                        >
                                        <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Dane zostały wysłane!</Text>

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: "#2CD889" }}
                                            onPress={() => {
                                            this.setModalVisible(!modalVisible);
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Zamkni</Text>
                                        </TouchableHighlight>
                                        </View>
                                        </View>
                                    </Modal>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 7,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})