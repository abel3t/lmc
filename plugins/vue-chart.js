import Vue from 'vue'
import { Pie } from 'vue-chartjs'

Vue.component('my-line', Pie.extend({
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}))
