import * as React from "react";
import { Appbar } from "react-native-paper";

interface Props {
  title: string;
}
export default function RegionScreen({ title }: Props) {
  return (
    <Appbar.Header>
      <Appbar.Content title={title}></Appbar.Content>
    </Appbar.Header>
  );
}
