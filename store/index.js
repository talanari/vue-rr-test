import data from '~/static/mocks/vacancies.json'

export const state = () => ({
  count: 0,
  isLoading: false,
  list: []
})

export const mutations = {
  load (state, { list, count }) {
    state.list = list
    state.count = count
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}

export const actions = {
  query ({ commit, getters }, { limit = 20, offset = 0 } = { limit: 20, offset: 0 }) {
    commit('setIsLoading', true)

    const parameters = getters['filter/parameters']

    return new Promise((resolve, reject) => {
      try {
        // API call begins
        // axios.get('api/endpoint', {
        //   params: parameters,
        //   limit,
        //   offset
        // })
        // .then...
        // API call ends

        setTimeout(() => {
          let filteredData = data

          if (Object.keys(parameters).length > 0) {
            filteredData = Object.keys(parameters).reduce((acc, key) => {
              switch (key) {
                case 'query':
                  return acc.filter(entry => entry.title.toLowerCase().includes(parameters[key].toLowerCase()))
                case 'category':
                  return acc.filter(entry => entry[key] === parameters[key])
                case 'hot':
                case 'guaranteed':
                  return acc.filter(entry => entry[key])
                case 'new': {
                  const now = new Date()
                  const [year, month, day] = [
                    now.getUTCFullYear(),
                    now.getUTCMonth(),
                    now.getUTCDate()
                  ]

                  return acc.filter((entry) => {
                    const entryDate = new Date(entry.dateCreated)
                    const [entryYear, entryMonth, entryDay] = [
                      entryDate.getUTCFullYear(),
                      entryDate.getUTCMonth(),
                      entryDate.getUTCDate()
                    ]
                    const yearsDifference = year - entryYear
                    const monthsDifference = month - entryMonth
                    const daysDifference = day - entryDay

                    return (yearsDifference === 0 && monthsDifference === 0) ||
                      (daysDifference < 1 &&
                        ((yearsDifference === 0 && monthsDifference === 1) ||
                        (yearsDifference === 1 && monthsDifference === -11))
                      )
                  })
                }
                case 'median':
                  return acc.filter(entry => entry[key] >= parameters[key])
                case 'difficultyMasteringInMonths':
                  return acc.filter(entry => entry[key] <= parameters[key])
                default:
                  return acc.filter(entry => entry.interests.includes(key))
              }
            }, data)
          }

          // this one also differs from real situation
          commit(
            'load',
            {
              list: filteredData.slice(0, limit + offset),
              count: filteredData.length
            }
          )
          resolve()

          // because we need to be in loop
          commit('setIsLoading', false)
        }, 300)
      } catch (error) {
        reject(new Error(error))
      } finally {
        // commit('setIsLoading', false)
      }
    })
  }
}
