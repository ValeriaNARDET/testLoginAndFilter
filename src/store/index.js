import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: [],
    user: {},
    todos: {},
  },

  getters: {
    usersId(state) {
      return state.users.map(user => {
        return { id: user.id, name: user.username }
      })
    },
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_TODOS(state, todos) {
      state.todos = todos
    },
  },

  actions: {
    getUsers({ commit }) {
      return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          if (!!res && !!res.data && !!res.data.length) {
            commit('SET_USERS', res.data)
            return res.data
          }
        })
    },
    getTodos({ commit }) {
      return axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res => {
          if (!!res && !!res.data && !!res.data.length) {
            commit('SET_TODOS', res.data)
            return res.data

          }
        })
    }
  },
})

if (process.env.NODE_ENV === 'development') {
  window.$store = store
}

export default store
