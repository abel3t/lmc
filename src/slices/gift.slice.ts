import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';
import { simpleGiftQuestions } from '../constant';

export type GiftState = {
  questions: Record<string, any>[];
};

const initialState: GiftState = {
  questions: simpleGiftQuestions.reduce((acc: any, current) => {
    acc[current.id] = { ...current };
    return acc;
  }, {})
};

export const giftSlice = createSlice({
  name: 'gift',
  initialState,
  reducers: {
    updateGiftQuestions: (state, action: PayloadAction<any>) => {
      state.questions = action.payload;
    },
    updateGiftQuestion: (state, action: PayloadAction<any>) => {
      const { id, question } = action.payload;
      if (state.questions[id] && question) {
        state.questions[id] = { ...state.questions[id], ...question };
      }
    }
  }
});

export const { updateGiftQuestions, updateGiftQuestion } = giftSlice.actions;

export const getGiftQuestions = (state: RootState) => state.gift.questions;

export default giftSlice.reducer;
