<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="gift-test__questions">
      <div v-for="question in questions" :key="question.id" class="py-2">
        <div><strong>Câu {{ question.id }}:</strong></div>
        <div class="inline-flex">
          <t-input min="1" max="5" type="number" class="gift-test__questions_input"/>
          <span class="ml-2">{{ question.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.gift-test__questions {
  @apply border-0 shadow-2xl text-justify p-3 sm:p-4 md:p-5 lg:p-6 sm:w-full md:w-3/4 lg:w-2/3;
  margin: 0 auto;

  &_input {
    width: 25px;
    height: 25px;
    min-width: 25px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
}

</style>

<script>
import QuestionBar from '../../components/QuestionBar';
import { TabQuestionType } from '../../store';

export default {
  data() {
    return {
      tabQuestionType: TabQuestionType.Gift
    };
  },
  components: { QuestionBar },
  computed: {
    questions: function () {
      return this.$store.getters.giftQuestions;
    }
  }
};
</script>
