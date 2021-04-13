import {AsyncThunk, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from "axios";

interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    token: string;
}

interface userState {
    data: User | undefined;
    loginStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | undefined
}

const initialState: userState = {
    data: undefined,
    loginStatus: 'idle',
    error: undefined,
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (arg: {username: string; password: string}) => {
        try {
            const response = await axios.post('http://localhost:8000/accounts/login/', {
                    username: arg.username,
                    password: arg.password,
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

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (token: string) => {
        const response = await axios.get('http://localhost:8000/accounts/login/', {
            headers:{
                "Authorization": `JWT ${token}`
            }
        });
        return response.data
    }
)
type userDetails = {
    firstname: string | null,
    lastname: string | null,
    phoneNumber: string | null,
    email: string | null,
    username: string | null,
    password: string | null,
}

// interface signupState {
//     data: userDetails | undefined;
//     loginStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
//     error: string | undefined
// }

export const signupUser = createAsyncThunk(
    'user/signupUser',
    async (user: userDetails) => {
        const response = await axios.post('http://localhost:8000/accounts/signup/', {
            first_name: user.firstname,
            last_name: user.lastname,
            phone_number: user.phoneNumber,
            email: user.email,
            username: user.username,
            password: user.password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder =>  {
        // builder.addCase(fetchUser.pending, ((state,
        //                                      action) => {
        //     state.loading = 'pending'
        // }));
        builder.addCase(fetchUser.fulfilled, ((state,
                                             action) => {
            state.loginStatus = 'succeeded';
            state.data = action.payload;
            // @ts-ignore - Will never execute this if token is not present
            state.data.token = localStorage.getItem('token');
        }));
        builder.addCase(fetchUser.rejected, ((state,
                                             action) => {
            state.loginStatus = 'failed';
        }));
        builder.addCase(loginUser.pending, ((state,
                                             action) => {
            state.loginStatus = 'pending';
        }));
        builder.addCase(loginUser.fulfilled || signupUser.fulfilled, ((state,
                                             action) => {
            // console.log("succeeded from slice")
            state.loginStatus = 'succeeded';
            state.data = action.payload;
        }));
        builder.addCase(loginUser.rejected || signupUser.rejected, ((state,
                                             action) => {
            // console.log("reject from slice")
            state.loginStatus = 'failed';
            state.error = action.error.message;
        }));
    }
});

// export const { increment, decrement, incrementByAmount } = userSlice.actions;



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user.data;
export const selectUserLoginStatus = (state: RootState) => state.user.loginStatus;
export const selectUserLoginError = (state: RootState) => state.user.error;

export default userSlice.reducer;
