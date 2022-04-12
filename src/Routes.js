import * as React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Explore from './screens/Explore'
import User from './screens/User'
import Settings from './screens/Settings';
import AddItem from './screens/AddItem';
import RegisterScreen from './screens/RegisterScreen';
import Item from './screens/Item';
import LoginScreen from './screens/LoginScreen';
import UserSettings from './screens/UserSettings';
import Welcome from './screens/Welcome';
import EditItem from './screens/EditItem';
import Bid from './screens/Bid';
import CheckBid from './screens/CheckBid';

const BottomTab = () => {

  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator
    >
      <Tab.Screen
        name = 'User'
        component={User}
        options={{headerShown:false,}}
      />
      <Tab.Screen 
        name = 'Explore'
        component={Explore}
        options={{headerShown:false,}}
      />
      <Tab.Screen 
        name = 'Settings'
        component={Settings}
        options={{headerShown:false,}}
      />
    </Tab.Navigator>
  );

}

export default Routes = () => {
    const Stack = createNativeStackNavigator()
    return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name = 'BottomTab'
            component={BottomTab}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name='Explore'
            component={Explore}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name='User'
            component={User}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name='RegisterScreen'
            component={RegisterScreen}
            options={{headerShown:false,}}
          />  
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{headerShown:false,}}
          />  
          <Stack.Screen
            name='Item'
            component={Item}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name='Settings'
            component={Settings}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name = 'AddItem'
            component={AddItem}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name = 'EditItem'
            component={EditItem}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name = 'UserSettings'
            component={UserSettings}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name = 'Welcome'
            component={Welcome}
            options={{headerShown:false,}}
          />
           <Stack.Screen
            name = 'Bid'
            component={Bid}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name = 'CheckBid'
            component={CheckBid}
            options={{headerShown:false,}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

const styles = StyleSheet.create({
    icon: {
      height: 22,
      width: 22,
    },
})
