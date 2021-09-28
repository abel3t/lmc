<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="personality__wrapper">
      <div class="personality__intro">
        <p>Trắc nghiệm tính cách DISC là một công cụ xác định tính cách của người đối diện thông qua hành vi của họ
          trong một tình huống thực tế hay hệ thống câu hỏi cụ thể. Điều này giúp bạn có thể nắm bắt sở thích, suy nghĩ
          và xu hướng hành vi của người đó, từ biết được họ thuộc nhóm tính cách nào để giao tiếp linh hoạt, hiệu quả.
          Những phân tích rõ ràng và cụ thể về 4 nhóm phong cách hành vi theo DISC giúp bạn cải thiện kỹ năng giao tiếp
          của bản thân, tạo thiện cảm với mọi người xung quanh, xây dựng mối quan hệ, xây dựng đội nhóm và phát triển
          mối quan hệ cộng đồng.</p>
        <p class="mt-2">Trắc nghiệm DISC được xây dựng dựa trên lý thuyết DISC của nhà tâm lý học William Moulton
          Marston – một luật sư và một nhà tâm lý học. Đây là một trong những công cụ hữu ích nhất được các công ty và
          tổ chức sử dụng hiện nay để đánh giá tính cách ứng viên. Người làm bài đánh giá sẽ hoàn thành một bảng câu hỏi
          bao gồm từ 24 đến 28 câu. Mỗi câu hỏi bao gồm 4 tính từ được trích ra từ nghiên cứu ban đầu của Marston.</p>
      </div>
      <nuxt-link to="/ca-tinh/khao-sat">
        <t-button>
          Làm khảo sát
        </t-button>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
.personality {
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
      tabQuestionType: TabQuestionType.Personality
    };
  }
};
</script>
