import {ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react'
import { Image, Text, SafeAreaView, Dimensions, View, StyleSheet, StatusBar } from 'react-native';
import Button from '../components/Button';
import { storage, db } from '../../firebase';
import { useRoute } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const auth = getAuth();
uid = "0";

//Class template for the item fetching from firestore
class item {
    constructor (owner_name ,name, type, desc, imageUrl, price, owner_ID) {
        this.owner_name = owner_name;
        this.name = name;
        this.type = type;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.price = price;
        this.owner_ID = owner_ID;
    }
    toString() {
        return this.owner_name + ', ' + this.name + ', '+ this.type + ', ' + this.desc + ',' + this.imageUrl + ',' + this.price + ',' + this.owner_ID;
    }
}

 

//function to fetch the data from the database and convert it to the item object
const itemConverter = {
    toFirestore: (item) => {
        return {
            owner_name: item.owner_name,
            name: item.name,
            type: item.type,
            desc: item.desc,
            imageUrl : item.imageUrl,
            price : item.price,
            owner_ID : item.owner_ID
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new item(data.owner_name, data.name, data.type, data.desc, data.imageUrl, data.price, data.owner_ID);
    }
};

//The screen designed to be invoked with objectID to fetch it from the database (route.params.filename)

export default function Item({navigation}){
    //handle image url request from firestore
    const[image, setImage] = useState();
    const[item, setItem] = useState();
    const[user, setUser] = useState();
    const route = useRoute();

    const auth = getAuth();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getData()
        });
        return unsubscribe;
      }, [navigation]);
    
    onAuthStateChanged(auth, (user) => {
     if (user) {
      uid = user.uid;
      setUser(user)
      console.log(uid);
    
     } else {
       console.log("No user\n");
    }
});
    
    const getData = async() => {
        console.log("trying to access " + route.params.fileName);
         id = route.params.fileName;
         console.log(id);
        const docRef = doc(db, "Items", route.params.fileName).withConverter(itemConverter);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Convert to City object
            const item = docSnap.data();
            setItem(item);
          } else {
            console.log("No such document!");
          }
    }

    if(!item){
        getData();

        return(
            <SafeAreaView>
                <View style={styles.imageBox}>
                    <Text style={{fontSize: 30, textAlignVertical: 'center'}}>Fetching...</Text>
                </View>
            </SafeAreaView>
        );

    } else {

        // console.log(item.imageUrl);
        // console.log(item.name);
        // console.log(item.type);
        // console.log(item.desc);

        if(item.imageUrl){
            imageRef = ref(storage, `${item.imageUrl}.jpeg`)
            getDownloadURL(imageRef)
            .then((url)=>{setImage(url);});
        }

        
            
         if (item.owner_ID == uid){
            

            return(
                <SafeAreaView style={styles.container}>
                    <View style={{flex: 1}}>
                        <Image source={{uri: image}} style={styles.image}/>
                    </View>
    
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems:'flex-start'}}>
                        <Button mode = 'contained' onPress={() => {navigation.navigate('EditItem', {id})}}> Edit</Button>
                        <Button mode = 'contained' onPress={() => {navigation.navigate('Bid', {item: item, itemID: route.params.fileName, user: user})}}> See current bids</Button>
                        <Text style={styles.itemName}>{item.name + '   ' + item.price + ' €'}</Text>
                        <Text style={styles.subtitle}>{"Posted by " + item.owner_name}</Text>
                        <Text style={styles.itemType}>{item.type}</Text>
                        <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>  
                </SafeAreaView>
            );
         } else {
        //TODO - make it look good ;)
        return(
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1}}>
                    <Image source={{uri: image}} style={styles.image}/>
                </View>

                <View style={{flex: 1, justifyContent: 'flex-start', alignItems:'flex-start'}}>
                    <Button mode="contained" onPress={() => {navigation.navigate('Bid', {item: item, itemID: route.params.fileName, user: user})}}>
                        Bid
                    </Button>
                    <Text style={styles.itemName}>{item.name + '   ' + item.price + ' €'}</Text>
                    <Text style={styles.subtitle}>{"Posted by " + item.owner_name}</Text>
                    <Text style={styles.itemType}>{item.type}</Text>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>  
            </SafeAreaView>
        );
     }
    }

}


const styles = StyleSheet.create({

    imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemName:{
        fontWeight: 'bold',
        fontSize: 30,
    },

    itemType:{

        fontSize: 24,
        color: 'black',
    },

    subtitle: {
        fontSize: 26,
        color: 'black',

    },

    itemDesc:{
        color: 'grey',
        fontSize: 22,
    },

    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },

    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        flex: 1,
        justifyContent: 'flex-start',

    },   

})