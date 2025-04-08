import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  registeredUsers: User[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  registeredUsers: [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
    },
    {
      username: 'Seck Alioune Badara',
      email: 'alioune@collegelacite.com',
      password: 'password',
    },
  ],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.registeredUsers.push(action.payload);
    },

    login: (state, action: PayloadAction<{ identifier: string; password: string }>) => {
      const foundUser = state.registeredUsers.find(
        u =>
          (u.username === action.payload.identifier || u.email === action.payload.identifier) &&
          u.password === action.payload.password
      );

      if (foundUser) {
        state.isAuthenticated = true;
        state.user = foundUser;
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
