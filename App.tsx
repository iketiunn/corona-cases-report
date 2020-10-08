import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Home from "./app/screens/home";
import { Provider } from "react-redux";
import store from "./app/store";
import { Appbar } from "react-native-paper";

export default function App() {
  return (
    <Provider store={store}>
      <Appbar.Header>
        <Appbar.Content title="Topcoder Body Temperature Report"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* Place your screen */}
        <Home />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
