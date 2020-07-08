import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../app/store';

interface IAvailabilityLog {
    createdAt: string,
    statusCode: number,
    body: string,
    responseTime: number
}

interface AvailabilityState {
    id: string | null,
    name: string | null,
    url: string | null,
    expectedStatusCode: number,
    expectedResponse: string | null,
    availabilityLogs: IAvailabilityLog[],
    status: 'ST_ERROR' | 'ST_OK',
    loading: boolean,
    saved: boolean,
    errorMessage: string | null,
}

const initialState: AvailabilityState = {
    id: '',
    name: '',
    url: '',
    expectedStatusCode: 200,
    expectedResponse: '{}',
    availabilityLogs: [],
    status: 'ST_OK',
    loading: true,
    saved: false,
    errorMessage: null
};

const create = createAsyncThunk<AvailabilityState, {
    name: string, 
    url: string, 
    expectedStatusCode: number, 
    expectedResponse: string, 
    logLifetimeThresholdInHours: number,
    token: string
}>(
    'availability/create',
    async (args) => {
        const response = await axios.post(`https://cluster.cerber.space/gateway/availability/api/Availability/`, 
        {
            name: args.name,
            url: args.url,
            expectedResponse: args.expectedResponse,
            expectedStatusCode: args.expectedStatusCode,
            logLifetimeThresholdInHours: args.logLifetimeThresholdInHours
        },
        {
            headers: {
                Authorization: `Bearer ${args.token}`
            }
        });

        return response.data
    }
)

const update = createAsyncThunk<AvailabilityState, {
    id: string,
    name: string, 
    url: string, 
    expectedStatusCode: number, 
    expectedResponse: string, 
    logLifetimeThresholdInHours: number,
    token: string
}>(
    'availability/update',
    async (args) => {
        const response = await axios.put(`https://cluster.cerber.space/gateway/availability/api/Availability/`, 
        {
            id: args.id,
            name: args.name,
            url: args.url,
            expectedResponse: args.expectedResponse,
            expectedStatusCode: args.expectedStatusCode,
            logLifetimeThresholdInHours: args.logLifetimeThresholdInHours
        },
        {
            headers: {
                Authorization: `Bearer ${args.token}`
            }
        });

        return response.data
    }
)

const remove = createAsyncThunk<AvailabilityState, {
    id: string,
    token: string
}>(
    'availability/remove',
    async (args) => {
        const response = await axios.delete(`https://cluster.cerber.space/gateway/availability/api/Availability/${args.id}`, {
            headers: {
                Authorization: `Bearer ${args.token}`
            }
        });

        return response.data
    }
)

const load = createAsyncThunk<AvailabilityState, {id: string, token: string}>(
    'availability/load',
    async (args) => {
        const response = await axios.get(`https://cluster.cerber.space/gateway/availability/api/Availability/${args.id}`, {
            headers: {
                Authorization: `Bearer ${args.token}`
            }
        });

        return response.data
    }
)

export const availabilitySlice = createSlice({
    name: 'availability',
    initialState,
    reducers: {
        createNew: state => {
            state.id = '';
            state.name = '';
            state.url = '';
            state.availabilityLogs = [];
            state.expectedStatusCode = 200;
            state.expectedResponse = null;
            state.loading = false;
            state.saved = false;
        },
        nameOnChange: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        urlOnChange: (state, action: PayloadAction<string>) => {
            state.url = action.payload;
        },
        expectedStatusCodeOnChange: (state, action: PayloadAction<number>) => {
            state.expectedStatusCode = action.payload;
        },
        expectedResponseOnChange: (state, action: PayloadAction<string>) => {
            state.expectedResponse = action.payload;
        },
    },
    extraReducers: {
        [load.pending.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = true;
        },
        [load.fulfilled.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.expectedResponse = action.payload.expectedResponse;
            state.expectedStatusCode = action.payload.expectedStatusCode;
            state.status = action.payload.status;
            state.url = action.payload.url;

            let logs : IAvailabilityLog[] = [];
            action.payload.availabilityLogs?.map(e => {
                logs.push({
                    body: e.body,
                    createdAt: e.createdAt,
                    responseTime: e.responseTime,
                    statusCode: e.statusCode
                });
            });

            state.availabilityLogs = logs;

            state.loading = false;
            state.saved = false;
            state.errorMessage = null;
        },
        [load.rejected.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = false;
            state.errorMessage = 'Loading failed..';
        },
        [create.pending.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = true;
        },
        [create.fulfilled.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = false;
            state.saved = true;
        },
        [create.rejected.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = false;
            state.errorMessage = 'Creating failed..';
        },
        [update.pending.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = true;
        },
        [update.fulfilled.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = false;
            state.saved = true;
        },
        [update.rejected.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = false;
            state.errorMessage = 'Update failed..';
        },
        [remove.pending.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = true;
        },
        [remove.fulfilled.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = false;
            state.saved = true;
        },
        [remove.rejected.type]: (state, action : PayloadAction<AvailabilityState>) => {
            state.loading = false;
            state.errorMessage = 'Removing failed..';
        }
    }
});

export const loadAsync = (id: string, token: string): AppThunk => dispatch => {
    dispatch(load({id, token}));
};

export const createAsync = (
    name: string, 
    url: string, 
    expectedStatusCode: number, 
    expectedResponse: string, 
    logLifetimeThresholdInHours: number,
    token: string
): AppThunk => dispatch => {
    dispatch(create({name, url, expectedStatusCode, expectedResponse, logLifetimeThresholdInHours, token}));
};

export const updateAsync = (
    id: string,
    name: string, 
    url: string, 
    expectedStatusCode: number, 
    expectedResponse: string, 
    logLifetimeThresholdInHours: number,
    token: string
): AppThunk => dispatch => {
    dispatch(update({id, name, url, expectedStatusCode, expectedResponse, logLifetimeThresholdInHours, token}));
};

export const removeAsync = (
    id: string,
    token: string
): AppThunk => dispatch => {
    dispatch(remove({id, token}));
};

export const { 
    createNew,
    nameOnChange,
    urlOnChange,
    expectedStatusCodeOnChange,
    expectedResponseOnChange
} = availabilitySlice.actions;

export default availabilitySlice.reducer;