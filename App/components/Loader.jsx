//import liraries
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

// create a component
const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"#0D9276"} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default Loader;
