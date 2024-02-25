import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
    itemsById: { '0': [], '1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [], '8': [], '9': [], },
    totalCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const id = action.payload.id;
            const findItem = state.itemsById[id].find((obj) => {
                return obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size;
            });

            if (findItem) {
                findItem.count++;
            }
            else {
                state.itemsById[id].push({ ...action.payload, count: 1, });
            }

            let arrInArr = Object.values(state.itemsById);
            let gloArr = [];
            arrInArr.forEach(item => item.forEach(innerItem => gloArr.push(innerItem)))

            state.totalPrice = gloArr.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);

            state.totalCount = gloArr.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
        minusItem(state, action) {
            const id = action.payload.id;

            const findItem = state.itemsById[id].find((obj) => {
                return obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size;
            });

            if (findItem && findItem.count > 1) {
                findItem.count--;
            }

            let arrInArr = Object.values(state.itemsById);
            let gloArr = [];
            arrInArr.forEach(item => item.forEach(innerItem => gloArr.push(innerItem)))

            state.totalPrice = gloArr.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);

            state.totalCount = gloArr.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
        removeItems(state, action) {
            const id = action.payload.id
            state.itemsById[id] = state.itemsById[id].filter(pizza => pizza.type !== action.payload.type || pizza.size !== action.payload.size);

            let arrInArr = Object.values(state.itemsById);
            let gloArr = [];
            arrInArr.forEach(item => item.forEach(innerItem => gloArr.push(innerItem)));

            state.totalPrice = gloArr.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);

            state.totalCount = gloArr.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
        clearItems(state) {
            state.items = [];
            state.itemsById = {};
            state.totalPrice = 0;
            state.totalCount = 0;
        }
    },
});

export const { addItem, minusItem, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;