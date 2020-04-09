<template>
  <div class="rangeslider">
    <div class="rangeslider--slider">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        class="rangeslider--input"
        @change="onChange"
      >
    </div>
    <table class="rangeslider--legend">
      <tbody>
        <tr>
          <td v-for="(label, index) in labels" :key="index">
            {{ label }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0,
      required: false
    },
    step: {
      type: Number,
      default: 1,
      required: false
    },
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onChange (event) {
      this.$emit('onChange', Number(event.target.value))
    }
  }
}
</script>

<style scoped>
.rangeslider {
  font-size: 8px;
}

.rangeslider--slider {
  padding: 0 10px 3px;
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
  .rangeslider--input {
    overflow: hidden;
    min-width: 120px;
    -webkit-appearance: none;
    cursor: pointer;
    background-color: var(--color-white);
  }

  .rangeslider--input:focus {
    outline: none;
  }

  .rangeslider--input::-webkit-slider-runnable-track {
    height: 10px;
    border-radius: 25px;
    overflow: hidden;
    border: 0.5px solid var(--color-black);
  }

  .rangeslider--input:focus::-webkit-slider-runnable-track {
    background-color: var(--color-alto);
  }

  .rangeslider--input::-webkit-slider-thumb {
    width: 0;
    height: 8px;
    -webkit-appearance: none;
    background-color: var(--primary-color);
    box-shadow: -120px 0 0 120px var(--primary-color);
  }

  .rangeslider--input:focus::-webkit-slider-thumb {
    background-color: var(--color-azure);
    box-shadow: -120px 0 0 120px var(--color-azure);
  }
}

.rangeslider--input::-moz-range-progress {
  background-color: var(--primary-color);
}

.rangeslider--input:focus::-moz-range-progress {
  background-color: var(--color-azure);
}

.rangeslider--input::-moz-range-track {
  background-color: var(--color-white);
}

.rangeslider--input::-ms-fill-lower {
  background-color: var(--primary-color);
}

.rangeslider--input:focus::-ms-fill-lower {
  background-color: var(--color-azure);
}

.rangeslider--input::-ms-fill-upper {
  background-color: var(--color-white);
}

.rangeslider--legend {
  width: 100%;
}

.rangeslider--legend tr td {
  width: 33%;
  text-align: center;
}

.rangeslider--legend tr td:first-child {
  text-align: left;
}

.rangeslider--legend tr td:last-child {
  text-align: right;
}
</style>
