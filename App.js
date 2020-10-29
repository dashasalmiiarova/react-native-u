import React from 'react';
import 'localstorage-polyfill'; 
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import User from './components/User';
import LabScreen from './components/LabScreen';
import DokScreen from './components/DokScreen';
import SignIn from './components/SignIn';


const Stack = createStackNavigator()

export default class App extends React.Component {
  
  // unsubscribeFromAuth = null;

  // state = { user: {} };

  // componentDidUpdate(){
  //   auth().onAuthStateChanged(authUser => {
  //       this.setState({ user: authUser })
  //     }
  //   )
  // }

  // componentDidMount(){
  //   const { setCurrentUser } = this.props;
  //   this.unsubscribeFromAuth = auth().onAuthStateChanged(async userAuth => {
  //     if(userAuth){
  //       const userRef = await createUserProfileDocument(userAuth);
  //       userRef.onSnapshot(snapShot => {
  //         setCurrentUser({
  //           id: snapShot.id,
  //           ...snapShot.data()
  //         });
  //       });
  //     } else{
  //       setCurrentUser(userAuth);
  //     }
  //   });
  // }
  // componentWillUnmount(){ 
  //   this.unsubscribeFromAuth();
  // }
  // componentDidUpdate(){
  //   auth().onAuthStateChanged(authUser => {
  //     authUser
  //       ? global.localStorage.setItem('authUser', JSON.stringify(authUser))
  //       : global.localStorage.removeItem('authUser')
  //   });
  // }
  
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Ekran początkowy" screenOptions={{ headerBackTitle: 'Wstecz' }} >
          <Stack.Screen name="Ekran logowania" component={SignIn} />
          <Stack.Screen name="Ekran początkowy" component={ User } options={{ headerShown: false }} />
          <Stack.Screen name="Laboratorium" component={LabScreen} />
          <Stack.Screen name="Doktorze" component={DokScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}
