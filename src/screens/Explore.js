import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, FlatList, Dimensions, StatusBar, ScrollView, } from 'react-native';
import{db, storage} from '../../firebase';
import {ref, getDownloadURL } from 'firebase/storage';
import { doc, getDocs,collection, getDoc } from "firebase/firestore";
import { render } from 'react-dom';

const numColumns = 2;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ItemFull {
  constructor (id, name, type, imageUrl, price ) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.imageUrl = imageUrl;
      this.price = price;
  }
  toString() {
      return this.id + ',' + this.name + ', ' + this.type + ', ' + this.desc + ',' + this.imageUrl + ',' + this.price;
  }
}

export default function Explore({navigation}){
  const [items, setItems] = useState();

  var snapData = [];  //container for the data fetched from db
  var data = [];      //container for the data fetched from db with working url

  //function to fetch the items from the database and store them in an array
  const getItems = async() => {

    //first part fetches the item data from firebase. Each item has following entries
    
    //  id  - you use it when fetching the item from the database
    //  name
    //  type
    //  description
    //  price
    //  ImageUrl - the one stored in the database is only the filename of the image

    //  The actual URl is fetched in the promise function below

    const querySnapshot = await getDocs(collection(db, "Items"));
    querySnapshot.forEach((doc) => {
      const snapshot = doc.data();
      snapData.push(new ItemFull(doc.id, snapshot.name, snapshot.type, snapshot.imageUrl, snapshot.price));
    });


    //console.log('Items => ' + snapData);

    //This part is for fetching the actual urls.
    //The url has to have a valid authentication token to work, thats why you cant store it the database
    await Promise.all(snapData.map(async(item) => {
      if(item.imageUrl){
        imageRef = ref(storage, `${item.imageUrl}.jpeg`)
        await getDownloadURL(imageRef)
        .then((url)=>{const imageUrl = url; data.push(new ItemFull(item.id, item.name, item.type, imageUrl, item.price));});
      }

    }));

    //console.log("data =>" + data);
    //call the Items hook to update the items
    setItems(data);
  }

  //function called in the flatlist, a blueprint for a single tile basically. Requires an Item entry
  const renderItem = ({item}) => {

    if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
    }
    
    return (
        <Pressable
          onPress={() => {navigation.navigate('Item', {fileName: item.id})}}>  
            <ImageBackground 
              source={{uri: item.imageUrl}} 
              style={styles.item} 
              imageStyle = {{borderRadius: 20}}
              >  
            </ImageBackground>
            <View>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.priceText}>{'€' + item.price}</Text>
            </View>
        </Pressable> 
      );
    }
  
  //part which renders the actual item list
  if(!items){
    getItems();
  } else {
    console.log(items);
    return (
      <FlatList
          data={items}
          style={styles.container}
          renderItem={renderItem}
          numColumns={numColumns}
          refreshing = {false}
          onRefresh = {getItems} //get items data again for refresh
      />
  );
  }
  //console.log(items);
  return (
    <View style={styles.iconBar}>
      <Text></Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dadada',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    alignSelf: 'center',
  },
  itemBar: {
    paddingTop: 60,
    width: windowWidth,
  },
  item: {
    justifyContent: 'center',
    flex: 1,
    borderRadius: 20,
    margin: windowWidth* 0.025,
    height: windowWidth  / numColumns, // approximate a square
    width: windowWidth * 0.45,
  },
  itemText: {
    paddingBottom: 10,
    fontSize: 15,
    color: 'grey',
    margin: Dimensions.get('window').width * 0.025,

  },
  itemInvisible: {
    backgroundColor: '#012E40',
  },
  priceText: {
    position: 'absolute',
    top: 15,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    margin: Dimensions.get('window').width * 0.025,
  },

});