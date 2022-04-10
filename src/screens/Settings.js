import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, StatusBar } from 'react-native';
import {auth} from "../../firebase"
import { getAuth, signInWithPhoneNumber, signOut } from "firebase/auth";

const Settings = () => {
    return (

        <View style={{alignSelf:'center', marginVertical:'50%'}}>
            <Text style={{alignSelf:'center', textAlign:'center', }}> Settings Screen skeleton</Text>
        </View>

    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

