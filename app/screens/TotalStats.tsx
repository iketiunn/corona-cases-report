import * as React from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";

export default function TotalStatsScreen() {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Total Stats"></Appbar.Content>
      </Appbar.Header>

      <Text>TotalStatsScreen</Text>
    </View>
  );
}
