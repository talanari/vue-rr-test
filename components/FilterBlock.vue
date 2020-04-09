<template>
  <div class="filter">
    <span>По интересам</span>
    <label
      v-for="(value, key) in interests"
      :key="key"
      class="filter--checkbox"
    >
      <input
        type="checkbox"
        :checked="value.checked"
        @change="onInterestsChange(key)"
      >
      {{ value.text }}
    </label>
    <div class="divider filter--divider" />
    <span class="filter--subheader">Сложность овладения</span>
    <range-slider
      :max="14"
      :labels="['5 месяцев', '1 год', '4 года +']"
      :value="difficulty"
      @onChange="onDifficultyChange"
    />
    <div class="divider filter--divider" />
    <span class="filter--subheader">Зарплата</span>
    <range-slider
      :max="200000"
      :step="5000"
      :labels="['', '100 000', '200 000']"
      :value="median"
      @onChange="onMedianChange"
    />
  </div>
</template>

<script>
import RangeSlider from '~/components/RangeSlider.vue'

export default {
  components: {
    RangeSlider
  },
  props: {
    difficulty: {
      type: Number,
      default: 14
    },
    interests: {
      type: Object,
      default: () => {}
    },
    median: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onDifficultyChange (difficulty) {
      this.$emit('onDifficultyChange', difficulty)
    },
    onInterestsChange (interest) {
      this.$emit('onInterestsChange', interest)
    },
    onMedianChange (median) {
      this.$emit('onMedianChange', median)
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  padding: 5px 10px 5px 5px;
  font-size: 12px;
  background-color: var(--color-wildsand);
}

.filter--checkbox {
  margin-top: 5px;
}

.filter--divider {
  margin: 12px 0 5px 0;
  background-color: var(--color-alto);
}

.filter--subheader {
  margin-bottom: 10px;
}
</style>
