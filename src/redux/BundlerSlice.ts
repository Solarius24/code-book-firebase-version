import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bundle from "../bundler";
interface BundlerState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

export const createBundle = createAsyncThunk(
  "bundler/createBundle",
  async ({
    cellId,
    cumulativeCode,
  }: {
    cellId: string;
    cumulativeCode: string;
  }) => {
    const result = await bundle(cumulativeCode);
    return { cellId, bundle: result };
  }
);

const initialState: BundlerState = {};

const bundlerSlice = createSlice({
  name: "Bundler",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBundle.fulfilled, (state, action) => {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
      return state;
    });
  },
});

export default bundlerSlice.reducer;
