import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: string | null;
  token: string | null;
  roles?: string[];
}

const initialState: IUserState = {
  user: null,
  token: null,
  roles: []
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token
    },
    setRoles: (state, action: PayloadAction<string[]>) => {
        state.roles = action.payload
    }
  },
});

export default userSlice.reducer;

export const { logout, setUser, setRoles } = userSlice.actions;