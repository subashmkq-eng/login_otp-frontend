import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

const authSlice = createSlice({
  name: 'otpReducer',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = authSlice.actions;
export default authSlice.reducer;
