export const actions = {
  addUser (store, item) {
    store.commit('ADD_USER', item)
  },

  editUser (state, item) {
    state.commit('EDIT_USER', item)
  }
}
