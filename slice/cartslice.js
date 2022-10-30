import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: {},
    totalitems: 0,
    subtotal: 0,
    orderinfo: {},
    status: 'idle',
    token: ""
}

export const checkout = createAsyncThunk(
    'cart/checkout',
    async (action, { getState }) => {
        try {
            const state = getState().cart
            const response = await fetch(
                `/api/checkout`,
                {
                    body: JSON.stringify(state),
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
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addtocart: (state, action) => {
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
            state.subtotal = subtotalcart(state.items)
            state.totalitems = Object.keys(state.items).length

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
            state.subtotal = subtotalcart(state.items)
            state.totalitems = Object.keys(state.items).length
        },
        clearcart: (state) => {
            state.items = {}
            localStorage.removeItem("cart")
            state.subtotal = subtotalcart(state.items)
            state.totalitems = Object.keys(state.items).length
        },
        setcart: (state, action) => {

            state.items = action.payload
            state.subtotal = subtotalcart(state.items)
            state.totalitems = Object.keys(state.items).length
        },
        setorderinfo: (state, action) => {
            state.orderinfo = action.payload
        },
        settoken: (state, action) => {
            state.token = action.payload
        },
        extraReducers: (builder) => {
            builder
                .addCase(checkout.pending, (state) => {


                    // state.token = action.payload
                    state.status = 'loading';
                })
                .addCase(checkout.fulfilled, (state, action) => {
                    state.status = 'idle';

                })
        }

    },
})
const subtotalcart = (item) => {
    let total = 0
    const currentValue = item
    Object.keys(currentValue).map((item, key) => {
        total = total + parseInt(currentValue[item].price * currentValue[item].qty)
    })
    return total

}
// Action creators are generated for each case reducer function
export const { addtocart, removetocart, clearcart, savecart, setcart, setorderinfo, settoken } = cartSlice.actions
export const selectCart = (state) => state.cart;
export default cartSlice.reducer