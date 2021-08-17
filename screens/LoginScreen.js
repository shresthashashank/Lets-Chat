import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";

const LoginScreen = ({ navigation }) => {
  //Creating state for email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Listener for authstatechange
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log("Email: " + user.email);
        db.collection("users").doc(user.uid).set({
          name: user.displayName,
          avatar: user.photoURL,
          email: user.email,
          uid: user.uid,
        });
        navigation.replace("Home");
        // ...
      } else {
        // User is signed out
        // ...
        //If it is not the top screen , it takes us to the top of the screen
        navigation.canGoBack() && navigation.popToTop();
      }
    });
    return unsubscribe;
  }, [email, password]);

  //Login UserCredential
  const login = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={styles.image}
        source={{
          uri: "https://media.giphy.com/media/QeXLNFPZD7OCMzpa8k/giphy.gif",
        }}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        placeholder="Enter your password"
        autoFocus
        label="Password"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry
      />

      <Button title="Sign in" containerStyle={styles.button} onPress={login} />
      <Button
        title="Register"
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 200,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 300,
    height: 200,
  },
});
