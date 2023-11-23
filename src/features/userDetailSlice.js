import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejecteWithValue }) => {
    console.log(data);
    try {
      const response = await fetch(
        "https://crudd-5zab.onrender.com/api/v1/users/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejecteWithValue(error);
    }
  }
);

export const showUser = createAsyncThunk(
  "showUser",
  async ({ page, search, gender, available }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://crudd-5zab.onrender.com/api/v1/users/allusers?page=${page}&search=${search}&gender=${gender}&available=${available}`
      );

      const result = await response.json();
      console.log("wating result showuser");
      console.log(result);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (_id, { rejectWithValue }) => {
    try {
      console.log("Delete User ID:", _id);
      const response = await fetch(
        `https://crudd-5zab.onrender.com/api/v1/users/deleteuser/${_id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      console.log("Delete User Result:", result);
      // console.log("Current State:", getState().app.users);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(
      `https://crudd-5zab.onrender.com/api/v1/users/updateuser/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// export const searchUser = createAsyncThunk(
//   "searchUser",
//   async (key, { rejectWithValue }) => {
//     console.log("updated data", key);

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:4000/api/v1/users/search/${key}`
//       );

//       const result = await response.json();
//       console.log("API RESPONSE" + result);
//       // console.log("API RESPONSE:", JSON.stringify(result, null, 2));
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // setCurrentPage: (state, action) => {
    //   state.currentPage = action.payload;
    // },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      console.log("Delete User Fulfilled Action:", action);
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = Array.isArray(action.payload.usersdata)
        ? action.payload.usersdata
        : [];
      state.totalPages = parseInt(action.payload.Pagination.pageCount, 10); // Convert to number
      state.currentPage = action.payload.Pagination.currentPage;
      console.log("API Response:", state.users);
    },

    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteUser.pending]: (state) => {
      console.log("Delete User pending:");
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      console.log("Delete User Fulfilled Action:", action);
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((ele) => ele._id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      console.log("Delete User Rejected Action:", action);
      state.loading = false;
      state.error = action.payload;
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((data) =>
        data._id == action.payload.id ? action.payload : data
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [searchUser.fulfilled]: (state, action) => {
    //   state.users = action.payload; // Update the state with the search results
    // },
    // [searchUser.pending]: (state) => {
    //   state.loading = true;
    // },
    // [searchUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   // state.users = Array.isArray(action.payload.data)
    //   //   ? action.payload.data
    //   //   : [];
    //   state.users = action.payload.data;
    //   console.log("searc API Response:", state.users);
    // },
    // [searchUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
});

export const { setCurrentPage } = userDetail.actions;
export default userDetail.reducer;
