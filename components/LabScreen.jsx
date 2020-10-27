import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, View, Alert, Modal, TouchableHighlight } from 'react-native';
// import { StyleSheet, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Alert, Modal, TouchableHighlight, LogBox } from 'react-native';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import ButtonMain from './ButtonMain';
import Spinner from './Spinner';
import { DatePicker } from 'native-base';
import CheckBox from './CheckBox';
// import DateTimePicker from '@react-native-community/datetimepicker';

import { db, auth } from '../firebase';

let customFonts = {
    'Avenir_Medium': require('../assets/fonts/Avenir/Avenir-Medium-09.ttf'),
    'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
}

export default class LabScreen extends React.Component {
    state={
        fontsLoaded: false,
        modalVisible: false,
        date: new Date(),
        age: '',
        plec: '',
        oddzial: '',
        speed: false,
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
        // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
        // LogBox.ignoreAllLogs();//Ignore all log notifications
    }
    created() {
        LogBox.ignoreLogs([
          'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
          'StatusBarIOS has been merged with StatusBar and will be removed in a future release.',
          'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.'
        ]);
    }
    getHandler = key => val => {
        this.setState({ [key]: val })
    }
    createData(){
        console.log(this.state);
        const uid = auth().currentUser.uid;
        const data_id = `data-${Date.now()}`
        db.ref(`lab/${uid}/${data_id}`)
            .set({
                date: this.state.date,
                plec: this.state.plec,
                age: this.state.age,
                oddzial: this.state.oddzial,
                speed: this.state.speed,
            })
            .then(_ => {
                //modal
                this.setModalVisible(true);

                this.setState({ 
                    date: new Date(),
                    age: 0,
                    plec: '',
                    oddzial: '',
                    speed: false, })
            });
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
                    <TextInput style={styles.input} value={this.state.age} onChangeText={ this.getHandler('age') } placeholder='Wiek' keyboardType='numeric' placeholderTextColor="#43425D" />
                    <TextInput style={styles.input} value={this.state.plec} onChangeText={ this.getHandler('plec') } placeholder='Plec' keyboardType='default' placeholderTextColor="#43425D" />       
                    <TextInput style={styles.input} value={this.state.oddzial} onChangeText={ this.getHandler('oddzial') } placeholder='Oddział szpitalu z którego było skierowanie' keyboardType='default' placeholderTextColor="#43425D" />
                    <CheckBox 
                        selected={this.state.speed} 
                        onPress={() => { this.setState({ speed: !this.state.speed })}}
                        text='Czy to było szybkie badanie?'
                    />  
                    <ButtonMain style={styles.buttonSubmit} title="Wyśli" onPress={this.createData.bind(this)  } />
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
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
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Zamknąć</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                    </View>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
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