import React, {useState} from 'react';
import{db} from '../../firebase';
import {collection, addDoc, updateDoc,getDocs,doc} from "firebase/firestore";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View,StyleSheet, StatusBar,Text, FlatList} from 'react-native';
import TextInput from '../components/TextInput'
import Background from '../components/Background'
import Button from '../components/Button';

class bids {
    constructor (bid, name, bidder_email) {
        this.bid = bid
        this.bidder_name = name
        this.bidder_email = bidder_email
    }
}

export default function Bid({navigation} ) {

    const [bid, setBid] = useState()
    const [otherBids, setOtherBids] = useState()
    const route = useRoute()

    const item = route.params.item
    const itemID = route.params.itemID
    const user = route.params.user

    var snapData = []

    const getOtherBids = async() => {

        const querySnapshot = await getDocs(collection(db, "Items", itemID, "bids"));
        querySnapshot.forEach((doc) => {
        const snapshot = doc.data();
        snapData.push(new bids(snapshot.bid, snapshot.bidder_name, snapshot.bidder_email));
        });

        setOtherBids(snapData)

    }
    

    

    const renderItem = ({item}) => {
        console.log(item)
        if(item.empty === true){
            return(<Text></Text>);
        } else {
            
        }
        console.log(item)
        return (
            <Button mode="contained" onPress={() => {navigation.navigate('CheckBid', {bid: item.bid, bidder_name: item.bidder_name, bidder_email: item.bidder_email})}}>
                { item.bid + '€ : ' + item.bidder_name} 
            </Button>
            
        );

    }

    const addBid = async() => {

        if(item.price > bid){
            
        } else {

        if(user.uid == item.owner_ID){
            //handle bid on your item
        }

        if(bid < item.price) {
            //handle price lower than current
        }

        await addDoc(collection(db, 'Items', itemID, 'bids'), {
            bidder_ID: user.uid,
            bidder_name: user.displayName,
            bidder_email: user.email,
            bid: parseFloat(bid)
        });

        await updateDoc(doc(db, 'Items' ,itemID),{
            price: parseFloat(bid),
            topbidder: user.displayName
        });
    
        

        navigation.navigate('Item',{fileName: itemID});
        s}
    }

    if(!otherBids){
        getOtherBids();
    } else if(!user){
        return(
            <Background>
                <Text>No user! Please log in to start bidding :)</Text>
            </Background>
            );
    } else if(otherBids){
        console.log(otherBids)
        return(

            <Background>
                
                <TextInput
                            onChangeText={setBid}
                            value={bid}
                            placeholder ='Your bid'
                />
                <Button mode="contained" onPress={addBid}>
                    Bid
                </Button>
                <FlatList
                    data = {otherBids}
                    renderItem = {renderItem}
                />
            </Background>
            
        )
    }

    return(
        <Background>
                <TextInput
                            onChangeText={setBid}
                            value={bid}
                            placeholder ='Your bid'
                />
                <Button mode="contained" onPress={addBid}>
                    Bid
                </Button>
        </Background>
    );

    


}

const styles = StyleSheet.create({

    userbox: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        justifyContent: 'center',
        marginVertical: '50%',
    },   

    bidderText: {
        fontSize: 20,
    },
});