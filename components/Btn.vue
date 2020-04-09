<template>
  <button
    class="button"
    :class="[
      `button--${mode}`,
      {[`button--${mode}__toggled`]: toggled}
    ]"
    @click="onClick"
  >
    <fa v-if="icon.length" :icon="icon" />
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: Array,
      default: () => [],
      required: false
    },
    label: {
      type: String,
      default: '',
      required: false
    },
    mode: {
      type: String,
      default: 'primary',
      required: false
    },
    toggled: Boolean
  },
  methods: {
    onClick (event) {
      this.$emit('onClick')
      event.target.blur()
    }
  }
}
</script>

<style scoped>
.button {
  border: 0;
  cursor: pointer;
}

.button:active {
  outline: none;
}

.button--primary {
  padding: 5px 20px;
  background-color: var(--primary-color);
  font-weight: 700;
}

.button--filter {
  padding: 5px;
  background-color: var(--tertiary-color);
  border-radius: 4px;
}

.button--filter__toggled {
  background-color: var(--secondary-color);
}

.button--category__toggled {
  font-weight: 700;
}
</style>
