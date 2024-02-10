//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader.jsx";
import WelcomeScreen from "./WelcomeScreen.jsx";
// create a component
const HomeScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getUser = async () => {
    setIsLoading(true);
    const data = await AsyncStorage.getItem("user");
    const resultNotes = await AsyncStorage.getItem("notes");

    if (!data) {
      setUser(null);
    } else {
      let parse = await JSON.parse(data);
      setUser(parse);
    }

    if (resultNotes) {
      setNotes(JSON.parse(resultNotes));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [route]);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  const handleDelete = async (index) => {
    let notesOld = await AsyncStorage.getItem("notes");
    let notes = JSON.parse(notesOld);
    notes.splice(index, 1);
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    setNotes(notes);
  };

  const handleSearch = async () => {
    let notesOld = await AsyncStorage.getItem("notes");
    let notes = JSON.parse(notesOld);
    let filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {user ? (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={"light-content"} />
          <View style={styles.header}>
            <Text style={styles.headerText}>Hai 👋 , {user?.name}</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateNote")}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>➕</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                style={{ ...styles.headerButton, backgroundColor: "red" }}
              >
                <Text style={styles.headerButtonText}>{"->"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.notes_container}>
            <View style={styles.formSearch}>
              <TextInput
                placeholder="Search..."
                value={keyword}
                keyboardType="default"
                onChangeText={setKeyword}
                style={styles.input}
              />
              <TouchableOpacity onPress={handleSearch} style={styles.button}>
                <Text style={styles.buttonText}>🔎</Text>
              </TouchableOpacity>
            </View>
            {notes?.length === 0 ? (
              <Text style={styles.noNotes}>You don't have any notes yet.</Text>
            ) : (
              <View style={styles.notes}>
                <Text style={styles.title}>Notes</Text>
                {notes?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditNote", {
                        noteIndex: index,
                      })
                    }
                    key={index}
                    style={styles.noteCard}
                  >
                    <View style={styles.noteContent}>
                      <Text style={styles.noteTitle}>{item?.title}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDelete(index)}
                      style={styles.buttonDelete}
                    >
                      <Text style={styles.deleteText}>🗑️</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <WelcomeScreen setUser={setUser} />
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF6E9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "#0D9276",
    position: "absolute",
    top: 0,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    color: "#0D9276",
    width: 25,
    height: 25,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
  },
  headerButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notes_container: {
    width: "100%",
    marginTop: 100,
    padding: 10,
  },
  noNotes: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  notes: {
    width: "100%",
    gap: 10,
  },
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  noteCard: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteText: {
    fontSize: 24,
  },
  formSearch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: "#0D9276",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

//make this component available to the app
export default HomeScreen;
