import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../settings/store';
import { LoveLanguageQuestions } from '../constant';

export type LoveLanguageState = {
  questions: Record<string, any>[]
};

const initialState: LoveLanguageState = {
  questions: LoveLanguageQuestions.reduce((acc: any, current) => {
    acc[current.id] = { ...current };
    return acc;
  }, {})
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
      if (state.questions[id - 1] && question) {
        state.questions[id  - 1] = { ...state.questions[id - 1], ...question };
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
