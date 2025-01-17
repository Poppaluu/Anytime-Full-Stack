import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import eldenRingReducer from '../features/eldenRing/eldenRingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    eldenRing: eldenRingReducer,
  },
});