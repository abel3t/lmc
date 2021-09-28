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
      <nuxt-link to="/ngon-ngu-tinh-yeu/khao-sat">
        <t-button>Làm khảo sát</t-button>
      </nuxt-link>
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

export default {
  components: { QuestionBar },
  data() {
    return {
      tabQuestionType: TabQuestionType.LoveLanguage
    };
  }
};
</script>
