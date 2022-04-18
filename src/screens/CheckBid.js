import { View,StyleSheet, Dimensions, StatusBar,Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '../components/Background';

const windowWidth = Dimensions.get('window').width;

export default function CheckBid({navigation} ){

    const route = useRoute()

    var bid = route.params.bid
    var bidder_name = route.params.bidder_name
    var bidder_email = route.params.bidder_email

    return(
        <Background>
            <View style={styles.container}>
                <Text style={styles.titleText}>{'Name: ' + bidder_name}</Text>
                <Text style={styles.titleText}>{'Bid: ' + '€' + bid}</Text>
                <Text style={styles.titleText}>{bidder_email}</Text>
            </View>
        </Background>
    );

}

const styles = StyleSheet.create({

    titleText: {
        
        textAlign:'center',
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
    },

    container: {
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: "#000000",
        height: '20%', // approximate a square
        width: '100%',
      },
  });