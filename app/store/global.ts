import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { AppDispatch, RootState } from ".";

interface Summary {
  Global: Global;
  Countries: Country[];
}
interface Country {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
}
interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

const initialState: {
  summary?: Summary
  updatedAt: string;
  isLoading: boolean;
  error: string
} = {
  isLoading: false,
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  error: ''
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateIsLoading: (state) => {
      state.isLoading = true
    },
    updateSummary: (state, action: PayloadAction<Summary | undefined>) => {
      state.summary = action.payload;
      state.isLoading = false
      state.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    updateError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
      state.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  },
});
export type State = typeof initialState

export const selectState = (state: RootState) => state.global;

export const fetchSummaryAsync = (dispatch: AppDispatch) => {
  dispatch(globalSlice.actions.updateSummary(undefined))
  dispatch(globalSlice.actions.updateIsLoading())
  // Start fetch
  fetch('https://api.covid19api.com/summary')
    .then(res => res.json())
    .then(sum => {
      dispatch(globalSlice.actions.updateSummary(sum))
    })
    .catch(err =>  console.error(err))
}

export default globalSlice.reducer;
