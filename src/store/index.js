import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

const DATA = require('../../employees.json')

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: { employees: DATA },
  actions,
  mutations,
  getters,
  strict: debug
})
