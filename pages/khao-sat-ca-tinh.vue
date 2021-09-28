<template>
  <div>
    <QuestionBar/>
    <div class="questions">
      <div v-for="question in questions" :key="question.id">
        <span>Câu {{question.id}}:</span>
        <div class="inline-flex">
          <div v-for="answer in question.answers" :key="answer.type">
            <label class="flex items-center">
              <t-checkbox name="options"/>
              <span class="ml-2 text-sm">{{answer.text}}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionBar from '../components/QuestionBar';

export default {
  components: { QuestionBar },
  computed: {
    questions: function () {
      return this.$store.getters.discQuestions;
    }
  }
};
</script>
