import React from 'react'
import { NavigationContainer } from 'react-native-safe-area-context'
import { View } from 'react-native-web'
import Routes from './src/Routes'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => (

      <Routes />

)

export default App