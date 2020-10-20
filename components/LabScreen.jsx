import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import CheckBox from '@react-native-community/checkbox';
import ButtonMain from './ButtonMain';

// import DateTimePicker from '@react-native-community/datetimepicker';

let customFonts = {
    'Avenir_Black': require('../assets/fonts/Avenir/Avenir-Black-03.ttf'),
    'Avenir_Book': require('../assets/fonts/Avenir/Avenir-Book-01.ttf'),
}

export default class LabScreen extends React.Component {
    state={
        fontsLoaded: false,
        date: new Date(),
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
                <KeyboardAvoidingView style={styles.container}>
                    <Text style={styles.mainText}>Wypełni formularz</Text>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
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
                    <TextInput style={styles.input} placeholder='Wiek' keyboardType='numeric' />
                    <TextInput style={styles.input} placeholder='Oddział szpitalu z którego było skierowanie' keyboardType='text' />
                    <ButtonMain title="Wyśli" onPress={() => navigation.navigate('Doktorze')  } />
                </KeyboardAvoidingView>  
            );
        } else{
            return <AppLoading />
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FAF8',
        paddingTop: Constants.statusBarHeight
    },
    input: {
        margin: 10,
        padding: 5,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
    }
})