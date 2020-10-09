import * as React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
import HeaderNav from "../components/HeaderNav";
import { fetchSummaryAsync, selectState } from "../store/global";
import { useDispatch, useSelector } from "react-redux";
import RegionStatsCards from "../components/RegionStatsCards";

export default function TotalStatsScreen() {
  // Fetch
  const dispatch = useDispatch();
  const state = useSelector(selectState);
  React.useEffect(() => {
    dispatch(fetchSummaryAsync);
  }, []);

  return (
    <View>
      <HeaderNav title="Region Stats" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.isLoading}
            onRefresh={() => {
              dispatch(fetchSummaryAsync);
            }}
          />
        }
      >
        {state.isLoading && (
          <View style={[s.container, s.horizontal]}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!state.isLoading && Boolean(state.error) && (
          <View style={s.container}>
            <Text
              style={{
                fontSize: 24,
                paddingVertical: 128,
                paddingHorizontal: 48,
              }}
            >
              {" "}
              {state.error}{" "}
            </Text>
          </View>
        )}
        {!state.isLoading && !state.summary && !state.error && (
          <View style={s.container}>
            <Text
              style={{
                fontSize: 24,
                paddingVertical: 128,
                paddingHorizontal: 48,
              }}
            >
              {" "}
              No Data!{" "}
            </Text>
          </View>
        )}
        {state.summary && <RegionStatsCards state={state} />}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
