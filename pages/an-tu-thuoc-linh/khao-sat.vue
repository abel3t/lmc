<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div>
      <div class="gift-test__questions">
        <div class="text-center text-3xl">Bài khảo sát ân tứ thuộc linh</div>

        <div v-for="(question, qIndex) in questions" :key="question.id" class="py-2">
          <div>
            <strong>Câu {{ question.id }}:</strong>
            <span class="ml-2 cursor-pointer">{{ question.text }}</span>
          </div>
          <star-rating :animate="true" :rtl="false" :increment="0.5"
                       :max-rating="10" :rating="question.mark || 0"
                       @rating-selected="setRating(qIndex, $event)"></star-rating>
        </div>

        <div class="flex justify-center">
          <t-button class="mt-3" v-on:click="submit()">Gửi kết quả</t-button>
        </div>
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

.gift-test__questions {
  @apply border-0 shadow-2xl text-justify p-4 sm:p-4 md:p-5 lg:p-6 sm:w-full md:w-3/4 lg:w-2/3 my-5 bg-white;
  margin: 0 auto;

  &_input {
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
        acc[question.type] = (acc[question.type] || 0) + (question.mark || 0);
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
