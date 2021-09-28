import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { questions as loveLanguagesQuestions } from './love-languages';
import { questions as discQuestions } from './disc';
import { questions as giftQuestions } from './gift';

export type RootState = ReturnType<typeof state>

export enum TabQuestionType {
  Personality= 'Personality',
  LoveLanguage = 'LoveLanguage',
  Gift = 'Gift'
}
const state = () => ({
  loveLanguagesQuestions,
  discQuestions,
  giftQuestions,

});

const mutations: MutationTree<RootState> ={};

const actions: ActionTree<RootState, RootState> = {};

const getters: GetterTree<RootState, RootState> = {
  loveLanguagesQuestions(state) {
    return state.loveLanguagesQuestions;
  },
  discQuestions(state) {
    return state.discQuestions
  },
  giftQuestions(state) {
    return state.giftQuestions
  }
};

export default {
  state, getters, mutations, actions
};
