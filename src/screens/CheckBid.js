import { View,StyleSheet, StatusBar,Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckBid({navigation} ){

    const route = useRoute()

    var bid = route.params.bid
    var bidder_name = route.params.bidder_name
    var bidder_email = route.params.bidder_email

    return(
        <SafeAreaView>
            <View>
                <Text>{'Name: ' + bidder_name}</Text>
                <Text>{'Bid: ' + bid}</Text>
                <Text>{'email: ' + bidder_email}</Text>
            </View>
        </SafeAreaView>
    );

}