import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { questions as loveLanguagesQuestions } from './love-languages';
import { questions as discQuestions } from '~/store/disc';

export type RootState = ReturnType<typeof state>

const state = () => ({
  loveLanguagesQuestions,
  discQuestions
});

const mutations: MutationTree<RootState> = {};

const actions: ActionTree<RootState, RootState> = {};

const getters: GetterTree<RootState, RootState> = {
  loveLanguagesQuestions(state) {
    return state.loveLanguagesQuestions;
  },
  discQuestions(state) {
    return state.discQuestions
  }
};

export default {
  state, getters, mutations, actions
};
