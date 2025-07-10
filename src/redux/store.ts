'use client';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
