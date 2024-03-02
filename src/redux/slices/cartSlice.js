import { createSlice } from '@reduxjs/toolkit'
import getNextStateValues from './helpers/getNextStateValues';
import findItemFn from './helpers/findItemFn';

const initialState = {
    totalPrice: 0,
    itemsById: {},
    totalCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const id = action.payload.id;
            const findItem = state.itemsById[id] ? findItemFn(action.payload, state.itemsById) : null;

            if (findItem) {
                findItem.count++;
            }
            else {
                state.itemsById[id] = [];
                state.itemsById[id].push({ ...action.payload, count: 1, });
            }

            const [totalPrice, totalCount] = getNextStateValues(state.itemsById);
            state.totalPrice = totalPrice;
            state.totalCount = totalCount;
        },
        minusItem(state, action) {
            const findItem = findItemFn(action.payload, state.itemsById);

            if (findItem && findItem.count > 1) {
                findItem.count--;
            }

            const [totalPrice, totalCount] = getNextStateValues(state.itemsById);
            state.totalPrice = totalPrice;
            state.totalCount = totalCount;
        },
        removeItems(state, action) {
            const id = action.payload.id
            state.itemsById[id] = state.itemsById[id].filter(pizza => pizza.type !== action.payload.type || pizza.size !== action.payload.size);

            const [totalPrice, totalCount] = getNextStateValues(state.itemsById);
            state.totalPrice = totalPrice;
            state.totalCount = totalCount;
        },
        clearItems(state) {
            state.itemsById = {};
            state.totalPrice = 0;
            state.totalCount = 0;
        }
    },
});

export const { addItem, minusItem, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;