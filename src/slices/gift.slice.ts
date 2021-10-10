import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';

export type GiftState = {
  questions: Record<string, any>[]
};

const initialState: GiftState = {
  questions: []
};

export const giftSlice = createSlice({
  name: 'gift',
  initialState,
  reducers: {
    updateQuestions: (state, action: PayloadAction<any>) => {
      state.questions = action.payload;
    },
    updateQuestion: (state, action: PayloadAction<any>) => {
      const { id, question } = action.payload;
      if (state.questions[id] && question) {
        state.questions[id] = { ...state.questions[id], ...question };
      }
    }
  }
});

export const {
  updateQuestions,
  updateQuestion
} = giftSlice.actions;

export const getQuestions = (state: RootState) => state.gift.questions;

export default giftSlice.reducer;
