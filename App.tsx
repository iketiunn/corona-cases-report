import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./app/store";
import { Appbar, Portal } from "react-native-paper";
import Nav from "./app/components/Nav";

export default function App() {
  return (
    <Provider store={store}>
      <Portal.Host>
        <StatusBar style="auto" />
        <Nav />
      </Portal.Host>
    </Provider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
