import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { PieChart } from "react-native-svg-charts";
import { Text as SVGText } from "react-native-svg";
import { formatNumber } from "../lib";
import { State } from "../store/global";

const totalColor = "#4ba9c8";
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
const recoverColor = "#4bc86a";
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

interface Props {
  state: State;
}
export default function TotalStatsCard({ state }: Props) {
  if (!state.summary) return <View></View>;

  const summary = state.summary;

  const data = [
    {
      key: 1,
      amount: formatNumber(state.summary.Global.TotalConfirmed),
      name: "Confirmed",
      svg: { fill: bioColor },
    },
    {
      key: 2,
      amount: formatNumber(state.summary.Global.TotalRecovered),
      name: "Recovered",
      svg: { fill: recoverColor },
    },
    {
      key: 3,
      amount: formatNumber(state.summary.Global.TotalDeaths),
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
    <View>
      <PieChart
        style={{ height: 200, marginVertical: 6 }}
        valueAccessor={({ item }) => Number(item.amount.replace(/,/g, ""))}
        data={data}
        outerRadius={"95%"}
      >
        <Labels />
      </PieChart>
      <Card style={s.card}>
        <Card.Title
          title="Total Confirmed Cases"
          subtitle={state.updatedAt}
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
              <Text style={{ color: totalColor }}>
                {formatNumber(
                  summary.Global.TotalConfirmed +
                    summary.Global.TotalRecovered +
                    summary.Global.TotalDeaths
                )}
              </Text>
            </Card.Content>
          )}
        ></Card.Title>
      </Card>

      <Card style={s.card}>
        <Card.Title
          title="Current Infected"
          subtitle={state.updatedAt}
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
              <Text style={{ color: bioColor }}>
                {formatNumber(summary.Global.TotalConfirmed)}
              </Text>
            </Card.Content>
          )}
        ></Card.Title>
      </Card>

      <Card style={s.card}>
        <Card.Title
          title="Recovered"
          subtitle={state.updatedAt}
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
              <Text style={{ color: recoverColor }}>
                {formatNumber(summary.Global.TotalRecovered)}
              </Text>
            </Card.Content>
          )}
        ></Card.Title>
      </Card>

      <Card style={s.card}>
        <Card.Title
          title="Deaths"
          subtitle={state.updatedAt}
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
              <Text style={{ color: deathColor }}>
                {formatNumber(summary.Global.TotalDeaths)}
              </Text>
            </Card.Content>
          )}
        ></Card.Title>
      </Card>
    </View>
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
    flex: 1,
    textAlign: "center",
    margin: 24,
  },
});
