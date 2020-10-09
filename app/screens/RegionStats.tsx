import * as React from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";

export default function RegionScreen() {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Region Stats"></Appbar.Content>
      </Appbar.Header>

      <Text>Region Stats</Text>
    </View>
  );
}
