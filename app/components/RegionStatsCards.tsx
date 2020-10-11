import React from "react";
import {
  View,
  StyleSheet,
  VirtualizedList,
  RefreshControl,
} from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import { colors, formatNumber } from "../lib";
import {
  Country,
  fetchSummaryAsync,
  selectState,
  updateIsBackdropVisible,
  updateSelectedCountry,
} from "../store/global";
// @ts-ignore:
import Flag from "react-native-flags";
import BottomActionSheet from "./BottomActionSheet";
import { useSelector, useDispatch } from "react-redux";

export default function TotalStatsCard() {
  const dispatch = useDispatch();
  const dispatchSelectCountry = (c: Country) =>
    dispatch(updateSelectedCountry(c));
  const dispatchBackdrop = () => dispatch(updateIsBackdropVisible(true));
  const state = useSelector(selectState);
  if (!state.summary) return <></>;

  const sheetRef = React.useRef<BottomSheet>(null);

  const countries = state.summary.Countries;

  const List = React.memo(() => (
    <VirtualizedList
      data={countries}
      initialNumToRender={24}
      refreshControl={
        <RefreshControl
          refreshing={state.isLoading}
          onRefresh={() => {
            dispatch(fetchSummaryAsync);
          }}
        />
      }
      renderItem={({ item: c }) => (
        <Card
          style={s.card}
          key={c.CountryCode}
          onPress={() => {
            dispatchSelectCountry(c);
            dispatchBackdrop();
            sheetRef?.current?.snapTo(1);
            console;
          }}
        >
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
              width: "40%",
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
                  <Text style={{ color: colors.total }}>
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
      )}
      keyExtractor={(item: Country) => item.CountryCode}
      getItemCount={() => countries.length}
      getItem={(data, index) => data[index]}
    />
  ));

  return (
    <>
      <List />
      <BottomActionSheet ref={sheetRef} />
    </>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    zIndex: 999,
    position: "absolute",
    backgroundColor: "#000",
  },
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
