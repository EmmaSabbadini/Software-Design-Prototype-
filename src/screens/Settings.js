import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Image, View, TouchableOpacity, Text, Alert, StatusBar } from 'react-native';
import {auth} from "../../firebase"
import { getAuth, signInWithPhoneNumber, signOut } from "firebase/auth";
import React, {useEffect} from 'react';

var user = auth.currentUser;

const Separator = () => (
  <View style={styles.separator} />
);

export default function Settings ({ navigation }) {
  return(
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Image style={styles.image} source={require('../assets/icons/account_icon.png')}></Image>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserSettings')}>
          <Text style={styles.text}>Account Settings</Text>
        </TouchableOpacity>
        <Separator />
        <Image style={styles.image} source={require('../assets/icons/notification_icon.png')}></Image>
        <TouchableOpacity>
          <Text style={styles.text}>Notifications</Text>
        </TouchableOpacity>
        <Separator />
        <Image style={styles.image} source={require('../assets/icons/appearance_icon.png')}></Image>
        <TouchableOpacity>
          <Text style={styles.text}>Appearance</Text>
        </TouchableOpacity>
        <Separator />
        <Image style={styles.image} source={require('../assets/icons/security_icon.png')}></Image>
        <TouchableOpacity>
          <Text style={styles.text}>Privacy & Security</Text>
        </TouchableOpacity>
        <Separator />
        <Image style={styles.image} source={require('../assets/icons/support_icon.png')}></Image>
        <TouchableOpacity>
          <Text style={styles.text}>Help and Support</Text>
        </TouchableOpacity>
        <Separator />
        <Image style={styles.image} source={require('../assets/icons/about_icon.png')}></Image>
        <TouchableOpacity>
          <Text style={styles.text}>About</Text>
        </TouchableOpacity>
        <Separator />
        <Image style={styles.image} source={require('../assets/icons/logout_icon.png')}></Image>
        <TouchableOpacity
          onPress={() => {signOut(auth); Alert.alert('User Signed Out');navigation.navigate('Welcome');}}>
          <Text style={{
            color: 'red', 
            fontSize:18,
            alignSelf: 'flex-start',
            padding: 15,
            textAlign: 'left',}}>
              LOGOUT</Text>
        </TouchableOpacity>
        <Separator />
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
      flex: 1,
      alignItems: 'center',
    },
    header: {
      textAlign: 'center',
      fontSize: 28,
      padding: 40,
    },
    image: {
      height: 22,
      width: 22,
      right: 100,
      top: 38,
    },
    text: {
      fontSize: 18,
      alignSelf: 'flex-start',
      padding: 15,
      textAlign: 'left',
    },
    separator: {
      width: 265,
      height: 1,
      backgroundColor: '#DEDEDE',
    },  
});