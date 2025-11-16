// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = !!action.payload;
    },
    logout(state) {
      state.currentUser = null;
      state.isLogin = false;
    },
    // 🔥 보유 캔디만 업데이트하는 액션
    updateMemberCandy(state, action) {
      if (state.currentUser) {
        state.currentUser.memberCandy = action.payload;
      }
    },
  },
});

export const { setCurrentUser, logout, updateMemberCandy } = userSlice.actions;
export default userSlice.reducer;
