import * as React from "react";
import * as Sharing from "expo-sharing";
import { Appbar } from "react-native-paper";
import { captureScreen } from "react-native-view-shot";

interface Props {
  title: string;
}
export default function RegionScreen({ title }: Props) {
  return (
    <Appbar.Header>
      <Appbar.Content title={title}></Appbar.Content>
      <Appbar.Action
        icon="share-variant"
        onPress={async () => {
          try {
            const screenUrl = await captureScreen({
              format: "jpg",
              quality: 0.8,
            });
            await Sharing.shareAsync(screenUrl);
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </Appbar.Header>
  );
}
