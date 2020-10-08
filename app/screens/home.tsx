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
// [x] There should also be a floating button to switch between Celsius and Fahrenheit.
//   All the temperatures (including the values in the table and input text field)
//   should be converted to the corresponding temperature unit.
// [x] If the temperature format in the table should be like 37 °C or 100 °F

// [x] You should use Redux to manage the state.
// [ ] The temperature cannot be less than 30 °C or higher than 50 °C
//     for Fahrenheit degree, the temperature cannot be less than 86 °F or higher than 122 °F.
//     If the user input temperature is beyond the range,
//     show an error popup with meaningful message text.
// [x] The default temperature unit is Celsius.
// [x] All the state just needs to be stored in memory,
//     so it is expected that the records are gone if we kill the app and reopen it.
// [x] The screen should be responsive to match different screen sizes of devices.
// [x] The app should be able to run on both iOS and Android.

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  DataTable,
  FAB,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
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
  toggleTempScale,
  selectIsDialogVisible,
  showDialog,
  hideDialog,
} from "../store/global";
import { cTof, validateC, validateF } from "../lib";

export default function Home() {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const dispatchUpdateName = (n: string) => dispatch(updateName(n));
  const temp = useSelector(selectTemp);
  const dispatchUpdateTemp = (t: string) => dispatch(updateTemp(t));
  const tempScale = useSelector(selectTempScale);
  const dispatchToggleTempScale = () => dispatch(toggleTempScale());
  const data = useSelector(selectData);
  const dispatchAddDataRow = (d: DataRow) => dispatch(addDataRow(d));
  const isDialogVisible = useSelector(selectIsDialogVisible);
  const dispatchShowDialog = () => dispatch(showDialog());
  const dispatchHideDialog = () => dispatch(hideDialog());

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
          if (name && temp) {
            const validate = tempScale === "celsius" ? validateC : validateF;
            if (validate(temp)) {
              dispatchAddDataRow({
                name,
                temp,
                date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              });
            } else {
              dispatchShowDialog();
            }
          }
        }}
      >
        Submit
      </Button>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={dispatchHideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              For Celsius degree, The temperature cannot be less than 30 °C or
              higher than 50 °C.
            </Paragraph>
            <Paragraph>
              For Fahrenheit degree, the temperature cannot be less than 86 °F
              or higher than 122 °F.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dispatchHideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
              <DataTable.Cell>{parseFloat(t).toFixed(2) + ts}</DataTable.Cell>
              <DataTable.Cell>{d.date}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <FAB
        style={s.fab}
        small
        onPress={dispatchToggleTempScale}
        icon={
          tempScale === "celsius"
            ? "temperature-fahrenheit"
            : "temperature-celsius"
        }
      />
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
