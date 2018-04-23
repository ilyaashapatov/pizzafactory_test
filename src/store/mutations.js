import { types } from './mutation-types'

export const mutations = {
  [types.ADD_USER] (state, item) {
    state.employees.push(item)
  },

  [types.EDIT_USER] (state, item) {
    for (let i = 0; i < state.employees.length; i++) {
      // eslint-disable-next-line
      if (state.employees[i].id == item.id) {
        state.employees[i] = Object.assign({}, state.employees[i], item)
      }
    }
  }
}
