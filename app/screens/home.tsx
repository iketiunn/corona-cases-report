// The app only contains a single screen, which contains
//
// [x] A header bar, the title should be "Topcoder Body Temperature Report".
// [x] A form that includes the following input controls.
// [x] A text field for inputting the name.
// [x] A text field for inputting the body temperature,
//   it can be in either Celsius or Fahrenheit.
//   You can only input numbers in this text field,
//   the number can only have two decimals at maximum.
// [x] A submit button for reporting the temperature record.
// [x] Once the submit button is clicked, in the below there will be a table with three columns.
//   - Name
//   - Body temperature
//   - Reported time
// [x] Each record is in a row.
// - There should also be a floating button to switch between Celsius and Fahrenheit.
//   All the temperatures (including the values in the table and input text field)
//   should be converted to the corresponding temperature unit.
// [x] If the temperature format in the table should be like 37 °C or 100 °F

import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, DataTable, FAB } from "react-native-paper";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  selectName,
  updateName,
  selectTemp,
  updateTemp,
  selectData,
  addDataRow,
  selectTempScale,
  DataRow,
} from "../store/global";
import { cTof } from "../lib";

export default function Home() {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const dispatchUpdateName = (n: string) => dispatch(updateName(n));
  const temp = useSelector(selectTemp);
  const dispatchUpdateTemp = (t: string) => dispatch(updateTemp(t));
  const tempScale = useSelector(selectTempScale);

  const data = useSelector(selectData);
  const dispatchAddDataRow = (d: DataRow) => dispatch(addDataRow(d));

  return (
    <View style={s.container}>
      <TextInput
        style={s.input}
        label="Name"
        mode="flat"
        value={name}
        onChangeText={dispatchUpdateName}
      />
      <TextInput
        keyboardType="numeric"
        clearButtonMode="while-editing"
        style={s.input}
        label={`Body Temperature(${tempScale === "celsius" ? "°C" : "°F"})`}
        value={temp}
        onChangeText={(t) => {
          const clean = t.replace(/[^0-9|\.]/g, "");
          if (clean === ".") return;
          if (clean.match(/\d+\.\d\d\d/)) return;

          dispatchUpdateTemp(clean);
        }}
      />

      <Button
        mode="contained"
        style={s.button}
        onPress={() => {
          dispatchAddDataRow({
            name,
            temp,
            date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          });
        }}
      >
        Submit
      </Button>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Body Temperature</DataTable.Title>
          <DataTable.Title>Reported Time</DataTable.Title>
        </DataTable.Header>

        {data.map((d) => {
          const t = tempScale === "celsius" ? d.temp : cTof(d.temp);
          const ts = tempScale === "celsius" ? "°C" : "°F";
          return (
            <DataTable.Row key={d.name + d.date}>
              <DataTable.Cell>{d.name}</DataTable.Cell>
              <DataTable.Cell>
                {parseFloat(d.temp).toFixed(2) + ts}
              </DataTable.Cell>
              <DataTable.Cell>{d.date}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      {/* <FAB style={s.fab} small icon="temperature-celsius" /> */}
      <FAB style={s.fab} small icon="temperature-fahrenheit" />
    </View>
  );
}

const s = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: -16,
  },
  input: {
    marginBottom: 16,
  },
  button: {},
  container: {
    flex: 1,
    textAlign: "center",
    margin: 24,
  },
});
