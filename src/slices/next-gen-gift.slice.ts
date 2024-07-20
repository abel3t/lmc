import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';
import { nextGenGiftQuestions } from '../constant';

export type NextGenGiftState = {
  questions: Record<string, any>[];
};

const initialState: NextGenGiftState = {
  questions: nextGenGiftQuestions.reduce((acc: any, current) => {
    acc[current.id] = { ...current };
    return acc;
  }, {})
};

export const nextGenGiftSlice = createSlice({
  name: 'nextGenGift',
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

export const { updateGiftQuestions, updateGiftQuestion } = nextGenGiftSlice.actions;

export const getGiftQuestions = (state: RootState) => state.nextGenGift.questions;

export default nextGenGiftSlice.reducer;
