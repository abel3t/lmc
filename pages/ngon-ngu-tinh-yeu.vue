<template>
  <div>
    <QuestionBar />
    <div class="questions">
      <div v-for="question in questions" :key="question.id" class="p-5">
        <div class="p-5">
          {{question.text}}
          <div v-for="answer in question.answers" :key="answer.type">
            <t-tag tag-name="p" variant="h6">
              <span v-if="answer.text">{{answer.text}}</span>
              <div v-else>
                <p>{{answer.textFemale}}</p>
                <p>{{answer.textMale}}</p>
              </div>
            </t-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.questions {
  @apply border-0 shadow-2xl w-2/3 text-justify;
  margin: 0 auto;
}

</style>

<script>
import QuestionBar from '../components/QuestionBar';
export default {
  components: { QuestionBar },
  computed: {
    questions: function () {
      return this.$store.getters.loveLanguagesQuestions;
    }
  }
};
</script>
