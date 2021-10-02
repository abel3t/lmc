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
          <t-table
            :headers="['ID', 'Name', 'Mark']"
            :data="data">
          </t-table>
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

export default {
  components: { QuestionBar },
  data() {
    return {
      result: [],
      data: [],
      tabQuestionType: TabQuestionType.LoveLanguage
    };
  },
  mounted() {
    const result = localStorage.getItem('loveLanguageResult');
    if (result) {
      this.result = JSON.parse(result);

      this.data = this.result
        .sort((a, b) => b - a)
        .map((x, index) => {
          return [ index + 1, LoveLanguageTitle[index], x ];
        });
    }
  }
};
</script>
