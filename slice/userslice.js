import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "", email: "", isAdmin: false, token: "", status: 'idle',
}


export const login = createAsyncThunk(
    'user/login',
    async (action) => {
        try {
            const response = await fetch(
                `/api/signin`,
                {
                    body: JSON.stringify(action),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST'
                }
            );

            const json = await response.json();
            return json;
        } catch (error) {

        }

    }
);
export const checktoken = createAsyncThunk(
    'user/checktoken',
    async (action) => {
        try {
            const response = await fetch(
                `/api/authtoken`,
                {
                    body: localStorage.getItem("token"),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST'
                }
            );

            const json = await response.json(); // parses JSON response into native JavaScript objects
            console.log("signinslice", json)

            return json;
        } catch (error) {

        }

    });
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        decrement: (state) => {
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {

                state.status = 'idle';

            })
            .addCase(checktoken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checktoken.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.token = action.payload.User.token
                    state.name = action.payload.User.name
                    state.email = action.payload.User.email
                    state.isAdmin = action.payload.User.isAdmin
                    state.status = 'idle';
                } else {
                    state.token = ""
                    state.name = ""
                    state.email = ""
                    state.status = 'idle';
                    localStorage.clear()
                }

            })

    },

})
export const selectUser = (state) => state.user;

export default userSlice.reducer