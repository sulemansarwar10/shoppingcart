import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: {},
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addtocart: (state, action) => {
            console.log("addtocart")
            let newcart = state.items
            const { name, img, price, category } = action.payload
            if (state.items && name in state.items) {
                newcart[name].qty = state.items[name].qty + 1
            }
            else {
                newcart[name] = { name, img, price, category, qty: 1 }

            }
            state.items = newcart
            localStorage.setItem("cart", JSON.stringify(state))
        },
        removetocart: (state, action) => {
            let newcart = state.items
            const { name, img, price, category } = action.payload
            if (state.items && name in state.items) {
                newcart[name].qty = state.items[name].qty - 1
            }
            if (newcart[name].qty <= 0 && name in state.items) {
                delete newcart[name]
            }
            state.items = newcart
            localStorage.setItem("cart", JSON.stringify(state))
        },
        clearcart: (state) => {
            state.items = {}
            localStorage.removeItem("cart")
        },
        setcart: (state, action) => {

            state.items = action.payload

        },
    },
})

// Action creators are generated for each case reducer function
export const { addtocart, removetocart, clearcart, savecart, setcart } = cartSlice.actions
export const selectCart = (state) => state.cart;
export default cartSlice.reducer