<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="love-language__wrapper">
      <div class="love-language__intro">
        <p>
          Bạn có biết ngôn ngữ yêu thương của mình, ngôn ngữ mà khi ai đó bày tỏ với bạn, bạn sẽ cảm thấy được yêu
          thương nhất? Quan trọng hơn, bạn có biết ngôn ngữ yêu thương của những người chung quanh mình để bày tỏ tình
          yêu thương và sự quan tâm của bạn cho họ theo cách họ mong đợi nhất? Bản trắc nghiệm ngôn ngữ yêu thương này
          sẽ giúp bạn!
        </p>
      </div>

      <div class="result">
        <div v-if="result.length">
          <div>
            <strong>Kết quả của bạn</strong>
          </div>

          <div class="w-1/4 sm:w-1/5 lg:w-1/6">
            <t-select
              :options="Object.values(resultViewTitle)"
              v-on:change="onChangeView"
              v-model="viewType"
            ></t-select>
          </div>

          <t-table v-if="viewType === resultViewTitle.Table"
                   :headers="['ID', 'Name', 'Mark']"
                   :data="tableData">
          </t-table>

          <div v-if="viewType === resultViewTitle.Line">
            <LineChart :data="chartData" :options="chartOptions"/>
          </div>

          <div v-if="viewType === resultViewTitle.Pie">
            <PieChart :data="chartData" :options="chartOptions"/>
          </div>

          <div v-if="viewType === resultViewTitle.Radar">
            <RadarChart :data="chartData" :options="chartOptions"/>
          </div>

        </div>
        <div v-else>
          Chưa có kết quả
        </div>
      </div>

      <div class="mt-3">
        <nuxt-link to="/ngon-ngu-tinh-yeu/khao-sat">
          <t-button>Làm {{result.length ? 'lại' : ''}} khảo sát</t-button>
        </nuxt-link>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.love-language {
  &__wrapper {
    @apply border-0 shadow-2xl text-justify p-3 sm:p-4 md:p-5 lg:p-6 sm:w-full md:w-3/4 lg:w-2/3 mt-3;
    margin: 0 auto;
  }

  &__intro {
    @apply px-2 py-5;
  }
}
</style>

<script>
import QuestionBar from '../../components/QuestionBar';
import { TabQuestionType } from '../../store';
import { LoveLanguageTitle } from '../../store/love-languages';
import { resultViewTitle } from '../../constant';
import LineChart from '../../components/line-chart';
import PieChart from '../../components/pie-chart';
import RadarChart from '../../components/radar-chart';

export default {
  components: { RadarChart, PieChart, LineChart, QuestionBar },
  data() {
    return {
      resultViewTitle,
      viewType: resultViewTitle.Table,
      result: [],
      tableData: [],
      datasets: [],
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'View'
          }
        }
      }
    };
  },
  computed: {
    chartData: {
      get: function () {
        return {
          labels: Object.values(LoveLanguageTitle),
          datasets: this.datasets
        };
      },
      set: function (newValue) {
        this.datasets = newValue;
      }
    }
  },
  methods: {
    onChangeView() {
      switch (this.viewType) {
        case resultViewTitle.Line: {
          this.chartData =  [
            {
              label: 'Kết Quả',
              data: this.result,
              backgroundColor: '#EDDDD4'
            }
          ]

          break;
        }

        case resultViewTitle.Pie: {
          this.chartData =  [
            {
              label: 'Kết Quả',
              data: this.result,
              backgroundColor: [
                '#F16284', '#F49F41', '#F8CD56', '#42A2EB', '#283D3B', '#197278', '#EDDDD4',
                '#C44536', '#772E25', '#5465FF', '#788BFF', '#9BB1FF', '#BFD7FF', '#E2FDFF',
                '#2E0E02', '#581908', '#983628', '#E2AEDD', '#EBCBF4', '#E5BEED', '#9593D9',
                '#7C90DB', '#736B92', '#7D5C65', '#795C5F', '#A69658', '#D9B26F', '#FADF7F'
              ],
              hoverOffset: 4
            }
          ]
          break;
        }

        case resultViewTitle.Radar: {
          this.chartData =  [
            {
              label: 'Kết Quả',
              data: this.result,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }
          ]

          break;
        }

        default:
          break;
      }
    }
  },
  mounted() {
    const result = localStorage.getItem('loveLanguageResult');
    if (result) {
      this.result = JSON.parse(result);

      this.tableData = this.result
        .sort((a, b) => b - a)
        .map((x, index) => {
          return [ index + 1, LoveLanguageTitle[index], x ];
        });
    }
  }
};
</script>
