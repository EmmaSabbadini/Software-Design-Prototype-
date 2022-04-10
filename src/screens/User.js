import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Dimensions, Text, StyleSheet, StatusBar, LogBox, IconButton, Entypo, TouchableOpacity, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AppButton = ({ onPress, icon, title, subtitle, backgroundColor, navigation }) => (
  <View style={styles.appButtonContainer}>
    <Icon.Button
      flexDirection= 'row-reverse'
      color='black'
      name={icon}
      backgroundColor={backgroundColor}
      onPress={onPress}
      style={styles.appButton}>
      <Text style={styles.appButtonText}>{title}</Text>
      <Text style={styles.appButtonDescText}>{subtitle}</Text>
    </Icon.Button>
  </View>
);

const UserInfo = ({title, subtitle}) => (
    <View>
        <Text style={styles.user_name}>{title}</Text>
        <Text style={styles.user_email}>{subtitle}</Text>
    </View> 
);

//TODO -fetch user data and profile pic(would look similar to item fetching in explore.js) 
export default function User({ goBack}){
    const[user, setUser] = useState();
    const[name, setName] = useState();
    const[email, setEmail] = useState();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          setName(user.displayName)
          setEmail(user.email)
        } else {
    
        }
      });

    if (user){
        return (
            <View style = {styles.userbox}>
                <TouchableOpacity
                    
                    style={styles.icon}>
                    <Icon name={"chevron-left"}  size={20} color="black"/>
                </TouchableOpacity>
                <Image style={styles.profile_img} source={{uri: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}}/>
                <Text style={styles.header}> Profile </Text>
                <UserInfo title={name} subtitle={email}/>
                    <View style={styles.screenContainer}>
                        <AppButton 
                            icon="chevron-right" 
                            title="My Orders"
                            subtitle="Check Orders" 
                            backgroundColor="#7D7D7D"/>
                        <AppButton 
                            icon="chevron-right" 
                            title="My Listings" 
                            subtitle="Check Listings" 
                            backgroundColor="#7D7D7D"/>
                        <AppButton 
                            icon="chevron-right" 
                            title="My Reviews" 
                            subtitle="Check Reviews"  
                            backgroundColor="#7D7D7D"/>
                        <AppButton 
                            icon="chevron-right" 
                            title="Settings"   
                            subtitle="Notifications, Password, Contacts" 
                            backgroundColor="#7D7D7D"/>
                    </View>
            </View>
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
        flex: 1,
        backgroundColor: '#DADADA',
    },
    screenContainer: {
        top: '15%',
        justifyContent: "center",
        backgroundColor: "#DADADA",
    },
    appButtonDescText: {
        position: 'absolute',
        top: 40,
        right: 20,
        fontSize: 12,   
    },
    appButton: {
        padding: 25,
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
        borderWidth:1,
        borderColor:'#DADADA',
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
        top: 90,
        left: 20,
        width: 100, 
        height: 100, 
        borderRadius: 200/2,
    },   
});
