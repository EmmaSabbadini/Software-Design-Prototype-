import { useNavigation } from '@react-navigation/native';
import {ref, getDownloadURL } from 'firebase/storage';
import { SafeAreaView, View, Dimensions, Text, StyleSheet, StatusBar, LogBox, Button, Entypo, TouchableOpacity, Image, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import {onAuthStateChanged } from "firebase/auth";
import {storage,auth} from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AppButton = ({ onPress, icon, title, subtitle, backgroundColor, navigation }) => (
  <Pressable style={styles.appButtonContainer}>
    <Icon.Button
      flexDirection= 'row-reverse'
      color='black'
      name={icon}
      borderRadius={20}
      backgroundColor={backgroundColor}
      onPress={onPress}
      style={styles.appButton}>
      <Text style={styles.appButtonText}>{title}</Text>
      <Text style={styles.appButtonDescText}>{subtitle}</Text>
    </Icon.Button>
  </Pressable>
);

const UserInfo = ({title, subtitle}) => (
    <View>
        <Text style={styles.user_name}>{title}</Text>
        <Text style={styles.user_email}>{subtitle}</Text>
    </View> 
);

//TODO -fetch user data and profile pic(would look similar to item fetching in explore.js) 
export default function User({navigation}){
    const[user, setUser] = useState();
    const[name, setName] = useState();
    const[userID, setUserID] = useState();
    const[email, setEmail] = useState();
    const[imageUrl, setImageUrl] = useState();


    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            setName(user.displayName)
            setEmail(user.email)
            setUserID(user.uid)
            if(user.photoURL){
                imageRef = ref(storage, `${user.photoURL}.jpeg`)
                getDownloadURL(imageRef)
                .then((url)=>{setImage(url);});
            }
        } else {
    
        }
      });

    if (user){
        return (
            <SafeAreaView>
            <View style = {styles.userbox}>
            <Image style = {styles.profile_img} source={{uri: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}}/>
                <View>
                    <Text style={styles.header}> Profile </Text>
                    <UserInfo title={name} subtitle={email}/>
                </View>
                <View style={styles.screenContainer}>
                        <AppButton 
                            icon="chevron-right" 
                            title="Saved Items"
                            subtitle="Check Orders" 
                            onPress={() => {navigation.navigate('MyItems', {userID : userID})}}
                            backgroundColor="#7D7D7D"/>
                        <AppButton 
                            icon="chevron-right" 
                            title="My Listings" 
                            subtitle="Check Listings" 
                            onPress={() => {navigation.navigate('MyItems', {userID : userID})}}
                            backgroundColor="#7D7D7D"/>
                        <AppButton 
                            icon="chevron-right" 
                            title="Settings"   
                            subtitle="Account, Notifications, Appearance..." 
                            onPress={() => navigation.navigate('Settings')}
                            backgroundColor="#7D7D7D"/>
                        <AppButton 
                            icon="chevron-right" 
                            title="Add Item"   
                            subtitle="Post your item for the world to see!" 
                            onPress={() => {navigation.navigate('AddItem')}}
                            backgroundColor="#FFFFFF"/>
                </View>
            </View>
            </SafeAreaView>
            
        );
    } else {
        return(
            <SafeAreaView>
                <View>
                    <Text> No User :(</Text>
                </View>
            </SafeAreaView>
        )
    }  
}

const styles = StyleSheet.create({
    userbox: {
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    screenContainer: {
        top: '15%',
        justifyContent: "center",
    },
    appButtonDescText: {
        position: 'absolute',
        top: 40,
        right: 20,
        fontSize: 12,   
    },
    appButton: {
        padding: 25,
        backgroundColor: 'lightgrey',
    },
    appButtonText: {
        position: 'absolute',
        color: 'black',
        fontWeight: 'bold',
        top: 10,
        right: 20,
        fontSize: 20,
    },
    appButtonContainer: {
        paddingVertical: 17,
        paddingHorizontal: 10,
    },
    header: {
        textAlign: 'center',
        top: 15,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },  
    user_name: {
        top: 55,
        left: 140,
        fontSize: 20,
        color: 'black'
    },
    user_email: {
        top: 55,
        left: 140,
        fontSize: 15,
        color: 'grey'
    },
    icon: {
        position: 'absolute',
        top: 45,
        left: 20,
        alignItems:'center',
        justifyContent:'center',
        width:40,
        height:40, 
        borderRadius:50,       
    },
    profile_img: {
        position: 'absolute',
        borderWidth:3,
        borderColor:'#ffffff',
        top: 45,
        left: 20,
        width: 100, 
        height: 100, 
        borderRadius: 200/2,
    },   
});