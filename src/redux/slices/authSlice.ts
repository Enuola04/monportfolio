import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  registeredUsers: User[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  registeredUsers: [
    { username: 'admin', password: 'admin123' },
    { username: 'jahswant', password: 'password' },
  ],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.registeredUsers.push(action.payload);
    },
    login: (state, action: PayloadAction<User>) => {
      const foundUser = state.registeredUsers.find(
        u =>
          u.username === action.payload.username &&
          u.password === action.payload.password
      );
      if (foundUser) {
        state.isAuthenticated = true;
        state.user = action.payload.username;
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
