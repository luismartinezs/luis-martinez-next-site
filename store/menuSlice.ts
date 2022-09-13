import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface MenuState {
  isOpen: boolean;
}

// Initial state
const initialState: MenuState = {
  isOpen: false,
};

// Actual Slice
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // Action to set the authentication status
    setOpen(state, action) {
      state.isOpen = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.isOpen,
        };
      },
    },
  },
});

export const { setOpen } = menuSlice.actions;

export const selectIsMenuOpen = (state: AppState) => state.menu.isOpen;

export default menuSlice.reducer;
