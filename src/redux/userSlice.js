import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to simulate user login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email }, { rejectWithValue }) => {
    try {
      // Simulate API call delay here if needed
      // For now, just create a user object and save to localStorage
      const user = { email };
      localStorage.setItem('user', JSON.stringify(user));
      return user;  // Return the user payload on success
    } catch (error) {
      // Return a rejected action with error message on failure
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,  // Track login status
    user: null,              // Store user info (e.g., email)
    loading: false,          // Loading flag for async login action
    error: null,             // Store any error messages
  },
  reducers: {
    // Synchronous logout action clears user data and auth state
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // While login is pending, set loading true and clear previous errors
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // On successful login, set user data and auth flag, turn off loading
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      // On login failure, clear user data, set error message, and stop loading
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

// Export the logout action for use elsewhere
export const { logout } = userSlice.actions;
// Export the reducer to be added to the store
export default userSlice.reducer;
