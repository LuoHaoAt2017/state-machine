import { configureStore } from "@reduxjs/toolkit";
import actressSlice from "./reducers/actress";

export default configureStore({
  reducer: {
    actress: actressSlice,
  },
});
