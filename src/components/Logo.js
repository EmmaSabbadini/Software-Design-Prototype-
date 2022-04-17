import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlightBase,
} from "react-native";
import { theme } from "../core/theme";

export default function Logo() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Image
        source={require("../assets/logo_no_background.png")}
        style={styles.image}
      />
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: ,
    // flex : 1,

    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "black",
    alignItems: "stretch",
  },
});
