// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: null, // User UID
  userData: null, // Other user data like profile
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUID: (state, action) => {
      state.uid = action.payload; // Store UID
    },
    setUserData: (state, action) => {
      state.userData = action.payload; // Store profile data
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUserData: (state) => {
      state.uid = null;
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUID, setUserData, setLoading, setError, clearUserData } = userSlice.actions;
export default userSlice.reducer;
