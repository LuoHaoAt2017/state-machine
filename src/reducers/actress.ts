import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Item {
  uuid: string;
  name: string;
  birthday: string;
  location: string;
}

export const fetchActress: any = createAsyncThunk(
  "actress/fetchActress",
  async () => {
    const resp = await axios.request({
      url: "/api/actress",
      method: "GET",
    });
    return resp.data;
  }
);

const actressSlice = createSlice({
  name: "actress",
  initialState: {
    actressList: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchActress.pending](state) {
      state.status = "idle";
    },
    [fetchActress.fulfilled](state, action) {
      state.actressList = action.payload;
    },
    [fetchActress.rejected](state, action) {
      state.error = action.payload.error;
    },
  },
});

export const selectAllActresses = (state) => state.actress.actressList;

export const selectActressError = (state) => state.actress.error;

export default actressSlice.reducer;
