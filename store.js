// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import loginDetailsReducer from "./features/loginDetails";
//import collectionReducer from "./features/collectionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    loginDetails: loginDetailsReducer,
    // collection: collectionReducer,
  },
});

export default store;
