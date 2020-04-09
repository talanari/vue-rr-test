<template>
  <div class="card">
    <img :src="vacancy.image">
    <div class="card--titlecontainer" :title="vacancy.title">
      <span class="card--title">{{ vacancy.title }}</span>
    </div>
    <div class="card--properties">
      <div class="card--infocontainer">
        <span>Средний доход</span>
        <span class="card--median">
          {{ `${vacancy.median.toString().slice(0, -3)} ${vacancy.median.toString().slice(-3)}` }} ₽
        </span>
      </div>
      <div class="card--infocontainer">
        <span>Удовлетворенность</span>
        <div>
          <fa
            v-for="index in 4"
            :key="index"
            :icon="['fas', 'star']"
            :class="index > vacancy.satisfaction ? 'star__inactive' : 'star__active'"
            class="star"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vacancy: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 150px;
  margin: 0 30px 30px 0;
  font-size: 12px;
}

.card--titlecontainer {
  margin: 5px 0;
}

.card--title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card--properties {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
}

.card--infocontainer {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
}

.card--median {
  font-weight: 700;
}

.star {
  margin-left: 3px;
  font-size: 6px;
}

.star__active {
  color: var(--color-asparagus);
}

.star__inactive {
  color: var(--color-alto);
}
</style>
