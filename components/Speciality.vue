<template>
  <div class="speciality">
    <span class="speciality--header">Специальности</span>
    <ul class="speciality--list">
      <li v-for="(speciality, index) in specialities" :key="index">
        {{ speciality }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    specialities: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.speciality {
  font-size: 10px;
}

.speciality--header {
  margin-left: 10px;
  font-weight: 700;
}

.speciality--list {
  padding-left: 15px;
  list-style-type: none;
}

.speciality--list li {
  padding-top: 5px;
}
</style>
