import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 5,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      if (state.count === 0) return;

      state.count -= 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      if (action.payload < 0) action.payload = 0;

      state.count = action.payload;
    },
  },
});

export const { increment, decrement, setCount } = counterSlice.actions;

export default counterSlice.reducer;
