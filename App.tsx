import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import Home from "./app/screens/home";
import { Provider } from "react-redux";
import store from "./app/store";
import { Appbar, Portal } from "react-native-paper";

export default function App() {
  return (
    <Provider store={store}>
      <Portal.Host>
        <Appbar.Header>
          <Appbar.Content title="Topcoder Body Temperature Report"></Appbar.Content>
        </Appbar.Header>
        <StatusBar style="auto" />
        {/* Place your screen */}
        <Home />
      </Portal.Host>
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
