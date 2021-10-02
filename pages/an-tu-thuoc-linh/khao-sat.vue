<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="gift-test__questions">
      <div v-for="(question, qIndex) in questions" :key="question.id" class="py-2">
        <div><strong>Câu {{ question.id }}:</strong></div>
        <div class="inline-flex">
          <t-input min="1" max="5" type="number" class="gift-test__questions_input"
                   :variant="question.error ? 'danger': ''" @blur="updateMark(qIndex, $event)"
                   @keyup.enter="updateMark(qIndex, $event)" :value="question.mark || ''"/>
          <span class="ml-2">{{ question.text }}</span>
        </div>
      </div>
    </div>

    <t-button v-on:click="submit()">Gửi kết quả</t-button>
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
import { TabQuestionType, UPDATE_GIFT_QUESTIONS, UPDATE_GIFT_RESULT } from '../../store';

export default {
  data() {
    return {
      errorQuestionIds: {  },
      tabQuestionType: TabQuestionType.Gift
    };
  },
  components: { QuestionBar },
  computed: {
    questions: function () {
      return this.$store.getters.giftQuestions;
    }
  },
  methods: {
    updateMark(qIndex, e) {
      const value = parseInt(e.target?.value) || 0;

      const _questions = JSON.parse(JSON.stringify(this.questions));

      const isValid = value > 0 && value <= 10;

      this.errorQuestionIds = { qIndex: isValid };

      _questions[qIndex].mark = value;
      _questions[qIndex].error = !isValid;

      this.$store.dispatch(UPDATE_GIFT_QUESTIONS, _questions);
    },
    submit() {
      const questionMarkGroups = this.questions.reduce((acc, question) => {
        acc[question.type] = (acc[question.type] || 0) + (question.mark || 0);
        return acc;
      }, []);

      localStorage.setItem('giftResult', JSON.stringify(questionMarkGroups));
      this.$store.dispatch(UPDATE_GIFT_RESULT, questionMarkGroups);

      window.open('/an-tu-thuoc-linh', '_self')
    }
  }
};
</script>
