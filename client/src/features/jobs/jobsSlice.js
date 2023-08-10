import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const jobInitialState = {
  status: "pending",
  company: "",
  position: "",
  jobType: "full-time",
  jobLocation: "Office",
};

const filterInitialState = {
  status: "all",
  jobType: "all",
  jobLocation: "all",
  search: "",
  sort: "latest",
  statusOptions: ["all", "interview", "declined", "pending"],
  jobTypeOptions: ["all", "full-time", "part-time", "internship"],
  jobLocationOptions: ["all", "WFH", "Hybrid", "Office"],
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const url = "http://localhost:3000/api/v1";
const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  totalPages: 1,
  page: 1,
  job: { ...jobInitialState },
  isEditing: false,
  editJobId: "",
  filters: filterInitialState,
};

export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, thunkAPI) => {
    try {
      const { filters, page } = thunkAPI.getState().jobs;
      const { status, jobType, jobLocation, search, sort } = filters;

      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const queryUrl = `${url}/my-jobs?search=${search}&status=${status}&jobType=${jobType}&jobLocation=${jobLocation}&sort=${sort}&page=${page}`;
        const resp = await axios.get(queryUrl, config);
        return resp.data;
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const addJob = createAsyncThunk("jobs/addJob", async (_, thunkAPI) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { job } = thunkAPI.getState().jobs;
      const resp = await axios.post(`${url}/my-jobs`, job, config);
      return resp.data;
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { job, editJobId: jobId } = thunkAPI.getState().jobs;
        const resp = await axios.patch(`${url}/my-jobs/${jobId}`, job, config);
        return resp.data;
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const resp = await axios.delete(`${url}/my-jobs/${jobId}`, config);
        thunkAPI.dispatch(getAllJobs());
        return resp.data;
      }
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    handleFormChange: (state, action) => {
      const { id, value } = action.payload;
      state.job = { ...state.job, [id]: value };
    },
    handleEditing: (state, action) => {
      const { _id, company, status, position, jobType, jobLocation } =
        action.payload;
      state.job = { company, status, position, jobType, jobLocation };
      state.editJobId = _id;
      state.isEditing = true;
    },
    clearJob: (state, action) => {
      state.job = jobInitialState;
      state.isEditing = false;
    },
    showLoading: (state, action) => {
      state.isLoading = true;
    },
    hideLoading: (state, action) => {
      state.isLoading = false;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    handleFilters: (state, action) => {
      const { id, value } = action.payload;
      state.filters[id] = value;
      state.page = 1;
    },
    resetFilters: (state, action) => {
      state.filters = filterInitialState;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addJob.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Added new Job...");
      })
      .addCase(addJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(updateJob.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.job = jobInitialState;
        state.isEditing = false;
        state.editJobId = "";
        state.isLoading = false;
        toast.success("Updated new Job...");
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Deleted Job...");
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const {
  handleFormChange,
  handleEditing,
  clearJob,
  showLoading,
  hideLoading,
  changePage,
  handleFilters,
  resetFilters,
} = jobsSlice.actions;

export default jobsSlice.reducer;
