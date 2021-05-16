import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState} from "../../../app/store";
import axios from "axios";

export interface Pickup {
    id: string;
    create_time: string,
    update_time: string,
    is_active: boolean,
    is_done: boolean,
    name: string;
    phone_number: string;
    description: string;
    coordinates: number[];
    address: string;
}

interface Pickups {
    data: Pickup[];
    fetchStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
    requestStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | undefined;
    requestError: string | undefined;
}

const initialPickupsState: Pickups = {
    data: [],
    fetchStatus: 'idle',
    requestStatus: 'idle',
    error: undefined,
    requestError: undefined,
};

export const requestPickup = createAsyncThunk(
    'pickup/requestPickup',
    async (arg: {name: string; phone_number: string; longitude: number; latitude: number;
        address: string; description: string}) => {
        try {
            const response = await axios.post('http://localhost:8000/pickups/request', {
                    name: arg.name,
                    phone_number: arg.phone_number,
                    longitude: arg.longitude,
                    latitude: arg.latitude,
                    address: arg.address,
                    description: arg.description,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            // console.log("hello world" + response.data)
            return response.data
        } catch (e) {
            console.log('Error', e);
        }
    }
)

export const fetchPickups = createAsyncThunk(
    'pickup/fetchPickups',
    async (token: string) => {
        const response = await axios.get('http://localhost:8000/pickups', {
            headers:{
                "Authorization": `JWT ${token}`
            }
        });
        return response.data
    }
)


export const updatePickup = createAsyncThunk(
    'pickup/updatePickup',
    async (arg: {pickup: Pickup, token: string}) => {
        const response = await axios.post(
            `http://localhost:8000/pickups/update/${arg.pickup.id}`, arg.pickup, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${arg.token}`
            }
        });
        return response.data
    }
)

export const pickupSlice = createSlice({
    name: 'pickup',
    initialState: initialPickupsState,
    reducers: {
        setIdleRequest: (state) => {
            state.requestStatus = 'idle'
        },
        removePickupById: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter((pickup) => {
                return pickup.id !== action.payload
            })
        }
    },
    extraReducers: builder =>  {
        builder.addCase(fetchPickups.fulfilled, ((state,
                                               action) => {
            state.fetchStatus = 'succeeded';
            state.data = action.payload;
        }));
        builder.addCase(fetchPickups.rejected, ((state,
                                              action) => {
            state.fetchStatus = 'failed';
        }));
        builder.addCase(fetchPickups.pending, ((state,
                                             action) => {
            state.fetchStatus = 'pending';
        }));
        builder.addCase(requestPickup.fulfilled, ((state,
                                                                       action) => {
            // console.log("succeeded from slice")
            state.requestStatus = 'succeeded';
        }));
        builder.addCase(requestPickup.rejected, ((state,
                                                                     action) => {
            // console.log("reject from slice")
            state.requestStatus = 'failed';
            state.requestError = action.error.message;
        }));
    }
});


export const { setIdleRequest, removePickupById } = pickupSlice.actions
export const selectPickups = (state: RootState) => state.pickup.data;
export const selectPickupFetchStatus = (state: RootState) => state.pickup.fetchStatus;
export const selectPickupFetchError = (state: RootState) => state.pickup.error;
export const selectPickupRequestStatus = (state: RootState) => state.pickup.requestStatus;
export const selectPickupRequestError = (state: RootState) => state.pickup.error;

export default pickupSlice.reducer;
