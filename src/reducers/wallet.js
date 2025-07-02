import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
    name: 'waller',
    initialState: {
        address: null
    },
    reducers: {
        setWalletAddress: (state, action) => {
            state.address = action.payload;
        },
        clearWalletAddress: (state) => {
            state.address = null;
        }
    }
});

export const { setWalletAddress, clearWalletAddress } = walletSlice.actions;

export default walletSlice.reducer;