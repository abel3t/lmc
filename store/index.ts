import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { questions as loveLanguagesQuestions, LoveLanguageType, LoveLanguageTitle } from './love-languages';

export type RootState = ReturnType<typeof state>

const state = () => ({
  loveLanguagesQuestions
});

const mutations: MutationTree<RootState> = {}

const actions: ActionTree<RootState, RootState> = {}

const getters: GetterTree<RootState, RootState> = {
  loveLanguagesQuestions(state) {
    return state.loveLanguagesQuestions;
  }
}

export default {
  state, getters, mutations, actions
};
