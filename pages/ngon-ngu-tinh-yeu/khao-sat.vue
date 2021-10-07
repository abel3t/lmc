<template>
  <div>
    <QuestionBar v-bind:tab-question-type="tabQuestionType"/>
    <div class="flex flex-col content-center items-center p-2 md:p-4">
      <div
        class="bg-blue-600 text-white text-center text-3xl p-2 md:p-3 lg:p-4 my-3 border-gray-400 rounded-lg bg-white w-full md:w-3/4 lg:w-2/3">
        Bài khảo sát ngôn ngữ tình yêu
      </div>

      <div v-for="(question, qIndex) in questions" :key="question.id"
           class="p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white w-full md:w-3/4 lg:w-2/3">
        <strong>{{ question.text }}:</strong>
        <div v-for="(answer, aIndex) in question.answers" :key="answer.type">
          <div class="p-1">
            <div v-if="answer.text" class="inline-flex">
              <t-input :id="`q-${qIndex}-a-${aIndex}`" min="1" max="5" type="number"
                       class="input"
                       :variant="answer.error ? 'danger': ''"
                       @blur="updateMark({qIndex, aIndex }, $event)"
                       @keyup.enter="updateMark({qIndex, aIndex }, $event)"
                       :value="answer.mark || ''"
              />
              <span class="ml-2  cursor-pointer" v-on:click="focusInput(`q-${qIndex}-a-${aIndex}`)">{{
                  answer.text
                }}</span>
            </div>
            <div v-else class="inline-flex">
              <t-input :id="`q-${qIndex}-a-${aIndex}`" min="1" max="5" type="number"
                       class="input"
                       :variant="answer.error ? 'danger': ''"
                       @blur="updateMark({qIndex, aIndex }, $event)"
                       @keyup.enter="updateMark({qIndex, aIndex }, $event)"
                       :value="answer.mark || ''"
              />
              <div class="ml-2 cursor-pointer" v-on:click="focusInput(`q-${qIndex}-a-${aIndex}`)">
                <p>{{ answer.textFemale }}</p>
                <p>{{ answer.textMale }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <t-button class="mt-3" v-on:click="submit()">Gửi kết quả</t-button>
      </div>

      <t-dialog>
      </t-dialog>
    </div>

  </div>
</template>

<style lang="scss">

.input {
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

</style>

<script>
import QuestionBar from '../../components/QuestionBar';
import {
  TabQuestionType,
  UPDATE_GIFT_RESULT,
  UPDATE_LOVE_LANGUAGE_QUESTIONS
} from '../../store';

export default {
  components: { QuestionBar },
  data() {
    return {
      hasError: false,
      tabQuestionType: TabQuestionType.LoveLanguage
    };
  },
  computed: {
    questions: function () {
      return this.$store.getters.loveLanguagesQuestions;
    }
  },
  methods: {
    updateMark({ qIndex, aIndex }, e) {
      const value = parseInt(e.target?.value) || 0;
      const _questions = JSON.parse(JSON.stringify(this.questions));
      _questions[qIndex].answers[aIndex].mark = value;

      const answerMarks = _questions[qIndex].answers.map(answer => answer.mark);

      answerMarks.forEach((answerMark, idx) => {
        const isValid = answerMark >= 0 && answerMark <= 5 && answerMarks.indexOf(answerMark) === idx;

        this.hasError = !isValid;
        _questions[qIndex].answers[idx].error = !isValid;
      });

      this.$store.dispatch(UPDATE_LOVE_LANGUAGE_QUESTIONS, _questions);

    },
    submit() {
      let hasError = false;

      const markGroups = this.questions.reduce((acc, question) => {
        let answers = [];
        question.answers.forEach(answer => {
          answers.push(answer.mark);

          if (answer.mark <= 0 || answer.mark > 5) {
            hasError = true;
          }
          acc[answer.type] = {
            type: answer.type,
            mark: (acc[answer.type]?.mark || 0) + (answer.mark || 0)
          };
        });

        if (answers?.length !== [ ...new Set(answers) ].length) {
          hasError = true;
        }

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
        localStorage.setItem('loveLanguageResult', JSON.stringify(markGroups));
        localStorage.setItem('loveLanguageQuestions', JSON.stringify(this.questions));
        this.$store.dispatch(UPDATE_GIFT_RESULT, markGroups);

        window.open('/ngon-ngu-tinh-yeu', '_self');
      }
    },
    focusInput(id) {
      document.getElementById(id).focus();
    }
  },
  mounted() {
    const questions = localStorage.getItem('loveLanguageQuestions');
    if (questions) {
      this.$store.dispatch(UPDATE_LOVE_LANGUAGE_QUESTIONS, JSON.parse(questions));
    }
  }
};
</script>
