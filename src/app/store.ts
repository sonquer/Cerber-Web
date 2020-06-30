import { configureStore, ThunkAction, Action, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import accountReducer from '../features/account/accountSlice';
import availabilityReducer from '../features/availability/availabilitySlice';
import availabilityListReducer from '../features/availabilityList/availabilityListSlice';
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

export const store = configureStore({
  reducer: combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    counter: counterReducer,
    availabilityList: availabilityListReducer,
    availiability: availabilityReducer
  }),
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
