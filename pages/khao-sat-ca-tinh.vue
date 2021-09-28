<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="questions">
      <div v-for="question in questions" :key="question.id" class="py-2">
        <span>Câu {{question.id}}:</span>
        <div class="inline-flex">
          <div v-for="answer in question.answers" :key="answer.type" class="ml-3">
            <label class="flex items-center">
              <t-checkbox name="options"/>
              <span class="ml-2">{{answer.text}}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionBar from '../components/QuestionBar';
import { TabQuestionType } from '../store';

export default {
  data() {
    return {
      tabQuestionType: TabQuestionType.Personality
    }
  },
  components: { QuestionBar },
  computed: {
    questions: function () {
      return this.$store.getters.discQuestions;
    }
  }
};
</script>
