import React, { useState } from 'react'
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import Toast from '../components/Toast'
import { signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";

import {auth} from "../../firebase"


const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  var displayName = user.displayName;
  var email = user.email;
  

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  var uid = user.uid;
}



const Separator = () => (
    <View style={styles.separator} />
  );
  
export default function UserSettings({ navigation }) {
  return(
    
    <SafeAreaView style={styles.container}>
    <View>
      <Button
        title="Back to Settings"
        onPress={() => navigation.navigate('UserSettings')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
      <Text style={{fontSize: 30, alignSelf: 'center'} }>{'User Information'}</Text>
      </Text>
      <Text style={{fontSize: 15, alignSelf: 'left'} }>{'Provider-specific UID:' + uid}</Text>
      <Text style={{fontSize: 15, alignSelf: 'left'} }>{'Account Username: ' + displayName}</Text>
      <Text style={{fontSize: 15, alignSelf: 'left'} }>{'Account Email Address: ' + email}</Text>
    </View>
    <Separator />
    <View>
    <Text style={{fontSize: 15, alignSelf: 'left'} }>{'Password: Forgot password?'}</Text>
      <Button
        title="Reset Password"
        onPress={() => {sendPasswordResetEmail(auth, email).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        }); Alert.alert('Password reset email sent to', email);}}
      />
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
