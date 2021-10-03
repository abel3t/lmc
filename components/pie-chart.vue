<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: [ 'data', 'options' ],
  mounted() {
    this.renderChart(this.data, this.options);
  },
  watch: {
    data: function () {
      this._chart?.destroy();

      this.renderChart(this.data, this.options);
    }
  }
};
</script>
