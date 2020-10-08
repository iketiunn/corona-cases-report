// The app only contains a single screen, which contains
//
// - A header bar, the title should be "Topcoder Body Temperature Report".
// - A form that includes the following input controls.
// - A text field for inputting the name.
// - A text field for inputting the body temperature,
//   it can be in either Celsius or Fahrenheit.
//   You can only input numbers in this text field,
//   the number can only have two decimals at maximum.
// - A submit button for reporting the temperature record.
// - Once the submit button is clicked, in the below there will be a table with three columns.
//   - Name
//   - Body temperature
//   - Reported time
// - Each record is in a row.
// - There should also be a floating button to switch between Celsius and Fahrenheit.
//   All the temperatures (including the values in the table and input text field)
//   should be converted to the corresponding temperature unit.
// - If the temperature format in the table should be like 37 °C or 100 °F

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, selectCount } from "../store/counterReducer";

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  function dispatchIncrement() {
    dispatch(increment());
  }
  function dispatchDecrement() {
    dispatch(decrement());
  }

  return (
    <View>
      <Text>Open up screens/home.tsx !!!</Text>
      <Text style={styles.container}>{count}</Text>
      <Button title="+" onPress={dispatchIncrement} />
      <Button title="-" onPress={dispatchDecrement} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    margin: 12,
  },
});
