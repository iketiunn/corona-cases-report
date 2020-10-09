import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { IconButton, List, Portal, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { formatNumber } from "../lib";
import { selectState, updateIsBackdropVisible } from "../store/global";
// @ts-ignore:
import Flag from "react-native-flags";

const BottomActionSheet = (props: React.HTMLProps<BottomSheet>, ref: any) => {
  const dispatch = useDispatch();
  const dispatchBackdropOff = () => dispatch(updateIsBackdropVisible(false));
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
        right={(ps) => (
          <IconButton
            icon="close"
            color="white"
            size={22}
            onPress={() => {
              dispatchBackdropOff();
              ref.current.snapTo(0);
            }}
          />
        )}
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
      {state.isBackdropVisible && (
        <TouchableHighlight
          onPress={() => {
            dispatchBackdropOff();
            ref.current.snapTo(0);
          }}
          style={{ flex: 1, backgroundColor: "black", opacity: 0.8 }}
        >
          <></>
        </TouchableHighlight>
      )}
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
