import { configureStore } from '@reduxjs/toolkit';

import giftReducer from 'slices/gift.slice';
import loveLanguageReducer from 'slices/love-language.slice';

export const store = configureStore({
  reducer: {
    gift: giftReducer,
    loveLanguage: loveLanguageReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
