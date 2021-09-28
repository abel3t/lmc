<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <nuxt-link to="/ngon-ngu-tinh-yeu/khao-sat">Làm khảo sát</nuxt-link>
  </div>
</template>
<script>
import QuestionBar from '../../components/QuestionBar';
import { TabQuestionType } from '../../store';
export default {
  components: { QuestionBar },
  data() {
    return {
      tabQuestionType: TabQuestionType.LoveLanguage
    }
  }
};
</script>
