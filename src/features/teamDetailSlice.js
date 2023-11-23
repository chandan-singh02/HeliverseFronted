// store/teamSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const showTeam = createAsyncThunk(
  "showTeam",
  async (data, { rejecteWithValue }) => {
    console.log(data);
    try {
      const response = await fetch(
        "https://crudd-5zab.onrender.com/api/v1/teams/allteams"
      );

      const result = response.json();
      console.log(result);
      console.log("show team");
      return result;
    } catch (error) {
      return rejecteWithValue(error);
    }
  }
);
// Create async thunk for fetching team details by ID
// export const getTeamByIdAsync = createAsyncThunk(
//   "team/getTeamById",
//   async (teamId) => {
//     const response = await axios.get(`/api/team/${teamId}`);
//     return response.data;
//   }
// );

const teamSlice = createSlice({
  name: "teamSlice",
  initialState: {
    showteams: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [showTeam.pending]: (state) => {
      state.loading = true;
    },
    [showTeam.fulfilled]: (state, action) => {
      state.loading = false;
      state.showteams = action.payload.data;
      console.log("API Response show teams:", state.showteams);
    },
    [showTeam.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default teamSlice.reducer;
