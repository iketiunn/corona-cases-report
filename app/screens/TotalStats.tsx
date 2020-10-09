import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Avatar, Card } from "react-native-paper";
import { Text as SVGText } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";

import HeaderNav from "../components/HeaderNav";
import dayjs from "dayjs";

const totalColor = "lightblue";
const Clip = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="clipboard-text-outline"
    color={totalColor}
    theme={{ colors: { primary: "transparent" } }}
  />
);
const bioColor = "#ff8280";
const Bio = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="biohazard"
    color={bioColor}
    theme={{ colors: { primary: "transparent" } }}
  />
);
const recoverColor = "#90ee90";
const Recover = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="heart-pulse"
    color={recoverColor}
    theme={{ colors: { primary: "transparent" } }}
  />
);
const deathColor = "#939393";
const Death = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="skull"
    color={deathColor}
    theme={{ colors: { primary: "transparent" } }}
  />
);

export default function TotalStatsScreen() {
  const data = [
    {
      key: 1,
      amount: 50,
      name: "Confirmed",
      svg: { fill: bioColor },
    },
    {
      key: 2,
      amount: 50,
      name: "Recovered",
      svg: { fill: recoverColor },
    },
    {
      key: 3,
      amount: 100,
      name: "Death",
      svg: { fill: deathColor },
    },
  ];

  const Labels = ({
    slices,
    height,
    width,
  }: {
    slices: any;
    height: number;
    width: number;
  }) => {
    return slices.map((slice: any, index: number) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <SVGText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="black"
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={14}
          stroke={"black"}
          strokeWidth={0.4}
        >
          {data.name + ":" + data.amount}
        </SVGText>
      );
    });
  };

  return (
    <ScrollView>
      <HeaderNav title="Total Stats" />
      <View>
        <PieChart
          style={{ height: 200, marginVertical: 6 }}
          valueAccessor={({ item }) => item.amount}
          data={data}
          outerRadius={"95%"}
        >
          <Labels />
        </PieChart>
        <Card style={s.card}>
          <Card.Title
            title="Total Confirmed Cases"
            subtitle={dayjs().format()}
            titleNumberOfLines={2}
            subtitleNumberOfLines={2}
            style={{
              width: "100%",
            }}
            left={Clip}
            rightStyle={{
              width: "35%",
            }}
            right={() => (
              <Card.Content style={{ justifyContent: "center" }}>
                <Text>26,476,331</Text>
              </Card.Content>
            )}
          ></Card.Title>
        </Card>

        <Card style={s.card}>
          <Card.Title
            title="Current infected cases"
            subtitle={dayjs().format()}
            titleNumberOfLines={2}
            subtitleNumberOfLines={2}
            style={{
              width: "100%",
            }}
            left={Bio}
            rightStyle={{
              width: "35%",
            }}
            right={() => (
              <Card.Content style={{ justifyContent: "center" }}>
                <Text>26,476,331</Text>
              </Card.Content>
            )}
          ></Card.Title>
        </Card>

        <Card style={s.card}>
          <Card.Title
            title="Recovered cases"
            subtitle={dayjs().format()}
            titleNumberOfLines={2}
            subtitleNumberOfLines={2}
            style={{
              width: "100%",
            }}
            left={Recover}
            rightStyle={{
              width: "35%",
            }}
            right={() => (
              <Card.Content style={{ justifyContent: "center" }}>
                <Text>26,476,331</Text>
              </Card.Content>
            )}
          ></Card.Title>
        </Card>

        <Card style={s.card}>
          <Card.Title
            title="Deaths"
            subtitle={dayjs().format()}
            titleNumberOfLines={2}
            subtitleNumberOfLines={2}
            style={{
              width: "100%",
            }}
            left={Death}
            rightStyle={{
              width: "35%",
            }}
            right={() => (
              <Card.Content style={{ justifyContent: "center" }}>
                <Text>26,476,331</Text>
              </Card.Content>
            )}
          ></Card.Title>
        </Card>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  cardContent: {
    textAlign: "center",
  },
  card: {
    display: "flex",
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 4,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fdfdfdfd",
  },
});
