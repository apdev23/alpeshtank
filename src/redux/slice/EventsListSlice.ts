import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import request from "../../api/ApiRequest";
import { url } from "../../api/Url";

export type EventItem = {
  event_id: number;
  event_name: string;
  description: string;
  event_profile_img: string;
  event_url: string;
  event_price_from: number;
  event_price_to: number;
  readable_from_date: string;
  readable_to_date: string;
  event_date_id: number;
  city?: string;
  country?: string;
  danceStyles?: { name: string }[];
  isFavorite?: number;
};

interface EventsState {
  eventsList: { events: EventItem[]; total: number } | null;
  wishlist: EventItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  eventsList: null,
  wishlist: [],
  loading: false,
  error: null,
};

const EventsListSlice = createSlice({
  name: "eventsList",
  initialState,
  reducers: {
    eventsListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    eventsListSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.eventsList = action.payload;
    },
    eventsListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    toggleWishlist: (state, action: PayloadAction<EventItem>) => {
      const event = action.payload;
    
      if (!state.wishlist) {
        state.wishlist = [];
      }
    
      const exists = state.wishlist.find((e) => e?.event_date_id === event?.event_date_id);
    
      if (exists) {
        state.wishlist = state.wishlist.filter(
          (e) => e?.event_date_id !== event?.event_date_id
        );
      } else {
        state.wishlist = [...state.wishlist, event];
      }
    },
  },
});

export const {
  eventsListRequest,
  eventsListSuccess,
  eventsListFailure,
  toggleWishlist,
} = EventsListSlice.actions;

export const fetchEventsList = () => async (dispatch: AppDispatch) => {
  dispatch(eventsListRequest());
  try {
    const response = await request({
      method: "POST",
      url: url.eventsListingUrl,
    });
    const data = response?.data?.data;
    dispatch(eventsListSuccess(data));
  } catch (error: any) {
    dispatch(eventsListFailure(error.data || error.message));
  }
};

export default EventsListSlice.reducer;
