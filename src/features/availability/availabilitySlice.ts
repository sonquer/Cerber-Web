import { createSlice } from '@reduxjs/toolkit';

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
    status: 'ST_ERROR' | 'ST_OK'
}

const initialState: AvailabilityState = {
    id: '1234',
    name: 'test',
    url: 'http://google.com',
    expectedStatusCode: 200,
    expectedResponse: '',
    availabilityLogs: [
        {
            createdAt: '2020-04-01T19:48:09.155987Z',
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
    reducers: {},
    extraReducers: {}
});

export default availabilitySlice.reducer;