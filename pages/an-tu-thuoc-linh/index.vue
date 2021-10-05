<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="gift__wrapper">
      <div class="gift__intro">
        <p>
          Hãy trả lời 140 câu hỏi (5 nhóm) bằng cách chấm mức độ đúng với khả năng/xu hướng/tâm tình của bạn. Đúng nhất
          với mình là điểm 10, không đúng nhất với mình là điểm 1. Chấm điểm ngay cho các câu mô tả được đưa ra. Đừng
          suy nghĩ cẩn thận quá, đây là chỉ là khảo sát.
        </p>
      </div>

      <div class="result">
        <div v-if="result.length">
          <div>
            <strong>Kết quả của bạn</strong>
          </div>

          <div class="w-1/3 sm:w-1/5 lg:w-1/6">
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
            <LineChart class="chart" :data="chartData" :options="chartOptions"/>
          </div>

          <div v-if="viewType === resultViewTitle.Pie">
            <PieChart class="chart" :data="chartData" :options="chartOptions"/>
          </div>

          <div v-if="viewType === resultViewTitle.Radar">
            <RadarChart class="chart" :data="chartData" :options="chartOptions"/>
          </div>

        </div>
        <div v-else>
          Chưa có kết quả
        </div>
      </div>

      <div class="mt-3">
        <nuxt-link to="/an-tu-thuoc-linh/khao-sat">
          <t-button>Làm {{ result.length ? 'lại' : '' }} khảo sát</t-button>
        </nuxt-link>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.chart {
  @media only screen and (min-width: 200px) {
    height: 350px;
  }

  @media only screen and (min-width: 600px) {
    height: 300px;
  }
}

.gift {
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
import { resultViewGiftTitle } from '../../constant';
import LineChart from '../../components/line-chart';
import RadarChart from '../../components/radar-chart';
import { TabQuestionType } from '../../store';
import { GiftTitle } from '../../store/gift';

export default {
  components: { RadarChart, LineChart, QuestionBar },
  data() {
    return {
      resultViewTitle: resultViewGiftTitle,
      viewType: resultViewGiftTitle.Table,
      result: [],
      tabQuestionType: TabQuestionType.Gift,
      tableData: [],
      datasets: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    chartData: {
      get: function () {
        return {
          labels: Object.values(GiftTitle),
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
        case resultViewGiftTitle.Line: {
          this.chartData = [
            {
              label: 'Kết Quả',
              data: this.result.map(x => x.mark),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)'
            }
          ];

          break;
        }

        case resultViewGiftTitle.Radar: {
          this.chartData = [
            {
              label: 'Kết Quả',
              data: this.result.map(x => x.mark),
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              pointBackgroundColor: 'rgb(54, 162, 235)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(54, 162, 235)'
            }
          ];

          break;
        }

        default:
          break;
      }
    }
  },
  mounted() {
    const result = localStorage.getItem('giftResult');
    if (result) {
      this.result = JSON.parse(result);

      this.tableData = JSON.parse(result)
        .sort((a, b) => b?.mark - a?.mark)
        .map((x, index) => {
          return [ index + 1, GiftTitle[x.type], x.mark ];
        });
    }
  }
};
</script>
