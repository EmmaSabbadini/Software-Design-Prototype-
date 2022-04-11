import {ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import {Image, Text, KeyboardAvoidingView, SafeAreaView, View,TextInput,StyleSheet,Dimensions,StatusBar, Alert} from 'react-native'
import Button from '../components/Button'
import { storage, db } from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import {addDoc, collection, doc, setDoc} from 'firebase/firestore'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import {onAuthStateChanged, updateEmail } from "firebase/auth";
import { theme } from '../core/theme'
import Toast from '../components/Toast'
import { signInWithEmailAndPassword, sendPasswordResetEmail,updateProfile} from "firebase/auth";
import {auth} from '../../firebase'

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

//copy paste from the upload image tutorial on firebase
async function uploadImage(uri, fname) {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileName = fname || nanoid(); //each image has a randomly generated id as a filename
    const imageRef = ref(storage, `${fileName}.jpeg`);
  
    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: "image/jpeg",
    });
  
    blob.close();
  
    return {fileName};
  }


export default function AddItem({navigation}){
    
    const[image, setImage] = useState('default.jpeg')
    const[name, setName] = useState()
    const[desc, setDesc] = useState()
    const[itemType, setItemType] = useState()
    const[user, setUser] = useState()
    const [email, setEmail] = useState('')


    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        } else {
    
        }
      });


    //Get image path from library
    //TODO add multiple images functionality
    const getImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    
    }

    //Upload item to the database
    const updateUser = async() => {

        //upload image to db
        const fileName = await uploadImage(image);

        console.log(fileName);

        updateProfile(auth.currentUser, {
          photoURL: fileName
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
          // [END auth_update_user_profile_modular]
        
        //console.log(docRef.id);

        //move user to item page once its all done
        navigation.navigate('BottomTab');
    }

    if(!user){
        return(
            <SafeAreaView>
                <View>
                    <Text style={{fontSize: 30, textAlignVertical: 'center', textAlign: 'center'}}>Please sign in!</Text>
                </View>
            </SafeAreaView>
        )
    }

    return(
        //Keyboard avoiding moves some fields around in a weird way, there is probably a fix for it tho
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View 
                    style={{flex:1}}
                >
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>

                <View style={styles.container}>
                <Image
                source={{ uri: user.photoURL }}
                PlaceholderContent={{uri: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}}
                ></Image>
                </View>
                <View>
                  <Text style={styles.title}>
                  <Text>{'User Information'}</Text>
                 </Text>
                 <Text >{'Provider-specific UID:' + user.uid}</Text>
                 <Text >{'Account Username: ' + user.displayName}</Text>
                  <Text  >{'Account Email Address: ' + user.email}</Text>
                 </View>
                 <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={email.value}
                  onChangeText={setEmail}
                  error={!!email.error}
                  errorText={email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                <View>
                  <Text  >{'Change Account Email'}</Text>
                    <Button
                      mode = "contained"
                      onPress={() => {updateEmail(auth.currentUser, email).then(() => {
                        // Email updated!
                        // ...
                      }).catch((error) => {
                        // An error occurred
                        // ...
                      });
                       Alert.alert('Email Reset to', email);}}
                    >
                      Change Email
                    </Button>
                  </View>
                 <View>
                  <Text  >{'Password: Forgot password?'}</Text>
                    <Button
                      mode = "contained"
                      onPress={() => {sendPasswordResetEmail(auth, user.email).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                      }); Alert.alert('Email changed to', user.email);}}
                    >
                      Reset Password
                    </Button>
                  </View>
                <View   
                    style={{flex:1}}
                >
                    <Button mode="contained" onPress={getImage} styles={{width: '90%'}}>
                        Choose Image
                    </Button>
                    <Button mode="contained" onPress={updateUser}>
                        Upload Profile Picture
                    </Button>
                </View>
                
            </SafeAreaView>
        </KeyboardAvoidingView>
    );


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
     image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },

})