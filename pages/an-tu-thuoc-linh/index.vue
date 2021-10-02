<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="gift__wrapper">
      <div class="gift__intro">
        <p>Hãy trả lời 140 câu hỏi (5 nhóm) bằng cách chấm mức độ đúng với khả năng/xu hướng/tâm tình của bạn. Đúng nhất
          với mình là điểm 10, không đúng nhất với mình là điểm 1. Chấm điểm ngay cho các câu mô tả được đưa ra. Đừng
          suy nghĩ cẩn thận quá, đây là chỉ là khảo sát.</p>
      </div>
      <nuxt-link to="an-tu-thuoc-linh/khao-sat">
        <t-button>
          Làm {{result.length ? 'lại' : ''}} khảo sát
        </t-button>
      </nuxt-link>

      <div class="result">
        <t-table v-if="result.length"
          :headers="['ID', 'Name', 'Mark']"
          :data="data">
        </t-table>
        <div v-else>
          Chưa có kết quả
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.gift {
  &__wrapper {
    @apply border-0 shadow-2xl text-justify p-3 sm:p-4 md:p-5 lg:p-6 sm:w-full md:w-3/4 lg:w-2/3 pt-3;
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
import { GiftTitle } from '../../store/gift';

export default {
  components: { QuestionBar },
  data() {
    return {
      tabQuestionType: TabQuestionType.Gift,
      result: [],
      data: []
    };
  },
  computed: {},
  mounted() {
    const result = localStorage.getItem('giftResult');
    if (result) {
      this.result = JSON.parse(result);

      this.data = this.result
        .sort((a, b) => b - a)
        .map((x, index) => {
          return [ index + 1, GiftTitle[index], x ];
        });
    }
  }
};
</script>
