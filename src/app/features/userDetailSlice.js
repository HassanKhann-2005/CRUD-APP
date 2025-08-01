import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to create a user:
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    console.log("Data :", data);
    try {
      const response = await fetch("https://6888823aadf0e59551ba3c60.mockapi.io/crud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for reading users:
export const showUsers = createAsyncThunk(
  "showUsers",
  async (args, { rejectWithValue }) => {
    const response = await fetch("https://6888823aadf0e59551ba3c60.mockapi.io/crud");
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a user
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`https://6888823aadf0e59551ba3c60.mockapi.io/crud/${id}`, {
      method: "DELETE",
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for editing a user
export const editUser = createAsyncThunk(
  "editUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://6888823aadf0e59551ba3c60.mockapi.io/crud/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  searchUser:[],
};

export const userDetails = createSlice({
  name: "userDetails",
  initialState,

  //we make extra reducers while itegrating with apis
reducers:{
  searchUser:(state,action)=>{
    state.searchUser = action.payload;  // we want to hold action.payload data in searchData[]
    console.log("Action Payload:", action.payload);
  }
},

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // whatever is in payload it will be entered to global state
      })
      .addCase(showUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || [];
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.id; // Get the ID of the deleted user from the payload
        state.users = state.users.filter((user) => user.id !== id); // Filter out the deleted user
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { searchUser } = userDetails.actions;
export default userDetails.reducer;