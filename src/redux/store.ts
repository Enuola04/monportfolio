import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import skillsReducer from './slices/skillsSlice';
import projectsReducer from './slices/projectsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  testimonials: testimonialsReducer,
  skills: skillsReducer,
  projects: projectsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
