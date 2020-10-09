import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Avatar,
  Button,
  Card,
  Paragraph,
  Title,
} from "react-native-paper";
import HeaderNav from "../components/HeaderNav";
import dayjs from "dayjs";

const Clip = (props: any) => <Avatar.Icon {...props} icon="clipboard-text" />;
const Bio = (props: any) => <Avatar.Icon {...props} icon="biohazard" />;
const Recover = (props: any) => <Avatar.Icon {...props} icon="heart-pulse" />;
const Death = (props: any) => <Avatar.Icon {...props} icon="skull" />;

export default function TotalStatsScreen() {
  return (
    <View>
      <HeaderNav title="Total Stats" />
      <View>
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
    backgroundColor: "#fdfdfdfd",
  },
});
