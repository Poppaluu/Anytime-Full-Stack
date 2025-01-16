import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eldenRingService from './eldenRingService';

const initialState = {
  creatures: [],
  bosses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Fetch creatures
export const fetchCreatures = createAsyncThunk(
  'eldenRing/fetchCreatures',
  async (_, thunkAPI) => {
    try {
      const creatures = await eldenRingService.getCreatures();
      console.log('Fetched creatures:', creatures); // Debug
      return creatures;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch bosses
export const fetchBosses = createAsyncThunk(
  'eldenRing/fetchBosses',
  async (_, thunkAPI) => {
    try {
      const bosses = await eldenRingService.getBosses();
      console.log('Fetched bosses:', bosses); // Debug
      return bosses;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const eldenRingSlice = createSlice({
  name: 'eldenRing',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.creatures = action.payload;
      })
      .addCase(fetchCreatures.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchBosses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBosses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bosses = action.payload;
      })
      .addCase(fetchBosses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = eldenRingSlice.actions;
export default eldenRingSlice.reducer;