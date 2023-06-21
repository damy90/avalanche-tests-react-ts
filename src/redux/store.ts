import { configureStore } from '@reduxjs/toolkit';
import { testsApiSlice } from './features/tests-api-slice';
import authReducer from './features/auth/authSlice'
import { authApi } from './features/auth/authApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [testsApiSlice.reducerPath]: testsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(testsApiSlice.middleware).concat(authApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;