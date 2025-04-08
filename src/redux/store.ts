import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import skillsReducer from './slices/skillsSlice';
import projectsReducer from './slices/projectsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    testimonials: testimonialsReducer,
    skills: skillsReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
