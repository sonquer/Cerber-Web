import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import axios from 'axios';

interface AccountState {
    rememberMe: boolean,
    token: string | null;
    registrationError: string | null;
    registrationCompleted: boolean,
    loginError: string | null;
    loginCompleted: boolean
}

const initialState: AccountState = {
    rememberMe: false,
    token: sessionStorage.getItem('token') ?? localStorage.getItem('token'),
    registrationError: null,
    registrationCompleted: false,
    loginError: null,
    loginCompleted: false
};

const login = createAsyncThunk<AccountState, {email: string, password: string}>(
    'account/login',
    async (args) => {
        const response = await axios.post('https://cluster.cerber.space/gateway/accounts/api/Accounts/Authorize', {
            email: args.email,
            password: args.password
        })

        return response.data.token
    }
)

const register = createAsyncThunk<AccountState, {email: string, password: string}>(
    'account/register',
    async (args) => {
        const response = await axios.post('https://cluster.cerber.space/gateway/accounts/api/Accounts/Create', {
            email: args.email,
            password: args.password
        });

        return response.data;
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        rememberMeOnChange: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
        },
    },
    extraReducers: {
        [login.fulfilled.type]: (state, action : PayloadAction<string>) => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');

            if (state.rememberMe) {
                localStorage.setItem('token', action.payload);
            } else {
                sessionStorage.setItem('token', action.payload);
            }

            state.token = action.payload;
            state.loginCompleted = true;
        },
        [login.rejected.type]: (state, action : PayloadAction<string>) => {
            state.loginError = 'Invalid login or password.';
            state.loginCompleted = false;
        },
        [register.fulfilled.type]: (state, action : PayloadAction<string>) => {
            state.registrationError = null;
            state.registrationCompleted = true;
        },
        [register.rejected.type]: (state, action : PayloadAction<string>) => {
            state.registrationError = 'Please try again later.';
            state.registrationCompleted = false;
        }
    }
});

export const loginAsync = (email: string, password: string): AppThunk => dispatch => {
    dispatch(login({email, password}));
};

export const registerAsync = (email: string, password: string): AppThunk => dispatch => {
    dispatch(register({email, password}));
};

export const { rememberMeOnChange } = accountSlice.actions;

export default accountSlice.reducer;