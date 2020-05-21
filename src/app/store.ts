import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import accountReducer from '../features/account/accountSlice';
import availabilityReducer from '../features/availability/availabilitySlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    counter: counterReducer,
    availiability: availabilityReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
