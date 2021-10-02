import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { questions as loveLanguagesQuestions } from './love-languages';
import { questions as giftQuestions } from './gift';

export type RootState = ReturnType<typeof state>

export enum TabQuestionType {
  LoveLanguage = 'LoveLanguage',
  Gift = 'Gift'
}

const state = () => ({
  loveLanguagesQuestions,
  giftQuestions,
  giftResult: [] as any[],
  loveLanguagesResult: [] as any[]
});

export const UPDATE_LOVE_LANGUAGE_QUESTIONS = 'updateLoveLangeQuestions';
export const UPDATE_GIFT_QUESTIONS = 'updateGiftQuestions';
export const UPDATE_GIFT_RESULT = 'updateGiftResult';
export const UPDATE_LOVE_LANGUAGE_RESULT = 'updateLoveLangeResult';

const mutations: MutationTree<RootState> = {
  [`${UPDATE_LOVE_LANGUAGE_QUESTIONS}`](state, questions: any[]) {
    state.loveLanguagesQuestions = questions;
  },
  [`${UPDATE_GIFT_QUESTIONS}`](state, questions: any[]) {
    state.giftQuestions = questions;
  },
  [`${UPDATE_GIFT_RESULT}`](state, result: any[]) {
    state.giftResult = result;
  },
  [`${UPDATE_LOVE_LANGUAGE_RESULT}`](state, result: any[]) {
    state.loveLanguagesResult = result;
  }
};

const actions: ActionTree<RootState, RootState> = {
  [`${UPDATE_LOVE_LANGUAGE_QUESTIONS}`]({ commit }, payload) {
    commit(UPDATE_LOVE_LANGUAGE_QUESTIONS, payload);
  },
  [`${UPDATE_GIFT_QUESTIONS}`]({ commit }, payload) {
    commit(UPDATE_GIFT_QUESTIONS, payload);
  },
  [`${UPDATE_GIFT_RESULT}`]({ commit }, payload) {
    commit(UPDATE_GIFT_RESULT, payload);
  },
  [`${UPDATE_LOVE_LANGUAGE_RESULT}`]({ commit }, payload) {
    commit(UPDATE_LOVE_LANGUAGE_RESULT, payload);
  }
};

const getters: GetterTree<RootState, RootState> = {
  loveLanguagesQuestions(state) {
    return state.loveLanguagesQuestions;
  },
  giftQuestions(state) {
    return state.giftQuestions;
  },
  giftResult(state) {
    return state.giftResult;
  },
  loveLanguageResult(state) {
    return state.loveLanguagesResult;
  }
};

export default {
  state, getters, mutations, actions
};
