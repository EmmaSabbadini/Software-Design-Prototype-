import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/LoginScreen'
import Explore from './screens/Explore'
import User from './screens/User'
import Settings from './screens/Settings';
import AddItem from './screens/AddItem';
import RegisterScreen from './screens/RegisterScreen';
import Item from './screens/Item';
import LoginScreen from './screens/LoginScreen';
import UserSettings from './screens/UserSettings';
import Welcome from './screens/Welcome';

const BottomTab = () => {

  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator>
      <Tab.Screen 
        name = 'Explore'
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({}) => ('./assets/icons/search_icon.png'),
        }}
      />
      <Tab.Screen 
        name = 'User'
        component={User}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({}) => ('./assets/icons/user_icon.png'),
        }}
      />
      <Tab.Screen 
        name = 'Settings'
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({}) => ('./assets/icons/settings_icon.png'),
        }}
      />
      <Tab.Screen 
        name = 'Login'
        component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({}) => ('./assets/icons/user_icon.png'),
        }}
      />
      <Tab.Screen 
      name = 'RegisterScreen'
      component={RegisterScreen}
      options={{
        tabBarLabel: 'Register',
        tabBarIcon: ({}) => ('./assets/icons/user_icon.png'),
      }}
      />
      <Tab.Screen 
      name = 'Welcome'
      component={Welcome}
      options={{
        tabBarLabel: 'Welcome',
        tabBarIcon: ({}) => ('./assets/icons/home_icon.png'),
      }}
      />
    </Tab.Navigator>
  );

}

export default Routes = () => {
    const Stack = createNativeStackNavigator()

    return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Home">
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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

