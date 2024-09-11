// userSlice.js
//import { createSlice } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: {
    biography: "",
    contactnumber: "",
    dateofbirth: "",
    facebook: "",
    fullname: "",
    imageUrl: "",
    instagram: "",
    artistUid: "",
    websiteurl: "",
    loading: "",
  },
};

// export const fetchUserData = createAsyncThunk(
//   "user/fetchUserData",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const user = auth.currentUser;
//       console.log(user.uid);
//       const docData = await getDoc(
//         doc(FIRESTORE_DB, "users", user.uid),
//         {}
//       );

//       if (docData.exists()) {
//         const data = docData.data();
//         return data;
//       } else {
//         console.log("NO SUCH DATA");
//         return {};
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

const loginDetailsSlice = createSlice({
  name: "loginDetails",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.data.name = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },

    setImage: (state, action) => {
      state.data.image = action.payload;
    },
    setLoading: (state, action) => {
      console.log(state);
      console.log(action);
      state.data.loading = action.payload;
    },
  },
});

export const { setName, setData, setImage, setLoading } =
  loginDetailsSlice.actions;

export default loginDetailsSlice.reducer;
