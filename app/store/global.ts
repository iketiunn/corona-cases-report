import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { TempScale } from "../interface";
import { fToc } from "../lib";

export interface DataRow {
  name: string;
  temp: string;
  date: string;
}

const initialState: {
  name: string;
  temp: string;
  tempScale: TempScale;
  data: DataRow[];
} = {
  name: "",
  temp: "", // All in celsius
  tempScale: "celsius",
  data: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateTemp: (state, action: PayloadAction<string>) => {
      state.temp = action.payload;
    },
    toggleTempScale: (state) => {
      state.tempScale =
        state.tempScale === "celsius" ? "fahrenheit" : "celsius";
    },
    addDataRow: (state, action: PayloadAction<DataRow>) => {
      action.payload.temp =
        state.tempScale === "celsius"
          ? action.payload.temp
          : fToc(action.payload.temp);
      state.data = [...state.data, action.payload];
      state.name = "";
      state.temp = "";
    },
    clearData: (state) => {
      state.data = [];
    },
  },
});

export const selectName = (state: RootState) => state.global.name;
export const selectTempScale = (state: RootState) => state.global.tempScale;
export const selectTemp = (state: RootState) => state.global.temp;
export const selectData = (state: RootState) => state.global.data;

export const {
  updateName,
  updateTemp,
  toggleTempScale,
  addDataRow,
  clearData,
} = globalSlice.actions;

export default globalSlice.reducer;
