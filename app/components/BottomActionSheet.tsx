import React from "react";
import { View, Text } from "react-native";
import { List, Portal, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { formatNumber } from "../lib";
import { selectState } from "../store/global";
// @ts-ignore:
import Flag from "react-native-flags";

const BottomActionSheet = (props: React.HTMLProps<BottomSheet>, ref: any) => {
  const state = useSelector(selectState);
  const theme = useTheme();
  const c = state.selectedCountry;

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 1200,
      }}
    >
      <List.Item
        title={c?.Country}
        titleStyle={{ fontSize: 20, fontWeight: "bold", color: "white" }}
        style={{ backgroundColor: theme.colors.primary }}
        left={() => (
          <Flag
            style={{ alignSelf: "center", marginHorizontal: 10 }}
            code={c?.CountryCode}
            size={24}
          />
        )}
        right={(pps) => <List.Icon {...pps} icon="close" color="white" />}
      />
      <List.Item
        title="Total Confirmed Cases"
        left={(pps) => (
          <List.Icon {...pps} icon="clipboard-text-outline" color="#4ba9c8" />
        )}
        right={() => (
          <Text style={{ alignSelf: "center" }}>
            {formatNumber(
              Number(c?.TotalConfirmed) +
                Number(c?.TotalRecovered) +
                Number(c?.TotalDeaths)
            )}
          </Text>
        )}
      />
      <List.Item
        title="Currently Infected"
        left={(pps) => <List.Icon {...pps} icon="biohazard" color="#ff8280" />}
        right={() => (
          <Text style={{ alignSelf: "center" }}>
            {formatNumber(c?.TotalConfirmed || 0)}
          </Text>
        )}
      />
      <List.Item
        title="Recovered"
        left={(pps) => (
          <List.Icon {...pps} icon="heart-pulse" color="#4bc86a" />
        )}
        right={() => (
          <Text style={{ alignSelf: "center" }}>
            {formatNumber(c?.TotalRecovered || 0)}
          </Text>
        )}
      />
      <List.Item
        title="Deaths"
        left={(pps) => <List.Icon {...pps} icon="skull" color="#939393" />}
        right={() => (
          <Text style={{ alignSelf: "center" }}>
            {formatNumber(c?.TotalDeaths || 0)}
          </Text>
        )}
      />
    </View>
  );

  return (
    <Portal>
      <BottomSheet
        {...props}
        ref={ref}
        snapPoints={[0, "40%"]}
        initialSnap={0}
        borderRadius={10}
        renderContent={renderContent}
      />
    </Portal>
  );
};
export default React.forwardRef<BottomSheet>(BottomActionSheet);
