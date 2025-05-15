import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';    // Cart slice reducer
import userReducer from './userSlice';    // User slice reducer

// Imports from redux-persist to enable state persistence
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // Uses localStorage as default storage

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',             // Key for the persisted state in storage
  storage,                 // Storage engine (localStorage here)
  whitelist: ['cart', 'user'], // Only persist 'cart' and 'user' slices
};

// Combine multiple slice reducers into a root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

// Create a persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with persisted reducer and middleware configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignore redux-persist actions for serializable state middleware check
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor linked to the store, used to control persistence flow
export const persistor = persistStore(store);
