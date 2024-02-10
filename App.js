import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./App/screens/WelcomeScreen";
import HomeScreen from "./App/screens/HomeScreen";
import { ActivityIndicator, View } from "react-native";
import UserScreen from "./App/screens/UserScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateNoteScreen from "./App/screens/CreateNoteScreen";
import EditNoteScreen from "./App/screens/EditNoteScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getUser = async () => {
    setIsLoading(true);
    const data = await AsyncStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(user));
      setIsLoading(false);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen
          name="Home"
          initialParams={{ user }}
          component={HomeScreen}
        />
        <Stack.Screen name="User" component={UserScreen} />

        <Stack.Screen
          name="CreateNote"
          options={{
            title: "Create Note",
          }}
          component={CreateNoteScreen}
        />
        <Stack.Screen
          name="EditNote"
          options={{
            title: "Edit Note",
          }}
          component={EditNoteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
