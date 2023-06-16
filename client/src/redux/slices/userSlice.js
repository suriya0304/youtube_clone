const { createSlice } = require('@reduxjs/toolkit');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subsciption: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        const userIndex = state.currentUser.subscribedUsers.findIndex(
          (userId) => userId === action.payload
        );
        state.currentUser.subscribedUsers.splice(userIndex, 1);
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginError, loginSuccess, logout, subsciption } =
  userSlice.actions;

export default userSlice.reducer;
