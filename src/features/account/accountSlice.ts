import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import axios from 'axios';

interface AccountState {
  token: string | null;
}

const initialState: AccountState = {
    token: null,
};

const login = createAsyncThunk<AccountState>(
    'account/login',
    async () => {
      const response = await axios.get('http://google.com')
      return response.data
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled.type]: (state, action : PayloadAction<string>) => {
            state.token = action.payload;
        }
    }
});

export const loginAsync = (): AppThunk => dispatch => {
    dispatch(login());
};

export default accountSlice.reducer;