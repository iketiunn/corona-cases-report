import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { IconButton, List, Portal, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { colors, formatNumber } from "../lib";
import { selectState, updateIsBackdropVisible } from "../store/global";
// @ts-ignore:
import Flag from "react-native-flags";

const BottomActionSheet = (props: React.HTMLProps<BottomSheet>, ref: any) => {
  const dispatch = useDispatch();
  const dispatchBackdropOff = () => dispatch(updateIsBackdropVisible(false));
  const state = useSelector(selectState);
  const theme = useTheme();
  const c = state.selectedCountry;

  const renderHeader = () => (
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
  );
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        height: 1200,
      }}
    >
      <List.Item
        title="Total Confirmed Cases"
        left={(pps) => (
          <List.Icon
            {...pps}
            icon="clipboard-text-outline"
            color={colors.total}
          />
        )}
        right={() => (
          <Text style={{ alignSelf: "center", color: colors.total }}>
            {formatNumber(Number(c?.TotalConfirmed))}
          </Text>
        )}
      />
      <List.Item
        title="Currently Infected"
        left={(pps) => (
          <List.Icon {...pps} icon="biohazard" color={colors.bio} />
        )}
        right={() => (
          <Text style={{ alignSelf: "center", color: colors.bio }}>
            {formatNumber(
              Number(c?.TotalConfirmed) -
                Number(c?.TotalRecovered) -
                Number(c?.TotalDeaths) || 0
            )}
          </Text>
        )}
      />
      <List.Item
        title="Recovered"
        left={(pps) => (
          <List.Icon {...pps} icon="heart-pulse" color={colors.recover} />
        )}
        right={() => (
          <Text style={{ alignSelf: "center", color: colors.recover }}>
            {formatNumber(c?.TotalRecovered || 0)}
          </Text>
        )}
      />
      <List.Item
        title="Deaths"
        left={(pps) => <List.Icon {...pps} icon="skull" color={colors.death} />}
        right={() => (
          <Text style={{ alignSelf: "center", color: colors.death }}>
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
        enabledContentGestureInteraction={false}
        onCloseEnd={dispatchBackdropOff}
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
    </Portal>
  );
};
export default React.forwardRef<BottomSheet>(BottomActionSheet);
