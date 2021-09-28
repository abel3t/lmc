<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="love-language-test__wrapper">
      <div class="love-language-test__questions">
        <div v-for="question in questions" :key="question.id">
          <div class="py-2">
            {{ question.text }}
            <div v-for="answer in question.answers" :key="answer.type">
              <div class="love-language-test__questions__answer">
                <div v-if="answer.text" class="inline-flex">
                  <t-input min="1" max="5" type="number" class="love-language-test__questions__input"/>
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
import { TabQuestionType } from '../../store';
import PieChart from '../../components/pie-chart';

export default {
  components: { QuestionBar, PieChart },
  data() {
    return {
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
  }
};
</script>
