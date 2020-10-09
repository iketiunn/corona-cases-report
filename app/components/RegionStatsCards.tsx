import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text, IconButton } from "react-native-paper";
import { formatNumber } from "../lib";
import { State } from "../store/global";
// @ts-ignore:
import Flag from "react-native-flags";

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

  return (
    <View>
      {summary.Countries.slice(0, 50).map((c) => {
        return (
          <Card style={s.card} key={c.CountryCode}>
            <Card.Title
              title={c.Country}
              subtitle={state.updatedAt}
              titleNumberOfLines={2}
              subtitleNumberOfLines={2}
              style={{
                width: "100%",
              }}
              left={() => <Flag code={c.CountryCode} size={32} />}
              rightStyle={{
                width: "35%",
              }}
              right={() => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Card.Content style={{ marginRight: "auto" }}>
                    <Text style={{ color: totalColor }}>
                      {formatNumber(
                        c.TotalConfirmed + c.TotalRecovered + c.TotalDeaths
                      )}
                    </Text>
                  </Card.Content>
                  <IconButton icon="chevron-down" />
                  <View />
                </View>
              )}
            ></Card.Title>
          </Card>
        );
      })}
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
    justifyContent: "center",
    alignItems: "center",
  },
});
