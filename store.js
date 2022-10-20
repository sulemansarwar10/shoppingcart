import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counterslice'
import toastReducer from './slice/toastslice'
import userReducer from './slice/userslice'
import cartReducer from './slice/cartslice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        toast: toastReducer,
        user: userReducer,
        cart: cartReducer
    },
})