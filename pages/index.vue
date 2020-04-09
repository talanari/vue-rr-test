<template>
  <div class="container">
    <div class="header">
      <img src="~/assets/logo.png" class="header--logo">
      <div class="search">
        <div class="searchcontrol">
          <input
            class="searchcontrol--input"
            placeholder="Поиск"
            :value="storeFilterField('query')"
            @change="queryChange"
          >
          <btn label="Найти" @onClick="queryFilter" />
        </div>
        <div class="searchcontrol searchcontrol--featurefilter">
          <btn
            v-for="(button, index) in filterFeatured"
            :key="index"
            :label="button.text"
            :mode="'filter'"
            :toggled="featuredFilterOptions(button.filterField)"
            @onClick="toggleFeatured(button.filterField)"
          />
        </div>
      </div>
    </div>
    <div class="divider" />
    <div class="categories">
      <btn
        v-for="(button, index) in categories"
        :key="index"
        :icon="button.icon"
        :label="button.text"
        :mode="'category'"
        :toggled="storeFilterField('category') === button.category"
        @onClick="changeCategory(button.category)"
      />
    </div>
    <div class="divider" />
    <div class="content">
      <speciality
        :specialities="storeFilterField('category') !== 'all'
          ? categories[categories.findIndex(entry => entry.category === storeFilterField('category'))].specialities
          : allSpecialities"
      />
      <div class="content--block">
        <div class="cardscontainer">
          <span v-if="!isLoading && !count">
            По вашему запросу результатов нет. Попробуйте изменить параметры фильтра.
          </span>
          <vacancy-card
            v-for="vacancy in vacancies"
            :key="vacancy.id"
            :vacancy="vacancy"
          />
        </div>
        <spinner v-if="isLoading" />
        <trigger @triggerIntersected="loadMore" />
      </div>
      <filter-block
        :difficulty="difficulty"
        :interests="interestsFilterOption"
        :median="storeFilterField('median')"
        @onDifficultyChange="changeDifficulty"
        @onInterestsChange="toggleInterest"
        @onMedianChange="changeMedian"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import Btn from '~/components/Btn.vue'
import FilterBlock from '~/components/FilterBlock.vue'
import Speciality from '~/components/Speciality.vue'
import Spinner from '~/components/Spinner.vue'
import Trigger from '~/components/Trigger.vue'
import VacancyCard from '~/components/VacancyCard.vue'

export default {
  components: {
    Btn,
    FilterBlock,
    Speciality,
    Spinner,
    Trigger,
    VacancyCard
  },
  data () {
    return {
      categories: [
        {
          text: 'Все категории',
          category: 'all',
          icon: ['fas', 'align-justify']
        },
        {
          text: 'Информационные технологии',
          category: 'it',
          specialities: [
            'Тестирование',
            'Программирование',
            'Управление',
            'Анализ'
          ]
        },
        {
          text: 'Маркетинг',
          category: 'marketing',
          specialities: [
            'Web-маркетинг',
            'Крауд-маркетинг',
            'Контент-маркетинг'
          ]
        },
        {
          text: 'Дизайн',
          category: 'design',
          specialities: [
            'Web-дизайн',
            'Дизайн интерьеров'
          ]
        },
        {
          text: 'Бухгалтерский учет',
          category: 'accounting',
          specialities: [
            'Главный бухгалтер',
            'Помощник бухгалтера'
          ]
        }
      ],
      filterFeatured: [
        { text: 'Самые востребованные', filterField: 'hot' },
        { text: 'Точно не сократят', filterField: 'guaranteed' },
        { text: 'Только появились', filterField: 'new' }
      ]
    }
  },
  computed: {
    allSpecialities () {
      return [].concat(...this.$data.categories.map(category => category.specialities ?? []))
    },
    count () {
      return this.$store.state.count
    },
    difficulty () {
      const difficultyInMonths = this.$store.state.filter.difficultyMasteringInMonths

      return difficultyInMonths > 12
        ? 7 + (difficultyInMonths - 12) / 6
        : difficultyInMonths - 5
    },
    interestsFilterOption () {
      const {
        outdoors,
        manual,
        creative,
        computer
      } = this.$store.state.filter.interests
      const filterInterests = {
        outdoors: { text: 'На воздухе', checked: outdoors },
        manual: { text: 'Руками', checked: manual },
        creative: { text: 'Творчество', checked: creative },
        computer: { text: 'За компьютером', checked: computer }
      }

      return filterInterests
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    vacancies () {
      return this.$store.state.list
    },
    ...mapGetters({ parameters: ['filter/parameters'] })
  },
  created () {
    // Not getting any vacancy data during SSR because of setTimeout (mocks)
    Object.keys(this.$route.query).forEach((key) => {
      switch (key) {
        case 'query':
        case 'category':
          this.change({ entity: key, value: this.$route.query[key] })
          break
        case 'hot':
        case 'guaranteed':
        case 'new': {
          this.change({ entity: 'featured', option: key, value: true })
          break
        }
        case 'median':
        case 'difficultyMasteringInMonths':
          this.change({ entity: key, value: Number(this.$route.query[key]) })
          break
        default:
          this.change({ entity: 'interests', option: key, value: true })
      }
    })

    this.query()
  },
  methods: {
    changeCategory (category) {
      this.change({ entity: 'category', value: category })
      this.queryFilter()
    },
    changeDifficulty (difficulty) {
      const difficultyInMonths = difficulty < 8
        ? difficulty + 5
        : 12 + (difficulty - 7) * 6

      this.change({
        entity: 'difficultyMasteringInMonths',
        value: difficultyInMonths
      })
      this.queryFilter()
    },
    changeMedian (median) {
      this.change({ entity: 'median', value: median })
      this.queryFilter()
    },
    featuredFilterOptions (field) {
      return this.storeFilterField('featured')[field]
    },
    loadMore () {
      if (!this.isLoading && this.count > this.vacancies.length) {
        this.query({ offset: this.vacancies.length })
      }
    },
    storeFilterField (name) {
      return this.$store.state.filter[name]
    },
    toggleFeatured (field) {
      this.toggle({ entity: 'featured', option: field })
      this.queryFilter()
    },
    toggleInterest (interest) {
      this.toggle({ entity: 'interests', option: interest })
      this.queryFilter()
    },
    queryChange (event) {
      this.change({ entity: 'query', value: event.target.value })
    },
    queryFilter () {
      this.$router.push({ path: '/', query: this.parameters })
      this.query()
    },
    ...mapMutations({
      change: 'filter/change',
      toggle: 'filter/toggle'
    }),
    ...mapActions({
      query: 'query'
    })
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 60%;
}

.header {
  display: flex;
  width: 100%;
  margin-bottom: 5px;
}

.header--logo {
  height: fit-content;
}

.search {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  width: 100%;
}

.searchcontrol {
  display: flex;
}

.searchcontrol--featurefilter {
  margin-top: 5px;
}

.searchcontrol--featurefilter button:not(:first-child) {
  margin-left: 10px;
}

.searchcontrol--input {
  flex-grow: 1;
  margin-right: 5px;
  border-width: 1px;
  border-color: var(--color-black);
}

.categories {
  display: flex;
  padding: 3px 0;
}

.categories button:not(:first-child) {
  margin-left: 5px;
}

.content {
  display: flex;
  flex-grow: 1;
  margin-top: 20px;
  width: 100%;
  align-items: flex-start;
}

.content--block {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
}

.cardscontainer {
  display: flex;
  margin-left: 15px;
  flex-wrap: wrap;
}
</style>
