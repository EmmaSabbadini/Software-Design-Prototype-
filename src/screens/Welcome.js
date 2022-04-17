import React from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Platform, StatusBar, Dimensions, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Welcome({ navigation }) {
    
    return (
        <View style={styles.background}>     
            <ImageBackground  
                style={styles.image} 
                source={require("../assets/furniture_wallpaper.jpg")} 
                resizeMode='repeat'>
            </ImageBackground>
            <Image style={styles.logo} source={require("../assets/logo_no_background.png")}/>
                <View style={styles.welcomeBox}>
                    <Text style={styles.text1}>Welcome to</Text>
                    <Text style={styles.text2}>FurniShare!</Text>
                    <View style={styles.button}>
                    <View style={styles.login}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.text4}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.browse}>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Explore')}>
                        <Text style={styles.text3}>BROWSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>  
            </View>  
        </View>
    );

}

const styles = StyleSheet.create({
    background: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: windowHeight,
        width: windowWidth,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        position: 'absolute',
        top: 50,
        right: 25,
        height: 90,
        width: 90,
        backgroundColor: 'white',
        borderRadius: 90,
        
    },
    image: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: windowWidth,
        height: windowHeight,
    },
    welcomeBox: {
        padding: 10,
        position: 'absolute',
        paddingTop: 10,
        width: windowWidth - 60,
        height: 200,
        backgroundColor: "#dadada",
        borderRadius: 30,
    },
    button: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    login: {
        padding: 16, // Border width is 2 so deduct 2 from 18
        width: 120,
        height: 60,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
    },
    browse: {
        padding: 18,
        width: 120,
        height: 60,
        borderRadius: 15,
        backgroundColor: '#000000',
    },
    text1: { //Welcome to
        color: "black",
        fontSize: 30,
        textAlign: "center",
    },
    text2: { //FurniShare
        color: "black",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
    },
    text3: { //button text
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
    text4: { //button text
        color: "black",
        fontSize: 18,
        textAlign: "center",
    }
});
