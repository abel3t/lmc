<template>
  <ul class="flex">
    <li class="flex-1 mr-2">
      <NuxtLink to="/ca-tinh">
        <a class="text-center block border"
           href="#"
           v-bind:class="{[active]: tabQuestionType === tabQuestionTypes.Personality, [inActive]: tabQuestionType !== tabQuestionTypes.Personality}"

        >Khảo sát cá tính
        </a>
      </NuxtLink>
    </li>
    <li class="flex-1 mr-2">
      <NuxtLink to="/ngon-ngu-tinh-yeu">
        <a
          class="text-center block border"
          href="#"
          v-bind:class="{[active]: tabQuestionType === tabQuestionTypes.LoveLanguage, [inActive]: tabQuestionType !== tabQuestionTypes.LoveLanguage}">Ngôn
          ngữ tình yêu</a>
      </NuxtLink>
    </li>
    <li class="flex-1 mr-2">
      <NuxtLink to="/an-tu-chuc-vu">
        <a
          class="text-center block border"
          href="#"
          v-bind:class="{[active]: tabQuestionType === tabQuestionTypes.Gift, [inActive]: tabQuestionType !== tabQuestionTypes.Gift}">Ân
          tứ chức vụ</a>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>

import { TabQuestionType } from '~/store';

export default {
  components: {},
  data() {
    return {
      tabQuestionTypes: TabQuestionType,
      active: 'border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white',
      inActive: 'border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4'
    };
  },
  props: {
    tabQuestionType: String
  }
};
</script>
