import React, { useState, useLayoutEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { auth, db } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  //Creating state for email and password fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setimageURL] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  //Register function
  const register = async ({ navigation }) => {
    setName("");
    setEmail("");
    setPassword("");
    setimageURL("");

    const results = await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.updateProfile({
          displayName: name,
          photoURL: imageURL || "https://example.com/jane-q-user/profile.jpg",
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    // navigation.replace("Chat");
  };

  const pickImageAndUpload = () => {
    launchImageLibrary({ quality: 0.5 }, (fileobj) => {
      console.log(fileobj);
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text h3 style={{ marginBottom: 50 }}>
          Create your Chat Accounts 💬
        </Text> */}
        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter your name"
            label="Name"
            leftIcon={{ type: "material", name: "badge" }}
            value={name}
            onChangeText={(text) => {
              setName(text);
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
            label="Password"
            leftIcon={{ type: "material", name: "lock" }}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry
          />
          <Input
            placeholder="Enter your imageURL (optional)"
            label="Profile Picture"
            leftIcon={{ type: "material", name: "face" }}
            value={imageURL}
            onChangeText={(URL) => {
              setimageURL(URL);
            }}
            ContainerStyle={{ margin: 10 }}
            // onSubmitEditing={register}
          />
        </View>

        {/* <Button
          title="Select Profile Picture"
          containerStyle={styles.button}
          onPress={() => {
            pickImageAndUpload();
          }}
          raised
        /> */}
        <Button
          title="Register"
          containerStyle={styles.button}
          onPress={register}
          raised
        />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 300,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 400,
  },
});
