import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import axios from 'axios';

interface IAvailabilityItem {
    id: string,
    name: string,
    url: string,
    status: string
}

interface AvailabilityListState {
    availabilityItems: IAvailabilityItem[],
    loading: boolean
}

const initialState: AvailabilityListState = {
    availabilityItems: [],
    loading: true,
};

const load = createAsyncThunk<AvailabilityListState, {token: string}>(
    'availabilityList/load',
    async (args) => {
        const response = await axios.get('https://cluster.cerber.space/gateway/availability/api/Availability', {
            headers: {
                Authorization: `Bearer ${args.token}`
            }
        })

        return response.data
    }
)

export const availabilityListSlice = createSlice({
    name: 'availabilityList',
    initialState,
    reducers: {},
    extraReducers: {
        [load.fulfilled.type]: (state, action : PayloadAction<IAvailabilityItem[]>) => {
            state.availabilityItems = action.payload;
            state.loading = false;
        },
        [load.rejected.type]: (state, action : PayloadAction<IAvailabilityItem[]>) => {
            state.availabilityItems = [];
            state.loading = false;
        }
    }
});

export const loadAsync = (token: string): AppThunk => dispatch => {
    dispatch(load({token}));
};

export default availabilityListSlice.reducer;