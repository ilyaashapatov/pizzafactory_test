import Vue from 'vue'
import Router from 'vue-router'
import EmployeesList from '@/components/EmployeesList'
import EmployeesForm from '@/components/EmployeesForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'EmployeesList',
      component: EmployeesList,
      props: (route) => ({
        sortBy: route.query.sortBy || '',
        sortDirection: route.query.sortDirection || '',
        status: route.query.status || '',
        role: route.query.role || ''
      })
    }, {
      path: '/create',
      name: 'EmployeesForm',
      component: EmployeesForm
    }, {
      path: '/edit/:id',
      name: 'EmployeesEdit',
      component: EmployeesForm
    }
  ]
})
