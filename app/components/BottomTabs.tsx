import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import TotalStats from "../screens/TotalStats";
import RegionStats from "../screens/RegionStats";

export default function Nav() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "total", title: "Total Stats", icon: "earth" },
    { key: "region", title: "Region Stats", icon: "flag" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    total: TotalStats,
    region: RegionStats,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
