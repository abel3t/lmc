<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="questions">
      <div v-for="question in questions" :key="question.id">
        <div class="py-2">
          {{question.text}}
          <div v-for="answer in question.answers" :key="answer.type">
            <div class="questions__answer">
              <div v-if="answer.text" class="inline-flex">
                <t-input min="1" max="5" type="number" class="questions__input"/>
                <span class="ml-2">{{answer.text}}</span>
              </div>
              <div v-else class="inline-flex">
                <t-input min="1" max="5" type="number" class="questions__input"/>
                <div class="ml-2">
                  <p>{{answer.textFemale}}</p>
                  <p>{{answer.textMale}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.questions {
  @apply border-0 shadow-2xl text-justify sm:p-1 md:p-3 lg:p-6 sm:w-full md:w-3/4 lg:w-2/3;
  margin: 0 auto;

  &__answer {
    @apply p-1;
  }

  &__input {
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
import QuestionBar from '../components/QuestionBar';
import { TabQuestionType } from '../store';
export default {
  data() {
    return {
      tabQuestionType: TabQuestionType.LoveLanguage
    }
  },
  components: { QuestionBar },
  computed: {
    questions: function () {
      return this.$store.getters.loveLanguagesQuestions;
    }
  }
};
</script>
