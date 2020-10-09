import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import {
  DefaultTheme,
  Portal,
  Provider as PaperProvider,
} from "react-native-paper";
import BottomTabs from "./app/components/BottomTabs";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#3498db",
    // accent: "#f1c40f",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <Portal.Host>
          <StatusBar style="auto" />
          <BottomTabs />
        </Portal.Host>
      </Provider>
    </PaperProvider>
  );
}
