export const getters = {
  employees (state) {
    return state.employees
  },

  employeesCount (state) {
    return state.employees.length
  }
}
