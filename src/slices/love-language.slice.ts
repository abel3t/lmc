import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';
import { LoveLanguageQuestions } from '../constant';

export type LoveLanguageState = {
  questions: Record<string, any>[]
};

const initialState: LoveLanguageState = {
  questions: LoveLanguageQuestions
};

export const loveLanguageSlice = createSlice({
  name: 'loveLanguage',
  initialState,
  reducers: {
    updateLoveLanguageQuestions: (state, action: PayloadAction<any>) => {
      state.questions = action.payload;
    },
    updateLoveLanguageQuestion: (state, action: PayloadAction<any>) => {
      const { id, question } = action.payload;
      console.log({answers: question.answers})
      if (state.questions[id] && question) {
        state.questions[id] = { ...state.questions[id], ...question };
      }
    }
  }
});

export const {
  updateLoveLanguageQuestions,
  updateLoveLanguageQuestion
} = loveLanguageSlice.actions;

export const getLoveLanguageQuestions = (state: RootState) => state.loveLanguage.questions;

export default loveLanguageSlice.reducer;
