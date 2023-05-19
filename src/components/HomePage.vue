<template>
  <div class="page">
    <h2 class="page__title">{{ user.name }}</h2>

    <div class="user">
      <p class="user__key" v-if="user.username"><b>Username:</b> {{ user.username }}</p>
      <p class="user__key" v-if="user.email"><b>Email:</b> {{ user.email }}</p>
      <p class="user__key" v-if="user.address?.city"><b>City:</b> {{ user.address.city }}</p>
      <p class="user__key" v-if="user.address?.street"><b>Street:</b> {{ user.address.street }}</p>
      <p class="user__key" v-if="user.phone"><b>Phone:</b> {{ user.phone }}</p>
      <p class="user__key" v-if="user.company?.name"><b>Company:</b> {{ user.company.name }}</p>
    </div>

    <div>
      <h2 class="page__title">todo</h2>
      <button v-if="isVisibleGetButton" class="button" @click="getTodosList">get todos</button>
    </div>

    <div>
      <h3 class="page__heading">Filters:</h3>
      <button class="button" :class="{ disabled: noTodos }" :disabled="noTodos" @click="showAllTodos">All</button>
      <button class="button" :class="{ disabled: noTodos }" :disabled="noTodos"
        @click="filterTodos('completed', true)">Complited Todos</button>
      <button class="button" :class="{ disabled: noTodos }" :disabled="noTodos"
        @click="filterTodos('completed', false)">Not Complited Todos</button>
      <button class="button" :class="{ disabled: noTodos }" :disabled="noTodos"
        @click="filterTodos('favorite', true)">Favorite Todos</button>
      <button class="button" :class="{ disabled: noTodos }" :disabled="noTodos"
        @click="getUserTodos()">User's Todos</button>
    </div>

    <div>
      <input type="text" class="input" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add your new task">
    </div>

    <div v-for="todo in filteredTodos" :key="todo.id">
      <div class="row">
        <label :for="`checkbox${todo.id}`">
          <b>{{ todo.id }}.</b>
          <input :id="`checkbox${todo.id}`" type="checkbox" v-model="todo.favorite">
          <span> {{ todo.title }}</span>
        </label>
      </div>
    </div>

    <div v-for="user in usersId" :key="user.id">
      {{ user.name }}
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      allTodos: [],
      filteredTodos: [],
      newTodo: '',
      isVisibleGetButton: true,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      todos: state => state.todos,
    }),
    userId() {
      return this.$route.params.id
    },
    noTodos() {
      return this.allTodos.length <= 0
    }
  },
  methods: {
    ...mapGetters({
      usersId: 'usersId',
    }),
    ...mapActions({
      getTodos: 'getTodos',
    }),
    async getTodosList() {
      if (!this.noTodos) {
        let titles = this.allTodos.map(todo => todo.title);
        this.allTodos = await this.getTodos();
        titles.map(todoTitle => {
          this.newTodo = todoTitle;
          this.addTodo();
        })
      } else {
        this.allTodos = await this.getTodos();
      }
      this.isVisibleGetButton = false;
      this.filteredTodos = this.allTodos;
    },
    getUserTodos() {
      this.filteredTodos = this.allTodos.filter(todo => todo.userId == this.userId);
    },
    showAllTodos() {
      this.filteredTodos = this.allTodos;
    },
    filterTodos(type, bool) {
      if (this.todos && this.todos.length) {
        this.filteredTodos = this.allTodos.filter(task => task[type] === bool)
      }
    },
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }

      let todoId;

      if (this.noTodos) {
        todoId = 1;
      } else {
        let idArray = this.allTodos.map(todo => todo.id)
        todoId = Math.max(...idArray)
        todoId++
      }

      this.allTodos.push({
          id: todoId,
          userId: this.userId,
          title: this.newTodo,
          completed: false
        })
        
      this.newTodo = "";
      this.showAllTodos()
    }
  }
}
</script>

<style>
.page {
  max-width: 800px;
  margin: 30px auto;
}

.page__title {
  margin: 20px 0;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-shadow: -1px 0 0 #5D54A4;
}

.page__heading {
  margin-top: 20px;
  font-size: 26px;
  font-weight: bold;
  color: #1B1645;
}

.user {
  margin: 30px 0;
  padding: 50px;
  border-radius: 32px;
  background: linear-gradient(90deg, #5D54A4, transparent);
}

.user__key {
  margin: 5px 0;
  color: #1B1645;
}
.row {
  margin: 5px 0;
  padding: 4px 2px;
}
.row input {
  margin: 0 4px;
}
.button {
  display: inline-block;
  width: fit-content;
  margin: 10px 5px 5px 0;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #4C489D;
  background: #D4D3E8;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;
}

.button:active,
.button:focus,
.button:hover {
  border-color: #6A679E;
  outline: none;
}

.button.disabled:hover {
  border-color: #D4D3E8;
  cursor: inherit;
}

.input {
  min-width: 50vw;
  margin: 20px 5px 15px 0;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #4C489D;
  background: #fff;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;
}
</style>