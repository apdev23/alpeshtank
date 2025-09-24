import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventItem } from "./EventsListSlice";

interface WishlistState {
  items: EventItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<EventItem>) {
      const exists = state.items?.find((it) => it?.event_id === action.payload?.event_id);
      if (exists) {
        state.items = state.items?.filter((it) => it?.event_id !== action.payload?.event_id);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
