import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAvailabilityLog {
    createdAt: Date,
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
    status: 'ST_ERROR' | 'ST_OK'
}

const initialState: AvailabilityState = {
    id: '1234',
    name: 'test',
    url: 'http://google.com',
    expectedStatusCode: 200,
    expectedResponse: '{}',
    availabilityLogs: [
        {
            createdAt: new Date(Date.parse('2020-04-01T19:31:09.155987Z')),
            statusCode: 200,
            body: '',
            responseTime: 30
        },
        {
            createdAt: new Date(Date.parse('2020-04-01T19:42:09.155987Z')),
            statusCode: 500,
            body: '',
            responseTime: 30
        },
        {
            createdAt: new Date(Date.parse('2020-04-01T19:52:09.155987Z')),
            statusCode: 200,
            body: '',
            responseTime: 30
        }
    ],
    status: 'ST_OK'
};

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
    extraReducers: {}
});

export const { 
    createNew,
    nameOnChange,
    urlOnChange,
    expectedStatusCodeOnChange,
    expectedResponseOnChange
} = availabilitySlice.actions;

export default availabilitySlice.reducer;