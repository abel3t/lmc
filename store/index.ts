import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { questions as loveLanguagesQuestions } from './love-languages';
import { questions as discQuestions } from './disc';
import { questions as giftQuestions } from './gift';

export type RootState = ReturnType<typeof state>

export enum TabQuestionType {
  Personality = 'Personality',
  LoveLanguage = 'LoveLanguage',
  Gift = 'Gift'
}

const state = () => ({
  loveLanguagesQuestions,
  discQuestions,
  giftQuestions
});

export const UPDATE_LOVE_LANGUAGE_QUESTIONS = 'updateLoveLangeQuestions';

const mutations: MutationTree<RootState> = {
  [`${UPDATE_LOVE_LANGUAGE_QUESTIONS}`](state, questions: any[]) {
    state.loveLanguagesQuestions = questions;
  }
};

const actions: ActionTree<RootState, RootState> = {
  [`${UPDATE_LOVE_LANGUAGE_QUESTIONS}`]({ commit }, payload) {
    commit(UPDATE_LOVE_LANGUAGE_QUESTIONS, payload);
  },
};

const getters: GetterTree<RootState, RootState> = {
  loveLanguagesQuestions(state) {
    return state.loveLanguagesQuestions;
  },
  discQuestions(state) {
    return state.discQuestions;
  },
  giftQuestions(state) {
    return state.giftQuestions;
  }
};

export default {
  state, getters, mutations, actions
};
