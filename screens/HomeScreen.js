import React, { useLayoutEffect, useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar, Button, Image } from "react-native-elements";
import { auth, db } from "../firebase";
import { TouchableOpacity } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: auth.currentUser.displayName,
      // headerStyle: { backgroundColor: "orange" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
            <AntDesign name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getUsers = async () => {
    const querySnap = await db
      .collection("users")
      .where("name", "!=", auth.currentUser.displayName)
      .get();
    const allUsers = querySnap.docs.map((docSnap) => docSnap.data());
    console.log("USers:", allUsers);
    setUsers(allUsers);
  };

  useEffect(() => {
    getUsers();
    console.log("stste user:", users);
  }, []);

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChatPrivate");
        }}
        activeOpacity={0.5}
      >
        <View style={styles.card}>
          <Image source={{ uri: item.avatar }} style={styles.img} />
          <View style={styles.text}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat");
        }}
        activeOpacity={0.5}
      >
        <CustomListItem />
      </TouchableOpacity>
      <View>
        <FlatList
          data={users}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.uid}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  card: {
    flexDirection: "row",
    margin: 3,
    padding: 4,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderTopColor: "grey",
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
});
