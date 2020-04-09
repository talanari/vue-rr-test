export const state = () => ({
  category: 'all',
  difficultyMasteringInMonths: 54,
  featured: {
    hot: false,
    guaranteed: false,
    new: false
  },
  interests: {
    outdoors: false,
    manual: false,
    creative: false,
    computer: false
  },
  median: 0,
  query: ''
})

export const getters = {
  parameters (state) {
    const {
      category,
      difficultyMasteringInMonths: difficulty,
      featured,
      interests,
      median,
      query
    } = state
    const params = {}

    category !== 'all' && (params.category = category)
    difficulty !== 54 && (params.difficultyMasteringInMonths = difficulty)

    for (const [option, value] of Object.entries(featured)) {
      value && (params[option] = value)
    }

    for (const [option, value] of Object.entries(interests)) {
      value && (params[option] = value)
    }

    median && (params.median = median)
    query !== '' && (params.query = query)

    return params
  }
}

export const mutations = {
  change (state, { entity, option, value }) {
    !option ? (state[entity] = value) : (state[entity][option] = value)
  },
  toggle (state, { entity, option }) {
    state[entity][option] = !state[entity][option]
  }
}
