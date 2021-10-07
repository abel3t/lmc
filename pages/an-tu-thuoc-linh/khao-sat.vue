<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>

    <div class="flex flex-col content-center items-center p-2 md:p-4">
      <div class="bg-blue-600 text-white text-center text-3xl p-2 md:p-3 lg:p-4 my-3 border-gray-400 rounded-lg bg-white w-full md:w-3/4 lg:w-2/3">
        Bài khảo sát ân tứ thuộc linh
      </div>

      <div v-for="(question, qIndex) in questions" :key="question.id"
           class="p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white w-full md:w-3/4 lg:w-2/3">
        <div>
          <strong>Câu {{ question.id }}:</strong>
          <span class="ml-2 cursor-pointer">{{ question.text }}</span>
        </div>
        <star-rating :animate="true" :rtl="false" :increment="1"
                     :max-rating="10" :rating="question.mark || 0"
                     @rating-selected="setRating(qIndex, $event)"></star-rating>
      </div>

      <div class="flex justify-center">
        <t-button class="mt-3" v-on:click="submit()">Gửi kết quả</t-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.vue-star-rating-pointer {
  padding: 0;
  margin: 0;
}

.vue-star-rating-star {
  @media only screen and (min-width: 200px) {
    height: 25px;
    width: 25px;
  }

  @media only screen and (min-width: 600px) {
    height: 40px;
    width: 40px;
  }
}
</style>

<script>
import StarRating from 'vue-star-rating';

import QuestionBar from '../../components/QuestionBar';
import { TabQuestionType, UPDATE_GIFT_QUESTIONS, UPDATE_GIFT_RESULT } from '../../store';

export default {
  components: { QuestionBar, StarRating },
  data() {
    return {
      errorQuestionIds: {},
      tabQuestionType: TabQuestionType.Gift
    };
  },
  computed: {
    questions: function () {
      return this.$store.getters.giftQuestions;
    }
  },
  methods: {
    setRating(qIndex, rating) {
      const _questions = JSON.parse(JSON.stringify(this.questions));

      const isValid = rating > 0 && rating <= 10;

      this.errorQuestionIds = { qIndex: isValid };

      _questions[qIndex].mark = rating;
      _questions[qIndex].error = !isValid;

      this.$store.dispatch(UPDATE_GIFT_QUESTIONS, _questions);
    },
    submit() {
      let hasError = false;
      const questionMarkGroups = this.questions.reduce((acc, question) => {
        if (question.mark <= 0 || question.mark > 10) {
          hasError = true;
        }
        acc[question.type] = {
          type: question.type,
          mark: (acc[question.type]?.mark || 0) + (question.mark || 0)
        };
        return acc;
      }, []);

      if (hasError) {
        this.$dialog.alert({
          variant: 'error',
          title: '',
          text: 'Điểm của bạn chưa hợp lệ!',
          icon: ''
        }).then((result) => {
          console.log(result);
        });
      } else {
        localStorage.setItem('giftResult', JSON.stringify(questionMarkGroups));
        localStorage.setItem('giftQuestions', JSON.stringify(this.questions));
        this.$store.dispatch(UPDATE_GIFT_RESULT, questionMarkGroups);

        window.open('/an-tu-thuoc-linh', '_self');
      }
    }
  },
  mounted() {
    const questions = localStorage.getItem('giftQuestions');
    if (questions) {
      this.$store.dispatch(UPDATE_GIFT_QUESTIONS, JSON.parse(questions));
    }
  }
};
</script>
