<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="personality-test__wrapper">
      <div class="personality-test__questions">
        <div v-for="question in questions" :key="question.id" class="py-2">
          <span>Câu {{ question.id }}:</span>
          <div class="inline-flex">
            <div v-for="answer in question.answers" :key="answer.type" class="ml-3">
              <label class="flex items-center">
                <t-checkbox name="options"/>
                <span class="ml-2">{{ answer.text }}</span>
              </label>
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
.personality-test__wrapper {
  @apply flex flex-col justify-center items-center;
}

.personality-test__questions {
  @apply border-0 shadow-2xl text-justify p-3 sm:p-4 md:p-5 lg:p-6 sm:w-full md:w-3/4 lg:w-2/3;
  margin: 0 auto;
}
</style>

<script>
import QuestionBar from '../../components/QuestionBar';
import { TabQuestionType } from '../../store';
import PieChart from '../../components/pie-chart';

export default {
  data() {
    return {
      tabQuestionType: TabQuestionType.Personality,
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
  components: { PieChart, QuestionBar },
  computed: {
    questions: function () {
      return this.$store.getters.discQuestions;
    }
  }
};
</script>
