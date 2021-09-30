<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="love-language-test__wrapper">
      <div class="love-language-test__questions">
        <div v-for="(question, qIndex) in questions" :key="question.id">
          <div class="py-2">
            {{ question.text }}
            <div v-for="(answer, aIndex) in question.answers" :key="answer.type">
              <div class="love-language-test__questions__answer">
                <div v-if="answer.text" class="inline-flex">
                  <t-input min="1" max="5" type="number" class="love-language-test__questions__input"
                           :variant="answer.error ? 'danger': ''" @blur="updateMark({qIndex, aIndex }, $event)"
                           @keyup.enter="updateMark({qIndex, aIndex }, $event)" :value="answer.mark || ''"/>
                  <span class="ml-2">{{ answer.text }}</span>
                </div>
                <div v-else class="inline-flex">
                  <t-input min="1" max="5" type="number" class="love-language-test__questions__input"/>
                  <div class="ml-2">
                    <p>{{ answer.textFemale }}</p>
                    <p>{{ answer.textMale }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/4">
        <PieChart :data="pieChartData" :options="pieChartOptions"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.love-language-test__wrapper {
  @apply flex flex-col justify-center items-center;
}

.love-language-test__questions {
  @apply border-0 shadow-2xl text-justify p-3 sm:p-4 md:p-5 lg:p-6 sm:w-full md:w-3/4 lg:w-2/3;
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
import QuestionBar from '../../components/QuestionBar';
import { TabQuestionType, UPDATE_LOVE_LANGUAGE_QUESTIONS } from '../../store';
import PieChart from '../../components/pie-chart';

export default {
  components: { QuestionBar, PieChart },
  data() {
    return {
      hasError: false,
      tabQuestionType: TabQuestionType.LoveLanguage,
      pieChartData: {
        labels: [
          'D',
          'I',
          'S',
          'C'
        ],
        datasets: [
          {
            label: 'DISC',
            data: [ 70, 10, 10, 10 ],
            backgroundColor: [ '#F16284', '#F49F41', '#F8CD56', '#42A2EB' ],
            borderWidth: 1
          }
        ]
      },
      pieChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'DISC'
          }
        }
      }
    };
  },
  computed: {
    questions: function () {
      return this.$store.getters.loveLanguagesQuestions;
    }
  },
  methods: {
    updateMark({ qIndex, aIndex }, e) {
      const value = parseInt(e.target?.value) || 0;

      const _question = JSON.parse(JSON.stringify(this.questions));
      _question[qIndex].answers[aIndex].mark = value;

      const answerMarks = _question[qIndex].answers.map(answer => answer.mark);

      answerMarks.forEach((answerMark, idx) => {
        const isValid = answerMark >= 0 && answerMark <= 5 && answerMarks.indexOf(answerMark) === idx;

        this.hasError = !isValid;
        _question[qIndex].answers[idx].error = !isValid;
      });

      this.$store.dispatch(UPDATE_LOVE_LANGUAGE_QUESTIONS, _question);
    }
  }
};
</script>
