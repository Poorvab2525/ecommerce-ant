import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

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

import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',           // Key for the persisted data in storage
  storage,               // Use localStorage to save persisted state
  whitelist: ['cart', 'user'],  // Only persist these slices of state
};

// Combine multiple slice reducers into one root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

// Wrap root reducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,  // Use persisted reducer instead of rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check warnings for redux-persist actions
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor linked to the store to control persistence lifecycle
export const persistor = persistStore(store);
