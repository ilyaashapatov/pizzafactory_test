<template>
  <div>
    <div class="row">
      <div class="col-lg-3 order-lg-12">
        <div class="sidebar mb-5">

          <h5 class="sidebar-title"><i class="material-icons">filter_list</i> Фильтр</h5>

          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <label for="filter_position">по должности:</label>
                <select id="filter_position" class="form-control" @change="setQueryString" v-model="filterRole">
                  <option value="">Выбрать должность</option>
                  <option v-for='(pos, key) in roles' :key="key" :value="key">{{ pos }}</option>
                </select>
              </div>

              <div class="form-check">
                <label class="sr-only">по статусу:</label>
                <input
                  type="checkbox"
                  id="filter_status"
                  v-model="filterStatus"
                  true-value="true"
                  false-value=""
                  @change="setQueryString"
                  class="form-check-input"
                >
                <label class="form-check-label" for="filter_status">В архиве</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="table-responsive table-responsive-md">
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th :class="{ active: sortParams == 'id' }">
                  <a href="javascript:;" @click="setSort('id')">ID</a>
                  <span class="arrow" :class="sortOrders['id'] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th :class="{ active: sortParams == 'name' }">
                  <a href="javascript:;" @click="setSort('name')">Имя Фамилия</a>
                  <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th :class="{ active: sortParams == 'birthday' }">
                  <a href="javascript:;" @click="setSort('birthday')">Дата рождения</a>
                  <span class="arrow" :class="sortOrders['birthday'] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th>Должность</th>
                <th>Телефон</th>
                <!-- <th><div class="text-center"><i class="material-icons">edit</i></div></th> -->
              </tr>
            </thead>

            <tbody>
              <router-link
                tag="tr"
                class="user-item"
                v-for='user in filteredList'
                :key="user.id"
                :class="{ notactive: user.isArchive }"
                :to="{ name: 'EmployeesEdit', params: { typeForm: 'edit', item: user, id: user.id } }"
              >
                <th>{{ user.id }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.birthday }}</td>
                <td v-if="user.role === 'driver'">Водитель</td>
                <td v-else-if="user.role === 'waiter'">Официант</td>
                <td v-else-if="user.role === 'cook'">Повар</td>
                <td style="white-space: nowrap;">{{ user.phone }}</td>
                <!-- <td align="center">
                  <a href="javascript:;" class="btn btn-outline-secondary btn-sm">
                    <i class="material-icons">edit</i>
                  </a>
                </td> -->
              </router-link>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <router-link
        :to="{ name: 'EmployeesForm', params: { typeForm: 'create'} }"
        tag="button"
        class="btn btn-primary"
      >Добавить нового сотрудника</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeesList',

  props: {
    status: String,
    role: String
  },

  data () {
    let sortOrders = {
      name: 1,
      birthday: 1,
      id: 1
    }

    return {
      sortParams: '',
      filterStatus: this.status || '',
      filterRole: this.role || '',
      filterParams: {},
      roles: this.$root.roles,
      sortOrders: sortOrders,
      employees: this.$root.employeesState
    }
  },

  computed: {
    filteredList () {
      let filterRole = this.filterRole
      let sortParams = this.sortParams
      let order = this.sortOrders[sortParams] || 1
      let employees = this.employees

      if (this.filterRole.length !== 0) {
        employees = employees.filter(function (item) {
          return item.role === filterRole
        })
      }

      if (this.filterStatus.length !== 0) {
        employees = employees.filter(function (item) {
          return item.isArchive
        })
      }

      switch (sortParams) {
        case 'name':
        case 'id':
          employees = employees.slice().sort(function (a, b) {
            a = a[sortParams]
            b = b[sortParams]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
          break
        case 'birthday':
          employees = employees.slice().sort(function (a, b) {
            a = a[sortParams].split('.').reverse().join('')
            b = b[sortParams].split('.').reverse().join('')
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
          break
      }

      return employees
    }
  },

  created () {
    console.log('Инициализация компонента списка сотрудников')
  },

  methods: {
    setSort (arg) {
      this.sortParams = arg
      this.sortOrders[arg] = this.sortOrders[arg] * -1
      console.log('Сортировка списка по полю:', arg, (this.sortOrders[arg] > 0) ? 'по возрастанию' : 'по уменьшению')
    },

    setQueryString (event) {
      let params = {}
      if (this.filterStatus.length !== 0) params.status = this.filterStatus
      if (this.filterRole.length !== 0) params.role = this.filterRole
      this.$router.push({name: 'EmployeesList', query: params})
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    font-weight: normal;

    a {
      text-decoration: none !important;
    }

    th {
      white-space: nowrap;
    }

    .notactive td,
    .notactive th {
      color: rgba(#2c3e50, .5);
    }

    .user-item > td {
      cursor: pointer;
    }
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid;
  }
</style>
