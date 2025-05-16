import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user login using fake store API
// Accepts username and password, sends POST request to API,
// and handles success or failure
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Make POST request to fakestoreapi for authentication
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      // Extract token from response
      const token = response.data.token;
      // Construct user object with username and token
      const user = { username, token };

      // Persist user info in localStorage for session persistence
      localStorage.setItem('user', JSON.stringify(user));

      // Return user data to be handled in fulfilled reducer
      return user;
    } catch (error) {
      // If error occurs, reject with a custom error message
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

// Create a slice of the Redux store to manage user authentication state
const userSlice = createSlice({
  name: 'user',  // Slice name used as prefix for action types
  initialState: {
    isAuthenticated: false,  // Whether user is logged in
    user: null,              // User data (username, token)
    loading: false,          // Loading state for async actions
    error: null,             // Error message string if login fails
  },
  reducers: {
    // Synchronous action to log out user and clear state/localStorage
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('user');  // Remove user data from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state when login request is in progress
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear previous errors
      })
      // Fulfilled state when login succeeds
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;  // Set user data from payload
      })
      // Rejected state when login fails
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;  // Set error message from rejected value
      });
  },
});

// Export logout action creator for use in components
export const { logout } = userSlice.actions;

// Export reducer to be included in the Redux store
export default userSlice.reducer;
