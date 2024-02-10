//import liraries
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";

// create a component
const WelcomeScreen = ({ setUser }) => {
  const [name, setName] = useState("");
  const onChange = (e) => setName(e);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      let data = {
        name: name,
      };
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.welcome}>Welcome to notes!</Text>
        <TextInput
          placeholder="Enter your name to continue"
          onChangeText={onChange}
          style={styles.input}
        />
        <TouchableOpacity
          disabled={name.length < 3 ? true : false}
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>
          Made with <Text style={{ color: "red" }}>❤️</Text> by Yayan
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFF6E9",
  },
  form: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#0D9276",
    alignItems: "center",
    padding: 10,
    height: 400,
  },
  welcome: {
    color: "#fff",
    fontSize: 30,
    marginTop: 15,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#FFF6E9",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#40A2E3",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    color: "#fff",
    fontSize: 12,
    position: "absolute",
    bottom: 10,
  },
});

//make this component available to the app
export default WelcomeScreen;
