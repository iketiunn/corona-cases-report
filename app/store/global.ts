import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { AppDispatch, RootState } from ".";
import { sleep } from "../lib";

interface Summary {
  Global: Global;
  Countries: Country[];
}
export interface Country {
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
  summary?: Summary;
  updatedAt: string;
  isLoading: boolean;
  error: string;
  selectedCountry?: Country;
  isBackdropVisible: boolean;
} = {
  isLoading: false,
  updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  error: "",
  isBackdropVisible: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateIsLoading: (state) => {
      state.isLoading = true;
    },
    updateSummary: (state, action: PayloadAction<Summary | undefined>) => {
      if (action.payload) {
        state.summary = action.payload;
        // Sort countries
        state.summary.Countries = action.payload.Countries.slice().sort(
          (a, b) => b.TotalConfirmed - a.TotalConfirmed
        );
      } else {
        state.summary = undefined;
      }
      state.isLoading = false;
      state.updatedAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    updateError: (state, action: PayloadAction<string>) => {
      state.summary = state.summary;
      state.error = action.payload;
      state.isLoading = false;
      state.updatedAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    updateSelectedCountry: (state, action: PayloadAction<Country>) => {
      state.selectedCountry = action.payload;
    },
    updateIsBackdropVisible: (state, action: PayloadAction<boolean>) => {
      state.isBackdropVisible = action.payload;
    },
  },
});
export type State = typeof initialState;

export const selectState = (state: RootState) => state.global;
export const {
  updateSelectedCountry,
  updateIsBackdropVisible,
  updateSummary,
} = globalSlice.actions;

export const fetchSummaryAsync = (dispatch: AppDispatch) => {
  dispatch(globalSlice.actions.updateSummary(undefined));
  dispatch(globalSlice.actions.updateIsLoading());
  // Start fetch, timeout 10s
  Promise.race([
    fetch("https://api.covid19api.com/summary")
      .then((res) => res.json())
      .then(async (json) => {
        // Mock network delay
        await sleep(3000);
        return json;
      })
      .then((sum) => {
        // sum = {
        //   "Date": "0001-01-01T00:00:00Z",
        //   "Global":  {
        //     "NewConfirmed": 0,
        //     "NewDeaths": 0,
        //     "NewRecovered": 0,
        //     "TotalConfirmed": 0,
        //     "TotalDeaths": 0,
        //     "TotalRecovered": 0,
        //   },
        //   "Message": "Caching in progress",
        // }
        if (sum.Message) {
          // Maybe "Caching in progress"
          dispatch(
            globalSlice.actions.updateError(sum.Message + ", pull to reload...")
          );
        } else {
          dispatch(globalSlice.actions.updateSummary(sum));
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(globalSlice.actions.updateError(err.message));
      }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), 10000)
    ),
  ]);
};

export default globalSlice.reducer;
