import {ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import {Image, Text, KeyboardAvoidingView, SafeAreaView, View,TextInput,StyleSheet,Dimensions,StatusBar} from 'react-native'
import Button from '../components/Button'
import { storage, db } from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import {addDoc, collection, doc, setDoc} from 'firebase/firestore'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import {onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase'



export default function EditItem(){
    return(
        <SafeAreaView>
            <View>
                <Text style={{fontSize: 30, textAlignVertical: 'center', textAlign: 'center'}}>Edit Items!</Text>
            </View>
        </SafeAreaView>
    )

}



const styles = StyleSheet.create({

    imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    textBox:{
        flex: 1,
        fontSize: 30,
    },

    longtextBox:{
        textAlignVertical: 'top',
        flex: 2,
        fontSize: 30,
    },

    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },

    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        flex: 1,
        justifyContent: 'center',

    },   

})