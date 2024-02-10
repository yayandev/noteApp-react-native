//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create a component
const EditNoteScreen = ({ navigation, route }) => {
  const { noteIndex } = route.params;
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    title: "",
    note: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage("");
    if (values.title.length === 0 || values.note.length === 0) {
      setIsLoading(false);
      setMessage("Please fill all the fields");
      return;
    }

    let notesOld = await AsyncStorage.getItem("notes");

    if (notesOld) {
      let notes = JSON.parse(notesOld);
      notes[noteIndex] = values;
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
    }
    navigation.navigate("Home");
    setIsLoading(false);
  };

  const getNote = async () => {
    let notesOld = await AsyncStorage.getItem("notes");
    if (notesOld) {
      let notes = JSON.parse(notesOld);
      setValues(notes[noteIndex]);
    }
  };

  useEffect(() => {
    getNote();
  }, [noteIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      <TextInput
        placeholder="Title"
        value={values.title}
        onChangeText={(text) => setValues({ ...values, title: text })}
        style={{
          ...styles.input,
          borderBottomWidth: 2,
          borderBottomColor: "#000",
        }}
      />
      <TextInput
        placeholder="Notes"
        style={styles.input}
        multiline={true}
        value={values.note}
        onChangeText={(text) => setValues({ ...values, note: text })}
        numberOfLines={10}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          disabled={isLoading}
          style={styles.buttonBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#0D9276",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  buttonBack: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginLeft: 10,
  },
});

//make this component available to the app
export default EditNoteScreen;
