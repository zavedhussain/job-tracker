import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = "http://localhost:3000/api/v1";

const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post(`${url}/auth/register`, user);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post(`${url}/auth/login`, user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logging out...");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        //while data is fetching
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        //get user and token and set state
        const { user, token } = action.payload;
        state.isLoading = false;
        state.user = user;
        //store user and token in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        toast.success(`Thanks for joining, ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        //if error in fetching
        state.isLoading = false;
        toast.error(payload);
        // console.log(payload);
      })
      .addCase(loginUser.pending, (state) => {
        //while data is fetching
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        //get user and token and set state
        const { user, token } = action.payload;
        state.isLoading = false;
        state.user = user;
        //store user and token in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        toast.success(`Welcome back, ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        //if error in fetching
        state.isLoading = false;
        toast.error(payload);
        // console.log(payload);
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
