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
            <SafeAreaView style={styles.container}>
                  {image && <Image source={{ uri: image }} style={styles.image} />}
                <Image
                source={{ uri: user.photoURL }}
                PlaceholderContent={{uri: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}}
                ></Image>
                <View>
                  <Text style={styles.header}>User Settings</Text>
                 <Text >{'Provider-specific UID:\n' + user.uid}</Text>
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
                    <Button 
                      style={styles.button}
                      mode = "contained"
                      onPress={() => {updateEmail(auth.currentUser, email).then(() => {
                        // Email updated!
                        // ...
                      }).catch((error) => {
                        // An error occurred
                        // ...
                      });
                       Alert.alert('User email changed to ', email);}}
                    >
                      Change Email
                    </Button>
                  </View>
                 <View>
                    <Button
                      style={styles.button}
                      mode = "contained"
                      onPress={() => {sendPasswordResetEmail(auth, user.email).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                      }); Alert.alert('Password reset email sent to', user.email);}}
                    >
                      Reset Password
                    </Button>
                  </View>
                    <Button 
                      style={styles.button}
                      mode="contained" 
                      onPress={getImage} styles={{width: '90%'}}>
                      Choose Image
                    </Button>
                    <Button 
                      style={styles.button}
                      mode="contained" onPress={updateUser}>
                        Upload Profile Picture
                    </Button>
            </SafeAreaView>
    );


}


const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    },  
    button: {
      backgroundColor: 'grey',
      width: 260,
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 30 ,
      shadowOffset : { width: 1, height: 13},

    },
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
      width: 100,
      height: 100,
    },
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
})