import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetailSlice";
import teamSlice from "../features/teamDetailSlice";

export const store = configureStore({
  reducer: {
    app: userDetail,
    team: teamSlice,
  },
});
