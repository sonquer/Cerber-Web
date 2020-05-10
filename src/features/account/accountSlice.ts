import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import axios from 'axios';

interface AccountState {
    token: string | null;
    registrationError: string | null;
    loginError: string | null;
}

const initialState: AccountState = {
    token: null,
    registrationError: null,
    loginError: null,
};

const login = createAsyncThunk<AccountState>(
    'account/login',
    async () => {
      const response = await axios.get('http://google.com/')
      return response.data
    }
)

const register = createAsyncThunk<AccountState>(
    'account/register',
    async () => {
      const response = await axios.get('http://google.com/')
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
        },
        [login.rejected.type]: (state, action : PayloadAction<string>) => {
            state.loginError = 'Invalid login or password.';
        },
        [register.fulfilled.type]: (state, action : PayloadAction<string>) => {
            state.registrationError = null;
        },
        [register.rejected.type]: (state, action : PayloadAction<string>) => {
            state.registrationError = 'Please try again later.';
        }
    }
});

export const loginAsync = (): AppThunk => dispatch => {
    dispatch(login());
};

export const registerAsync = (): AppThunk => dispatch => {
    dispatch(register());
};

export default accountSlice.reducer;