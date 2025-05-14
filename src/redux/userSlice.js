import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Async thunk for login simulation
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email }, { rejectWithValue }) => {
    try {
      // Simulate an async API call
      const user = { email };
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
