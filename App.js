import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import Routes from "./src/Routes";
import * as Font from "expo-font";


const fetchFont = () => {
  Font.loadAsync({
    "Merriweather": require('./src/assets/Fonts/Merriweather/Merriweather-Regular.ttf'),
    "Merriweather-bold": require('./src/assets/Fonts/Merriweather/Merriweather-Bold.ttf'),
  });
};
const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={() => console.log("Error")}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return <Routes />;
};

export default App;
