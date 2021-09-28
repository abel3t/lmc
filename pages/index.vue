<template>
  <QuestionBar />
</template>

<style lang="scss">
.test {
  @apply text-red-300
}
</style>

<script lang="ts">
import Vue from 'vue'
import QuestionBar from '~/components/QuestionBar.vue';

export default Vue.extend({
  components: { QuestionBar }
})
</script>
