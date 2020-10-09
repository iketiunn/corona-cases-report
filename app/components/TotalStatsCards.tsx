import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { PieChart } from "react-native-svg-charts";
import { Text as SVGText } from "react-native-svg";
import { colors, formatNumber } from "../lib";
import { State } from "../store/global";

const Clip = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="clipboard-text-outline"
    color={colors.total}
    theme={{ colors: { primary: "transparent" } }}
  />
);
const Bio = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="biohazard"
    color={colors.bio}
    theme={{ colors: { primary: "transparent" } }}
  />
);
const Recover = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="heart-pulse"
    color={colors.recover}
    theme={{ colors: { primary: "transparent" } }}
  />
);
const Death = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="skull"
    color={colors.death}
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
      svg: { fill: colors.bio },
    },
    {
      key: 2,
      amount: formatNumber(state.summary.Global.TotalRecovered),
      name: "Recovered",
      svg: { fill: colors.recover },
    },
    {
      key: 3,
      amount: formatNumber(state.summary.Global.TotalDeaths),
      name: "Death",
      svg: { fill: colors.death },
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
              <Text style={{ color: colors.total }}>
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
              <Text style={{ color: colors.bio }}>
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
              <Text style={{ color: colors.recover }}>
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
              <Text style={{ color: colors.death }}>
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
