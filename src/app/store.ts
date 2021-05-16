import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/account/userSlice'
import pickupReducer from '../features/dashboard/pickup/pickupSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    pickup: pickupReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
