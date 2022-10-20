import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    value: 0,
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        successtoast: (state, action) => {
            toast.success(action.payload, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            state.value += 1
        },
        warntoast: (state, action) => {
            toast.warn(action.payload, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            state.value -= 1
        },

    },
})

// Action creators are generated for each case reducer function
export const { successtoast, warntoast } = toastSlice.actions

export default toastSlice.reducer