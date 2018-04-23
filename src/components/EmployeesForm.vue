<template>
  <div>
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <h3 class="h3 text-center mb-5">{{ (type == 'edit') ? 'Форма редактирования сотрудника' : 'Форма добавления нового сотрудника' }}</h3>

        <form @submit.prevent="onSubmit">
          <input type="hidden" id="id" v-model="fields.id">

          <div class="form-group row">
            <label for="name" class="col-sm-4 col-form-label text-sm-right">Имя Фамилия</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="fields.name"
                required
              >
            </div>
          </div>

          <div class="form-group row">
            <label for="phone" class="col-sm-4 col-form-label text-sm-right">Телефон</label>
            <div class="col-sm-8">
              <input
                type="tel"
                class="form-control"
                id="phone"
                v-model="fields.phone"
                v-input-mask="{ mask: '+7 (999) 999-9999', type: 'phone'}"
                required
              >
            </div>
          </div>

          <div class="form-group row">
            <label for="birthday" class="col-sm-4 col-form-label text-sm-right">Дата рождения</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="birthday"
                v-model="fields.birthday"
                v-input-mask="{ mask: 'dd.mm.yyyy', type: 'date'}"
                required
              >
            </div>
          </div>

          <div class="form-group row">
            <label for="role" class="col-sm-4 col-form-label text-sm-right">Должность</label>
            <div class="col-sm-8">
              <select id="role" class="form-control" v-model="fields.role" required>
                <option value="">Выбрать должность</option>
                <option v-for='(pos, key) in roles' :key="key" :value="key">{{ pos }}</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-8 offset-sm-4">
              <div class="form-check">
                <input
                  type="checkbox"
                  id="isArchive"
                  v-model="fields.isArchive"
                  :true-value="true"
                  :false-value="false"
                  class="form-check-input"
                >
                <label class="form-check-label" for="isArchive">
                  В архиве
                </label>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-8 offset-sm-4">
              <button class="btn btn-success">{{ (type == 'edit') ? 'Сохранить' : 'Добавить' }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Inputmask from 'inputmask'
import 'inputmask/dist/inputmask/inputmask.date.extensions'

export default {
  name: 'EmployeesForm',

  data () {
    let params = this.$route.params // Параметры полученные через роутер
    let roles = this.$root.roles
    let type = (params && params.typeForm) ? params.typeForm : null

    return {
      fields: { id: '', phone: '', birthday: '', name: '', role: '', isArchive: false },
      type: type,
      params: params,
      roles: roles
    }
  },

  methods: {
    getUserFromRouter () {
      return this.$route.params.item
    },

    setNewId () {
      return this.$store.getters.employeesCount + 1
    },

    getUserFromRoot (id) {
      let data = this.$root.employeesState
      let item = {}

      for (let i in data) {
        if (data[i].id === +id) {
          item = Object.assign({}, data[i]) // создаем копию существующего объекта
          break
        }
      }

      return item
    },

    onSubmit (event) {
      console.log('type', this.type)
      // Проверям тип
      if (this.type === 'edit') {
        console.log('Редактируем пользователя', this.fields)
        // Отредактировали нового пользователя
        this.$store.dispatch('editUser', this.fields)
      } else {
        console.log('Создаем нового пользователя', this.fields)
        // Добавили нового пользователя
        this.$store.dispatch('addUser', this.fields)
      }
      // Вернулись к списку
      this.$router.go(-1)
    }
  },

  created () {
    let route = this.$route
    let params = route.params

    if (Object.keys(params).length === 0 && params.constructor === Object) {
      console.log('С пустыми параметрами перекидываем на главную')
      this.$router.push({name: 'EmployeesList'})
    } else {
      console.log('Параметры из роутера', params)
      // Костыль, пока не придумал как оптимизировать кучу условий, возможно избыточен
      if (!params.hasOwnProperty('item') && params.hasOwnProperty('id') && route.path.indexOf('edit') !== -1) {
        let fields = this.getUserFromRoot(params.id)
        this.type = 'edit'
        this.fields = fields
      } else if (params.hasOwnProperty('item')) {
        this.fields = this.getUserFromRouter()
      } else {
        this.fields.id = this.setNewId()
      }
    }

    console.log(
      'Инициализация компонента',
      (this.type && this.type === 'edit') ? 'редактирования' : 'добавления',
      'сотрудника'
    )
  },

  directives: {
    inputMask: {
      bind: function (el, binding) {
        let type = binding.value.type
        let options = {}

        switch (type) {
          case 'phone':
            options = { mask: binding.value.mask }
            break
          case 'date':
            options = { alias: 'dd.mm.yyyy', format: binding.value.mask }
            break
          default:
            options = {}
            break
        }

        let im = new Inputmask(options)
        im.mask(el)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  input[type="date"] {
    &::-webkit-inner-spin-button {
      display: none;
    }
  }
</style>
