import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';

export type LoveLanguageState = {
  questions: Record<string, any>[]
};

const initialState: LoveLanguageState = {
  questions: []
};

export const loveLanguageSlice = createSlice({
  name: 'loveLanguage',
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
} = loveLanguageSlice.actions;

export const getQuestions = (state: RootState) => state.loveLanguage.questions;

export default loveLanguageSlice.reducer;
