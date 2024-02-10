//import liraries
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create a component
const UserScreen = ({ navigation }) => {
  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.navigate("Welcome");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Text>UserScreen</Text>
      <Button title="Logout" onPress={removeUser} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default UserScreen;
