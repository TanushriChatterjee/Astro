import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { astrologersApi } from "../services/astrologers";

export const store = configureStore({
  reducer: {
    [astrologersApi.reducerPath]: astrologersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(astrologersApi.middleware),
});

setupListeners(store.dispatch);