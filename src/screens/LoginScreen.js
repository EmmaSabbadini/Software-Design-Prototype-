import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";

import { TextInput} from 'react-native-paper'
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
        selectionColor={theme.colors.primary}
        style={{
          width: '100%',
          marginRight: 15,
          
  backgroundColor: theme.colors.surface,
        }}
        />

        <View style={styles.inputContainer}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          backgroundColor: theme.colors.surface
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
        selectionColor={theme.colors.primary}
        style={{
          width : '100%',
          marginTop : 5,
          backgroundColor : theme.colors.surface
        }}
        />

      </View>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>
      <Button loading={loading} mode="contained" onPress={handleLogin} style={styles.btn1}>
        Login
      </Button>
      <TouchableOpacity
        style={styles.btn2}
        onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={{top: 13, color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>SIGN UP</Text>
      </TouchableOpacity>
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
    fontSize: 21,
    color: theme.colors.primary,
    paddingVertical: 12,
  },
  ln2:{
    fontSize: 21,
    color: theme.colors.primary,
    paddingVertical: 12,
  },

  forgotPassword: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
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
  btn1:{
    borderRadius: 20,
    backgroundColor: 'black',
  },
  btn2:{
    borderRadius: 20,
    height: 50,
    width: 300,
    backgroundColor: 'lightgrey',
  }
});
