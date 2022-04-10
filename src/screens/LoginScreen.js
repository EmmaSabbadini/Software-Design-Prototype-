import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Pressable } from "react-native";
import { Center } from 'native-base'
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import Toast from "../components/Toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from "../../firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');



  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        navigation.navigate("User");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header style={styles.ln1}> Hello !</Header>
      <Header style={styles.ln2}>Welcome back.</Header>

      <View style={{
        marginLeft: 3,
        width: '100%',
        
      }}>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={setEmail}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={{
          width: '100%',
          
  backgroundColor: theme.colors.surface,
        }}
        />
        </View>

        <View style={styles.inputContainer}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 3
        }}>

        <TouchableOpacity onPress={() =>{
          setPasswordVisibility(!passwordVisibility)
          if(passwordVisibility)
          setRightIcon('eye-off')
          else
          setRightIcon('eye')
        }}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323"/>
        </TouchableOpacity>
          </View>
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={setPassword}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={passwordVisibility}
        />

      </View>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>
      <Button loading={loading} mode="contained" onPress={handleLogin} style={styles.btn}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
        style={styles.btn}
      >
        SIGN UP
      </Button>
      <View style={styles.row}></View>
      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    flexDirection: "column",
  },
  ln1:{
      fontFamily: "Merriweather",

    fontSize: 21,
    color: theme.colors.primary,
    paddingVertical: 12,
  },
  ln2:{
    fontFamily: "Merriweather-bold",

    fontSize: 21,
    color: theme.colors.primary,
    paddingVertical: 12,
  },

  forgotPassword: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  headerStyle: {
    justifyContent: "center",
  },
  inputContainer: {
  flexDirection: 'row-reverse',
  backgroundColor: theme.colors.surface,

  },
  btn:{
    borderWidth: 1,
    borderRadius: 20,
  }
});
