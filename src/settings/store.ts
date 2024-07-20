import { configureStore } from '@reduxjs/toolkit';

import giftReducer from 'slices/gift.slice';
import loveLanguageReducer from 'slices/love-language.slice';
import nextGenGiftReducer from 'slices/next-gen-gift.slice';

export const store = configureStore({
  reducer: {
    gift: giftReducer,
    loveLanguage: loveLanguageReducer,
    nextGenGift: nextGenGiftReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
