import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { Portal } from "react-native-paper";
import BottomTabs from "./app/components/BottomTabs";

export default function App() {
  return (
    <Provider store={store}>
      <Portal.Host>
        <StatusBar style="auto" />
        <BottomTabs />
      </Portal.Host>
    </Provider>
  );
}
